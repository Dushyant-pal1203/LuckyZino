'use client';

import { FiAlertTriangle } from 'react-icons/fi';
import { WithdrawalStatusButton } from '../../../withdrawal-ui/withdrawalStatusButton';
import BasePopup from './BasePopup';
import Image from 'next/image';
import { UIEvents } from '@/enum/ui';
import { BasePopupProps } from '../PendingRedeemPopup';
import ClosePopupButton from './ClosePopupButton';
import { floorToTwoDecimals } from '@/lib/utils';

const LowBalance = ({
  onClose,
  onCancel,
  balance,
  pendingAmount
}: BasePopupProps) => {
  const totalBalance = floorToTwoDecimals(Number(balance + pendingAmount) || 0);
  return (
    <BasePopup>
      <div className="top">
        <FiAlertTriangle className="text-[#FFE033] mx-auto w-[45px] h-[45px] mb-4" />
        <h2 className="text-white text-center uppercase text-[26px] font-bold leading-[92%] tracking-[1.2px]">
          Low balance alert
        </h2>
      </div>
      <div className="center flex flex-col gap-4">
        <div className="rounded-[10px] px-[14px] py-[12px] bg-[rgba(79,42,125,0.80)] flex flex-col gap-2">
          <div className="row flex justify-between gap-2">
            <p className="text-white text-center text-[15px] font-semibold leading-[110%] tracking-[0.44px]">
              Available Balance:
            </p>
            <span className="text-[#5AFE51] text-center text-[18px] font-semibold leading-[110%] tracking-[0.8px]">
              SC {balance}
            </span>
          </div>
          <div className="row flex justify-between gap-2">
            <p className="text-white text-center text-[15px] font-semibold leading-[110%] tracking-[0.44px]">
              Pending Redemption:
            </p>
            <span className="text-[#5AFE51] text-center text-[18px] font-semibold leading-[110%] tracking-[0.8px]">
              SC {pendingAmount}
            </span>
          </div>
          <hr className="border-gray-300"></hr>
          <div className="row flex justify-between gap-2">
            <p className="text-white text-center text-[15px] font-semibold leading-[110%] tracking-[0.44px]">
              Total Account Value:
            </p>
            <span className="text-[#5AFE51] text-center text-[18px] font-semibold leading-[110%] tracking-[0.8px]">
              SC {totalBalance}
            </span>
          </div>
        </div>
        <p className="text-white text-center text-[15px] font-semibold leading-[110%] tracking-[0.44px]">
          Your playing balance is getting low. You can cancel your pending
          redemption to continue playing.
        </p>
      </div>

      <div className="bottom w-full flex flex-col gap-2">
        <WithdrawalStatusButton
          state="active-gold"
          btnText="Cancel Redemption"
          onClick={onCancel}
					name="cancel_redemption"
          featureName="low_balance_popup"
        />
        <WithdrawalStatusButton
          state="view"
          btnText="Return & Play"
          onClick={onClose}
					name="return_and_play"
          featureName="low_balance_popup"
        />
        <WithdrawalStatusButton
          state="view"
          btnText={
            <div className="flex justify-center items-center">
              <Image
                alt="coins-lz"
                src={'/withdrawal_imgs/coins_lz_btn.png'}
                width={70}
                height={90}
              ></Image>
              BUY COINS
            </div>
          }
          onClick={() => {
            window.postMessage({ name: UIEvents.ShowBuyMenu, data: {} }, window.origin);
            onClose();
          }}
					name="buy_coins"
          featureName="low_balance_popup"
        />
      </div>

      <ClosePopupButton
        onClick={onClose}
        name="close_popup"
        featureName="low_balance_popup"
      />
    </BasePopup>
  );
};

export default LowBalance;
