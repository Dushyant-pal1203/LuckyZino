'use client';
import { useEffect } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { WithdrawalStatusButton } from "./withdrawalStatusButton";

interface RedeemCancelPopupProps {
  balance: number;
  pendingAmount: number;
  id: string;
  onClose: () => void;
}

export const RedeemCancelPopup = ({
  balance,
  pendingAmount,
  id,
  onClose,
}: RedeemCancelPopupProps) => {
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

  const handleBackToHome = async () => {
    onClose();
    showParentCloseButton();
  };

  useEffect(() => {
    hideParentCloseButton();
    return () => {
      showParentCloseButton();
    };
  }, []);

  // Auto close popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleBackToHome();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={containerPopupStyles}>
      <div className={bgPopupStyles}>
        <div className={contentPopupStyles}>
          <div className="top">
            <FaRegCircleCheck className="text-[#41FF64] mx-auto w-[45px] h-[45px] mb-4" />
            <h2 className="text-white text-center uppercase text-[30px] font-bold leading-[92%] tracking-[1.2px]">Redemption <br />Cancelled</h2>
          </div>
          <div className="center flex flex-col gap-4">
            <p className="text-white text-center text-[16px] font-semibold leading-[110%] tracking-[0.64px]">Your SC {pendingAmount} redemption has been cancelled and returned to your Available SweepCoins.</p>
            <div className="rounded-[10px] px-[14px] py-[12px] bg-[rgba(79,42,125,0.80)] flex flex-col gap-2">
              <div className="row flex justify-between gap-2">
                <p className="text-white text-center text-[16px] font-semibold leading-[110%] tracking-[0.64px]">Available Balance:</p>
                <span className="text-[#5AFE51] text-center text-[20px] font-semibold leading-[110%] tracking-[0.8px]">SC {balance}</span>
              </div>
              <div className="row flex justify-between gap-2">
                <p className="text-white text-center text-[16px] font-semibold leading-[110%] tracking-[0.64px]">Pending Redemption:</p>
                <span className="text-[#5AFE51] text-center text-[20px] font-semibold leading-[110%] tracking-[0.8px]">SC {pendingAmount}</span>
              </div>
            </div>
          </div>

          <div className="bottom w-full flex flex-col gap-6">
            <WithdrawalStatusButton
              state='active-gold'
              btnText="Continue Playing"
              onClick={handleBackToHome}
            />
            <p className="text-white/60 text-center text-[14px] font-semibold leading-[110%] tracking-[0.56px]">Cancellation Reference: <br /> {id}</p>
          </div>

          <button className="close-button absolute top-[-1.5rem] right-[-1.5rem] w-[44px] h-[44px]" onClick={handleBackToHome}>
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
