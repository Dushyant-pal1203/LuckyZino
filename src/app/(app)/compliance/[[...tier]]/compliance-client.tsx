'use client';

import 'react-phone-input-2/lib/style.css';
import withAuth, { SessionContextProp } from '@/hocs/with-auth';
import { KycStatus, KycTier, KycUserProfile } from '@/types/kyc';
import { ComplianceWrapper } from '@/components/compliance-wrapper';
import { complianceSpinner, useKycGuard } from '@/hooks/use-kyc-guard';
import { useParams, useRouter } from 'next/navigation';
import { KYC_DEPOSIT_COMPLIANCE_PRICE_AMOUNT } from '@/lib/lobby-event-manager';
import { useEffect, useState } from 'react';
import { request } from '@/services/request-handler';

interface ComplianceProps {
  sessionContext: SessionContextProp;
}

const ComplianceClient = ({ sessionContext, ...other }: ComplianceProps & {passedTier?: string}) => {
  const router = useRouter();
	const { passedTier } = other as unknown as {passedTier?: string}; //Bypass TS check because of HOC, also same above
  const resolvedParams = useParams();
  const {data: session} = sessionContext;
  const tier = (resolvedParams.tier?.[0] ?? passedTier ?? 'onboarding') as KycTier;
  const [priceAmount, setPriceAmount] = useState<number | null>(0);
  const [pollingStatus, setPollingStatus] = useState<KycStatus | null>(null);
  const [userKycProfile, setUserKycProfile] = useState<KycUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (tier === 'deposit') {
      const raw = sessionStorage.getItem(KYC_DEPOSIT_COMPLIANCE_PRICE_AMOUNT);
      const parsed = raw ? parseFloat(raw) : null;
      if (!parsed || isNaN(parsed)) {
        setPriceAmount(null);
        return;
      }
      setPriceAmount(parsed);
    }
  }, [tier, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await request<KycUserProfile>('api/compliance/profile', null, 'GET', false);
        setUserKycProfile(profile);
      } catch (error) {
        console.error('Error fetching KYC profile:', error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [tier]);

  const { isChecking, docvToken, status, canRender, restartPolling } = useKycGuard(sessionContext, tier, setPollingStatus);

  if (isChecking || !canRender || loading) {
    return complianceSpinner;
  }

  return <ComplianceWrapper
    userId={session!.user.id}
    tier={tier}
    status={status}
    restartPolling={restartPolling}
    docvTokenParam={docvToken}
    priceAmount={priceAmount}
    pollingStatus={pollingStatus}
    userKycProfile={userKycProfile}
  />
};

export default withAuth(ComplianceClient);
