import { useCallback, useEffect, useState } from 'react';
import {
  KycStatus,
  KycTier, KycUserProfile,
  KycUserTierState,
  SocureDocVSDKEvent
} from '@/types/kyc';
import { useDeviceRisk } from '@/hooks/use-device-risk';
import {
  COMPLIANCE_ERROR,
  COMPLIANCE_STATE_ERROR
} from '@/lib/kyc-utils';
import { request } from '@/services/request-handler';
import { KycForm } from '@/components/kyc-form';
import { DocVErrorDialog } from '@/components/docv-error-dialog';
import { useRouter } from 'next/navigation';
import {
  DocvIframeWrapper,
  PostMessageSocureDocVSDKEvent
} from '@/components/docv-iframe-wrapper';
import { complianceSpinner } from '@/hooks/use-kyc-guard';
import Spinner from '@/components/ui/spinner';
import { FormContainer } from './ui/auth/form-container';
import { sendBIEvent } from '@/lib/trackers';
import { createPolling } from '@/lib/poller';
import { TrackerEvents } from '@/enum/trackers';

export interface ComplianceWrapperProps {
  userId: string;
  tier: KycTier;
  status: KycStatus | null;
  restartPolling: (withRedirects: boolean) => void;
  docvTokenParam?: string | null;
  priceAmount?: number | null;
  pollingStatus?: KycStatus | null;
  userKycProfile?: KycUserProfile | null;
}

export const KycApprovedNotice = () => (
  <FormContainer className="max-w-md h-full max-h-[fit-content] mt-8">
    <div className="flex flex-col items-center jusify-center gap-0 relative">
      <img src="/images/icons/user.png" />
      <img src="/icons/mark-check.png" />
    </div>
    <p
      className="text-white font-extrabold text-center uppercase text-md font-['Exo_2'] relative p-2 mt-2 mb-2"
      style={{
        textShadow: `0px -0.559px 12.754px rgba(24, 244, 134, 0.88), 0px 0.559px 6.992px rgba(24, 244, 141, 0.76)`,
        lineHeight: '88%',
        letterSpacing: '1.12px'
      }}
    >
      Verification approved
    </p>

    <Spinner size={40} />
  </FormContainer>
);

export const KycWaitNotice = ({ showWait }: { showWait: string }) => {
  const title = `Verification ${
    showWait === 'IN_REVIEW' ? 'In Review' : 'In Progress'
  }`;
  // const text =
  //   showWait === 'IN_REVIEW' ? COMPLIANCE_IN_REVIEW : COMPLIANCE_IN_PROGRESS;

  return (
    <FormContainer className="max-w-md h-full max-h-[fit-content] mt-8">
      <div className="flex flex-col items-center jusify-center gap-0 relative">
        <img src="/images/icons/user.png" />
      </div>
			<Spinner size={40} />
      <p
        className="text-white font-extrabold text-md text-center uppercase text-md font-['Exo_2'] relative p-2 mt-2 mb-2"
        style={{
          textShadow: `0px -0.559px 12.754px rgba(244, 153, 24, 0.73), 0px 0.559px 6.992px #F49918`,
          lineHeight: '88%',
          letterSpacing: '1.12px'
        }}
      >
        {title}
      </p>

    </FormContainer>
  );
};

