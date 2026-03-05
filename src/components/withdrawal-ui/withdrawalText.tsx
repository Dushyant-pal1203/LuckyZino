
export const WithdrawalText = () => {
  const containerStyles = "withdrawalBottomText-container w-full flex flex-col items-center justify-center gap-3 font-['Exo_2'] mb-2";
  const textStyles = "w-full max-w-[346px] text-white text-center text-[18px] font-semibold leading-[104%] tracking-[0.72px]";
  const text = "Where should we send your prize?";

  return (
    <div className={containerStyles}>
      <p className={textStyles}>{text}</p>
    </div>
  );
};
