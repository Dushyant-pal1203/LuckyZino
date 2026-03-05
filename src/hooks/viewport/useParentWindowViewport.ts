import { useEffect, useState } from 'react';
import { ViewportInfo } from '@/types/common';

/**
 * Listens to viewport info from parent and requests it on mount.
 * Must be used inside the iframe window.
 *
 * @returns ViewportInfo or null if not yet received
 */
export function useViewportFromParent(): ViewportInfo | null {
  const [viewport, setViewport] = useState<ViewportInfo | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      let data = event.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      if (data?.name === 'common.viewport_info') {
        setViewport(data.data as ViewportInfo);
      }
    };

    window.addEventListener('message', handleMessage);

    window.parent.postMessage({ name: 'common.request_viewport_info' }, '*');

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return viewport;
}