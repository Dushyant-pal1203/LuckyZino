import { useEffect, RefObject } from 'react';
import { ViewportInfo } from '@/types/common';

/**
 * Sends viewport info to the iframe on resize and on request.
 * Must be used inside the parent window.
 *
 * @param iframeRef - Ref to the target iframe element
 */
export function useIframeViewportSync(iframeRef: RefObject<HTMLIFrameElement>) {
  useEffect(() => {
    const sendViewport = () => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;

      const message = {
        name: 'common.viewport_info',
        data: {
          width: window.innerWidth,
          height: window.innerHeight,
        } satisfies ViewportInfo,
      };

      iframe.contentWindow.postMessage(message, '*');
    };

    const handleMessage = (event: MessageEvent) => {
      let data = event.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      if (data?.name === 'common.request_viewport_info') {
        sendViewport();
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('resize', sendViewport);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('resize', sendViewport);
    };
  }, [iframeRef]);
}