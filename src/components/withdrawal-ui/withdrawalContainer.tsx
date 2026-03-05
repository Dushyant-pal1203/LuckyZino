import { ReactNode } from 'react';

interface WithdrawalContainerProps {
  children: ReactNode
}

export const WithdrawalContainer = ({ children }: WithdrawalContainerProps) => {
  const styles = "withdrawal-container font-['Exo_2'] absolute top-0 left-0 w-full h-full min-h-[668px] overflow-y-auto flex flex-col items-center justify-center text-white px-3 py-4";

  return (
    <div className={styles}>
      {children}
    </div>
  );
};
