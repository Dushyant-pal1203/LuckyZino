'use client';

import { ReactNode, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import HelpShiftProvider from '@/provider/helpshift-provider';
import ToastProvider from '@/provider/toast-provider';
import SessionGuardProvider from '@/provider/session-guard-provider';
import { KYC_Modal } from '@/components/ui/kyc-modal';
import NuveiModal from '@/components/nuvei/nuvei-modal';
import { WithdrawalModal } from '@/components/ui/withdrawal-modal';
import AMOEModal from '@/components/amoe/amoe-modal';
import { sendBIEvent } from '@/lib/trackers';
import { VipChat } from '@/components/vip-chat/vip-chat';
import Otp from '@/components/otp/otp';
import { TrackerEvents } from '@/enum/trackers';
import PendingRedeemPopup from '@/components/popups/redeem/PendingRedeemPopup';
import FingerprintProvider from './fingerprint-provider';
import TrackingProvider from './tracking-provider';

const ProvidersWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  useEffect(() => {
    sendBIEvent(TrackerEvents.PageView);
  }, [pathname]);
  return (
    <ToastProvider>
      <FingerprintProvider>
        <TrackingProvider>
          <SessionProvider>
            <HelpShiftProvider>
              <SessionGuardProvider>
                {children}
                <NuveiModal />
                <KYC_Modal />
                <WithdrawalModal />
                <AMOEModal />
                <VipChat />
                <Otp />
                <PendingRedeemPopup />
              </SessionGuardProvider>
            </HelpShiftProvider>
          </SessionProvider>
        </TrackingProvider>
      </FingerprintProvider>
    </ToastProvider>
  );
};

export default ProvidersWrapper;
