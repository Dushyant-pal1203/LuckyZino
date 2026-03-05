import { FaPlus } from "react-icons/fa6";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import TooltipContentWrapper from "../ui/tooltipContentWrapper";

interface AddAccountButtonProps {
  onClick?: () => void;
  btnText?: string;
}

export const AddAccountButton = ({ onClick = () => { }, btnText = 'Add account' }: AddAccountButtonProps) => {
  const addAccountButtonStyles = "flex flex-row items-center justify-center self-center gap-4 w-full max-w-fit px-4 py-4 mt-[30px] cursor-pointer mx-auto";
  const addAccountContentStyles = "flex flex-row items-center justify-center self-center gap-4 w-full max-w-fit";
  const addAccountTextStyles = "font-['Exo_2'] text-white text-center font-semibold text-capitalize text-[18px] leading-[88%] tracking-[0.72px] [text-shadow:0px_2px_0px_rgba(0,0,0,0.2)] font-['Exo_2']"
  const addAccountIconStyles = "flex items-center justify-center w-[30px] h-[30px] border border-[0] rounded-[8px] bg-[linear-gradient(90deg,rgba(89,35,184,1)_0%,rgba(154,65,164,1)_100%)]";

  return (
    <TooltipProvider delayDuration={550}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button onClick={onClick} className={addAccountButtonStyles}>
            <div className={addAccountContentStyles}>
              <div className={addAccountIconStyles}>
                <FaPlus color="#fff" />
              </div>
              <span className={addAccountTextStyles}>{btnText}</span>
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipContentWrapper>
            <p>Add bank account</p>
          </TooltipContentWrapper>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
