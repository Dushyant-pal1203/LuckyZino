'use client';
import { WithdrawalStatusButton } from '../../../withdrawal-ui/withdrawalStatusButton';
import { FaRegCircleCheck } from 'react-icons/fa6';
import BasePopup from './BasePopup';
import { BasePopupProps } from '../PendingRedeemPopup';
import { useEffect } from 'react';
import { floorToTwoDecimals } from '@/lib/utils';

const RedemptionCancelled = ({
  onClose,
  balance,
  pendingAmount
}: BasePopupProps) => {
  const totalBalance = floorToTwoDecimals(Number(balance + pendingAmount) || 0);
  const handleClose = () => {
    window.postMessage({ name: 'slot.iframe_force_reload' }, window.origin);
    onClose();
  };
  // Auto close popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <BasePopup>
      <div className="top">
        <FaRegCircleCheck className="text-[#41FF64] mx-auto w-[45px] h-[45px] mb-4" />
        <h2 className="text-white text-center uppercase text-[30px] font-bold leading-[92%] tracking-[1.2px]">
          Redemption <br />
          Cancelled
        </h2>
      </div>
      <div className="center flex flex-col gap-4">
        <p className="text-white text-center text-[16px] font-semibold leading-[110%] tracking-[0.64px]">
          Your SC {pendingAmount} redemption has been cancelled and returned to
          your Available SweepCoins.
        </p>
        <div className="rounded-[10px] px-[14px] py-[12px] bg-[rgba(79,42,125,0.80)] flex flex-col gap-2">
          <div className="row flex justify-between gap-2">
            <p className="text-white text-center text-[16px] font-semibold leading-[110%] tracking-[0.64px]">
              Available Balance:
            </p>
            <span className="text-[#5AFE51] text-center text-[20px] font-semibold leading-[110%] tracking-[0.8px]">
              SC {totalBalance}
            </span>
          </div>
          <div className="row flex justify-between gap-2">
            <p className="text-white text-center text-[16px] font-semibold leading-[110%] tracking-[0.64px]">
              Pending Redemption:
            </p>
            <span className="text-[#5AFE51] text-center text-[20px] font-semibold leading-[110%] tracking-[0.8px]">
              SC 0
            </span>
          </div>
        </div>
      </div>

      <div className="bottom w-full flex flex-col gap-6">
        <WithdrawalStatusButton
          state="active-gold"
          btnText="Continue Playing"
          onClick={handleClose}
        />
      </div>

      <button
        className="close-button absolute top-[-1.5rem] right-[-1.5rem] w-[44px] h-[44px]"
        onClick={handleClose}
      >
        <img
          src="/withdrawal_imgs/CloseButton.png"
          alt="logo"
          className="rounded-full width-full height-full object-contain"
        />
      </button>
    </BasePopup>
  );
};

export default RedemptionCancelled;
