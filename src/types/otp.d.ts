import { FieldValues, UseFormReturn } from 'react-hook-form';
import { PhoneNumberSchema } from '@/schemas/common';
import { OtpSchema } from '@/schemas/otp';

export interface OtpVerificationProps {
  step: number;
  verifiedPhone: string | null;
  setStep: (step: number) => void;
  setUserToken: (token: string | undefined) => void;
}

export interface OtpHeaderProps {
  onStepBack: () => void;
  showBackButton: boolean;
}

export interface OtpStepPhoneProps {
  methods: UseFormReturn<PhoneNumberSchema>;
  onSubmit: (data: PhoneNumberSchema) => void;
  onSubmitLoading: boolean
}

export interface OtpStepCodeProps {
  methods: UseFormReturn<OtpSchema>;
  onSubmit: (data: OtpSchema) => void;
  phoneNumber: string;
  remainingTime: number;
  onResend: () => void;
  onSubmitLoading: boolean
}

export type StepFormProps<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  onSubmitLoading: boolean;
  children: React.ReactNode;
};

export interface VerifyAndSaveUserOtpTokenRequest {
  idToken: string;
}

export interface CheckUserOtpVerificationExistsResponse {
  phone: string | null;
  isVerified : boolean;
}

export interface CheckUserOtpVerificationRequiredResponse {
  required : boolean;
}

export interface OtpInitData {
  /**
   * The business module from which the OTP verification was called is necessary for trackers and the correct
   * closing of the modal window. This ensures that the verification
   * that was called is closed.
   */
  source: OtpTriggerSource;
  /**
   * Specifies whether the token should be verified. If the true flag is true, token verification will be
   * performed within the OTP component by sending the token to the server. Otherwise, the token verification method
   * will not be called, and the token will be verified within the protected method.
   */
  verifyToken: boolean;
}

export interface CloseOtpData {
  /**
   * The business module from which the OTP verification was called is necessary for correct
   * closing of the modal window. This ensures that the verification
   * that was called is closed.
   */
  source: OtpTriggerSource;
  /**
   * The verification token returned when the OTP is confirmed. It may be missing if the OTP modal window was simply
   * closed by force, rather than automatically after the OTP code was confirmed.
   */
  userToken?: string;
  /**
   * Flag indicates whether verification was completed. Because the OTP verification window can be closed without
   * confirming the OTP code. It means that verification has not been passed and window was simply
   * closed by force.
   */
  passed: boolean;
}