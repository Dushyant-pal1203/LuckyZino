import { useEffect, useRef, useState } from 'react';
import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import useTimer from '@/hooks/use-timer';
import { PhoneNumberSchema } from '@/schemas/common';
import { OtpSchema } from '@/schemas/otp';
import FirebaseService, { FirebaseAuthErrorCode, parseAuthError } from '@/lib/firebase';
import { request } from '@/services/request-handler';
import { OtpInitData, VerifyAndSaveUserOtpTokenRequest } from '@/types/otp';
import { sendBIEvent } from '@/lib/trackers';
import { PhoneVerificationData } from '@/types/trackers';
import { BIEvents, PhoneVerificationReason, PhoneVerificationStatus } from '@/types/enums/trackers';
import { OtpTriggerSource } from '@/types/enums/otp';
import { useMessageHandler } from '@/hooks/useMessageHandler';

const OTP_RESEND_COOLDOWN_ID = 'otpResendCodeCooldown';
const OTP_RESEND_COOLDOWN = 60;

/**
 * BI event mapping for error codes
 */
const errorCodeToBIStatus: Record<FirebaseAuthErrorCode, PhoneVerificationStatus | null> = {
  [FirebaseAuthErrorCode.InvalidRecaptchaToken]: PhoneVerificationStatus.FailedRecaptcha,
  [FirebaseAuthErrorCode.CaptchaCheckFailed]: PhoneVerificationStatus.FailedRecaptcha,
  [FirebaseAuthErrorCode.TooManyRequests]: PhoneVerificationStatus.FailedRecaptcha,
  [FirebaseAuthErrorCode.InvalidAppCredential]: PhoneVerificationStatus.FailedRecaptcha, // Firebase returns this code when reCaptcha score is low

  [FirebaseAuthErrorCode.InvalidVerificationCode]: PhoneVerificationStatus.FailedCode,
  [FirebaseAuthErrorCode.CodeExpired]: PhoneVerificationStatus.FailedCode,
  [FirebaseAuthErrorCode.MissingVerificationCode]: PhoneVerificationStatus.FailedCode,

  [FirebaseAuthErrorCode.InvalidPhoneNumber]: PhoneVerificationStatus.FailedPhone,
  [FirebaseAuthErrorCode.MissingPhoneNumber]: PhoneVerificationStatus.FailedPhone,

  [FirebaseAuthErrorCode.MissingVerificationId]: null,
  [FirebaseAuthErrorCode.InvalidVerificationId]: null,
  [FirebaseAuthErrorCode.QuotaExceeded]: null,
  [FirebaseAuthErrorCode.Unknown]: null
};

/**
 * BI otp reason - otp trigger mapping
 */
const otpTriggerToBiReason: Record<OtpTriggerSource, PhoneVerificationReason> = {
  [OtpTriggerSource.Redemption]: PhoneVerificationReason.Redemption,
  [OtpTriggerSource.Spin]: PhoneVerificationReason.Spin
};

/**
 * useOtpVerification hook
 *
 * Manages the full OTP verification flow including:
 * 1. Phone number submission
 * 2. Sending OTP using Firebase with Recaptcha verification
 * 3. Resending OTP with cooldown
 * 4. Verifying OTP and saving token to server
 *
 * Responsibilities:
 * - Tracks step state (phone input, OTP input, success)
 * - Handles loading and error states
 * - Integrates Firebase OTP and reCAPTCHA
 * - Starts and manages resend cooldown timer
 *
 * @param reCaptchaContainerId - The HTML container ID where Recaptcha should be rendered
 * @param verifiedPhoneNumber - Already verified phone (not from input)
 * @param setStep - Callback to set the current OTP step (1: phone, 2: code, 3: success)
 * @param setUserToken - Callback to set user token after OTP confirmation
 */
