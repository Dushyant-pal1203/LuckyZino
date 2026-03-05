/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 16/04/2025 00:56
 */
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { request } from '@/services/request-handler';
import { KycStatus, KycTier, KycUserTierState } from '@/types/kyc';
import {
  COMPLIANCE_ERROR,
  COMPLIANCE_STATE_ERROR
} from '@/lib/kyc-utils';
import Spinner from '@/components/ui/spinner';
import { SessionContextProp } from '@/hocs/with-auth';

export const complianceSpinner =
  <div className="flex items-center justify-center min-h-screen">
    <Spinner size={100}>
      <p className="mt-4 text-lg text-white font-bold">
        Checking compliance...
      </p>
    </Spinner>
  </div>;

export interface KycGuardResult {
  isChecking: boolean;
  canRender: boolean;
  docvToken: string | null;
  status: KycStatus | null;
  restartPolling: (withRedirects: boolean) => void;
}

export const useKycGuard = (
  sessionContext: SessionContextProp,
  tier: KycTier,
  pollingCallback?: (status: KycStatus) => void
): KycGuardResult => {
  const router = useRouter();
  const { data: session, status } = sessionContext;
  const hasRunRef = useRef(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const pollingAttempts = useRef(0);

  const [state, setState] = useState<Omit<KycGuardResult, 'restartPolling'>>({
    canRender: false,
    isChecking: true,
    docvToken: null,
    status: null
  });

  const handleApprovedStatus = useCallback((kycStatus: KycStatus) => {
    if (tier === 'onboarding' && !window.location.pathname.startsWith('/game')) {
      setHasRedirected(true);
      router.replace('/game');
    } else if (tier === 'withdrawal' && !window.location.pathname.startsWith('/withdrawal')) {
      setHasRedirected(true);
			sessionStorage.setItem('kycStatus', 'withdrawal');
      router.replace('/withdrawal');
    } else {
      setState({
        canRender: true,
        isChecking: false,
        docvToken: null,
        status: kycStatus
      });
    }
  }, [router]);

  const checkKycStatus = useCallback(async (withRedirects: boolean) => {
    try {
      const tierState = await request<KycUserTierState>(
        'api/compliance/tier-state',
        { tier },
        'POST'
      );

      const { status: kycStatus, docvToken } = tierState;

      if (withRedirects) {
        const isCompliancePage = window.location.pathname.startsWith('/compliance');

        switch (kycStatus) {
          case 'APPROVED':
            handleApprovedStatus(kycStatus);
            break;

          case 'REJECTED':
            setHasRedirected(true);
						sessionStorage.setItem('kycStatus', 'REJECTED');
            router.replace(`/blocked?error=${encodeURIComponent(COMPLIANCE_ERROR)}`);
            break;

          case 'NOT_VERIFIED':
          case 'IN_PROGRESS':
          case 'IN_REVIEW':
          case 'ON_HOLD':
            if (!isCompliancePage && tier !== 'deposit') {
              setHasRedirected(true);
              router.replace(`/compliance/${tier}`);
              return;
            }
            setState({
              canRender: true,
              isChecking: false,
              docvToken: docvToken ?? null,
              status: kycStatus
            });
            if (kycStatus === 'IN_PROGRESS') {
              pollStatus();
            }
            break;
        }
      } else {
        setState({
          canRender: true,
          isChecking: false,
          docvToken: docvToken ?? null,
          status: kycStatus
        });
        if (kycStatus === 'IN_PROGRESS') {
          pollStatus(withRedirects);
        } else if (pollingCallback) {
          pollingCallback(kycStatus);
        }
      }
    } catch {
      setHasRedirected(true);
      router.replace(`/blocked?error=${encodeURIComponent(COMPLIANCE_STATE_ERROR)}`);
    }
  }, [handleApprovedStatus, pollingCallback, router, tier]);

  const clearPolling = () => {
    if (pollingRef.current) {
      clearTimeout(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const pollStatus = useCallback((withRedirects: boolean = true) => {
    clearPolling();

    const delay = pollingAttempts.current >= 10 ? 3000 : 1500;
    pollingRef.current = setTimeout(async () => {
      pollingAttempts.current++;

      await checkKycStatus(withRedirects);
    }, delay);
  }, [checkKycStatus]);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const check = async () => {
      if (status !== 'authenticated' || !session?.user?.id) {
        setState({
          canRender: false,
          isChecking: false,
          docvToken: null,
          status: null
        });
        return;
      }

      pollingAttempts.current = 0;
      await checkKycStatus(true);
    };

    check();
  }, [status, session?.user?.id, router, pollStatus, tier, handleApprovedStatus, checkKycStatus]);

  return {
    ...state,
    canRender: !hasRedirected && state.canRender,
    restartPolling: pollStatus
  };
};
