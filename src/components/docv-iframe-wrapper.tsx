'use client';

import { useEffect, useRef, useState } from 'react';
import Spinner from '@/components/ui/spinner';

interface DocVIframeWrapperProps {
  sdkKey: string;
  docvToken: string;
}

export type PostMessageSocureDocVSDKEvent =
  | 'docv.success'
  | 'docv.error'
  | 'docv.progress'
  | 'docv.iframe_resize';

export const DocvIframeWrapper = ({ sdkKey, docvToken }: DocVIframeWrapperProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(600);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        typeof event.data !== 'object' ||
        !event.data?.type
      )
        return;

      if (event.data.type === 'docv.iframe_resize') {
        const { height } = event.data;
        if (typeof height === 'number') {
          setIframeHeight(Math.min(height + 32, window.innerHeight));
          setTimeout(() => setLoading(false), 1500);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://websdk.socure.com/bundle.js"></script>
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              background: white;
              overflow: hidden;
							overflow-y: auto;
              display: flex;
              justify-content: center;
              align-items: flex-start;
            }

            #websdk {
              width: 100%;
              max-width: 800px;
              min-width: 300px;
              padding: 1rem;
              box-sizing: border-box;
            }

            * {
              max-width: 100%;
              box-sizing: border-box;
            }
          </style>
        </head>
        <body>
          <div id="websdk"></div>
          <script>
            function sendSize() {
              const el = document.getElementById('websdk');
              if (!el) return;

              const rect = el.getBoundingClientRect();
              const height = rect.height;
              parent.postMessage({ type: 'docv.iframe_resize', height }, '*');
            }

            const observer = new ResizeObserver(sendSize);
            observer.observe(document.getElementById('websdk'));

            window.addEventListener('load', sendSize);
            setTimeout(sendSize, 1000);

            let captureWindow = null;
            const closeCaptureWindow = () => {
              if (captureWindow) {
                captureWindow.close();
                captureWindow = null;
              }
            };
            SocureDocVSDK.launch("${sdkKey}", "${docvToken}", "#websdk", {
              qrCodeNeeded: true,
              onProgress: (e) => {
                const { captureAppWindow, ...data } = e;
                if (captureAppWindow) {
                  captureWindow = captureAppWindow;
                }
                parent.postMessage({ type: 'docv.progress', data }, '*');
              },
              onSuccess: (e) => {
                parent.postMessage({ type: 'docv.success', data: e }, '*');
                closeCaptureWindow();
              },
              onError: (e) => {
                parent.postMessage({ type: 'docv.error', data: e }, '*');
                closeCaptureWindow();
              }
            })
            .then((data) => {
              if (data?.result === 'error') {
                parent.postMessage({ type: 'docv.error', data: { status: 'TOKEN_EXPIRED' } },'*');
                closeCaptureWindow();
              }
            });
          </script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(html);
    doc.close();
  }, [sdkKey, docvToken]);

  return (
    <div className="relative w-full max-w-[800px] mx-auto mt-6 rounded-lg md:overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Spinner>
            <p className="mt-4 text-white font-semibold text-lg">
              Loading verification...
            </p>
          </Spinner>
        </div>
      )}
      <iframe
        ref={iframeRef}
        title="Socure DocV"
        className="block w-full rounded-md transition-opacity"
        style={{
          height: iframeHeight,
          border: 'none',
          opacity: loading ? 0 : 1
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
};
