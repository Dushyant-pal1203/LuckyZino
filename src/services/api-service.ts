import { serverRequest } from '@/services/server-request';
import {
	ForgotPasswordDto,
	RefreshTokenEntity,
	ResendMailDto,
	ResetPasswordDto,
	SignInDto,
	SignInEntity,
	SignUpDto,
	TokenDto
} from '@/types/auth';
import { checkRecaptcha } from '@/lib/utils';
import {
	ComplianceDepositDto,
	ComplianceOnboardingDto,
	ComplianceWithdrawalDto
} from '@/schemas/kyc';
import { KycTierStateRequest, KycTierStateUpdate, KycUserProfile, KycUserTierState } from '@/types/kyc';
import {
	AccountsResponse,
	GetWithdrawalHistoryDto,
	WithdrawalCancelResponse,
	WithdrawalHistoryResponse,
	WithdrawalOpenBankingResponse,
	WithdrawalRequestDto,
	WithdrawalTransactionResponse
} from '@/types/withdrawal';
import { VipChatDto } from '@/types/support';
import {
  VerifyAndSaveUserOtpTokenRequest, CheckUserOtpVerificationExistsResponse, CheckUserOtpVerificationRequiredResponse
} from '@/types/otp';
import {
  ApplePayAuthorizedRequest,
  ApplePayAuthorizedResponse,
  ApplePayValidateMerchantRequest,
} from '@/types/applepay';
import { HelpshiftUserInfo } from '@/types/helpshift';
import { OtpTriggerSource } from '@/types/enums/otp';

interface AuthApiService {
	signUp: (signUpDto: SignUpDto, recaptcha: string, geoToken: string) => Promise<void>;
	signIn: (signInDto: SignInDto, recaptcha: string, geoToken: string) => Promise<SignInEntity>;
	forgotPassword: (forgotDto: ForgotPasswordDto, recaptcha: string) => Promise<void>;
	resetPassword: (resetDto: ResetPasswordDto, recaptcha: string) => Promise<void>;
	googleSignIn: (googleDto: TokenDto, geoToken: string) => Promise<SignInEntity>;
	refreshToken: (refreshDto: TokenDto) => Promise<RefreshTokenEntity>;
	confirmEmail: (confirmDto: TokenDto, geoToken: string) => Promise<SignInEntity>;
	resendEmail: (resendMailDto: ResendMailDto, recaptcha: string) => Promise<void>;
	facebookSignIn: (facebookDto: TokenDto, geoToken: string) => Promise<SignInEntity>;
}

interface KycApiService {
	kycOnboarding: (complianceDto: ComplianceOnboardingDto) => Promise<KycUserTierState>;
	kycDeposit: (complianceDto: ComplianceDepositDto) => Promise<KycUserTierState>;
	kycWithdrawal: (complianceDto: ComplianceWithdrawalDto) => Promise<KycUserTierState>;
	getUserTierState: (tierStateRequest: KycTierStateRequest) => Promise<KycUserTierState>;
	updateUserTierState: (tierStateUpdate: KycTierStateUpdate) => Promise<KycUserTierState>;
	getUserProfile: () => Promise<KycUserProfile>;
}

interface WithdrawalApiService {
	getAccounts: () => Promise<AccountsResponse>;
	getOpenBanking: () => Promise<WithdrawalOpenBankingResponse>;
	getHistory: (historyDto: GetWithdrawalHistoryDto) => Promise<WithdrawalHistoryResponse>;
	createTransaction: (transactionDto: WithdrawalRequestDto) => Promise<WithdrawalTransactionResponse>;
	cancelTransaction: () => Promise<WithdrawalCancelResponse>;
}

interface SupportApiService {
	getVipChatInfo: () => Promise<VipChatDto>;
}

interface UserApiService {
  verifyAndSaveUserOtpToken: (verifyAndSaveUserOtpTokenRequest: VerifyAndSaveUserOtpTokenRequest) => Promise<void>;
  checkUserOtpVerificationExists: () => Promise<CheckUserOtpVerificationExistsResponse>;
  checkUserOtpVerificationRequired: (source: OtpTriggerSource) => Promise<CheckUserOtpVerificationRequiredResponse>;
}

interface HelpshiftApiService {
  getUserInfo: () => Promise<HelpshiftUserInfo>
}

interface PaymentsApiService {
  applePayValidateMerchant: (req: ApplePayValidateMerchantRequest) => Promise<any>; // Apple merchantSession JSON
  applePayPaymentAuthorized: (req: ApplePayAuthorizedRequest) => Promise<ApplePayAuthorizedResponse>;
}

