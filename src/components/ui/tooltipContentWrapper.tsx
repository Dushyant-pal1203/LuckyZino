import React from 'react';

const TooltipContentWrapper = ({ children }: { children: React.ReactNode }) => {
  const contentStyles = "text-white text-center font-semibold text-[14px] leading-[88%] tracking-[0.56px] font-['Exo_2']"

  return (
    <div className='relative bg-[url("/images/TooltipContentBG.png")] bg-[length:100%_100%] bg-center bg-no-repeat px-8 pt-8 pb-12'>
      <div className={contentStyles}>
        {children}
      </div>
    </div>
  );
};

export default TooltipContentWrapper;
