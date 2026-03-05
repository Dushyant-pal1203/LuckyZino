'use client';

import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import clsx from 'clsx';
import {
  AccountsResponse,
  WithdrawalHistoryResponse,
  WithdrawalOpenBankingResponse,
  WithdrawalTransactionResponse,
  WithdrawalStepProps,
} from '@/types/withdrawal';
import Spinner from '@/components/ui/spinner';
import { RedeemCancelPopup } from './redeemCancelPopup';
import { StorageKey, WithdrawalStep } from '@/enum/withdrawalUi';
import { SessionContextProp } from '@/hocs/with-auth';

interface WithdrawalCardProps {
  account?: AccountsResponse;
  history?: WithdrawalHistoryResponse;
  openBanking?: WithdrawalOpenBankingResponse;
  setCurrentStep: (step: string) => void;
	sessionContext?: SessionContextProp
}

interface Step {
  component: React.ComponentType<WithdrawalStepProps> | React.LazyExoticComponent<React.ComponentType<WithdrawalStepProps>>;
  title: string;
}

export const steps: Record<string, Step> = {
  initial: {
    component: lazy(() => import('./steps/InitialStep')),
    title: 'Withdraw Funds',
  },
  cooldown: {
    component: lazy(() => import('./steps/CooldownStep')),
    title: 'Cooldown'
  },
  selectAccount: {
    component: lazy(() => import('./steps/SelectAccountStep')),
    title: 'Select Bank Account',
  },
  openBankingInfo: {
    component: lazy(() => import('./steps/OpenBankingInfoStep')),
    title: 'Open Banking Confirmation',
  },
  transactionDetails: {
    component: lazy(() => import('./steps/TransactionDetailsStep')),
    title: 'Transaction Details',
  },
  history: {
    component: lazy(() => import('./steps/HistoryStep')),
    title: 'Redeem History',
  },
  redeemControl: {
    component: lazy(() => import('./steps/RedeemControlStep')),
    title: 'Redeem Control',
  },
};

