export const FormContainer = ({ children, className, backgroundClassName }: { children: React.ReactNode, className?: string, backgroundClassName?:string }) => {
  return (
    <div className={`w-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.6)] !mt-0 rounded-xl flow-root relative p-6 pt-4 pb-5 gradient-border-mask font-['Exo_2'] text-white ${className ?? ''}`}>
      <div className={`absolute top-0 left-0 w-full h-full rounded-[0.935rem] bg-[#1a0e48] opacity-90 ${backgroundClassName ?? ''}`} />
      {children}
    </div>
  );
};