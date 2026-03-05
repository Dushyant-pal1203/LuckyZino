
interface AvailableWithdrawalProps {
  amount: number;
}

export const AvailableWithdrawal = ({ amount }: AvailableWithdrawalProps) => {
  const styles = "availableWithdrawal-container w-full flex flex-col items-center justify-center gap-1 text-white/60 px-3";
  const amountStyles = "flex flex-row items-center justify-center gap-1";
  const textStyles = "font-semibold text-[18px] leading-[100%] tracking-[0.56px]";
  const currencyStyles = "text-[#57E576] text-center text-[18px] font-bold tracking-[0.88px] [text-shadow:0px_1.5px_0px_#241056]";

  return (
    <div className={styles}>
      <div className={amountStyles}>
        <span className={textStyles}>Available: </span>
        <h3 className={currencyStyles}>{`SC ${amount}`}</h3>
      </div>
    </div>
  );
};
