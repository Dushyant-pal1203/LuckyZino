import clsx from "clsx";
import { FaExclamationCircle } from "react-icons/fa";

interface WithdrawalInfoProps {
  state?: "taxInfo" | "bankInfo" | "confirmInfo";
}

export const WithdrawalInfo = ({ state = "taxInfo" }: WithdrawalInfoProps) => {
  const containerStyles = "withdrawalInfo-container w-full flex flex-col items-center justify-center gap-3 font-['Exo_2'] text-white";
  const mainInfoStyles = clsx(
    "w-full px-[14px] py-[8px] text-start rounded-[10px]",
    state === "taxInfo" && "bg-[rgba(197,161,13,0.12)]",
    state === "bankInfo" && "bg-[rgba(12,196,74,0.20)]",
    state === "confirmInfo" && "bg-[rgba(55,148,255,0.12)]",
  );
  const titleStyles = clsx(
    "text-[16px] font-semibold leading-[100%] tracking-[0.64px] flex items-center gap-2 pb-2",
    state === "taxInfo" && "text-[#F9B241]",
    state === "bankInfo" && "text-[#56CB90]",
    state === "confirmInfo" && "text-[#7BB0FF]",
  );
  const textStyles = clsx(
    "text-[12px] font-semibold leading-[130%] tracking-[0.28px] pb-1",
    state === "taxInfo" && "text-[#E6E6E6]",
    state === "bankInfo" && "text-[#E6E6E6]",
    state === "confirmInfo" && "text-[#7BB0FF]",
  );
  const subTextStyles = "w-full max-w-[346px] text-white/60 text-center text-[12px] font-semibold leading-[108%] tracking-[0.48px] capitalize";

  const taxInfoTitle = "Tax information required";
  const taxInfoText = "For Redeems over $600, you will need to complete tax form W-9 (US) before your redemption request is processed.";
  const taxInfoSubText = "Estimated processing time: 2-5 business days All Prize Redemptions Are Processed Through AptPay.";

  const bankInfoTitle = "Redeem Information:";
  const bankInfoText = "Amount: $850.00";
  const bankInfoText2 = "Bank Account: Bank of America ****4567";
  const bankInfoSubText = "Tax information is required by US regulations for reporting purposes and will be shared with the IRS.";

  const confirmInfoText = "A confirmation email has been sent to your address";

  const subText = state === "taxInfo" ? taxInfoSubText : state === "bankInfo" ? bankInfoSubText : null;

  const taxInfoComponent =
    <div className={mainInfoStyles}>
      <div className={titleStyles}>
        <FaExclamationCircle className="h-4 w-4 text-[#F9B241]" />
        <span>{taxInfoTitle}</span>
      </div>
      <p className={textStyles}>{taxInfoText}</p>
    </div>

  const bankInfoComponent =
    <div className={mainInfoStyles}>
      <div className={titleStyles}>
        <span>{bankInfoTitle}</span>
      </div>
      <p className={textStyles}>{bankInfoText}</p>
      <p className={textStyles}>{bankInfoText2}</p>
    </div>

  const confirmInfoComponent =
    <div className={mainInfoStyles}>
      <p className={textStyles}>{confirmInfoText}</p>
    </div>

  return (
    <div className={containerStyles}>
      {state === "taxInfo" && taxInfoComponent}
      {state === "bankInfo" && bankInfoComponent}
      {state === "confirmInfo" && confirmInfoComponent}
      {subText && <p className={subTextStyles}>{subText}</p>}
    </div>
  );
};
