'use client';

import styles from '@/app/(app)/game/[[...feature]]/gamePage.module.css';
import { clsx } from 'clsx';
import { Unity } from 'react-unity-webgl';
import UnitySlot from '@/components/unity-slot';
import IFrameSlot from '@/components/iframe-slot';
import useUnityLoader, { UnityInstanceType } from '@/hooks/use-unity-loader';
import useLobbyManager from '@/hooks/use-lobby-manager';
import { WithAuthBuildProps } from '@/types/common';
import HelpshiftStyles from '@/components/ui/helpshift-styles';
import withUnityConfig from '@/hocs/with-unity-config';
import LZLoader from '@/components/ui/lz-loader/lz-loader';
import { useEffect } from 'react';

const GameContent = ({
  sessionContext,
  webglBuildId,
  unityConfig,
}: WithAuthBuildProps) => {
  const deepLinkToken = localStorage.getItem('deepLinkToken');
  const { unityProvider, loadingProgression, isLoaded, unload } =
    useUnityLoader(
      webglBuildId,
      {
        instanceType: UnityInstanceType.LOBBY_INSTANCE,
        token: sessionContext?.data?.accessToken,
        userId: sessionContext?.data?.user?.id,
        deepLinkToken: deepLinkToken
      },
      unityConfig,
    );

  const { lobbyRef, slotRef, iframeRef, wrapRef, slot, pointerEvent } =
    useLobbyManager(sessionContext, isLoaded);

  useEffect(() => {
    if (isLoaded) {
      localStorage.removeItem('deepLinkToken');
    }
    return () => {
      if (!isLoaded) return;
      unload()
        .then(() => console.log('Lobby Unity app unloaded.'))
        .catch(console.error);
    };
  }, [unload, isLoaded]);

  return (
    <div
      ref={wrapRef}
      className={clsx(
        styles.fullWidth,
        'inset-0 flex justify-center items-center h-full'
      )}
    >
      {!isLoaded && (
        <LZLoader loadingProgression={loadingProgression}></LZLoader>
      )}
      <slot name="lobby">
        <Unity
          ref={lobbyRef}
          unityProvider={unityProvider}
          devicePixelRatio={window.devicePixelRatio}
          className={`absolute inset-0 w-full h-full z-10 ${
            pointerEvent ? 'pointer-events-none' : 'pointer-events-all'
          }`}
          style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
        />
      </slot>

      {slot?.loadType === 'unity_canvas' && (
        <UnitySlot
          ref={slotRef}
          url={slot.url}
          slot={slot}
          token={slot.accessToken}
          userId={sessionContext.data.user.id}
        />
      )}

      {slot?.loadType === 'iframe' && (
        <IFrameSlot
          ref={iframeRef}
          slot={slot}
          lobbyCanvas={lobbyRef.current}
        />
      )}

      {isLoaded && <HelpshiftStyles />}
    </div>
  );
};

export default withUnityConfig(GameContent);
