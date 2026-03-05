'use client';

import { FiAlertTriangle } from 'react-icons/fi';
import { WithdrawalStatusButton } from '../../../withdrawal-ui/withdrawalStatusButton';
import BasePopup from './BasePopup';
import ClosePopupButton from './ClosePopupButton';

import { BasePopupProps } from '../PendingRedeemPopup';

const BalanceUpdated = ({
  onClose,
  onCancel,
  balance,
  pendingAmount
}: BasePopupProps) => {
  return (
    <BasePopup>
      <div className="top">
        <FiAlertTriangle className="text-[#FFE033] mx-auto w-[45px] h-[45px] mb-4" />
        <h2 className="text-white text-center uppercase text-[26px] font-bold leading-[92%] tracking-[1.2px]">
          balance updated
        </h2>
      </div>
      <div className="center flex flex-col gap-4">
        <p className="text-white text-center text-[16px] font-semibold leading-[110%] tracking-[0.44px]">
          Your balance changed during game-play. Your balance out of funds maybe
          you want to cancel redemption?
        </p>
        <div className="rounded-[10px] px-[14px] py-[12px] bg-[rgba(79,42,125,0.80)] flex flex-col gap-2">
          <div className="row flex justify-between gap-2">
            <p className="text-white text-center text-[15px] font-semibold leading-[110%] tracking-[0.44px]">
              Available Balance:
            </p>
            <span className="text-[#5AFE51] text-center text-[18px] font-semibold leading-[110%] tracking-[0.6px]">
              SC {balance}
            </span>
          </div>
          <div className="row flex justify-between gap-2">
            <p className="text-white text-center text-[15px] font-semibold leading-[110%] tracking-[0.44px]">
              Pending Redemption:
            </p>
            <span className="text-[#5AFE51] text-center text-[18px] font-semibold leading-[110%] tracking-[0.6px]">
              SC {pendingAmount}
            </span>
          </div>
        </div>
      </div>

      <div className="bottom w-full flex flex-col gap-2">
        <WithdrawalStatusButton
          state="view"
          btnText="Return & Play"
          onClick={onClose}
          name="return_and_play"
          featureName="balance_updated_popup"
        />
        <WithdrawalStatusButton
          state="active"
          btnText="Cancel Redemption"
          onClick={onCancel}
          name="cancel_redemption"
          featureName="balance_updated_popup"
        />
      </div>

      <ClosePopupButton
        onClick={onClose}
        name="close_popup"
        featureName="balance_updated_popup"
      />
    </BasePopup>
  );
};

export default BalanceUpdated;
