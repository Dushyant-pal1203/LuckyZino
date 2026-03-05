import { useRef, useState } from 'react';
import { ErrorCode } from '@/lib/errors';
import { CheckUserOtpVerificationRequiredResponse, CloseOtpData, OtpInitData } from '@/types/otp';
import { useMessageHandler } from '@/hooks/useMessageHandler';
import { OtpTriggerSource } from '@/types/enums/otp';
import { request } from '@/services/request-handler';
import Cookies from 'js-cookie';

/**
 * Type for a function that can be wrapped by the OTP guard.
 * It should return a Promise and accept any arguments.
 */
type GuardedFn = (...args: any[]) => Promise<void>;

const COOKIE_KEY = (source: OtpTriggerSource) => `otp_passed_${source}`;

/**
 * useOtpGuard
 *
 * This hook provides a reusable way to wrap any async function that may trigger an OTP verification.
 *
 * Key points:
 * - The wrapped function **must throw an error with `reason === ErrorCode.PHONE_VERIFICATION_REQUIRED`** when OTP is required.
 * - When OTP is triggered, the function call is paused and retried automatically after OTP completion.
 * - The `otpPassed` state can be used in components to know whether OTP verification has successfully completed.
 * - **Do NOT include the wrapped function in `useEffect` dependency arrays**.
 *   Including it would cause the effect to re-run on every render because the function reference changes
 *   (even if the internal logic hasn't changed), which can lead to multiple repeated calls.
 */
export function useOtpGuard() {
  // Store the last function that triggered OTP so it can be retried after verification
  const lastFnRef = useRef<GuardedFn | null>(null);
  // Store the arguments of the last function call
  const lastArgsRef = useRef<any[]>([]);
  const activeSourceRef = useRef<string | null>(null);
  // State indicating whether OTP has been successfully completed
  const [otpPassed, setOtpPassed] = useState(false);
  const [userToken, setUserToken] = useState<string | undefined>('');

  const handleCloseOtp = (closeOtpData: CloseOtpData) => {
    const source = closeOtpData.source;
    const passed = closeOtpData.passed ?? false;
    const verificationToken = closeOtpData.userToken;

    if (source && source === activeSourceRef.current) {
      if(passed && !verificationToken) {
        throw new Error('It was received that OTP verification was passed, but the token is missing!')
      }
      if (passed) {
        Cookies.set(COOKIE_KEY(source), '1', { expires: 5 / 1440, sameSite: 'lax' }); // 5 minutes
      }
      setUserToken(verificationToken);
      setOtpPassed(passed); // update state for component usage

      if (lastFnRef.current) {
        const fnToRetry = lastFnRef.current;
        const argsToRetry = lastArgsRef.current;

        // Clear refs BEFORE retrying to prevent accidental loops
        lastFnRef.current = null;
        lastArgsRef.current = [];

        fnToRetry(verificationToken, ...argsToRetry); // retry the function
      }
      activeSourceRef.current = null;
    }
  };

  const triggerOtp = (otpData: OtpInitData | undefined) => {
    activeSourceRef.current = otpData?.source ?? null;
    window.postMessage({ name: 'common.show_phone_otp', data: { ...otpData } }, '*');
  }

  /**
   * Effect to listen for OTP completion messages.
   * When an OTP verification is completed (`otp.close`), retry the saved function call.
   */
  useMessageHandler(message => {
    const { name, data } = message;
    if (name === 'otp.close') {
      handleCloseOtp(data as CloseOtpData);
    }
  });

  /**
   * withOtpGuard
   *
   * Wraps async function so that OTP-triggered errors are handled automatically.
   *
   * Flow:
   * 1) If otpFirst:
   *    - If force: trigger OTP immediately
   *    - Else: check if OTP required → trigger if yes
   * 2) Execute fn
   * 3) If fn throws PHONE_VERIFICATION_REQUIRED → trigger OTP + save invocation for retry
   */
  const withOtpGuard = <T extends (...args: any[]) => Promise<void>>(
    fn: T,
    otpData?: OtpInitData,
    otpFirst = true,
    force = false
  ) => {
    return (async (...args: Parameters<T>) => {

      const triggerOtpAndSaveFuncData = () => {
        lastFnRef.current = fn;
        lastArgsRef.current = args;
        triggerOtp(otpData);
      };

      if (otpFirst && !otpPassed && otpExpired(otpData?.source)) {
        if (force) {
          triggerOtpAndSaveFuncData();
          return;
        }

        const required = await isOtpRequired(otpData?.source);
        if (required) {
          triggerOtpAndSaveFuncData();
          return;
        }
      }

      try {
        await fn(...args);
      } catch (error: any) {
        const otpError = error?.reason === ErrorCode.PHONE_VERIFICATION_REQUIRED;

        if (otpError && !otpPassed && otpExpired(otpData?.source)) {
          triggerOtpAndSaveFuncData();
          return;
        }

        throw error;
      }
    }) as T;
  };

  const isOtpRequired = async (source: OtpTriggerSource): Promise<boolean> => {
    try {
      const verificationExists = await request<CheckUserOtpVerificationRequiredResponse>(
        `api/user/verification/otp/${source}/check-required`
      );
      return !!verificationExists?.required;
    } catch (e) {
      console.error('Error in user otp verification requirements checking', e);
      return false;
    }
  }

  const otpExpired = (source: OtpTriggerSource) => {
    return !(Cookies.get(COOKIE_KEY(source)) === '1')
  }

  return { userToken, otpPassed, withOtpGuard, triggerOtp, isOtpRequired, otpExpired };
}
