import { TrackerEvents } from '@/enum/trackers';
import { sendBIEvent } from '@/lib/trackers';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface StatusButtonProps {
  state?: 'inactive' | 'active' | 'view' | 'active-gold' | 'inactive-gold';
  onClick?: () => void;
  btnText?: string | ReactNode;
	name?: string;
	featureName?: string;
}

export const WithdrawalStatusButton = ({
  state = 'inactive',
  onClick = () => {},
  btnText = 'button',
	name = "",
	featureName = "",
}: StatusButtonProps) => {
  const statusButtonStyles = clsx(
    'flex w-full max-w-[346px] h-[54px] px-[8px] py-[3px] m-x-auto justify-center items-center self-center bg-[length:100%_100%] bg-center bg-no-repeat transition-all duration-300 cursor-pointer hover:brightness-110',
    {
      "bg-[url('/withdrawal_imgs/btn_inactive.png')] pointer-events-none":
        state === 'inactive',
      "bg-[url('/withdrawal_imgs/btn_green.png')]": state === 'active',
      "bg-[url('/withdrawal_imgs/btn_purple.png')]": state === 'view',
      "bg-[url('/withdrawal_imgs/btn_greenGoldBig.png')] uppercase pb-[12px] h-[62px]":
        state === 'active-gold',
      "bg-[url('/withdrawal_imgs/btn_greenGoldBig.png')] uppercase pb-[12px] h-[62px] pointer-events-none brightness-50":
        state === 'inactive-gold'
    }
  );

  const statusButtonTextStyles =
    "text-white text-center font-semibold text-capitalize text-[18px] leading-[88%] tracking-[0.72px] [text-shadow:0px_2px_0px_rgba(0,0,0,0.2)] font-['Exo_2']";

	const handleClick = () => {
		sendBIEvent(TrackerEvents.ButtonClicked, {
      button: { id: name, feature_name: featureName }
    });
		onClick();
	};

  return (
    <button
      onClick={handleClick}
      className={statusButtonStyles}
      aria-label={`Status: ${state}`}
    >
      <span className={statusButtonTextStyles}>{btnText}</span>
    </button>
  );
};
