'use client';

import { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import { WithdrawalStatusButton } from '../withdrawalStatusButton';
import { useDailyLimitTimer } from '@/hooks/useDailyLimitTimer';
import { complianceSpinner } from '@/hooks/use-kyc-guard';
import { AccountsResponse, WithdrawalStepProps } from '@/types/withdrawal';
import { StorageKey, WithdrawalStep } from '@/enum/withdrawalUi';
import { request } from '@/services/request-handler';

const RedeemControlStep = ({
  selectedAccountId,
  setStep
}: WithdrawalStepProps) => {
  const [isRequestsLoading, setIsRequestsLoading] = useState(true);
  const [accountData, setAccountData] = useState<AccountsResponse>({
    accounts: [],
    pending: null,
    balance: 0,
    settings: { windowHours: 0, maxAmountPerWindow: 0 },
    eligibility: {
      userType: 0,
      minRedeemAmount: 0,
      redeemCooldownDays: 0,
      nextAvailableAtUtc: '',
      availableNow: true,
      availableRedeemableBalance: 0
    }
  });
  const [loading, setLoading] = useState(false);

  const fetchAccountData = async () => {
    try {
      setIsRequestsLoading(true);
      const accountResponse = await request<AccountsResponse>(
        'api/withdrawal/account',
        selectedAccountId,
        'POST'
      );

      if (accountResponse) {
        setAccountData(accountResponse);
      }
    } catch (error) {
      console.error('Error during account request:', error);
    } finally {
      setIsRequestsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  const handleToHistoryClick = () => {
    setStep(WithdrawalStep.History);
  };

  const handleCancelClick = async () => {
    if (accountData) {
      try {
        setLoading(true);
        const response = await fetch('api/withdrawal/cancel', {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Cancellation failed');
        sessionStorage.setItem(
          StorageKey.RedeemCancelPopup,
          JSON.stringify({
            isOpen: 'true',
            balance: accountData.balance,
            pendingAmount: accountData.pending?.amount,
            id: accountData.pending?.id
          })
        );
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        console.error('Error cancelling transaction:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const timeLeft = useDailyLimitTimer(
    accountData?.pending?.scheduledAtUtc || ''
  );

  if (isRequestsLoading) {
    return complianceSpinner;
  }

  return (
    <>
      <div className="top flex flex-col gap-3 justify-center">
        <h3 className="text-white text-center text-[24px] font-semibold leading-[104%] tracking-[0.96px]">
          Redemption Request Submitted
        </h3>
        <p className="text-white/60 text-[14px] text-center font-semibold leading-[88%] tracking-[0.56px]">
          Reference ID: {accountData.pending?.id}
        </p>
      </div>
      <div className="middle flex-1 flex flex-col justify-center overflow-y-auto">
        <div className="flex flex-col items-center justify-center">
          <h4 className="font-semibold text-[18px] leading-[100%] tracking-[0.72px]">
            Pending:{' '}
          </h4>
          <p className="text-[#57E576] text-center text-[37px] font-bold tracking-[1.48px]">{`SC ${accountData.pending?.amount}`}</p>
        </div>
        <div className="flex flex-row items-center justify-center gap-1 text-[#FFF] text-center text-[18px] font-bold tracking-[0.74px]">
          <FiClock />
          {timeLeft !== '' ? timeLeft : '72h'}
        </div>
        <div className="flex flex-row items-center justify-center gap-1 mt-6">
          <span className="font-semibold text-[14px] leading-[100%] tracking-[0.56px]">
            Balance:{' '}
          </span>
          <p className="text-[#57E576] text-center text-[18px] font-bold tracking-[0.72px] [text-shadow:0px_1.5px_0px_#241056]">{`SC ${accountData.balance}`}</p>
        </div>
      </div>
      <div className="bottom flex flex-col items-center justify-center gap-3">
        <WithdrawalStatusButton
          state={loading ? 'inactive' : 'active'}
          btnText="Cancel Redemption"
          onClick={handleCancelClick}
        />
        <WithdrawalStatusButton
          state={loading ? 'inactive' : 'view'}
          btnText="Prize Redemption History"
          onClick={handleToHistoryClick}
        />
      </div>
    </>
  );
};

export default RedeemControlStep;