export const WithdrawalCard = ({ account, history, openBanking, setCurrentStep, sessionContext }: WithdrawalCardProps) => {
  const [currentStep, setLocalStep] = useState<string>(WithdrawalStep.Initial);
  const [stepOptions, setStepOptions] = useState<{ isFromHistoryTable?: boolean }>({});
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const selectedAccountIdRef = useRef<string | null>(null);
  const [transactionData, setTransactionData] = useState<WithdrawalTransactionResponse | null>(null);
  const [popupData, setPopupData] = useState<{ isOpen: boolean; balance: number; pendingAmount: number; id: string } | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const data = sessionStorage.getItem(StorageKey.RedeemCancelPopup);
      if (data) {
        const parsedData = JSON.parse(data);
        setPopupData(parsedData);
      } else {
        setPopupData(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const isCoolDownEnable = !account?.pending && !account?.eligibility?.availableNow;

  const closePopup = () => {
    sessionStorage.removeItem(StorageKey.RedeemCancelPopup);
    sessionStorage.removeItem(StorageKey.WithdrawalStepHistory);
    window.parent.postMessage({ name: 'withdrawal.close_form_modal' }, '*');
    setPopupData(null);
  };

  /** Initialize step history and cleanup on page reload */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(StorageKey.WithdrawalStepHistory, JSON.stringify([isCoolDownEnable ? WithdrawalStep.Cooldown : WithdrawalStep.Initial]));
      const handleBeforeUnload = () => {
        sessionStorage.removeItem(StorageKey.WithdrawalStepHistory);
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, []);

  /** Initialize currentStep from sessionStorage on client */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stepHistory = JSON.parse(sessionStorage.getItem(StorageKey.WithdrawalStepHistory) || '[]') as string[];
        const newStep = stepHistory.length > 0 && steps[stepHistory[stepHistory.length - 1]] ? stepHistory[stepHistory.length - 1] : WithdrawalStep.Initial;
        setLocalStep(newStep);
        setCurrentStep(newStep);
      } catch (error) {
        console.error('WithdrawalCard: Initial sessionStorage error:', error);
      }
    }
  }, [setCurrentStep]);

  /** Sync currentStep with parent and save step history */
  useEffect(() => {
    setCurrentStep(currentStep);
    if (typeof window !== 'undefined') {
      try {
        const stepHistory = JSON.parse(sessionStorage.getItem(StorageKey.WithdrawalStepHistory) || '[]') as string[];
        if (stepHistory[stepHistory.length - 1] !== currentStep) {
          stepHistory.push(currentStep);
          sessionStorage.setItem(StorageKey.WithdrawalStepHistory, JSON.stringify(stepHistory.slice(-10)));
        }
      } catch (error) {
        console.error('WithdrawalCard: Update stepHistory error:', error);
      }
    }
  }, [currentStep, setCurrentStep]);

  /** Poll sessionStorage for changes */
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== 'undefined') {
        try {
          const stepHistory = JSON.parse(sessionStorage.getItem(StorageKey.WithdrawalStepHistory) || '[]') as string[];
          const newStep = stepHistory.length > 0 && steps[stepHistory[stepHistory.length - 1]] ? stepHistory[stepHistory.length - 1] : WithdrawalStep.Initial;
          if (newStep !== currentStep) {
            setLocalStep(newStep);
            setCurrentStep(newStep);
          }
        } catch (error) {
          console.error('WithdrawalCard: Polling error:', error);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentStep, setCurrentStep]);

  /** Recovery selectedAccountId from sessionStorage */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedAccountIdRef.current) {
        setSelectedAccountId(selectedAccountIdRef.current);
      } else {
        const savedAccountId = sessionStorage.getItem('selectedAccountId');
        if (savedAccountId && account?.accounts?.some((acc) => acc.id === savedAccountId)) {
          setSelectedAccountId(savedAccountId);
          selectedAccountIdRef.current = savedAccountId;
        } else if (account?.accounts?.length === 1 && !selectedAccountId) {
          setSelectedAccountId(account.accounts[0].id);
          selectedAccountIdRef.current = account.accounts[0].id;
        }
      }
    }
  }, [account]);

  /** Save selectedAccountId to sessionStorage */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedAccountId) {
        sessionStorage.setItem('selectedAccountId', selectedAccountId);
        selectedAccountIdRef.current = selectedAccountId;
      } else {
        sessionStorage.removeItem('selectedAccountId');
        selectedAccountIdRef.current = null;
      }
    }
  }, [selectedAccountId]);

  const handleNext = () => {
    let nextStep = currentStep;

    if (currentStep === WithdrawalStep.Initial) {
      nextStep = account?.accounts?.length ? WithdrawalStep.SelectAccount : WithdrawalStep.OpenBankingInfo;
    } else if (currentStep === WithdrawalStep.SelectAccount) {
      nextStep = WithdrawalStep.Initial;
    } else if (currentStep === WithdrawalStep.OpenBankingInfo) {
      nextStep = WithdrawalStep.TransactionDetails;
    } else if (currentStep === WithdrawalStep.TransactionDetails) {
      nextStep = WithdrawalStep.History;
    } else if (currentStep === WithdrawalStep.History) {
      nextStep = WithdrawalStep.Initial;
    }
    setLocalStep(nextStep);
  };

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      try {
        const stepHistory = JSON.parse(sessionStorage.getItem(StorageKey.WithdrawalStepHistory) || '[]') as string[];
        const prevStep = stepHistory.length > 1 && steps[stepHistory[stepHistory.length - 2]] ? stepHistory[stepHistory.length - 2] : WithdrawalStep.Initial;
        stepHistory.pop();
        sessionStorage.setItem(StorageKey.WithdrawalStepHistory, JSON.stringify(stepHistory.slice(-10)));
        setLocalStep(prevStep);
      } catch (error) {
        console.error('WithdrawalCard: Back error:', error);
      }
    }
  };

  const handleSetStep = (step: string, options?: { isFromHistoryTable?: boolean }) => {
    if (steps[step]) {
      setLocalStep(step);
      setStepOptions(options || {});
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  const defaultStyles = "pt-[16px] px-[26px] pb-[22px] sm:px-[26px] sm:pt-[22px] sm:pb-[22px] sm:max-w-[500px]";
  const openBankingInfoStyles = "px-[0px] py-[0px] sm:px-[0px] sm:py-[0px] max-w-[460px]";
  const containerStyles = clsx(
    'mx-auto w-full h-full min-h-[636px] max-w-[390px] flex flex-col items-center justify-center rounded-[16px] border-2 border-[#A44065] bg-[linear-gradient(180deg,_rgba(90,37,185,0.83)_-71.46%,_rgba(34,11,70,0.83)_25.34%)] shadow-[0px_2px_0px_rgba(0,0,0,0.6)]',
    currentStep === WithdrawalStep.OpenBankingInfo ? openBankingInfoStyles : defaultStyles
  );
  const cardStyles = 'flex flex-col justify-between gap-3 w-full h-full';

  return (
    <>
      <div className={containerStyles}>
        <div className={cardStyles}>
          <Suspense fallback={<div className="flex justify-center items-center w-full h-full"><Spinner size={100} /></div>}>
            <CurrentStepComponent
							sessionContext={sessionContext}
              data={{ account, history, openBanking }}
              onNext={handleNext}
              onBack={handleBack}
              setStep={handleSetStep}
              selectedAccountId={selectedAccountId}
              setSelectedAccountId={setSelectedAccountId}
              transactionData={transactionData}
              setTransactionData={setTransactionData}
              isFromHistoryTable={stepOptions.isFromHistoryTable}
            />
          </Suspense>
        </div>
      </div>
      {popupData?.isOpen && (
        <RedeemCancelPopup
          balance={popupData.balance}
          pendingAmount={popupData.pendingAmount}
          id={popupData.id}
          onClose={closePopup}
        />
      )}
    </>
  );
};