'use client';

import Spinner from '@/components/ui/spinner';
import { TrackerEvents } from '@/enum/trackers';
import useTimer from '@/hooks/use-timer';
import { sendBIEvent } from '@/lib/trackers';
import { request } from '@/services/request-handler';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3';

const WrappedEmailConfirm = ({ email, resendToken }: { email: string, resendToken: string }) => {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isLoading, setIsLoading] = useState(false);
  const { remainingTime, isTimerLoading, startTimer } = useTimer({
    localStorageKey: 'resendMailTimer',
    cooldownTime: 60
  });

  useEffect(() => {
    startTimer();
  }, []);

  const resendEmail = useCallback(async () => {
    try {
      if (!executeRecaptcha) return;
      setIsLoading(true);
      const recaptcha = await executeRecaptcha('resend_confirmation_email');
      const answer = await request<any>(
        'api/resend-email',
        {
          token: resendToken,
          recaptcha
        },
        'POST'
      );

      if (answer?.reason) {
        router.push(`/blocked?reason=${encodeURIComponent(answer.reason)}`);
      }
      setIsLoading(false);
      startTimer();
    } catch (error) {
      console.log('Registration failed:', error);
      await sendBIEvent(TrackerEvents.RegistrationFormError, {
        error: {
          is_silent: false,
          message: (error as any)?.error ?? 'unknown',
          code: (error as any)?.reason
        }
      });
    } finally {
      setIsLoading(false);
    }
  }, [executeRecaptcha]);

  return (
    <div className="flex flex-col items-center justify-center max-w-90 px-1 min-h-[80vh]">
      <img src="/images/icons/icon-mail.png"></img>
      <h1
        className="font-extrabold text-white text-6xl text-center uppercase text-md font-['Exo_2']"
        style={{
          textShadow: `0px -0.559px 12.754px rgba(244, 153, 24, 0.73), 0px 0.559px 6.992px #F49918`,
          lineHeight: '88%',
          letterSpacing: '1.12px'
        }}
      >
        Thanks!
      </h1>
      <p
        className="font-extrabold text-white text-xs text-center uppercase text-md font-['Exo_2']"
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
        {email}
      </p>
      <p className="mt-2 font-extrabold text-white text-xs text-center uppercase text-md font-['Exo_2']">
        Please click the link in the email to activate your account
      </p>
      <p className="mt-2 font-extrabold text-white text-xs text-center uppercase text-md font-['Exo_2']">
        If the email hasn’t arrived, please also look in your Spam or Promotions
        folder.
      </p>
      <div className="my-6 mt-12 w-full flex justify-center min-h-[40px]">
        {remainingTime > 0 && (
          <p
            className="font-extrabold text-white text-md text-center uppercase text-md font-['Exo_2']"
            style={{
              textShadow: `0px -0.559px 12.754px rgba(244, 153, 24, 0.73), 0px 0.559px 6.992px #F49918`,
              lineHeight: '88%',
              letterSpacing: '1.12px'
            }}
          >
            Resend in {remainingTime}
            <span className="lowercase">s</span>...
          </p>
        )}
        {remainingTime === 0 && !isLoading && !isTimerLoading && (
          <p
            className="font-extrabold text-white text-md text-center underline cursor-pointer uppercase text-md font-['Exo_2']"
            style={{
              textShadow: `0px -0.559px 12.754px rgba(244, 153, 24, 0.73), 0px 0.559px 6.992px #F49918`,
              lineHeight: '88%',
              letterSpacing: '1.12px'
            }}
            onClick={() => resendEmail()}
          >
            Resend verification email
          </p>
        )}
        {isLoading && <Spinner size={40} />}
      </div>
    </div>
  );
};

const EmailConfirm = ({ email, resendToken }: { email: string, resendToken: string }) => (
  <GoogleReCaptchaProvider
    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
  >
    <WrappedEmailConfirm email={email} resendToken={resendToken} />
  </GoogleReCaptchaProvider>
);
export default EmailConfirm;
