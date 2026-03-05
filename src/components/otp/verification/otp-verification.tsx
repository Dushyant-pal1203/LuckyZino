import OtpStepPhone from '@/components/otp/form-step/otp-step-phone';
import OtpStepCode from '@/components/otp/form-step/otp-step-code';
import OtpStepSuccess from '@/components/otp/form-step/otp-step-success';
import { useForm, UseFormReturn, Path } from 'react-hook-form';
import { defaultPhoneNumberValues, phoneNumberSchema, PhoneNumberSchema } from '@/schemas/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultOtpValues, otpSchema, OtpSchema } from '@/schemas/otp';
import useOtpVerification from '@/hooks/otp/useOtpVerification';
import { useEffect } from 'react';
import { OtpVerificationProps } from '@/types/otp';
import OtpFormLoadingStep from '../form-step/otp-form-loading-step';

const OTP_RECAPTCHA_CONTAINER_ID = 'otp-re-captcha-container';

/**
 * Utility function that maps a global error message
 * to a specific form field in react-hook-form.
 */
const setErrorToForm = <T extends Record<string, any>>(
  methods: UseFormReturn<T>,
  field: Path<T>,
  message: string
) => {
  methods.setError(field, { type: 'manual', message });
}

/**
 * OtpVerification component
 *
 * Manages the OTP (One-Time Password) flow:
 * 1. Phone number input
 * 2. OTP code input
 * 3. Success confirmation
 *
 * Responsibilities:
 * - Uses react-hook-form with Zod validation for both forms
 * - Handles step transitions and form resets
 * - Connects to `useOtpVerification` hook for OTP logic
 * - Displays server validation errors in the correct form field
 * - Mounts a hidden Recaptcha container for Firebase OTP
 */
export default function OtpVerification({step, verifiedPhone, setStep, setUserToken}: OtpVerificationProps) {
  // OTP state and handlers (business logic separated into a hook)
  const {
    phoneNumber,
    remainingTime,
    isInitializedStep,
    isLoading,
    error,
    setError,
    handlePhoneSubmit,
    handleOtpSubmit,
    handleOnResend
  } = useOtpVerification(OTP_RECAPTCHA_CONTAINER_ID, verifiedPhone, setStep, setUserToken);

  // Form for phone number input
  const phoneNumberMethods = useForm<PhoneNumberSchema>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: defaultPhoneNumberValues
  });

  // Form for OTP input
  const otpMethods = useForm<OtpSchema>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(otpSchema),
    defaultValues: defaultOtpValues
  });

  /**
   * Reset form values when user navigates back to a specific step.
   * - Step 1 → reset phone number form
   * - Step 2 → reset OTP form
   */
  useEffect(() => {
    if (step === 1) {
      phoneNumberMethods.reset(defaultPhoneNumberValues);
    }
    if (step === 2) {
      otpMethods.reset(defaultOtpValues);
    }
  }, [otpMethods, phoneNumberMethods, step]);

  /**
   * If user updates form fields and they are valid,
   * clear any server-side verification errors.
   */
  useEffect(() => {
    const formValid =
      (step === 1 && phoneNumberMethods.formState.isValid) ||
      (step === 2 && otpMethods.formState.isValid);

    if (formValid) {
      setError(null);
    }
  }, [step, phoneNumberMethods.formState.isValid, otpMethods.formState.isValid, setError]);

  /**
   * Map global verification error to the corresponding form field:
   * - Step 1 → error shown under phone number field
   * - Step 2 → error shown under OTP code field
   */
  useEffect(() => {
    if (!error) return;

    if (step === 1) setErrorToForm(phoneNumberMethods, 'phoneNumber', error);
    if (step === 2) setErrorToForm(otpMethods, 'otp', error);
  }, [error, step, phoneNumberMethods, otpMethods]);


  return (
    <div className="relative z-40 flex flex-col items-center justify-between h-full">
      <OtpFormLoadingStep isLoading={!isInitializedStep}>
        {/* Step 1: Enter phone number */}
        {step === 1 && (
          <OtpStepPhone
            methods={phoneNumberMethods}
            onSubmit={handlePhoneSubmit}
            onSubmitLoading={isLoading}
          />
        )}
        {/* Step 2: Enter OTP code */}
        {step === 2 && (
          <OtpStepCode
            methods={otpMethods}
            onSubmit={handleOtpSubmit}
            phoneNumber={phoneNumber}
            remainingTime={remainingTime}
            onResend={handleOnResend}
            onSubmitLoading={isLoading}
          />
        )}
        {/* Step 3: Success screen */}
        {step === 3 && <OtpStepSuccess />}
      </OtpFormLoadingStep>
      {/* Hidden Recaptcha container for Firebase */}
      <div id={OTP_RECAPTCHA_CONTAINER_ID}></div>
    </div>
  );
}