'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { AuthForm } from '@/components/ui/auth-form';
import { FormField } from '@/components/ui/form-field';
import {
  forgotPasswordSchema,
  ForgotPasswordSchema
} from '@/schemas/forgot-password';
import { request } from '@/services/request-handler';
import Spinner from '@/components/ui/spinner';
import useTimer from '@/hooks/use-timer';
import { FormContainer } from '@/components/ui/auth/form-container';
import { Maskot } from '@/components/ui/auth/maskot';
import { AuthButton } from '@/components/ui/auth/auth-button';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
	const router = useRouter();

  useEffect(() => {
    window.postMessage(
      {
        name: 'user.open_forgot_password',
        data: null
      },
      window.origin
    );
  }, []);

  const { remainingTime, isTimerLoading, startTimer } = useTimer({
    localStorageKey: 'forgotPasswordCooldown',
    cooldownTime: 60
  });

  const methods = useForm<ForgotPasswordSchema>({
    mode: 'all',
		reValidateMode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const handleSubmit: SubmitHandler<ForgotPasswordSchema> = async (data: {
    email: string;
  }) => {
    if (remainingTime > 0) return;

    setIsLoading(true);
    try {
      await request('api/forgot-password', data, 'POST');
      setUserEmail(data.email);
      methods.reset();
      startTimer(); // Start the cooldown timer
      setIsSubmitted(true);
			signOut({redirect: false});
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || isTimerLoading) {
    return <div className='w-full h-full flex flex-col items-center justify-center'><Spinner /></div>;
  }

  return (
    <AuthForm
      title=""
      methods={methods}
      onSubmit={handleSubmit}
      action="forgot_password"
    >
      <Maskot></Maskot>
      <FormContainer>
        <FormField
          name="email"
          label=""
          type="email"
          placeholder="Enter your email"
        />
        <AuthButton
          type="submit"
					name='submit'
					featureName='forgot_password'
          disabled={remainingTime > 0 || isLoading || !methods.formState.isValid}
          className={`${
            remainingTime > 0 || isLoading || !methods.formState.isValid ? 'cursor-not-allowed' : ''
          }`}
        >
          {remainingTime > 0
            ? `Resend in ${remainingTime}s`
            : 'Send Reset Link'}
        </AuthButton>
        {isSubmitted && (
          <div className="mt-4 text-white text-center relative">
            Reset link has been sent to <b>{userEmail}</b>.
          </div>
        )}
      </FormContainer>
			<div className='flex justify-center w-full'>
				<AuthButton
					type="button"
					variant='secondary'
					className="mb-4 mt-2"
					name='back_to_main'
					featureName='reset_password'
					onClick={() => router.replace('/')}
				>
					Back to Main
				</AuthButton>
			</div>
    </AuthForm>
  );
};

export default ForgotPassword;
