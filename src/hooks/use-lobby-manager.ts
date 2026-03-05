/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 27/03/2025 23:35
 */

import { useEffect, useRef, useState } from 'react';
import LobbyEventManager from '@/lib/lobby-event-manager';
import { SlotData } from '@/types/slot';
import { useRouter } from 'next/navigation';
import { SessionContextProp } from '@/hocs/with-auth';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';

const useLobbyManager = (sessionContext: SessionContextProp, isLoaded: boolean) => {
  const {data: session} = sessionContext;
  const router = useRouter();
  const lobbyRef = useRef<HTMLCanvasElement>(null);
  const slotRef = useRef<HTMLCanvasElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [slot, setSlotState] = useState<SlotData | null>(null);
  const [pointerEvent, setPointerEvent] = useState<boolean>(false);

  // Wrapper for setSlot to handle routing
  const setSlot = (newSlot: SlotData | null) => {
    setSlotState(newSlot);
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      let btnType = 'back';
      if (window.location.pathname === '/game') {
        btnType = 'forward';  
      }
      console.log(event);
      sendBIEvent(TrackerEvents.SiteButtonClicked, {button: {id: `browser_${btnType}_button`, feature_name: 'lobby'}});
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const manager = new LobbyEventManager(wrapRef, lobbyRef, setSlot, setPointerEvent, router, iframeRef);
    manager.initialize();
    window.__lobbyEventManager = manager;

    return () => {
      manager.destroy();
      window.__lobbyEventManager = undefined;
    };
  }, [router]);

  useEffect(() => {
    (window as any).currentSlotId = slot?.slotId || null;
  }, [slot]);

  useEffect(() => {
    if (session?.accessToken && window.__lobbyEventManager) {
      window.__lobbyEventManager.setAccessToken(session.accessToken);
      window.__lobbyEventManager.setUser(session.user);
    }
  }, [session]);

  useEffect(() => {
    if (isLoaded && window.__lobbyEventManager) {
      window.__lobbyEventManager.initializeMouseEvents();
    }

    return () => {
      if (!isLoaded) return;

      // unload()
      //   .then(() => console.log('Lobby app unloaded.'))
      //   .catch(console.error);
    };
  }, [isLoaded]);


  return { lobbyRef, slotRef, iframeRef, wrapRef, slot, pointerEvent };
};

export default useLobbyManager;
