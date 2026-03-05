import { useRef, useState } from 'react';
import { useIframeViewportSync } from '@/hooks/viewport/useIframeViewportSync';
import { OtpInitData } from '@/types/otp';
import { useMessageHandler } from '@/hooks/useMessageHandler';
import { OtpTriggerSource } from '@/types/enums/otp';

/**
 * Otp component
 *
 * Renders an OTP verification modal inside an iframe.
 * - Listens to postMessage events to open/close the modal
 * - Synchronizes iframe viewport with parent using `useIframeViewportSync`
 * - Uses a semi-transparent backdrop and z-index layering to overlay on top of other content
 *
 * Messages handled:
 * - 'common.show_phone_otp': opens the modal
 * - 'otp.close': closes the modal
 */
export default function Otp() {
  const [opened, setOpened] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [initData, setInitData] = useState<OtpInitData | null>(null);
  
  // Synchronize iframe viewport size with parent window
  useIframeViewportSync(iframeRef);

  useMessageHandler((message) => {
    const { name, data } = message;

    switch (name) {
      case 'common.show_phone_otp':
        setInitData(data);
        setOpened(true);
        break;

      case 'otp.close':
        if (initData?.source !== OtpTriggerSource.Redemption) { // todo This is the condition until we receive source OTP from the back-end
          window.postMessage({ name: 'common.load_lobby', data: {} }, '*');
        }
        setOpened(false);
        break;

      case 'otp.init_handshake':
        if (iframeRef.current?.contentWindow) {
          // todo This is the condition until we receive source OTP from the back-end
          const initOtpData = initData ? { ...initData } : { source: OtpTriggerSource.Spin };
          iframeRef.current.contentWindow.postMessage(
            { name: 'otp.init', data: initOtpData },
            '*'
          );
        }
        break;
    }
  });

  if (!opened) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
    >
      <iframe
        ref={iframeRef}
        src="/otp"
        className="
          relative z-[1001]
          w-full h-full
          rounded-none sm:rounded-[12px]
          shadow-lg
        "
      />
    </div>
  );
}
