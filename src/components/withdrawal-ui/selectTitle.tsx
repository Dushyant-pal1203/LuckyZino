

interface SelectTitleProps {
  isRequired?: boolean;
  title?: string
}
export const SelectTitle = ({title = 'Select Type', isRequired = false}: SelectTitleProps) => {
  const contentStyles = "w-full font-['Exo_2'] flex flex-col items-center justify-center";

  return (
    <div className={contentStyles}>
      <h3 className="pb-1 text-white text-center text-[22px] font-semibold leading-[88%] tracking-[0.88px]">{title}</h3>
      {isRequired && <p className="text-white/60 text-[14px] font-semibold leading-[100%] tracking-[0.56px]">Required for redeems over $600</p>}
    </div>
  );
};
