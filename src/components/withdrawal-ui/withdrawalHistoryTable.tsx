'use client';

import { useEffect, useState, useRef } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import WithdrawalLoader from './withdrawalLoader';
import { RedeemStatusText } from './redeemStatusText';
import { request } from '@/services/request-handler';
import { WithdrawalStep, WithdrawalTransactionStatus } from '@/enum/withdrawalUi';
import { WithdrawalHistoryResponse, WithdrawalTransactionResponse } from '@/types/withdrawal';

interface WithdrawalHistoryTableProps {
  logoSrc?: string;
  onClick?: (tx: WithdrawalTransactionResponse) => void;
  setStep?: (step: WithdrawalStep, data?: any) => void;
}

export const WithdrawalHistoryTable = ({ logoSrc, onClick, setStep }: WithdrawalHistoryTableProps) => {
  const [transactions, setTransactions] = useState<WithdrawalTransactionResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const LIMIT = 10;
  const statusTextStyles = 'text-[11px] font-bold leading-[100%] tracking-[0.44px]';

  const fetchTransactions = async (offset: number) => {
    try {
      setLoading(true);
      const response = await request<WithdrawalHistoryResponse>(`api/withdrawal/history?limit=${LIMIT}&offset=${offset}`);

      if (response && response.data) {
        setTransactions(prev => {
          const existingIds = new Set(prev.map(tx => tx.id));
          const newTransactions = response.data.filter(tx => !existingIds.has(tx.id));
          return [...prev, ...newTransactions];
        });
        setHasMore(response.data.length === LIMIT);
      } else {
        console.error('Failed to fetch withdrawal history: No data received');
        setHasMore(false);
      }
    } catch (e) {
      console.error(`Failed to fetch withdrawal history [${e instanceof Error ? e.message : 'Unknown error'}]`);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTransactions(0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchTransactions(transactions.length);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading, hasMore, transactions.length]);

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const isPendingStatus = (status: WithdrawalTransactionStatus) =>
    [WithdrawalTransactionStatus.PENDING].includes(status);

  return (
    <div className="font-['Exo_2'] flex flex-col h-full w-full">
      <div className="space-y-[18px] py-4">
        {transactions.length === 0 && !loading ? (
          <p className="text-white/60 text-[18px] font-semibold text-center">
            No transaction history available
          </p>
        ) : (
          transactions.map((tx) => {
            const isPending = isPendingStatus(tx.status);

            return (
              <div
                key={tx.id}
                className="space-y-[4px] border-b border-[rgba(235,235,235,0.5)] pb-2 cursor-pointer"
                onClick={() => {
                  if (isPending) {
                    setStep?.(WithdrawalStep.RedeemControl);
                  } else {
                    onClick?.(tx);
                  }
                }}
              >
                {tx.createdAt && (
                  <p className="text-center pb-1 text-white/60 text-[14px] font-semibold leading-[88%] tracking-[0.56px]">
                    {formatDate(tx.createdAt)}
                  </p>
                )}
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="logo rounded-full w-[28px] h-[28px] sm:width-[24px] sm:height-[24px]">
                      {isPending ? (
                        <FiClock className="text-[#FFA347] w-full h-full" />
                      ) : logoSrc ? (
                        <img src={logoSrc} alt="logo" className="rounded-full width-full height-full object-contain" />
                      ) : (
                        <img
                          src="/withdrawal_imgs/bank_icon.png"
                          alt="logo"
                          className="rounded-full width-full height-full object-contain"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 font-['Exo_2']">
                      <p className="text-white text-[14px] font-semibold leading-[100%] tracking-[0.56px]">
                        {tx.title || 'Bank account:'}
                        <span className="text-white/60 text-[12px] font-semibold leading-[100%] tracking-[2.16px]">&nbsp;•••{tx.lastFourDigits}</span>
                      </p>
                      <p className="text-white/60 text-[12px] font-semibold leading-[88%] tracking-[0.48px]">
                        Ref ID: {tx.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col items-end gap-1">
                      <p className="text-white text-[18px] font-bold leading-[100%] tracking-[0.72px whitespace-nowrap">
                        -$ {tx.amount}
                      </p>
                      <RedeemStatusText status={tx.status} textStyles={statusTextStyles} />
                    </div>
                    <FaChevronRight className="text-white/60" />
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={loaderRef} className="flex justify-center items-center py-2 h-[40px] overflow-hidden">
          {loading && <WithdrawalLoader size="38" />}
        </div>
      </div>
    </div>
  );
};
