import { WithdrawalTransactionStatus } from "@/enum/withdrawalUi";
import { SessionContextProp } from "@/hocs/with-auth";

export interface GetWithdrawalHistoryDto {
  offset: number,
  limit: number,
}

export interface WithdrawalRequestDto {
  accountId: string,
  amount: number
}

export interface WithdrawalAccountDto {
  id: string,
  title: string,
  accountType: string,
  accountStatus: string,
  lastFourDigits: string,
}

export interface WithdrawalCancelResponse {
  transactionId: string,
  amount: number,
  balance: number,
}

export interface PendingCashOutInfo {
  id: string,
  amount: number,
  scheduledAtUtc: string,
}

export interface CashOutSettingsModel {
  maxAmountPerWindow: number,
  windowHours: number,
}

export interface CashOutEligibilityModel {
  userType: number,
  minRedeemAmount: number,
  redeemCooldownDays: number,
  nextAvailableAtUtc: string,
  availableNow: boolean,
  availableRedeemableBalance: number
}

export interface AccountsResponse {
  balance: number,
  accounts: WithdrawalAccountDto[],
  settings: CashOutSettingsModel,
  pending: PendingCashOutInfo | null,
  eligibility: CashOutEligibilityModel
}

export interface WithdrawalOpenBankingResponse {
  url: string,
}

export interface WithdrawalTransactionResponse {
  id: string,
  amount: number,
  status: WithdrawalTransactionStatus,
  createdAt: string,
  updatedAt?: string,
  lastFourDigits: string,
  title?: string
}

export interface WithdrawalHistoryResponse {
  total: number,
  data: WithdrawalTransactionResponse[],
}

export interface WithdrawalCardData {
  account?: AccountsResponse;
  history?: WithdrawalHistoryResponse;
  openBanking?: WithdrawalOpenBankingResponse;
}

export interface WithdrawalStepProps {
  data: WithdrawalCardData;
  onNext: (data?: any) => void;
  onBack: () => void;
  setStep: (step: string, options?: Record<string, any>) => void;
  selectedAccountId: string | null;
  setSelectedAccountId: (id: string | null) => void;
  transactionData: WithdrawalTransactionResponse | null;
  setTransactionData: (data: WithdrawalTransactionResponse | null) => void;
  isFromHistoryTable?: boolean;
  updateBalance?: () => Promise<void>;
	sessionContext?: SessionContextProp
}