export const ComplianceWrapper = ({
  userId,
  tier,
  status,
  restartPolling,
  docvTokenParam,
  priceAmount,
  pollingStatus,
  userKycProfile
}: ComplianceWrapperProps) => {
  const router = useRouter();
  const defaultShowWait = ['IN_PROGRESS', 'IN_REVIEW'].includes(status || '')
    ? status
    : null;

  const [showLoader, setShowLoader] = useState(false);
  const [showWait, setShowWait] = useState<KycStatus | null>(defaultShowWait);
  const [docvToken, setDocvToken] = useState(docvTokenParam);
  const [docvError, setDocvError] = useState<SocureDocVSDKEvent | null>(null);
  const [approved, setApproved] = useState(false);

  const redirectToBlockedPage = (error: string) => {
    // if (tier !== 'onboarding') {
    //   return window.parent.postMessage(
    //     {
    //       name: 'common.redirect_to_page',
    //       url: `/blocked?error=${encodeURIComponent(
    //         COMPLIANCE_ERROR
    //       )}`
    //     },
    //     '*'
    //   );
    // }
    return router.replace(`/blocked?error=${encodeURIComponent(error)}`);
  };

	useEffect(() => {
		const biPoller = createPolling(() => sendBIEvent(TrackerEvents.KYCHeartbeat, {userId, tier}), 20 * 1000);
		biPoller.start();
		return () => biPoller.stop();
	}, []);

  useEffect(() => {
    switch (status) {
      case 'APPROVED':
        setApproved(true);
        if (tier === 'onboarding') {
          setTimeout(() => router.replace('/game'), 3500);
        } else if (tier === 'deposit') {
          setTimeout(() => window.parent.postMessage({name: 'kyc.close_form_modal', tier}, '*'), 3500);
        } else {
          router.replace('/withdrawal');
        }
        return setShowLoader(false);
      case 'REJECTED':
        return redirectToBlockedPage(COMPLIANCE_ERROR);
      case 'IN_REVIEW':
        setShowWait('IN_REVIEW');
        return setShowLoader(false);
    }
  }, [status]);

  const renderCurrentStatus = useCallback(
    (status: KycStatus) => {
      switch (status) {
        case 'APPROVED':
          setApproved(true);
					if (tier === 'onboarding') {
						setTimeout(() => router.replace('/game'), 3500);
					} else if (tier === 'deposit') {
            setTimeout(() => window.parent.postMessage({name: 'kyc.close_form_modal', tier}, '*'), 3500);
          } else {
            router.replace('/withdrawal');
          }
          return setShowLoader(false);
        case 'REJECTED':
          return redirectToBlockedPage(COMPLIANCE_ERROR);
        case 'IN_REVIEW':
          setShowWait('IN_REVIEW');
          return setShowLoader(false);
        default:
          return redirectToBlockedPage(`Unknown KYC status [${status}]`);
      }
    },
    [router]
  );

  const handleDocvRetry = useCallback(() => {
    setDocvError(null);
    setDocvToken(null);
    restartPolling(true);
  }, [restartPolling]);

  const diSessionToken = useDeviceRisk({ customerSessionId: userId });

  useEffect(() => {
    const updateTierStateStatus = async (tier: KycTier, status: KycStatus) => {
      await request<KycUserTierState>(
        'api/compliance/tier-state',
        { tier, status },
        'PUT',
        false
      );
    };

    const handleMessage = async (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        typeof event.data !== 'object' ||
        !event.data?.type
      )
        return;
      switch (event.data?.type as PostMessageSocureDocVSDKEvent) {
        case 'docv.success':
          console.log('[DocV] success', event.data);
          try {
            await updateTierStateStatus(tier, 'IN_PROGRESS');
          } catch (e) {
            console.error('Error updating tier state:', e);
          }
          restartPolling(false);
          break;
        case 'docv.error':
          console.log('[DocV] error', event.data);
          await updateTierStateStatus(tier, 'NOT_VERIFIED');
          setDocvError(event.data.data);
          break;
        case 'docv.progress':
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [tier, restartPolling]);

  useEffect(() => {
    if (!pollingStatus) return;

    renderCurrentStatus(pollingStatus);
  }, [pollingStatus, renderCurrentStatus]);

  const handleSubmit = async (formData: any) => {
    console.log('KYC Form Submit:', formData);
    if (!diSessionToken) {
      console.warn('Socure session token not ready');
      return;
    }
    setShowLoader(true);

    try {
      const payload = {
        ...formData,
        diSessionToken,
        tier: tier
      };
      if (tier === 'deposit') {
        payload.priceAmount = priceAmount;
      }
      console.log('KYC Submit:', payload);
      const kycState = await request<KycUserTierState>(
        'api/compliance',
        payload,
        'POST'
      );
      console.log('KYC Response:', kycState);

      if (kycState.docvToken) {
        setDocvToken(kycState.docvToken);
        setTimeout(() => setShowLoader(false), 1000);
        return;
      }

      renderCurrentStatus(kycState.status);
    } catch (e) {
			console.error('KYC error', e);
			if(tier !== 'onboarding') {
				window.parent.postMessage(
					{
						name: 'common.redirect_to_page',
						url: `/blocked?error=${encodeURIComponent(
							COMPLIANCE_ERROR
						)}`
					},
					'*'
				);
				return;
			}
      router.replace(
        `/blocked?error=${encodeURIComponent(COMPLIANCE_STATE_ERROR)}`
      );
      return;
    }
  };

  if (showLoader) {
    return complianceSpinner;
  }

  if (approved) {
    return <KycApprovedNotice />;
  }

  if (showWait) {
    return <KycWaitNotice showWait={showWait} />;
  }

  if (docvError) {
    return <DocVErrorDialog errorData={docvError} onRetry={handleDocvRetry} />;
  }

  if (docvToken) {
    return (
      <DocvIframeWrapper
        sdkKey={process.env.NEXT_PUBLIC_SOCURE_SDK_KEY!}
        docvToken={docvToken}
      />
    );
  }

  return (
    <div className="flex items-center justify-center h-auto mb-6">
      <div className="w-full h-auto">
        {/* <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2> */}
        <KycForm
          handleSubmit={handleSubmit}
          tier={tier}
          userKycProfile={userKycProfile}
        />
      </div>
    </div>
  );
};
