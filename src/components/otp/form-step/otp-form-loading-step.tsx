import { FormContainer } from '@/components/ui/auth/form-container';
import Spinner from '@/components/ui/spinner';
import { ReactNode } from 'react';

/**
 * OtpFormStep component
 *
 * Generic wrapper for a single OTP step form.
 */
export default function OtpFormLoadingStep({isLoading, children}: {isLoading: boolean, children: ReactNode}) {
  if(!isLoading) {
    return <>{children}</>
  }
  return (
    <div className="flex flex-col justify-between gap-5">
      <FormContainer className="w-[320px]">
        <Spinner />
      </FormContainer>
    </div>
  );
}
