'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthForm } from '@/components/ui/auth-form';
import { FormField } from '@/components/ui/form-field';
import { signUpSchema, SignUpSchema } from '@/schemas/sign-up';
import { request } from '@/services/request-handler';
import withoutAuth from '@/hocs/without-auth';
import { useState } from 'react';
import AuthProviders from '@/components/ui/auth-providers';
import { FormContainer } from '@/components/ui/auth/form-container';
import { AuthButton } from '@/components/ui/auth/auth-button';
import { RedirectGroup } from '@/components/ui/auth/redirect-group';
import { useRouter } from 'next/navigation';
import { capitalizeFirstLetter, isRegistrationEnabled } from '@/lib/utils';
import ConsentCheckboxes from '@/components/ui/auth/ConsentCheckboxes';
import Spinner from '@/components/ui/spinner';
import { useGeoTracking } from '@/hooks/use-geo-tracking';
import GeoTrackingLoader from '@/components/geo-tracking';
import { TrackerEvents } from '@/enum/trackers';
import { parseErrorMessage } from '@/lib/errors';
import { sendBIEvent } from '@/lib/trackers';
import EmailConfirm from './email-confirm';

interface HOCRedirectProps {
  ignoreRedirect?: boolean;
  setParentIsRegistered: (value: boolean) => void;
}

const SignUpClient = (props: HOCRedirectProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [ageChecked, setAgeCheckBox] = useState(false);
  const [ppChecked, setPPCheckBox] = useState(false);
  const [resendToken, setResendToken] = useState<string>('');
  const { geoTrackingRef, verifyGeoTracking } = useGeoTracking();
  const { setParentIsRegistered, ignoreRedirect } = props;
  const isRegistered = ignoreRedirect;

  // Initialize react-hook-form
  const methods = useForm<SignUpSchema>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    }
  });

  const {
    formState: { isValid }
  } = methods;

  // Handle Credentials Registration
  const handleRegister: SubmitHandler<SignUpSchema> = async (data) => {
    try {
      setIsLoading(true);
      const isChecked = await verifyGeoTracking();
      if (!isChecked) {
        setIsLoading(false);
        return;
      }

      const answer = await request<any>(
        'api/sign-up',
        {
          ...data,
        },
        'POST'
      );
      if (answer?.reason) {
        router.push(`/blocked?reason=${encodeURIComponent(answer.reason)}`);
      }
      if(answer?.token) {
        setResendToken(answer.token);
      }
      setParentIsRegistered(true);
    } catch (error) {
      console.log('Registration failed:', error);
      await sendBIEvent(TrackerEvents.RegistrationFormError, {
        error: {
          is_silent: false,
          message: (error as any)?.error ?? 'unknown',
          code: (error as any)?.reason
        }
      });
      const blockedReason =
        (error as any)?.reason !== 'unknown'
          ? (error as any)?.reason
          : parseErrorMessage(String((error as any)?.error));
      await sendBIEvent(TrackerEvents.UserBlocked, { reason: blockedReason });
    } finally {
      setIsLoading(false);
    }
  };

  const toInputCapitalize = (e: any) => {
    (e.target as HTMLInputElement).value =
      '' + capitalizeFirstLetter((e.target as HTMLInputElement).value);
  };

  // Show confirmation message after successful registration
  if (isRegistered) {
    return <EmailConfirm email={methods.getValues().email} resendToken={resendToken} />
  }

  return (
    <AuthForm
      title=""
      methods={methods}
      onSubmit={handleRegister}
      action="sign_up"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <Spinner size={100} />
        </div>
      )}

      {/* Email, Password, and Confirm Password fields */}
      <FormContainer className="!pb-0 p-4 md:p-6 !mb-2 md:!mb-10">
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
          showRequirements={true}
          placeholder="Enter your password"
        />
        <FormField
          name="confirmPassword"
          label=""
          type="password"
          placeholder="Confirm your password"
        />
        <FormField
          name="firstName"
          label=""
          onInput={toInputCapitalize}
          type="text"
          placeholder="Name"
        />
        <FormField
          name="lastName"
          label=""
          onInput={toInputCapitalize}
          type="text"
          placeholder="Surname"
        />
        <ConsentCheckboxes
          setBox1Checked={() => setAgeCheckBox(!ageChecked)}
          setBox2Checked={() => setPPCheckBox(!ppChecked)}
          box1Checked={ageChecked}
          box2Checked={ppChecked}
        />
        {/* Submit Button */}
        <div className="my-6 w-full flex justify-center">
          <AuthButton
            className="font-['Exo_2']"
            type="submit"
            name="create_account"
            featureName="registration"
            disabled={!ageChecked || !ppChecked || isLoading || !isValid}
          >
            Create Account
          </AuthButton>
        </div>
        <div className="relative w-full z-[20]">
          {isRegistrationEnabled() && (
            <AuthProviders
              verifyGeoTracking={verifyGeoTracking}
              disabled={isLoading || !ageChecked || !ppChecked}
              setDisabled={setIsLoading}
              isRegistration
            />
          )}
          <RedirectGroup
            href="/sign-in"
            title="Login"
            text="Already have an account?"
          />
        </div>
      </FormContainer>
      <GeoTrackingLoader ref={geoTrackingRef} />
    </AuthForm>
  );
};

export default withoutAuth(SignUpClient);
