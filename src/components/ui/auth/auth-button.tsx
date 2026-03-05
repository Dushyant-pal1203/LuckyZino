import { TrackerEvents } from '@/enum/trackers';
import { sendBIEvent } from '@/lib/trackers';
import React from 'react';

interface AuthButtonProps extends React.ComponentProps<'button'> {
  variant?: 'secondary' | 'primary';
  featureName?: string;
}

export const AuthButton = ({
  disabled = false,
  children,
  type = 'button',
  className,
  variant = 'primary',
  name="",
  featureName="none",
  onClick
}: AuthButtonProps) => {
  const backgroundImage =
    variant === 'secondary'
      ? '/images/btns/btn-secondary.png'
      : '/images/btns/btn-base.png';

  const innerBackgroundImage =
    variant === 'secondary' ? 'none' : 'url(/images/btns/btn-primary.png)';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: name, feature_name: featureName }
    });
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      }}
      onClick={handleClick}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className={`w-full max-w-[21.2rem] object-contain relative bg-contain bg-no-repeat p-[0.23rem] bg-center h-14 text-white uppercase font-extrabold text-[20px] leading-[20px] tracking-[0.8px] [text-shadow:0_2px_0_rgba(0,0,0,0.2)] rounded-lg transition hover:bg-transparent hover:brightness-110 ${className}`}
    >
      <div
        className={`relative w-[98%] m-auto h-full object-fit bg-contain bg-no-repeat bg-center rounded-[26px] py-3 px-2  ${disabled ? '' : 'hover:brightness-110'} ${disabled ? 'grayscale' : ''}`}
        style={{ backgroundImage: `${innerBackgroundImage}` }}
      >
        {children}
      </div>
    </button>
  );
};
