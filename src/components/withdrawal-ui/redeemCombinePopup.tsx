'use client';
import { useEffect, useState } from "react";
import { PiWarning } from "react-icons/pi";
import { WithdrawalStatusButton } from "./withdrawalStatusButton";
import { WithdrawalStep } from "@/enum/withdrawalUi";
import { WithdrawalTransactionResponse } from "@/types/withdrawal";
import { request } from '@/services/request-handler';

interface RedeemCombinePopupProps {
  pendingAmount: number | string;
  newRedemption: number | string;
  setStep: (step: string, options?: Record<string, any>) => void;
  selectedAccountId?: string | null;
  setTransactionData: (data: WithdrawalTransactionResponse | null) => void;
  setShowCombinePopup: () => void;
}

export const RedeemCombinePopup = ({
  pendingAmount,
  newRedemption,
  setStep,
  selectedAccountId,
  setTransactionData,
  setShowCombinePopup,
}: RedeemCombinePopupProps) => {
  const [loading, setLoading] = useState(false);

  const newTotal = Number(pendingAmount) + Number(newRedemption);

  const containerPopupStyles = 'background-overlay fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-[1]';
  const bgPopupStyles = 'absolute flex p-[4px] z-[2] inset-0 w-full h-fit min-h-[374px] max-w-[373px] m-auto bg-[url("/withdrawal_imgs/Popup_BG.png")] bg-[length:110%_105%] bg-center bg-no-repeat rounded-[22.55px] border-[2.733px] border-[#F652FF] shadow-[inset_0_-0.683px_2.733px_0_#9665CB,0_5.467px_0_0_#5F1FCE,0_8.2px_5.057px_2.733px_rgba(0,0,0,0.25)]';
  const contentPopupStyles = 'relative px-[18px] py-[22px] flex flex-col gap-10 items-center justify-center flex-[1_1_auto] min-h-inherit rounded-[18px] border-[2.733px] border-[rgba(255, 255, 255, 0.63)] shadow-[0_3.966px_3.172px_0_rgba(74,9,100,0.28),inset_0_0_0.238px_1.586px_#fd8dff,0_0_10px_4px_rgba(204,0,255,0.92),inset_0_0_10px_4px_rgba(204,0,255,0.92)]';

  const hideParentCloseButton = () => {
    const el = window.parent.document.getElementById('modal-close-button');
    if (el) {
      el.style.setProperty('display', 'none', 'important');
    }
  };

  const showParentCloseButton = () => {
    const el = window.parent.document.getElementById('modal-close-button');
    if (el) {
      el.style.removeProperty('display');
    }
  };

  const handleBackToStart = () => {
    if (!loading) {
      showParentCloseButton();
      setShowCombinePopup();
    }
  };

  const handleCombineRedemptions = async () => {
    if (selectedAccountId && !loading) {
      try {
        setLoading(true);
        const response = await request<WithdrawalTransactionResponse>('api/withdrawal',
          { accountId: selectedAccountId, amount: Number(newRedemption) },
          'POST'
        );
        setTransactionData(response);
        setStep(WithdrawalStep.RedeemControl);
        setShowCombinePopup();
      } catch (error) {
        console.error('Error during withdrawal request:', error);
      } finally {
        setLoading(false);
        setShowCombinePopup();
      }
    }
  };

  useEffect(() => {
    hideParentCloseButton();
    return () => {
      showParentCloseButton();
    };
  }, []);

  return (
    <div className={containerPopupStyles}>
      <div className={bgPopupStyles}>
        <div className={contentPopupStyles}>
          <div className="top">
            <h2 className="text-white text-center uppercase text-[30px] font-bold leading-[92%] tracking-[1.2px]">Combine <br /> redemptions</h2>
          </div>
          <div className="center flex flex-col gap-4">
            <p className="text-white text-center text-[16px] font-semibold leading-[110%] tracking-[0.64px]">You have a pending redemption of SC&nbsp;{pendingAmount}. Would you like to combine it with your new amount?</p>
            <div className="rounded-[10px] px-[14px] py-[12px] bg-[rgba(79,42,125,0.80)] flex flex-col gap-2">
              <div className="row flex justify-between gap-2">
                <p className="text-white text-center text-[16px] font-semibold leading-[110%] tracking-[0.64px]">Pending Redemption:</p>
                <span className="text-[#5AFE51] text-center text-[20px] font-semibold leading-[110%] tracking-[0.8px]">SC {pendingAmount}</span>
              </div>
              <div className="row flex justify-between gap-2 border-b-[1px] border-white/60 pb-2">
                <p className="text-white text-center text-[16px] font-semibold leading-[110%] tracking-[0.64px]">New Redemption:</p>
                <span className="text-[#5AFE51] text-center text-[20px] font-semibold leading-[110%] tracking-[0.8px]">SC {newRedemption}</span>
              </div>
              <div className="row flex justify-between gap-2">
                <p className="text-white text-center text-[16px] font-semibold leading-[110%] tracking-[0.64px]">Combined Total:</p>
                <span className="text-[#5AFE51] text-center text-[20px] font-semibold leading-[110%] tracking-[0.8px]">SC {newTotal}</span>
              </div>
            </div>
            <div className="row flex justify-start items-center gap-2">
              <PiWarning className="text-[#FFE033] min-w-[32px] h-[auto]" />
              <p className="text-white text-left text-[14px] font-semibold leading-[110%] tracking-[0.56px]">Combining will cancel your current redemption and restart the timer for the full SC {newTotal}</p>
            </div>
          </div>

          <div className="bottom w-full flex flex-col gap-3">
            <WithdrawalStatusButton
              state={loading ? 'inactive-gold' : 'active-gold'}
              btnText="Combine redemptions"
              onClick={handleCombineRedemptions}
            />
            <WithdrawalStatusButton
              state='active-gold'
              btnText="Cancel"
              onClick={handleBackToStart}
            />
          </div>

          <button className="close-button absolute top-[-1.5rem] right-[-1.5rem] w-[44px] h-[44px]" disabled={loading} onClick={handleBackToStart}>
            <img
              src="/withdrawal_imgs/CloseButton.png"
              alt="logo"
              className="rounded-full width-full height-full object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