export const authApiService: AuthApiService = {
	signUp: async (signUpDto, recaptcha, geoToken) => {
		checkRecaptcha(recaptcha);

		return await serverRequest(
			'/auth/sign-up',
			{
				requestInit: { method: 'POST' },
				body: signUpDto
			},
			false,
			recaptcha,
			geoToken
		);
	},

	signIn: async (signInDto, recaptcha, geoToken) => {
		checkRecaptcha(recaptcha);

		return await serverRequest<SignInEntity>(
			'/auth/sign-in',
			{
				requestInit: { method: 'POST' },
				body: signInDto
			},
			false,
			recaptcha,
			geoToken
		);
	},

	refreshToken: async (refreshDto) =>
		await serverRequest<RefreshTokenEntity>(
			'/auth/refresh-token',
			{
				requestInit: { method: 'POST' },
				body: refreshDto
			},
			false
		),

	googleSignIn: async (googleDto, geoToken) =>
		await serverRequest<SignInEntity>(
			'/auth/google',
			{
				requestInit: { method: 'POST' },
				body: googleDto
			},
			false,
			undefined,
			geoToken,
		),

	confirmEmail: async (confirmDto, geoToken) =>
		await serverRequest<SignInEntity>(
			'/auth/confirm-email',
			{
				requestInit: { method: 'POST' },
				body: confirmDto
			},
			false,
			undefined,
			geoToken,
		),

	resendEmail: async (resendMailDto, recaptcha) => {
		checkRecaptcha(recaptcha);
		return await serverRequest(
			'/auth/resend-confirmation-email',
			{
				requestInit: { method: 'POST' },
				body: resendMailDto
			},
			false,
			recaptcha,
		)
	},

	forgotPassword: async (forgotDto, recaptcha) => {
		checkRecaptcha(recaptcha);

		await serverRequest(
			'/auth/forgot-password',
			{
				requestInit: { method: 'POST' },
				body: forgotDto
			},
			false,
			recaptcha
		);
	},

	resetPassword: async (resetDto, recaptcha) => {
		checkRecaptcha(recaptcha);

		await serverRequest(
			'/auth/reset-password',
			{
				requestInit: { method: 'POST' },
				body: resetDto
			},
			false,
			recaptcha
		);
	},

	facebookSignIn: async (facebookDto, geoToken) =>
		await serverRequest<SignInEntity>(
			'/auth/facebook',
			{
				requestInit: { method: 'POST' },
				body: facebookDto
			},
			false,
			undefined,
			geoToken
		),
};

export const kycApiService: KycApiService = {
	kycOnboarding: async (complianceDto) =>
		await serverRequest<KycUserTierState>(
			'/kyc/onboarding',
			{
				requestInit: { method: 'POST' },
				body: complianceDto
			},
			true
		),

	kycDeposit: async (complianceDto) =>
		await serverRequest<KycUserTierState>(
			'/kyc/deposit',
			{
				requestInit: { method: 'POST' },
				body: complianceDto
			},
			true
		),

	kycWithdrawal: async (complianceDto) =>
		await serverRequest<KycUserTierState>(
			'/kyc/withdrawal',
			{
				requestInit: { method: 'POST' },
				body: complianceDto
			},
			true
		),

	getUserTierState: async (tierStateRequest) =>
		await serverRequest<KycUserTierState>(
			'/kyc/tier-state',
			{
				requestInit: { method: 'POST' },
				body: tierStateRequest
			},
			true
		),

	updateUserTierState: async (tierStateUpdate) =>
		await serverRequest<KycUserTierState>(
			'/kyc/tier-state',
			{
				requestInit: { method: 'PUT' },
				body: tierStateUpdate
			},
			true
		),

	getUserProfile: async () =>
		await serverRequest<KycUserProfile>(
			'/kyc/profile',
			{
				requestInit: { method: 'GET' }
			},
			true
		)
};

export const withdrawalApiService: WithdrawalApiService = {
	getAccounts: async () =>
		await serverRequest<AccountsResponse>(
			'/v1/cash-out/account',
			{
				requestInit: { method: 'POST' }
			},
			true
		),

	getOpenBanking: async () =>
		await serverRequest<WithdrawalOpenBankingResponse>(
			'/v1/cash-out/account/open-banking',
			{
				requestInit: { method: 'GET' }
			},
			true
		),

	getHistory: async (historyDto) =>
		await serverRequest<WithdrawalHistoryResponse>(
			`/v1/cash-out/history?offset=${historyDto.offset}&limit=${historyDto.limit}`,
			{
				requestInit: { method: 'GET' },
			},
			true
		),

	createTransaction: async (transactionDto) =>
		await serverRequest<WithdrawalTransactionResponse>(
			'/v1/cash-out/transaction',
			{
				requestInit: { method: 'POST' },
				body: transactionDto
			},
			true
		),

	cancelTransaction: async () =>
		await serverRequest<WithdrawalCancelResponse>(
			'/v1/cash-out/transaction/cancel',
			{
				requestInit: { method: 'POST' }
			},
			true
		),
}

export const supportApiService: SupportApiService = {
	getVipChatInfo: async () =>
		await serverRequest<VipChatDto>(
			'/support/vip-chat',
			{
				requestInit: { method: 'GET' }
			},
			true
		),
}

export const userApiService: UserApiService = {
  verifyAndSaveUserOtpToken: async (verifyAndSaveUserOtpTokenRequest: VerifyAndSaveUserOtpTokenRequest) =>
    await serverRequest<void>(
      '/user/phone-verification/verify-token',
      {
        requestInit: { method: 'POST' },
        body: verifyAndSaveUserOtpTokenRequest
      },
      true
    ),
  checkUserOtpVerificationExists: async () =>
    await serverRequest<CheckUserOtpVerificationExistsResponse>(
      '/user/phone-verification/exists',
      {
        requestInit: { method: 'GET' },
      },
      true
    ),
  checkUserOtpVerificationRequired: async (source: OtpTriggerSource) =>
    await serverRequest<CheckUserOtpVerificationRequiredResponse>(
      `/user/phone-verification/required/${source}`,
      {
        requestInit: { method: 'GET' },
      },
      true
    ),
}

export const paymentsApiService: PaymentsApiService = {
  applePayValidateMerchant: async (req) =>
    await serverRequest<any>(
      '/billing/v1/apple-pay/validate-merchant',
      {
        requestInit: { method: 'POST' },
        body: req,
      },
      true
    ),

  applePayPaymentAuthorized: async (req) =>
    await serverRequest<ApplePayAuthorizedResponse>(
      '/billing/v1/apple-pay/payment-authorized',
      {
        requestInit: { method: 'POST' },
        body: req,
      },
      true
    ),
};

export const helpshiftApiService: HelpshiftApiService = {
  getUserInfo: async () =>
    await serverRequest(
      '/helpshift/user',
      {
        requestInit: { method: 'GET' }
      },
      true
    )
}
