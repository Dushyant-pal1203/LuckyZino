import { WithdrawalTransactionStatus } from "@/enum/withdrawalUi";

export const RedeemStatusText = ({ status, textStyles }: { status: WithdrawalTransactionStatus, textStyles: string }) => {
  const statusColor: { [key in WithdrawalTransactionStatus]: string } = {
    [WithdrawalTransactionStatus.IN_PROCESS]: 'text-[#DEAE29]',
    [WithdrawalTransactionStatus.PENDING]: 'text-[#DEAE29]',
    [WithdrawalTransactionStatus.OK]: 'text-[#DEAE29]',
    [WithdrawalTransactionStatus.SETTLED]: 'text-[#57E576]',
    [WithdrawalTransactionStatus.CANCELED]: 'text-[#EF5A5A]',
    [WithdrawalTransactionStatus.FAILED]: 'text-[#EF5A5A]',
  };

  const statusDisplayText: { [key in WithdrawalTransactionStatus]: string } = {
    [WithdrawalTransactionStatus.IN_PROCESS]: 'IN PROCESS',
    [WithdrawalTransactionStatus.PENDING]: 'PENDING',
    [WithdrawalTransactionStatus.OK]: 'IN PROCESS',
    [WithdrawalTransactionStatus.SETTLED]: 'COMPLETED',
    [WithdrawalTransactionStatus.CANCELED]: 'CANCELED',
    [WithdrawalTransactionStatus.FAILED]: 'FAILED',
  };

  return (
    <span className={`${textStyles} ${statusColor[status as WithdrawalTransactionStatus]}`}>
      {statusDisplayText[status as WithdrawalTransactionStatus]}
    </span>
  );
};
