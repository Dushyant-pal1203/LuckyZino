import React from 'react';
import { useViewportFromParent } from '@/hooks/viewport/useParentWindowViewport';
import { OtpHeaderProps } from '@/types/otp';

/**
 * OtpHeader component
 *
 * Displays the top header bar for the OTP modal.
 * - Shows a back button (if `showBackButton` is true).
 * - Centers the title "Phone verification".
 * - Adapts font size based on viewport width (mobile vs desktop).
 */
export default function OtpHeader({onStepBack, showBackButton} : OtpHeaderProps) {
  // Get viewport dimensions from parent window (used for responsive adjustments)
  const viewport = useViewportFromParent();
  const isMobile = viewport?.width !== undefined ? viewport.width < 500 : false;

  const headerTextSize = isMobile ? 'text-lg' : 'text-2xl';
  return (
    <header
      className={`z-40 relative p-[16px] h-[60px] flex items-center justify-between lz-primary-gradient`}
    >
      {showBackButton && (
        <button
          className="cursor-pointer"
          onClick={onStepBack}
        >
          <img alt="back" src="/icons/back-icon.png" />
        </button>
      )}

      <h2 className={`absolute left-1/2 -translate-x-1/2 font-bold ${headerTextSize} uppercase`}>
        Phone verification
      </h2>
    </header>
  );
}
