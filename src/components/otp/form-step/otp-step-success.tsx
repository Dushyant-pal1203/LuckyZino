import { FormContainer } from '@/components/ui/auth/form-container';

/**
 * OtpStepSuccess component
 *
 * Step 3 of the OTP flow
 * Displays a success message after the OTP verification is complete.
 * This is the final step in the OTP flow (step 3).
 */
export default function OtpStepSuccess() {
  return (
    <FormContainer
      className="max-w-[433px]"
    >
      <div className="flex flex-col items-center justify-center gap-2 relative">
        <img src="/icons/mark-check.png" />
        <p
          className="text-white font-extrabold text-center uppercase text-md p-2 mt-2 mb-2"
          style={{
            textShadow: `0px -0.559px 12.754px rgba(24, 244, 134, 0.88), 0px 0.559px 6.992px rgba(24, 244, 141, 0.76)`,
            lineHeight: '88%',
            letterSpacing: '1.12px'
          }}
        >
          Phone verified successfully!
        </p>
      </div>
    </FormContainer>
  );
}