//todo move initialization logic to another hook. This hook already overloaded
export default function useOtpVerification(
  reCaptchaContainerId: string,
  verifiedPhoneNumber: string | null,
  setStep: (step: number) => void,
  setUserToken: (token: string | undefined) => void
) {
  const [initData, setInitData] = useState<OtpInitData | null>(null);

  // temp flag
  // todo fix stub (Default reason = Spin)
  const [initDataReceived, setInitDataReceived] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState(verifiedPhoneNumber ?? '');
  const [verificationId, setVerificationId] = useState<ConfirmationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializedStep, setIsInitializedStep] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reCaptcha, setReCaptcha] = useState<RecaptchaVerifier | null>(null);
  const { remainingTime, isTimerLoading, startTimer } = useTimer({
    localStorageKey: OTP_RESEND_COOLDOWN_ID,
    cooldownTime: OTP_RESEND_COOLDOWN
  });
  // Initialize FirebaseService safely
  const firebaseServiceRef = useRef<FirebaseService | null>(null);
  if (!firebaseServiceRef.current) {
    try {
      firebaseServiceRef.current = new FirebaseService();
    } catch (err) {
      console.error('Failed to initialize FirebaseService', err);
    }
  }
  const firebaseService = firebaseServiceRef.current;

  useMessageHandler(message => {
    const { name, data } = message;
    if (name === 'otp.init') {
      setInitData((data as OtpInitData));
      setInitDataReceived(true);
    }
  });

  //By default, the spin is source. Because we can send source to the front from the redeem.
  // But to get the source spin, we need to finish the back-end. A temporary workaround.
  // todo fix stub (Default reason = Spin) also there is a way to get source from state. Find better solution
  const biEventData = (
    status: PhoneVerificationStatus,
    source: OtpTriggerSource = OtpTriggerSource.Spin): PhoneVerificationData => ({
    phone: {
      status,
      reason: otpTriggerToBiReason[source]
    }
  });

  useEffect(() => {
    window.parent.postMessage({ name: 'otp.init_handshake' }, '*');
  }, []);

  useEffect(() => {
    // This parameter was added because the data may not have been initialized yet. In that case,
    // the event will first be sent with a default reason, and later, if the data is initialized,
    // it could be sent with the actual reason. Alternatively, the data might never arrive at all,
    // in which case we still need to send the event using default values. We cannot determine from
    // the initData field alone whether the data is simply not available yet or if the state hasn’t been set.
    // That’s why we introduced this flag.
    // todo fix stub (Default reason = Spin) Find better solution
    if(initDataReceived) {
      sendBIEvent(BIEvents.PhoneVerification, biEventData(PhoneVerificationStatus.Started, initData?.source));
    }
  }, [initData?.source, initDataReceived]);

  // Initialize Recaptcha once when the hook mounts
  useEffect(() => {
    if (!reCaptcha && firebaseService) {
      setReCaptcha(firebaseService.buildRecaptcha(reCaptchaContainerId));
    }
  }, [firebaseService, reCaptcha, reCaptchaContainerId]);

  /**
   * Returns the initialized FirebaseService instance.
   *
   * This function ensures that FirebaseService is available before usage.
   * If the service is not initialized, it throws an error.
   *
   *
   * @throws {Error} If FirebaseService is not initialized
   * @returns {FirebaseService} The initialized FirebaseService instance
   */
  const getFirebaseService = (): FirebaseService => {
    if (!firebaseService) {
      throw new Error('FirebaseService is not initialized');
    }
    return firebaseService;
  };

  /** Common error handler with BI logging */
  const handleError = async (err: unknown) => {
    const { message, code } = parseAuthError(err);

    const biStatus = errorCodeToBIStatus[code];
    if (biStatus) {
      await sendBIEvent(BIEvents.PhoneVerification, biEventData(biStatus, initData?.source));
    }
    const userMessage = code === FirebaseAuthErrorCode.Unknown
      ? 'Something went wrong'
      : message;

    console.error('OTP error:', message, err);
    setError(userMessage);
  };

  /**
   * Sends OTP to the provided phone number
   * Handles verification existence, Firebase OTP sending, and step progression
   * @param phone - User phone number
   */
  const sendOtp = async (phone: string) => {
    setIsLoading(true);
    try {
      if (!reCaptcha) {
        throw new Error('RecaptchaVerifier not found');
      }

      const confirmation = await getFirebaseService().sendOtp(phone, reCaptcha);
      setVerificationId(confirmation);

      // Move to step 2: OTP input
      setStep(2);
      startTimer(); // start resend cooldown
    } catch (err) {
      await handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  /** Handles phone number form submission */
  const handlePhoneSubmit = async (data: PhoneNumberSchema) => {
    const { phoneNumber } = data;

    await sendOtp(phoneNumber);
    setPhoneNumber(phoneNumber);
  };

  /** Handles resending OTP, uses cooldown */
  const handleOnResend = async () => {
    if (!phoneNumber) {
      setError('Phone number is required to resend code');
      return;
    }
    await sendOtp(phoneNumber);
  };

  /**
   * Handles OTP form submission
   * Confirms OTP code with Firebase and sends token to server for verification
   */
  const handleOtpSubmit = async (data: OtpSchema) => {
    if (!verificationId) {
      setError('Verification ID is missing');
      return;
    }

    setIsLoading(true);
    try {
      await getFirebaseService().confirmOtp(verificationId, data.otp);
      const userToken = await getFirebaseService().getUserToken();

      const verifyToken = initData?.verifyToken ?? true;
      if(verifyToken) {
        await request<VerifyAndSaveUserOtpTokenRequest>(
          'api/user/verification/otp/verify',
          { idToken: userToken },
          'POST'
        );
      }

      // Move to step 3: success
      setUserToken(userToken)
      setStep(3);
      await sendBIEvent(BIEvents.PhoneVerification, biEventData(PhoneVerificationStatus.Finished, initData?.source));
    } catch (err) {
      await handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      if(verifiedPhoneNumber && reCaptcha) {
        setIsInitializedStep(false);
        try {
          await handlePhoneSubmit({ phoneNumber: verifiedPhoneNumber });
        } catch (err) {
          console.error(err);
        } finally {
          setIsInitializedStep(true);
        }
      }
    };

    void init();
  }, [verifiedPhoneNumber, reCaptcha]);


  return {
    isInitializedStep,
    isLoading,
    error,
    setError,
    phoneNumber,
    remainingTime,
    isTimerLoading,
    handlePhoneSubmit,
    handleOtpSubmit,
    handleOnResend
  };
}
