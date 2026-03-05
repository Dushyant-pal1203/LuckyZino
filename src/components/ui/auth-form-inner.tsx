import * as RadixForm from '@radix-ui/react-form';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useCallback } from 'react';

export type AuthFormInnerProps<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  action: string;
  children: React.ReactNode;
};

const AuthFormInner = <T extends FieldValues>({
  methods,
  onSubmit,
  action,
  children,
}: AuthFormInnerProps<T>) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = useCallback(
    async (e: any) => {
      if (!executeRecaptcha) {
        console.warn("ReCaptcha is not enabled");
        return;
      }

      const handleCombinedSubmit = methods.handleSubmit(async (data) => {
        const recaptcha = await executeRecaptcha(action);
        if (!recaptcha) {
          console.error("Recaptcha failed");
          return;
        }
        const mergedData = { ...data, recaptcha };
        await onSubmit(mergedData);
      });

      e.preventDefault();
      await handleCombinedSubmit();
    },
    [methods, onSubmit, executeRecaptcha, action]
  );

  return (
    <RadixForm.Root
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col space-y-4 h-full md:h-auto"
    >
      {children}
    </RadixForm.Root>
  );
};

export default AuthFormInner;
