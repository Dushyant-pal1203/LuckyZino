'use client';

import withAuth from '@/hocs/with-auth';
import GameContent from '@/app/(app)/game/[[...feature]]/game-content';
import withBuildId from '@/hocs/with-build-id';
import { useEffect, useState } from 'react';
import {
  getTrackerParamsObject,
  sendBIEvent
} from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import { getGameServerUrl, isIOSUserAgent } from '@/lib/utils';
import { usePageExit } from '@/hooks/use-page-hide';
import useTabListener from '@/hooks/useTabListener';
import useTokenRefresher from '@/hooks/use-token-refresher';

const GameClient = ({ sessionContext, webglBuildId }: any) => {
  const [trackingObj, setTrackingObj] = useState<any>();
  useTabListener();
  useTokenRefresher(sessionContext);
  usePageExit(
    (reason) => {
      if (isIOSUserAgent() && trackingObj) {
        const { payload, accessToken } = trackingObj;
        if (payload && payload.user) {
          payload.user.id = sessionContext.data.user.id;
        }
        payload.reason = reason;
        fetch(getGameServerUrl(`/e/${TrackerEvents.PageLeave}`), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` })
          },
          body: JSON.stringify(payload),

          // CRITICAL: This makes it behave like sendBeacon
          keepalive: true
        });
        return;
      }
      sendBIEvent(TrackerEvents.PageLeave, { reason });
    },
    [trackingObj, sessionContext]
  );

  useEffect(() => {
    const runRequests = async () => {
      const trackingObj = await getTrackerParamsObject();
      setTrackingObj(trackingObj);
    };
    runRequests();
    if(window) {
      window.history.replaceState(
        { id: 'init' },
        'lobby',
        `${window.location.origin}/game${window.location.search}`
      );
    }
  }, []);

  return (
    <GameContent
      sessionContext={sessionContext}
      webglBuildId={webglBuildId}
    />
  );
};

export default withAuth(withBuildId(GameClient));
