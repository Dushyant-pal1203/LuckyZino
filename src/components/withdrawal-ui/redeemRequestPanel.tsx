'use client';
import { useState } from "react";
import { FiClock } from "react-icons/fi";
import { useDailyLimitTimer } from '@/hooks/useDailyLimitTimer';
import { StorageKey } from '@/enum/withdrawalUi';

interface WithdrawalRequestCardProps {
  maxAmountPerTime: number;
  maxHoursOfRequest: number;
  pendingAmount: number | null;
  initialTimeLeft: string;
  balance: number;
  pendingId: string | null;
}

export const RedeemRequestPanel = ({
  maxAmountPerTime,
  maxHoursOfRequest,
  pendingAmount,
  initialTimeLeft,
  pendingId,
  balance,
}: WithdrawalRequestCardProps) => {
  const [loading, setLoading] = useState(false);

  const timeLeft = useDailyLimitTimer(initialTimeLeft);

  const handleCancelClick = async () => {
    if (pendingAmount && pendingId) {
      try {
        setLoading(true);
        const response = await fetch('api/withdrawal/cancel', { method: 'POST' });
        if (!response.ok) throw new Error('Cancellation failed');
        sessionStorage.setItem(StorageKey.RedeemCancelPopup, JSON.stringify({
          isOpen: 'true',
          balance,
          pendingAmount,
          id: pendingId,
        }));
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        console.error('Error cancelling transaction:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-1.5 text-white w-full max-w-md">
      <div className="flex items-center justify-between bg-[rgba(93,12,180,0.75)] rounded-[8px] w-full px-4 py-2">
        <div className="text-[14px]">
          <span className="text-white font-semibold leading-[104%] tracking-[0.96px]">{maxHoursOfRequest > 0 && `${maxHoursOfRequest}H `}Request Limit:&nbsp;</span>
          {maxAmountPerTime && maxAmountPerTime > 0 ?
            <span className="text-[#57E576] font-bold leading-[100%] tracking-[0.56px]">SC {maxAmountPerTime}</span>
            : <span className="text-[#F56476] font-bold leading-[100%] tracking-[0.56px]">Depleted</span>}
        </div>
        {timeLeft !== '' &&
          <div className="text-[#FFA347] text-[14px] font-bold leading-[100%] tracking-[0.56px] flex items-center justify-center">
            <FiClock className="shrink-0" />&nbsp;
            <span className="min-w-[64px]">{timeLeft}</span>
          </div>
        }
      </div>

      {pendingAmount && pendingAmount > 0 && timeLeft !== '' ? (
        <div className="flex items-center justify-between bg-[rgba(93,12,180,0.75)] rounded-[8px] w-full px-4 py-2">
          <div className="text-[18px font-bold leading-[100%] tracking-[0.72px]">
            <span className="text-white">Pending:&nbsp;</span>
            <span className="text-[#57E576]">SC {pendingAmount}</span>
          </div>
          <button
            disabled={loading}
            className="flex w-fit min-w-[83px] h-[26px] px-[8px] pt-[3px] pb-[5px] m-x-auto justify-center items-center self-center bg-[length:100%_100%] bg-center bg-no-repeat transition-all duration-300 cursor-pointer hover:brightness-110 bg-[url('/withdrawal_imgs/btn_greenGoldSmall.png')]"
            onClick={handleCancelClick}
          >
            <span className="text-white text-center font-bold text-capitalize text-[14px] leading-[90%] tracking-[0.56px] [text-shadow:0px_2px_0px_rgba(0,0,0,0.2)] font-['Exo_2']">Cancel</span>
          </button>
        </div>
      ) : null
      }

      <p className="w-full max-w-[346px] text-[#8B71B4] text-center text-[12px] font-semibold leading-[108%] tracking-[0.48px] capitalize">Estimated processing time: 2-5 business days All Prize Redemptions Are Processed Through AptPay.</p>
    </div>
  );
};
