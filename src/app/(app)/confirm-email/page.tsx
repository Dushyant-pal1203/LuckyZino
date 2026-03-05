'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import withoutAuth from '@/hocs/without-auth';
import GeoTrackingLoader from '@/components/geo-tracking';
import { signIn } from 'next-auth/react';
import { useGeoTracking } from '@/hooks/use-geo-tracking';
import Spinner from '@/components/ui/spinner';
import Image from 'next/image';

const ConfirmEmail = () => {
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(true);
  const token = searchParams.get('token');

  const [processStatus, setProcessStatus] = useState<
    'success' | 'expired' | 'not_valid' | 'no_token' | null
  >(null);
  const hasExecuted = useRef(false); // Ref to track execution

  const { geoTrackingRef, verifyGeoTracking } = useGeoTracking();

  useEffect(() => {
    if (!geoTrackingRef.current) {
      return;
    }

    if (!token) {
      setProcessStatus('no_token');
      return;
    }

    if (hasExecuted.current) return; // Prevent re-execution

    const confirmEmail = async () => {
      const isChecked = await verifyGeoTracking();
      if (!isChecked) {
        setProcessStatus(null);
        return;
      }

      const result: any = await signIn('credentials', {
        emailConfirmation: token,
        redirect: false
      });

      console.log(result, 'insult');

      setLoading(false);

      if (result?.reason === 'expiredToken') {
        setProcessStatus('expired');
        return;
      }

      if (
        result?.reason ||
        ['AccessDenied', 'CredentialsSignin'].includes(result?.error)
      ) {
        setProcessStatus('not_valid');
        return;
      }

      if (!result?.error) {
        setProcessStatus('success');
        setTimeout(() => redirect('/game'), 2000);
        return;
      }
      setProcessStatus(null);
    };

    confirmEmail();
    hasExecuted.current = true; // Mark as executed
  }, [token, verifyGeoTracking, geoTrackingRef]);

  const isBadToken =
    processStatus === 'expired' || processStatus === 'not_valid';

  return (
    <div className="flex flex-col items-center justify-center no-scrollbar max-w-90 px-1 min-h-[100vh]">
      <Image
        className="-ml-2"
        alt="mail-icon"
        width={128}
        height={128}
        src="/images/icons/icon-mail.png"
      ></Image>

      {isLoading && (
        <div className="w-full my-4">
          <Spinner size={40} />
        </div>
      )}
      <div className="text-white w-96 text-center flex flex-col items-center justify-between gap-2">
        {processStatus === 'success' && (
          <>
            <Image
              alt="mark-check"
              width={96}
              height={96}
              src="/icons/mark-check.png"
            ></Image>
            <p
              className="font-extrabold text-white text-xs text-center uppercase text-md font-['Exo_2']"
              style={{
                textShadow: `0px -0.559px 12.754px rgba(28, 244, 24, 0.73), 0px 0.559px 6.992px #65f418ff`,
                lineHeight: '88%',
                letterSpacing: '1.12px'
              }}
            >
              Your email has been confirmed!
            </p>
          </>
        )}

        {isBadToken && (
          <>
            <Image
              alt="mail-icon"
              width={92}
              height={92}
              src="/images/icons/ix_error.png"
            ></Image>
            <p
              className="font-extrabold text-white text-xs text-center uppercase text-md font-['Exo_2']"
              style={{
                textShadow: `0px -0.559px 12.754px rgba(244, 68, 24, 0.73), 0px 0.559px 6.992px #f41818ff`,
                lineHeight: '110%',
                letterSpacing: '1.12px'
              }}
            >
              An error occurred while confirming your email.
            </p>
            <p
              className="font-extrabold text-white text-xs text-center uppercase text-md font-['Exo_2']"
              style={{
                textShadow: `0px -0.559px 12.754px rgba(244, 68, 24, 0.73), 0px 0.559px 6.992px #f41818ff`,
                lineHeight: '110%',
                letterSpacing: '1.12px'
              }}
            >
              Please try again later or sign in again to resend the confirmation
              email.
            </p>
          </>
        )}

        {processStatus === 'no_token' && (
          <>
            <Image
              alt="mail-icon"
              width={92}
              height={92}
              src="/images/icons/ix_error.png"
            ></Image>
            <p
              className="font-extrabold text-white text-xs text-center uppercase text-md font-['Exo_2']"
              style={{
                textShadow: `0px -0.559px 12.754px rgba(244, 68, 24, 0.73), 0px 0.559px 6.992px #f41818ff`,
                lineHeight: '110%',
                letterSpacing: '1.12px'
              }}
            >
              No token found. Please check your email for the confirmation link.
            </p>
          </>
        )}

        <GeoTrackingLoader ref={geoTrackingRef} />
      </div>
    </div>
  );
};

export default withoutAuth(ConfirmEmail);
