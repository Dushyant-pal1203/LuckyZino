'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { AuthForm } from '@/components/ui/auth-form';
import { FormField } from '@/components/ui/form-field';
import { signInSchema, SignInSchema } from '@/schemas/sign-in';
import withoutAuth from '@/hocs/without-auth';
import { useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import AuthProviders from '@/components/ui/auth-providers';
import { FormContainer } from '@/components/ui/auth/form-container';
import { Maskot } from '@/components/ui/auth/maskot';
import { AuthButton } from '@/components/ui/auth/auth-button';
import { RedirectGroup } from '@/components/ui/auth/redirect-group';
import GeoTrackingLoader from '@/components/geo-tracking';
import { useGeoTracking } from '@/hooks/use-geo-tracking';
import { isRegistrationEnabled } from '@/lib/utils';
import WrappedLink from '@/components/ui/wrapped-link';

const SignInClient = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/game';

  const { geoTrackingRef, verifyGeoTracking } = useGeoTracking();

  const [isLoading, setIsLoading] = useState(false);
  const [confirmationEmailSent, setConfirmationEmailSent] = useState(false);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [badCredentials, setBadCredentials] = useState(false);

  const methods = useForm<SignInSchema>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleCredentials: SubmitHandler<SignInSchema> = async (data) => {
    setIsLoading(true);
    const isChecked = await verifyGeoTracking();
    if (!isChecked) {
      setIsLoading(false);
      return;
    }
    const result: any = await signIn('credentials', {
      ...data,
      redirect: false
    });

    if (result?.error === 'AccessDenied') {
      setUnconfirmedEmail(data.email);
      setConfirmationEmailSent(true);
    } else if (result?.error === 'CredentialsSignin') {
      setBadCredentials(true);
    } else if (result?.reason) {
      redirect(`/blocked?reason=${encodeURIComponent(result.reason)}`);
    } else if (!result?.error) {
      redirect(callbackUrl);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-transparent font-['Exo_2'] min-h-[auto] md:min-h-screen [@media(max-height:700px)]:!min-h-[auto] mb-6">
      <AuthForm
        title=""
        methods={methods}
        onSubmit={handleCredentials}
        action="sign_in"
      >
        {confirmationEmailSent && unconfirmedEmail ? (
          <div className="flex flex-col items-center justify-center max-w-90 px-1 min-h-[80vh]">
            <img src="/images/icons/icon-mail.png"></img>
            <p
              className="font-extrabold text-white text-md text-center uppercase text-md font-['Exo_2']"
              style={{
                textShadow: `0px -0.559px 12.754px rgba(244, 153, 24, 0.73), 0px 0.559px 6.992px #F49918`,
                lineHeight: '88%',
                letterSpacing: '1.12px'
              }}
            >
              Please check your e-mail
            </p>
            <p className="mt-8 font-extrabold text-white text-xs text-center uppercase text-md font-['Exo_2']">
              A confirmation email has been sent to:
            </p>
            <p
              className="mt-2 font-extrabold text-white text-xs text-center uppercase text-md font-['Exo_2']"
              style={{
                textShadow: `0px -0.559px 12.754px rgba(244, 153, 24, 0.73), 0px 0.559px 6.992px #F49918`,
                lineHeight: '88%',
                letterSpacing: '1.12px'
              }}
            >
              {unconfirmedEmail}
            </p>
            <p className="mt-2 font-extrabold text-white text-xs text-center uppercase text-md font-['Exo_2']">
              Please click the link in the email to activate your account
            </p>
          </div>
        ) : (
          <>
						<Maskot></Maskot>
            <FormContainer className='!pb-0'>
              <FormField
                name="email"
                label=""
                type="email"
                placeholder="Enter your email"
              />
              <FormField
                name="password"
                label=""
                type="password"
                placeholder="Enter your password"
              />

              {/* Wrong Credentials Message */}
              {badCredentials && (
                <div className="relative mb-2 py-3 px-2 text-center text-sm text-red-600 bg-red-100 border border-red-300 rounded-[14px]">
                  Incorrect email or password. Please try again.
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-2 w-full flex justify-center">
                <AuthButton
                  type="submit"
									name='login'
									featureName='login'
                  disabled={isLoading || !methods.formState.isValid}
                >
                  {isLoading ? 'Signing In...' : 'Log In'}
                </AuthButton>
              </div>

              {/* Forgot Password Link */}
              <div className="mt-2 mb-3 text-center">
                <WrappedLink
                  href="/forgot-password"
									name='forgot_password'
                  className="text-sm text-white underline hover:underline relative"
                >
                  Forgot Password?
                </WrappedLink>
              </div>
              {isRegistrationEnabled() && (
                <div className="relative z-[20]">
                  <AuthProviders
                    verifyGeoTracking={verifyGeoTracking}
                    disabled={isLoading}
                    setDisabled={setIsLoading}
                  />
                  <RedirectGroup
                    href="/sign-up"
                    title="Register"
                    text="Don't have an account?"
                  />
                </div>
              )}
            </FormContainer>
          </>
        )}

        <GeoTrackingLoader ref={geoTrackingRef} />
      </AuthForm>
    </div>
  );
};

export default withoutAuth(SignInClient);
