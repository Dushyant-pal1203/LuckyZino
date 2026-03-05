import { FormPhoneField } from '@/components/ui/form-phone-field';
import { AuthButton } from '@/components/ui/auth/auth-button';
import OtpFormStep from '@/components/otp/form-step/otp-form-step';
import { OtpStepPhoneProps } from '@/types/otp';

/**
 * OtpStepPhone component
 *
 * Step 1 of the OTP flow: user enters their phone number.
 */
export default function OtpStepPhone({ methods, onSubmit, onSubmitLoading }: OtpStepPhoneProps) {
  return (
    <OtpFormStep
      methods={methods}
      onSubmit={onSubmit}
      onSubmitLoading={onSubmitLoading}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-white text-center text-xl">
          To access SweepCoins and redemption features, please verify your phone number
        </h1>
        <FormPhoneField name="phoneNumber" allowedCountries={['us']} disableDropDown/>
        <AuthButton
          type="submit"
					name='send_code'
					featureName='otp.phone'
          disabled={onSubmitLoading || !methods.formState.isValid}
        >
          Send code
        </AuthButton>
      </div>
    </OtpFormStep>
  );
}
