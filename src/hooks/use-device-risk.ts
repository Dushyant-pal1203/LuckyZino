'use client';

import { useEffect, useState } from 'react';

interface UseDeviceRiskOptions {
  customerSessionId: string;
}

export const useDeviceRisk = ({ customerSessionId }: UseDeviceRiskOptions) => {
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  useEffect(() => {
    let sdk: any;

    const getOrInitSessionToken = async () => {
      if (!customerSessionId || typeof window === 'undefined') return;

      const sdkKey = process.env.NEXT_PUBLIC_SOCURE_SDK_KEY;
      if (!sdkKey) {
        console.warn('[Socure] SDK key not found');
        return;
      }

      try {
        sdk = await import('@socure-inc/device-risk-sdk')
          .then((mod) => mod.default || mod);

        if (!sdk || typeof sdk.getSessionToken !== 'function') {
          console.warn('[Socure] SDK not ready');
          return;
        }

        const token = await sdk.getSessionToken().catch(() => null);
        if (token) {
          setSessionToken(token);
          console.log('[Socure] Reused active session token:', token);
          return;
        }

        sdk.destroy?.();

        const res = await sdk.initialize({
          sdkKey,
        });
        window.sessionStorage.setItem('SOCURE_SESSION_ID', customerSessionId);
        console.log('[Socure] SDK initialized for session:', customerSessionId, res, sdkKey);

        // await sdk.setCustomerSessionId(customerSessionId);

        const newToken = await sdk.getSessionToken();
        setSessionToken(newToken);
        console.log('[Socure] Fresh session token:', newToken);

      } catch (err) {
        console.error('[Socure] Failed to load or initialize SDK:', err);
      }
    };

    getOrInitSessionToken();

    return () => {
      sdk?.pauseDataCollection?.();
      console.log('[Socure] SDK paused for session:', customerSessionId);
    };
  }, [customerSessionId]);

  return sessionToken;
};
