'use client';

import {
  FpjsProvider,
  useVisitorData
} from '@fingerprintjs/fingerprintjs-pro-react';
import { ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { isProdEnv } from '@/lib/utils';
import { datadogRum } from '@datadog/browser-rum';
import { USER_FINGERPRINT_COOKIE } from '@/constants/auth';
import FullScreenLoader from '@/components/ui/fullscreen-loader';

const fpjsPublicApiKey = process.env.NEXT_PUBLIC_FPJS_PUBLIC_API_KEY as string;

const FingerprintCookieSetter = ({ children }: { children: ReactNode }) => {
  const { data, error, isLoading } = useVisitorData();

  useEffect(() => {
    if (data && data.requestId && !isLoading) {
      Cookies.set(USER_FINGERPRINT_COOKIE, data.requestId, {
        path: '/',
        secure: isProdEnv(),
        sameSite: 'lax',
        expires: 7
      });
    }
    if (error) {
      datadogRum.addError(error, { component: 'Fingerprint' });
    }
  }, [data, error, isLoading]);

  if (isLoading && !data?.requestId) {
    return (
      <FullScreenLoader />
    );
  }

  return <>{children}</>;
};

const FingerprintCookieWrapper = ({ children }: { children: ReactNode }) => {
	const hasCookie = Cookies.get(USER_FINGERPRINT_COOKIE);

  return hasCookie ? (
    <>{children}</>
  ) : (
    <FingerprintCookieSetter>{children}</FingerprintCookieSetter>
  );
};

const FingerprintProvider = ({ children }: { children: ReactNode }) => (
  <FpjsProvider
    loadOptions={{
      apiKey: fpjsPublicApiKey,
      endpoint: 'https://metrics.luckyzino.com',
      scriptUrlPattern:
        'https://metrics.luckyzino.com/web/v<version>/<apiKey>/loader_v<loaderVersion>.js'
    }}
  >
    <FingerprintCookieWrapper>{children}</FingerprintCookieWrapper>
  </FpjsProvider>
);

export default FingerprintProvider;
