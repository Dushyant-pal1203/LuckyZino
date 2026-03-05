'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { WithdrawalContainer } from '@/components/withdrawal-ui/withdrawalContainer';
import withAuth from '@/hocs/with-auth';
import { request } from '@/services/request-handler';
import { AccountsResponse, WithdrawalCardData } from '@/types/withdrawal';
import { WithdrawalCard } from '@/components/withdrawal-ui/withdrawalCard';
import { StorageKey, WithdrawalStep } from '@/enum/withdrawalUi';
import Spinner from '@/components/ui/spinner';

const WithdrawalClient = ({ sessionContext }: any) => {
  const [isRequestsLoading, setIsRequestsLoading] = useState(true);
  const [requestsCompleted, setRequestsCompleted] = useState(false);
  const [data, setData] = useState<WithdrawalCardData>({});
  const [currentStep, setCurrentStep] = useState<string>(
    WithdrawalStep.Initial
  );

  const fetchAccountData = async () => {
      try {
        setIsRequestsLoading(true);
        const accountResponse = await request<AccountsResponse>(
          'api/withdrawal/account',
          null,
          'POST'
        );
        if (accountResponse) {
          setData({ account: accountResponse });
          setRequestsCompleted(true);
        }
      } catch (error: any) {
        console.error(error);
        toast.error('Failed to update balance.');
      } finally {
        setIsRequestsLoading(false);
      }
    };

  useEffect(() => {
    sessionStorage.removeItem(StorageKey.WithdrawalStepHistory);
    fetchAccountData();
  }, []);

  // initial loading
  useEffect(() => {
    if (
      currentStep === WithdrawalStep.Initial && requestsCompleted
    ) {
      fetchAccountData();
    }

  }, [currentStep, requestsCompleted]);

  if (isRequestsLoading || !requestsCompleted) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner size={100} />
      </div>
    );
  }

  return (
    <WithdrawalContainer>
      <WithdrawalCard
        sessionContext={sessionContext}
        account={data.account}
        history={data.history}
        openBanking={data.openBanking}
        setCurrentStep={setCurrentStep}
      />
    </WithdrawalContainer>
  );
};

export default withAuth(WithdrawalClient);
