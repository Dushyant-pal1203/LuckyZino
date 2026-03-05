'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  resetPasswordSchema,
  ResetPasswordSchema
} from '@/schemas/reset-password';
import { request } from '@/services/request-handler';
import Spinner from '@/components/ui/spinner';
import { AuthForm } from '@/components/ui/auth-form';
import { FormField } from '@/components/ui/form-field';
import { FormContainer } from '@/components/ui/auth/form-container';
import { Maskot } from '@/components/ui/auth/maskot';
import { AuthButton } from '@/components/ui/auth/auth-button';
import { RedirectGroup } from '@/components/ui/auth/redirect-group';

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null); // State for server errors
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Get the token from the URL

  const methods = useForm<ResetPasswordSchema>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  useEffect(() => {
    if (!token) {
      setServerError('TOKEN_MISSING');
    }
  }, [token]);

  const handleSubmit: SubmitHandler<ResetPasswordSchema> = async (data) => {
    setServerError(null);

    if (!token) {
      setServerError('Invalid or missing token.');
      return;
    }

    setIsLoading(true);

    try {
      await request('api/reset-password', { ...data, token }, 'POST');
      setIsSuccess(true);
    } catch (error) {
      console.log('Reset password failed', error);
      setServerError('Error resetting password. Please try again.');
    } finally {
      methods.reset();
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isSuccess || serverError === 'TOKEN_MISSING') {
    return (
      <div className="flex items-center justify-center font-['Exo_2']">
        <div className="p-8 w-96 text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Password Reset</h1>
          {isSuccess && (
            <p className="mt-4">You can now log in with your new password.</p>
          )}
          {serverError && (
            <p className="mt-4">
              Please use the link sent to your email to reset your password.
            </p>
          )}
          <RedirectGroup
            href="/sign-in"
            title="Login"
						feature='reset_password'
            text=""
          ></RedirectGroup>
        </div>
      </div>
    );
  }

  return (
    <AuthForm
      title=""
      methods={methods}
      onSubmit={handleSubmit}
      action="reset_password"
    >
      {serverError && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {serverError}
        </div>
      )}
      <Maskot></Maskot>
      <FormContainer className="!pb-0">
        <FormField
          name="password"
          label=""
          type="password"
          placeholder="Enter your new password"
        />

        <FormField
          name="confirmPassword"
          label=""
          type="password"
          placeholder="Confirm your new password"
        />

        <AuthButton
          type="submit"
          disabled={!methods.formState.isValid}
          className="mb-4 mt-2"
					name='submit'
					featureName='reset_password'
        >
          Reset Password
        </AuthButton>
      </FormContainer>
    </AuthForm>
  );
};

export default ResetPassword;
