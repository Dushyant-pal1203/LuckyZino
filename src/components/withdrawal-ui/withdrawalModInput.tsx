'use client';

import { useState, useRef, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import TooltipContentWrapper from '../ui/tooltipContentWrapper';
import clsx from 'clsx';

interface WithdrawalInputProps {
  maxValue: number;
  exchangeRate?: number;
  currency?: string;
  onAmountChange?: (amount: string) => void;
  maxAmountPerTime?: number;
}

export const WithdrawalModInput = ({
  maxValue,
  exchangeRate = 1,
  currency = '$',
  onAmountChange,
  maxAmountPerTime = Infinity,
}: WithdrawalInputProps) => {
  const [amount, setAmount] = useState('');
  const [showMinAmountTooltip, setShowMinAmountTooltip] = useState(false);
  const [exceedsLimit, setExceedsLimit] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const converted = amount ? parseFloat(amount.replace(',', '.')) * exchangeRate : 0;
  const numericValue = amount ? parseFloat(amount.replace(',', '.')) : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (maxValue <= 0 || maxAmountPerTime === 0) return;

    // regular expression: up to 5 digits before the decimal point, up to 2 digits after
    const regex = /^\d{0,5}(?:\.\d{0,2})?$/;

    value = value.replace(',', '.');

    if (!regex.test(value) && value !== '') return;

    setAmount(value);
    onAmountChange?.(value);

    const numeric = parseFloat(value) || 0;
    setExceedsLimit(numeric > maxValue || numeric > maxAmountPerTime);
    setShowMinAmountTooltip(numeric < 100 && numeric > 0);
  };

  const handleBlur = () => {
    if (amount && (numericValue < 100 || isNaN(numericValue))) {
      setShowMinAmountTooltip(true);
      setTimeout(() => setShowMinAmountTooltip(false), 3000);
    } else {
      setShowMinAmountTooltip(false);
    }

    if (numericValue > 0) {
      const corrected = Math.min(Math.max(numericValue, 100), maxValue, maxAmountPerTime);
      if (corrected !== numericValue) {
        const correctedStr = corrected.toFixed(2).replace(/\.?0+$/, '');
        setAmount(correctedStr);
        onAmountChange?.(correctedStr);
        setExceedsLimit(corrected > maxValue || corrected > maxAmountPerTime);
      }
    }
  };

  useEffect(() => {
    const span = spanRef.current;
    const input = inputRef.current;

    if (span && input) {
      const displayValue = amount || '0.00';
      span.textContent = displayValue;
      const newWidth = Math.max(span.offsetWidth + 2, 110); // 110px — min-width
      input.style.width = `${newWidth}px`;
    }
  }, [amount]);

  const withdrawalModInputStyles = 'mod-input flex flex-col items-center w-full text-white font-["Exo_2"]';
  const headerStyles = 'text-white text-center text-[23px] font-semibold leading-[112%] tracking-[0.92px] mb-6';
  const modContentStyles = 'flex items-center justify-center text-[49.5px] font-bold tracking-[1.98px] leading-none mb-3.5';
  const coinFieldStyles = 'flex items-center gap-1 text-center text-[#9469B1] text-[12px] font-semibold leading-[104%] tracking-[0.72px]';

  const amountStyles = "flex flex-row items-center justify-center gap-6 text-[#9469B1] mb-3";
  const textStyles = "font-semibold text-[14px] leading-[100%] tracking-[0.56px]";
  const currencyStyles = "text-[#57E576] text-center text-[14px] font-bold tracking-[0.88px] [text-shadow:0px_1.5px_0px_#241056]";
  const coinRateStyles = "coin-rate flex flex-row items-center justify-center gap-1 font-semibold text-[14px] leading-[88%] tracking-[0.56px]";
  const sweepCoinsIcon = "sweep-coins-icon w-3 h-3";
  const disabledCurrencyStyles = "text-[rgba(87, 229, 118, 0.50);]";

  const coinsIconPath = "/withdrawal_imgs/SweepCoinsIcon.png";

  return (
    <div className={withdrawalModInputStyles}>
      <h2 className={headerStyles}>How many Sweeps Coins would you like to redeem?</h2>

      <div className={amountStyles}>
        <div className="flex flex-row items-center justify-center gap-1">
          <span className={textStyles}>Balance: </span>
          <h3 className={currencyStyles}>{`SC ${maxValue}`}</h3>
        </div>
        <div className={coinRateStyles}>
          <img src={coinsIconPath} className={sweepCoinsIcon}></img>
          <p>1 = <span>$1</span></p>
        </div>
      </div>

      <TooltipProvider delayDuration={550}>
        <Tooltip open={showMinAmountTooltip || exceedsLimit || undefined}>
          {!showMinAmountTooltip && !exceedsLimit && (
            <TooltipContent className="max-w-md mb-[-10px]">
              <TooltipContentWrapper>
                <p>Enter the Redeem amount</p>
              </TooltipContentWrapper>
            </TooltipContent>
          )}
          {showMinAmountTooltip && (
            <TooltipContent className="max-w-md mb-[-10px]">
              <TooltipContentWrapper>
                <p>The minimum redeemable amount is $100</p>
              </TooltipContentWrapper>
            </TooltipContent>
          )}
          <TooltipTrigger className="w-[min-content]">
            <div className={modContentStyles} onClick={() => inputRef.current?.focus()}>
              <span className={maxAmountPerTime === 0 ? disabledCurrencyStyles : 'text-[#57E576]'}>SC</span>
              <div className="relative inline-block w-full ml-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={amount}
                  onChange={handleChange}
                  inputMode="decimal"
                  pattern="[0-9]*[,.]?[0-9]{0,2}"
                  autoComplete="off"
                  placeholder={amount ? "" : "0.00"}
                  onBlur={handleBlur}
                  disabled={maxAmountPerTime === 0}
                  className={clsx(
                    'bg-transparent text-white text-start w-full min-w-[110px] outline-none caret-white',
                    'placeholder-white/40 focus:placeholder-white/40',
                    maxAmountPerTime === 0 && 'cursor-not-allowed opacity-50'
                  )}
                />

                <span
                  ref={spanRef}
                  className="spanForAdaptiveInputWidth invisible absolute left-0 whitespace-pre text-[49.5px] font-normal"
                  style={{ fontFamily: 'inherit', padding: 0 }}
                >
                  {amount || '0.00'}
                </span>
              </div>
            </div>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      {exceedsLimit && <p className='text-[#EF5A5A] text-center text-[14px] font-semibold leading-[104%] tracking-[0.48px] mb-3'>The redeemed value exceeds Request Limit</p>}

      <div className={coinFieldStyles}>
        <span>The redeemed value of your sweepstakes <br /> prize will be {currency}{converted.toFixed(2)}</span>
      </div>
    </div>
  );
};
