'use client';

import { WithdrawalStepProps, WithdrawalTransactionResponse } from '@/types/withdrawal';
import { SelectTitle } from '../selectTitle';
import { WithdrawalHistoryTable } from '../withdrawalHistoryTable';
import { WithdrawalStatusButton } from '../withdrawalStatusButton';
import { StorageKey, WithdrawalStep } from '@/enum/withdrawalUi';

const HistoryStep = ({
  setTransactionData,
  setStep,
}: WithdrawalStepProps) => {
  const handleBackToHome = () => {
    sessionStorage.removeItem(StorageKey.WithdrawalStepHistory);
    window.parent.postMessage({ name: 'withdrawal.close' }, '*');
  };

  const handleTransactionClick = (tx: WithdrawalTransactionResponse) => {
    setTransactionData(tx);
    setStep(WithdrawalStep.TransactionDetails, { isFromHistoryTable: true });
  };

  return (
    <>
      <div className="top flex flex-col justify-center h-[26px]">
        <SelectTitle title="Prize Redemption History" />
      </div>
      <div className="middle flex-1 flex flex-col justify-center overflow-y-auto">
        <WithdrawalHistoryTable onClick={handleTransactionClick} setStep={setStep} />
      </div>
      <div className="bottom flex flex-col items-center justify-center gap-3">
        <WithdrawalStatusButton
          state="active"
          btnText="Back to Profile"
          onClick={handleBackToHome}
        />
      </div>
    </>
  );
};

export default HistoryStep;