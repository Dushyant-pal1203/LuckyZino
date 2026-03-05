/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 27/03/2025 23:31
 */
import { useEffect, useState } from 'react';
import { decodeJwt } from 'jose';
import { getSession } from 'next-auth/react';
import { SessionContextProp } from '@/hocs/with-auth';
import { isProdEnv } from '@/lib/utils';

const useTokenRefresher = (sessionContext: SessionContextProp) => {
  const { data: session } = sessionContext;
  const [activeToken, setActiveToken] = useState<string | null>(null);

  // Buffer: refresh 60 seconds before expiration
  const REFRESH_BUFFER_MS = 60 * 1000;

  // Sync state with prop if prop changes (e.g. from parent update)
  useEffect(() => {
    if (session?.accessToken && session.accessToken !== activeToken) {
      setActiveToken(session.accessToken);
    }
  }, [session?.accessToken]);

  // Notify lobby whenever activeToken changes
  useEffect(() => {
    if (activeToken) {
      if (!isProdEnv()) {
        console.log('[TokenRefresher] Notifying lobby of active token.');
      }
      const lobbyEventManager = window.__lobbyEventManager;
      lobbyEventManager?.setAccessToken(activeToken)?.sendAccessToken?.();
    }
  }, [activeToken]);

  useEffect(() => {
    if (!activeToken) return;

    const exp = decodeJwt(activeToken)?.exp || 0;
    if (!exp) return;

    const timeLeft = exp * 1000 - Date.now();
    const timeToRestart = timeLeft - REFRESH_BUFFER_MS;

    if (!isProdEnv()) {
      console.log(`Session token expires in ${timeLeft / 1000}s`);
    }

    const checkAndRefreshToken = async () => {
      if (!isProdEnv()) {
        console.log('[TokenRefresher] Attempting to refresh token...');
      }
      const newSession = await getSession();
      if (newSession?.accessToken && newSession.accessToken !== activeToken) {
        if (!isProdEnv()) {
          console.log('[TokenRefresher] New token received, updating state.');
        }
        // Updating local state will trigger both the notification effect and the next refresh cycle
        setActiveToken(newSession.accessToken);
      } else if (!isProdEnv()) {
        console.log('[TokenRefresher] Token same as active or update failed.');
      }
    };

    const timeoutId = setTimeout(checkAndRefreshToken, Math.max(0, timeToRestart));
    if (!isProdEnv()) {
      console.log(`[TokenRefresher] Next refresh scheduled in ${Math.max(0, timeToRestart) / 1000}s`);
    }

    return () => clearTimeout(timeoutId);
  }, [activeToken]);
};

export default useTokenRefresher;
