'use client'
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";


export const CompleteTitle = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timeout);
  }, []);

  const iconStyle: React.CSSProperties = {
    transition: "opacity 0.4s ease, transform 0.4s ease",
    opacity: visible ? 1 : 0,
    transform: visible ? "scale(1)" : "scale(0.5)",
  };

  const contentStyles = "CompleteTitle w-full font-['Exo_2'] flex flex-row items-center justify-start gap-2 sm:gap-3";

  return (
    <div className={contentStyles}>
      <div className="icon border border-[3px] border-[#1CB946] w-[44px] h-[44px] min-w-[44px] rounded-full flex items-center justify-center sm:w-[54px] sm:h-[54px] sm:min-w-[54px]" style={iconStyle}>
        <FiCheck className="w-[24px] h-[24px] sm:w-[34px] sm:h-[34px]" size={34} color="#1CB946" />
      </div>
      <div className="content">
        <h3 className="pb-1 text-white text-start text-[20px] font-semibold leading-[88%] tracking-[0.88px] sm:text-[22px]">Request Successful!</h3>
        <p className="text-white/60 text-[14px] text-start font-semibold leading-[100%] tracking-[0.56px]">
          Your cash prize will be sent to your bank account
        </p>
      </div>
    </div>
  );
};
