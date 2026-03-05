import { FieldValues, FormProvider } from 'react-hook-form';
import { FormContainer } from '@/components/ui/auth/form-container';
import Spinner from '@/components/ui/spinner';
import { StepFormProps } from '@/types/otp';

/**
 * OtpFormStep component
 *
 * Generic wrapper for a single OTP step form.
 * It integrates with react-hook-form and ensures:
 * - Form context is provided to all child form fields
 * - Submit handling is delegated to `methods.handleSubmit`
 * - Children (form controls) are wrapped inside `FormContainer`
 * - Loading spinner is displayed when `onSubmitLoading` is true
 *
 * @template T - Type of form fields defined by react-hook-form
 */
export default function OtpFormStep<T extends FieldValues>({
                                                             methods,
                                                             onSubmit,
                                                             onSubmitLoading,
                                                             children
                                                           }: StepFormProps<T>) {
  return (
    <div className="flex flex-col justify-between gap-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormContainer>
            <div className="z-10 relative">
              {children}
            </div>
          </FormContainer>
        </form>
      </FormProvider>
      {onSubmitLoading && <Spinner size={120}/>}
    </div>
  );
}
