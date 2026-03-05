import { FormOtpField } from '@/components/ui/form-otp-field';
import { AuthButton } from '@/components/ui/auth/auth-button';
import OtpFormStep from '@/components/otp/form-step/otp-form-step';
import ResendTimerButton from '@/components/otp/resend-timer-button/resend-timer-button';
import { useViewportFromParent } from '@/hooks/viewport/useParentWindowViewport';
import { OtpStepCodeProps } from '@/types/otp';

/**
 * OtpStepCode component
 *
 * Step 2 of the OTP flow
 * Handles OTP code input step:
 * - Displays a message with the phone number where OTP was sent
 * - Renders OTP input field adapted for desktop or mobile view
 * - Provides a submit button to verify OTP
 * - Integrates with react-hook-form via OtpFormStep
 * - Adds a resend timer button below the form
 *
 * @param methods - React Hook Form methods for OTP schema
 * @param onSubmit - Submit handler for OTP form
 * @param phoneNumber - Phone number to which the OTP was sent
 * @param remainingTime - Remaining time until resend is allowed
 * @param onResend - Callback for requesting a new OTP
 * @param onSubmitLoading - Flag indicating if the form is currently submitting
 */
export default function OtpStepCode({
                                      methods,
                                      onSubmit,
                                      phoneNumber,
                                      remainingTime,
                                      onResend,
                                      onSubmitLoading
                                    }: OtpStepCodeProps) {
  const viewport = useViewportFromParent();
  const isMobile = viewport?.width !== undefined ? viewport.width < 520 : false;

  return (
    <div className="flex flex-col justify-between h-full">
      <OtpFormStep
        methods={methods}
        onSubmit={onSubmit}
        onSubmitLoading={onSubmitLoading}
      >
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-white text-center text-xl">
            Enter verification code sent to <br />{phoneNumber}
          </h2>
          <FormOtpField
            isMobile={isMobile}
            name="otp"
          />
					<div className="flex justify-center w-full">
						<AuthButton
							type="submit"
							name='send_code'
							featureName='otp.code'
							disabled={onSubmitLoading || !methods.formState.isValid}
						>
							Send code
						</AuthButton>
					</div>
        </div>
      </OtpFormStep>

      <ResendTimerButton remainingTime={remainingTime} onResend={onResend} />
    </div>
  );
}