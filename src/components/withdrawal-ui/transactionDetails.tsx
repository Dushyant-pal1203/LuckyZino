'use client';

import React from 'react';
import { RedeemStatusText } from './redeemStatusText';
import { WithdrawalTransactionResponse } from '@/types/withdrawal';

interface TransactionDetailsProps {
  data: WithdrawalTransactionResponse;
}

export const TransactionDetails = ({ data }: TransactionDetailsProps) => {
  const { amount, createdAt, id, lastFourDigits, status, title } = data;
  const statusTextStyles = 'text-[18px] font-bold leading-[100%] tracking-[0.88px]';

  return (
    <div className="font-['Exo_2']text-white w-full mx-auto px-2 py-4">
      <h2 className="text-center text-[22px] font-semibold leading-[88%] tracking-[0.88px] mb-3">
        Transaction details
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between border-b border-[rgba(235,235,235,0.5)] pb-3">
          <span className="text-white/60 font-semibold text-[18px] leading-[100%] tracking-[0.72px]">
            Amount:
          </span>
          <span className="text-[22px] font-bold leading-[100%] tracking-[0.88px] text-[#57E576]">
            ${amount}
          </span>
        </div>

        <div className="flex justify-between border-b border-[rgba(235,235,235,0.5)] pb-3">
          <span className="text-white/60 font-semibold text-[18px] leading-[100%] tracking-[0.72px]">
            Bank account:
          </span>
          <span className="text-[18px] font-bold leading-[100%] tracking-[0.88px] text-white">
            &#42;&#42;&#42;&#42;{lastFourDigits}
          </span>
        </div>

        {!title || title === '' && (
          <div className="flex justify-between border-b border-[rgba(235,235,235,0.5)] pb-3">
            <span className="text-white/60 font-semibold text-[18px] leading-[100%] tracking-[0.72px]">
              Bank name:
            </span>
            <span className="text-[18px] font-bold leading-[100%] tracking-[0.88px] text-white">
              {title}
            </span>
          </div>
        )}

        <div className="flex justify-between border-b border-[rgba(235,235,235,0.5)] pb-3">
          <span className="text-white/60 font-semibold text-[18px] leading-[100%] tracking-[0.72px]">
            Reference ID:
          </span>
          <span className="text-[18px] font-bold leading-[100%] tracking-[0.88px] text-white">
            {id}
          </span>
        </div>

        <div className="flex justify-between border-b border-[rgba(235,235,235,0.5)] pb-3">
          <span className="text-white/60 font-semibold text-[18px] leading-[100%] tracking-[0.72px]">
            Request date:
          </span>
          <span className="text-[18px] font-bold leading-[100%] tracking-[0.88px] text-white">
            {createdAt}
          </span>
        </div>

        <div className="flex justify-between border-b border-[rgba(235,235,235,0.5)] pb-3">
          <span className="text-white/60 font-semibold text-[18px] leading-[100%] tracking-[0.72px]">
            Current status:
          </span>
          <RedeemStatusText status={status} textStyles={statusTextStyles} />
        </div>
      </div>
    </div>
  );
};
