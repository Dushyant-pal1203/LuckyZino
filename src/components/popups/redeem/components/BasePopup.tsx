import { ReactNode } from 'react';

const BasePopup = ({ children }: { children: ReactNode }) => {
  const containerPopupStyles =
    'background-overlay fixed inset-0 w-full h-full bg-[#241056CC] flex justify-center items-center z-[1]';
  const bgPopupStyles =
    'absolute flex p-[4px] z-[2] inset-0 w-full h-fit min-h-[374px] max-w-[373px] m-auto bg-[url("/withdrawal_imgs/Popup_BG.png")] bg-[length:110%_105%] bg-center bg-no-repeat rounded-[22.55px] border-[2.733px] border-[#F652FF] shadow-[inset_0_-0.683px_2.733px_0_#9665CB,0_5.467px_0_0_#5F1FCE,0_8.2px_5.057px_2.733px_rgba(0,0,0,0.25)]';
  const contentPopupStyles =
    'relative px-[18px] py-[22px] flex flex-col gap-10 items-center justify-center flex-[1_1_auto] min-h-inherit rounded-[18px] border-[2.733px] border-[rgba(255, 255, 255, 0.63)] shadow-[0_3.966px_3.172px_0_rgba(74,9,100,0.28),inset_0_0_0.238px_1.586px_#fd8dff,0_0_10px_4px_rgba(204,0,255,0.92),inset_0_0_10px_4px_rgba(204,0,255,0.92)]';
  return (
    <div className={containerPopupStyles}>
      <div className={bgPopupStyles}>
        <div className={contentPopupStyles}>{children}</div>
      </div>
    </div>
  );
};
export default BasePopup;
