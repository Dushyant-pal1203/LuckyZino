import { useEffect } from 'react';

/**
 * useMessageHandler
 *
 * Universal hook to handle `window.postMessage` events with built-in JSON parsing and cleanup.
 *
 * @param handler Callback invoked with the parsed message object and original event
 */
export function useMessageHandler(
  handler: (data: Record<string, any>, event: MessageEvent) => void
) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      let data = event.data;

      // Try parse if it's a string
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      if (typeof data !== 'object' || data == null) return;

      handler(data, event);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handler]);
}
