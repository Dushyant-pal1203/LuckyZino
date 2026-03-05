'use client';

import { WithdrawalStepProps } from '@/types/withdrawal';
import { AddAccountButton } from '../addAccountButton';
import { BankAccountCard } from '../bankAccountCard';
import { SelectTitle } from '../selectTitle';
import { WithdrawalStatusButton } from '../withdrawalStatusButton';
import { WithdrawalStep } from '@/enum/withdrawalUi';

const SelectAccountStep = ({
  data: { account },
  onNext,
  selectedAccountId,
  setSelectedAccountId,
  setStep,
}: WithdrawalStepProps) => {
  const handleAddAccount = () => {
    setStep(WithdrawalStep.OpenBankingInfo);
  };

  const handleSelectAccount = (id: string) => {
    setSelectedAccountId(id);
  };

  const handleConfirmSelection = () => {
    if (selectedAccountId) {
      onNext();
    }
  };

  return (
    <>
      <div className="top flex flex-col justify-center">
        <SelectTitle title="Select bank account" />
      </div>
      <div className="middle flex-1 flex flex-col justify-center overflow-y-auto">
        <div className="w-full h-fit overflow-y-auto mx-auto flex flex-col gap-3 py-3 border-b border-[rgba(235,235,235,0.4)]">
          {account?.accounts?.map((acc) => (
            <BankAccountCard
              key={acc.id}
              id={acc.id}
              title={acc.title}
              lastFourDigits={acc.lastFourDigits}
              accountType={acc.accountType}
              accountStatus={acc.accountStatus}
              selected={selectedAccountId === acc.id}
              showArrow={false}
              onClick={() => handleSelectAccount(acc.id)}
            />
          ))}
        </div>
        <AddAccountButton btnText="Add new bank account" onClick={handleAddAccount} />
      </div>
      <div className="bottom flex flex-col items-center justify-center gap-3">
        <WithdrawalStatusButton
          state={selectedAccountId ? 'active' : 'inactive'}
          btnText="Select"
          onClick={handleConfirmSelection}
        />
      </div>
    </>
  );
};

export default SelectAccountStep;
