'use client';

import { useState, useEffect } from 'react';
import { WithdrawalModInput } from '../withdrawalModInput';
import { BankAccountCard } from '../bankAccountCard';
import { AddAccountButton } from '../addAccountButton';
import { WithdrawalText } from '../withdrawalText';
import { WithdrawalStatusButton } from '../withdrawalStatusButton';
import { RedeemRequestPanel } from '../redeemRequestPanel';
import {
  WithdrawalStepProps,
  WithdrawalTransactionResponse
} from '@/types/withdrawal';
import { request } from '@/services/request-handler';
import { WithdrawalStep } from '@/enum/withdrawalUi';
import { RedeemCombinePopup } from '../redeemCombinePopup';
import { SessionContextProp } from '@/hocs/with-auth';
import { complianceSpinner, useKycGuard } from '@/hooks/use-kyc-guard';
import { useOtpGuard } from '@/hooks/otp/useOtpGuard';
import { OtpTriggerSource } from '@/types/enums/otp';
import { ErrorCode } from '@/lib/errors';

export const GuardHook = ({ session, callback }: { session: SessionContextProp, callback?:any }) => {
  const { isChecking, canRender } = useKycGuard(session, 'withdrawal');
	useEffect(() => {
		if(!isChecking && callback && typeof callback === 'function' && canRender) {
			callback();
		}
	}, [isChecking, canRender])
  if (!canRender && isChecking) {
    return complianceSpinner;
  }
  return null;
};

const InitialStep = ({
  data: { account },
  onNext,
  selectedAccountId,
  setTransactionData,
  setStep,
  sessionContext
}: WithdrawalStepProps) => {
  const session = sessionContext ?? ({} as SessionContextProp);
  const [amount, setAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showCombinePopup, setShowCombinePopup] = useState(false);
  const [renderKYC, setRenderKYC] = useState(false);
  const [pendingStep, setPendingStep] = useState<WithdrawalStep | null>(null);
  const { otpPassed, triggerOtp, withOtpGuard, isOtpRequired, otpExpired } = useOtpGuard();
  const hasAccounts = account?.accounts && account.accounts.length > 0;
  const displayedAccount = hasAccounts
    ? account.accounts.find((acc) => acc.id === selectedAccountId) ||
      account.accounts[0]
    : null;

  const maxAmountPerTime = Math.max(
    0,
    Math.round(
      ((Number(account?.settings?.maxAmountPerWindow) || 0) -
        (Number(account?.pending?.amount) || 0)) *
        100
    ) / 100
  );
  const pendingAmount = Number(account?.pending?.amount) || 0;
  const initialTimeLeft = account?.pending?.scheduledAtUtc || '';
  const maxHoursOfRequest = account?.settings?.windowHours ?? 72;
  const balance = account?.balance || 0;
  const pendingId = account?.pending?.id || null;

  const isContinueActive =
    hasAccounts &&
    selectedAccountId !== null &&
    amount !== '' &&
    !isNaN(parseFloat(amount.replace(',', '.'))) &&
    parseFloat(amount.replace(',', '.')) >= 100 &&
    parseFloat(amount.replace(',', '.')) <= balance &&
    parseFloat(amount.replace(',', '.')) <= maxAmountPerTime;

  const handleAddAccount = () => {
    isOtpRequired(OtpTriggerSource.Redemption).then((required) => { // todo move OTP source directly to useOtpGuard param
      if (required && !otpPassed && otpExpired(OtpTriggerSource.Redemption)) {
        setPendingStep(WithdrawalStep.OpenBankingInfo);
        triggerOtp({
          source: OtpTriggerSource.Redemption,
          verifyToken: true
        });
      } else {
        setStep(WithdrawalStep.OpenBankingInfo);
      }
    });
  };

  useEffect(() => {
    if (otpPassed && pendingStep) {
      setStep(pendingStep);
      setPendingStep(null);
    }
  }, [otpPassed, pendingStep]);

  const handleSelectAccountMode = () => {
    onNext();
  };

  const handleContinue = withOtpGuard(
    async () => {
      if (isContinueActive && selectedAccountId && !isSubmitting) {
        setIsSubmitting(true);
        try {
          if (account?.pending) {
            setShowCombinePopup(true);
          } else {
            const response = await request<WithdrawalTransactionResponse>(
              'api/withdrawal',
              { accountId: selectedAccountId, amount: Number(amount) },
              'POST',
              true,
              [ErrorCode.KYC_PROCESS_NOT_COMPLETED]
            );
            setTransactionData(response);
            setAmount('');
            setStep(WithdrawalStep.RedeemControl);
          }
        } catch (error: any) {
          if (error?.reason === ErrorCode.KYC_PROCESS_NOT_COMPLETED) {
            setRenderKYC(true);
          }
          console.error('Error during withdrawal request:', error);
          setIsSubmitting(false);
        }
      }
    },
    { source: OtpTriggerSource.Redemption, verifyToken: true }, // OTP token will be verified withing 'api/withdrawal'
    true
  );

  const handlePopupClose = () => {
    setAmount('');
    setShowCombinePopup(false);
    setIsSubmitting(false);
  };

  if (renderKYC) {
    return <GuardHook session={session}></GuardHook>;
  }

  return (
    <>
      <div className="top flex flex-col justify-between items-center">
        <RedeemRequestPanel
          maxAmountPerTime={maxAmountPerTime}
          pendingAmount={pendingAmount}
          maxHoursOfRequest={maxHoursOfRequest}
          initialTimeLeft={initialTimeLeft}
          balance={balance}
          pendingId={pendingId}
        />
      </div>
      <div className="middle flex-1 flex flex-col justify-center overflow-y-auto gap-8">
        <WithdrawalModInput
          maxValue={balance}
          exchangeRate={1}
          currency="$"
          onAmountChange={setAmount}
          maxAmountPerTime={maxAmountPerTime}
        />
      </div>
      <div className="bottom flex flex-col items-center justify-center gap-8">
        {hasAccounts && displayedAccount ? (
          <div className="w-full flex flex-col gap-3">
            <WithdrawalText />
            <BankAccountCard
              id={displayedAccount.id}
              title={displayedAccount.title}
              lastFourDigits={displayedAccount.lastFourDigits}
              accountType={displayedAccount.accountType}
              accountStatus={displayedAccount.accountStatus}
              selected={false}
              showArrow={true}
              onClick={handleSelectAccountMode}
            />
          </div>
        ) : (
          <div>
            <WithdrawalText />
            <AddAccountButton
              btnText="Add bank account"
              onClick={handleAddAccount}
            />
          </div>
        )}
        <WithdrawalStatusButton
          state={isContinueActive && !isSubmitting ? 'active' : 'inactive'}
          btnText="Continue"
          onClick={() => (hasAccounts ? handleContinue() : setRenderKYC(true))}
        />
      </div>
      {showCombinePopup && (
        <RedeemCombinePopup
          pendingAmount={pendingAmount}
          newRedemption={amount}
          setStep={setStep}
          selectedAccountId={selectedAccountId}
          setTransactionData={setTransactionData}
          setShowCombinePopup={handlePopupClose}
        />
      )}
    </>
  );
};

export default InitialStep;
