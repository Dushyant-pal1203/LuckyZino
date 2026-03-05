export enum WithdrawalStep {
  Initial = 'initial',
  Cooldown = 'cooldown',
  SelectAccount = 'selectAccount',
  OpenBankingInfo = 'openBankingInfo',
  TransactionDetails = 'transactionDetails',
  History = 'history',
  RedeemControl = 'redeemControl',
}

export enum StorageKey {
  WithdrawalStepHistory = 'withdrawalStepHistory',
  RedeemCancelPopup = 'redeemCancelPopup',
}

export enum WithdrawalTransactionStatus {
  PENDING = 'PENDING',
  IN_PROCESS = 'IN_PROCESS',
  OK = 'OK',
  SETTLED = 'SETTLED',
  CANCELED = 'CANCELED',
  FAILED = 'FAILED',
}