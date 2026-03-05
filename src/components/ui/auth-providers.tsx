'use client';

import {
  sendBIEvent
} from '@/lib/trackers';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

interface ProviderConfig {
  id: string;
  label: string;
  icon: JSX.Element;
}

interface AuthProvidersProps {
  verifyGeoTracking?: () => Promise<boolean>;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  onProviderClick?: (callback: () => Promise<void>) => void;
  className?: string;
  isRegistration?: boolean;
}

const AuthProviders = ({
  verifyGeoTracking,
  disabled,
  setDisabled,
  onProviderClick,
  className = '',
  isRegistration
}: AuthProvidersProps) => {
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams?.get('callbackUrl') || '/game';
  const callbackUrl = '/game';

  const [loading, setLoading] = useState<{ [provider: string]: boolean }>({
    google: false,
    facebook: false
  });

  const providers: ProviderConfig[] = [
    {
      id: 'google',
      label: 'Google',
      icon: <FaGoogle className="h-5 w-5 text-red-500" />
    },
    {
      id: 'facebook',
      label: 'Facebook',
      icon: <FaFacebookF className="h-5 w-5 text-blue-600" />
    }
  ];

  const handleProvider = async (providerId: string) => {
    try {
      setDisabled(true);
      setLoading((prev) => ({ ...prev, [providerId]: true }));
			if(verifyGeoTracking) {
				const isChecked = await verifyGeoTracking();
				setDisabled(false);
				if (!isChecked) {
					return;
				}
			}
      await signIn(providerId, {
        redirectTo: callbackUrl
      });
    } catch (e: any) {
      console.log(`Failed to sign in with ${providerId}`, e);
    } finally {
      setLoading((prev) => ({ ...prev, [providerId]: false }));
    }
  };

  return (
    <div className={`flex flex-col gap-2 font-['Exo_2'] mt-0 ${className}`}>
      <div className="text-center text-white uppercase">Or join with:</div>
      <div className="flex flex-row justify-between">
        {providers.map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={async () => {
              await sendBIEvent('site-button-clicked', {
                button: {
                  id,
                  feature_name: isRegistration ? 'signup' : 'login'
                }
              });
              if (onProviderClick) {
                onProviderClick(() => handleProvider(id));
              } else {
                handleProvider(id);
              }
            }}
            disabled={disabled}
            className={`
								flex w-[45%] items-center justify-start gap-2
								border border-gray-300 rounded-md bg-white px-4 py-2 text-black
								transition-colors hover:bg-gray-50
								disabled:cursor-not-allowed disabled:opacity-50
							`}
          >
            {loading[id] ? (
              'Please wait...'
            ) : (
              <>
                {icon}
                <span>{label}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AuthProviders;
