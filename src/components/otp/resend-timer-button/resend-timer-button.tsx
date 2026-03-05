import { TrackerEvents } from '@/enum/trackers';
import { sendBIEvent } from '@/lib/trackers';

type ResendTimerProps = {
  remainingTime: number;
  onResend: () => void;
};

/**
 * ResendTimerButton component
 *
 * Displays a button that allows the user to resend.
 * - Disabled while `remainingTime` > 0
 * - Shows countdown when disabled
 * - Styled with underline and glowing text shadow
 *
 * Responsibilities:
 * - Dynamically enable/disable the button based on remaining time
 * - Trigger the `onResend` callback when clicked
 */
export default function ResendTimerButton({
  remainingTime,
  onResend
}: ResendTimerProps) {
  const isDisabled = remainingTime > 0;

  return (
    <button
      className={`text-white font-extrabold text-center text-xl underline decoration-solid transition-opacity ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
      }`}
      style={{
        textShadow:
          '0 -0.559px 12.754px rgba(244, 153, 24, 0.73), 0 0.559px 6.992px #F49918',
        lineHeight: '88%',
        letterSpacing: '1.12px'
      }}
      onClick={() =>
        !isDisabled &&
        onResend() &&
        sendBIEvent(TrackerEvents.SiteButtonClicked, {
          button: { id: 'resend_verification_code', feature_name: 'otp.code' }
        })
      }
      disabled={isDisabled}
    >
      {isDisabled ? `RESEND IN ${remainingTime}s` : 'RESEND VERIFICATION CODE'}
    </button>
  );
}
