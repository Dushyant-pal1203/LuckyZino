'use client'

import { FaCheck } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import clsx from 'clsx';

interface BankAccountCardProps {
  id: string
  title: string
  accountType?: string
  accountStatus?: string
  lastFourDigits: string
  logoSrc?: string
  selected?: boolean
  showArrow?: boolean
  onClick?: () => void
}

export const BankAccountCard = ({
  id,
  title,
  lastFourDigits,
  logoSrc,
  selected = false,
  showArrow = false,
  onClick,
}: BankAccountCardProps) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={clsx(
        'flex items-center justify-between w-full gap-3 py-3 px-[20px] rounded-[9px] transition-all cursor-pointer border',
        (!selected && !showArrow) && 'border-transparent hover:border-[#8838A9] hover:bg-gradient-to-t hover:from-[rgba(59,40,99,0.6)] hover:via-transparent hover:via-[100%] hover:to-transparent',
        (selected || showArrow) && 'border-[#8838A9] bg-gradient-to-t from-[rgba(59,40,99,0.6)] via-transparent via-[100%] to-transparent'
      )}
    >
      <div className="flex items-center gap-4">
        <div className="logo rounded-full width-[40px] height-[40px]">
          {logoSrc ? <Image src={logoSrc} alt="logo" width={40} height={40} className="rounded-full" /> : <Image src="/withdrawal_imgs/bank_icon.png" alt="logo" width={40} height={40} className="rounded-full" />}
        </div>
        <div className="flex flex-col font-['Exo_2']">
          <span className="text-[#9A5ACA] text-[12px] font-semibold leading-[12px] tracking-[0.48px]">
            {title}
          </span>
          <span className="text-white text-[16px] font-semibold leading-[16px] tracking-[0.64px]">
            ••••{lastFourDigits}
          </span>
        </div>
      </div>

      {selected && <FaCheck className="text-[#1CB946] text-2xl" />}
      {showArrow && <FaChevronRight className="text-white/60 text-2xl" />}
    </div>
  )
};
