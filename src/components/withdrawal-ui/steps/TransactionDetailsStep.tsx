'use client';

import { StorageKey, WithdrawalStep, WithdrawalTransactionStatus } from '@/enum/withdrawalUi';
import { CompleteTitle } from '../completeTitle';
import { TransactionDetails } from '../transactionDetails';
import { WithdrawalInfo } from '../withdrawalInfo';
import { WithdrawalStatusButton } from '../withdrawalStatusButton';
import { WithdrawalStepProps, WithdrawalTransactionResponse } from '@/types/withdrawal';

const TransactionDetailsStep = ({
  data: { account },
  onNext,
  selectedAccountId,
  transactionData,
  setStep,
  isFromHistoryTable,
}: WithdrawalStepProps) => {
  const getTransactionDetailsData = (
    transaction: WithdrawalTransactionResponse,
    accountId: string
  ): WithdrawalTransactionResponse => {
    const displayedAccount = account?.accounts.find((acc) => acc.id === accountId);
    if (displayedAccount && displayedAccount.lastFourDigits !== transaction.lastFourDigits) {
      console.warn(
        `No transactions in History for account with lastFourDigits: ${displayedAccount.lastFourDigits}.`
      );
    }

    return {
      id: transaction.id,
      amount: parseFloat(transaction.amount.toFixed(2)),
      status: transaction.status,
      createdAt: new Date(transaction.createdAt).toLocaleDateString(),
      lastFourDigits: transaction.lastFourDigits,
      title: displayedAccount?.title || '',
    };
  };

  const handleViewHistory = () => {
    onNext?.();
  };

  const handleBackToHome = () => {
    sessionStorage.removeItem(StorageKey.WithdrawalStepHistory);
    window.parent.postMessage({ name: 'withdrawal.close_form_modal' }, '*');
  };

  const handleBackToHistory = () => {
    setStep(WithdrawalStep.History);
  };

  const transactionDetailsData = transactionData && selectedAccountId
    ? getTransactionDetailsData(transactionData, selectedAccountId)
    : null;

  const isRequestSuccess = transactionDetailsData?.status === WithdrawalTransactionStatus.SETTLED;

  return (
    <>
      <div className="top flex flex-col justify-center">
        {isRequestSuccess && <CompleteTitle />}
      </div>
      <div className="middle flex-1 flex flex-col justify-center overflow-y-auto">
        {transactionDetailsData && <TransactionDetails data={transactionDetailsData} />}
      </div>
      <div className="bottom flex flex-col items-center justify-center gap-3">
        {isRequestSuccess && <WithdrawalInfo state="confirmInfo" />}
        <WithdrawalStatusButton
          state="active"
          btnText="Continue Playing"
          onClick={handleBackToHome}
        />
        {!isFromHistoryTable && (
          <WithdrawalStatusButton
            state="view"
            btnText="Prize Redemption History"
            onClick={handleViewHistory}
          />
        )}
        {isFromHistoryTable && (
          <WithdrawalStatusButton
            state="view"
            btnText="Back to History"
            onClick={handleBackToHistory}
          />
        )}
      </div>
    </>
  );
};

export default TransactionDetailsStep;