import { z } from 'zod';
import { isPhoneNumber } from 'class-validator';
import { KycUserProfile } from '@/types/kyc';

export const personalInfoSchema = z.object({
	firstName: z.string().min(2, 'First name is required'),
	lastName: z.string().min(2, 'Last name is required'),
	dob: z
		.string()
		.refine((val) => {
			const date = new Date(val);
			const today = new Date();
			const minAge = 18;
			const age = today.getFullYear() - date.getFullYear();
			return age > minAge ||
				(age === minAge &&
					(today.getMonth() > date.getMonth() ||
						(today.getMonth() === date.getMonth() && today.getDate() >= date.getDate())));
		}, {
			message: 'You must be at least 18 years old'
		}),
	phoneNumber: z
		.string()
		.transform((val) => val.replace(/[^+0-9]/g, ''))
		.transform((val) => val.startsWith('+') ? val : '+' + val)
		.refine((val) => isPhoneNumber(val), {
			message: 'Invalid phone number format'
		}),
});

export const userSchema = z.object({
	firstName: z.string().min(2, 'First name is required'),
	lastName: z.string().min(2, 'Last name is required'),
	dob: z
		.string()
		.refine((val) => {
			const date = new Date(val);
			const today = new Date();
			const minAge = 18;
			const age = today.getFullYear() - date.getFullYear();
			return age > minAge ||
				(age === minAge &&
					(today.getMonth() > date.getMonth() ||
						(today.getMonth() === date.getMonth() && today.getDate() >= date.getDate())));
		}, {
			message: 'You must be at least 18 years old'
		})
});

export const addressSchema = z.object({
	line1: z.string().min(3, 'Street address is required'),
	line2: z.string().optional(),
	country: z.string().length(2, 'Use 2-letter country code'),
	postalCode: z.string().min(3, 'Postal code is required'),
	majorAdminDivision: z.string().min(2, 'State/Province is required'),
	locality: z.string().min(2, 'City is required')
});

export const ssnSchema = z.object({
	ssn: z
		.string()
		.min(9, 'SSN is required and must be 9 digits')
		.regex(/^\d{3}-\d{2}-\d{4}$|^\d{9}$/, 'SSN must be 9 digits or in format XXX-XX-XXXX'),
});

export const socureDiSchema = z.object({
	diSessionToken: z
		.string().min(10, 'There is no diSessionToken'),
})

export const kycSchemaDeposit = z.object({
	address: addressSchema,
});

export const kycSchemaWithdrawal = z.object({
	address: addressSchema,
}).merge(ssnSchema).merge(userSchema);

export const complianceSchemaOnboarding = personalInfoSchema;
export const complianceSchemaDeposit = kycSchemaDeposit;
export const complianceSchemaWithdrawal = kycSchemaWithdrawal;

export type ComplianceOnboardingDto = z.infer<typeof complianceSchemaOnboarding>;
export type ComplianceDepositDto = z.infer<typeof complianceSchemaDeposit> & { priceAmount?: number };
export type ComplianceWithdrawalDto = z.infer<typeof complianceSchemaWithdrawal>;

export const defaultPersonalInfoValue = {
	firstName: '',
	lastName: '',
	dob: '',
	phoneNumber: '',
};

export const defaultAddressValue = {
	line1: '',
	line2: '',
	country: 'US',
	postalCode: '',
	majorAdminDivision: '',
	locality: ''
};

export const defaultSsnValue = {
	ssn: ''
};

export const defaultPriceAmountValue = {
	priceAmount: ''
};

export const defaultSocureDiValue = {
	diSessionToken: ''
};

const getDefaultOnboardingValue = (profile?: KycUserProfile | null) => ({
	...defaultPersonalInfoValue,
	...defaultSocureDiValue,
	firstName: profile?.firstName ?? '',
	lastName: profile?.lastName ?? '',
	dob: profile?.dateOfBirth ?? '',
	phoneNumber: profile?.phone ?? '',
});

const getDefaultDepositValue = (profile?: KycUserProfile | null) => ({
	address: {
		...defaultAddressValue,
		line1: profile?.addressLine1 ?? '',
		line2: profile?.addressLine2 ?? '',
		postalCode: profile?.postalCode ?? '',
		majorAdminDivision: profile?.state ?? '',
		locality: profile?.city ?? '',
		country: profile?.country ?? 'US',
	},
	...defaultPriceAmountValue,
	...defaultSocureDiValue,
});

const getDefaultWithdrawalValue = (profile?: KycUserProfile | null) => ({
	...defaultAddressValue,
	...defaultSsnValue,
	...defaultSocureDiValue,
	address: {
		...defaultAddressValue,
		line1: profile?.addressLine1 ?? '',
		line2: profile?.addressLine2 ?? '',
		postalCode: profile?.postalCode ?? '',
		majorAdminDivision: profile?.state ?? '',
		locality: profile?.city ?? '',
		country: profile?.country ?? 'US',
	},
	ssn: profile?.ssn ?? '',
	firstName: profile?.firstName ?? '',
	lastName: profile?.lastName ?? '',
	dob: profile?.dateOfBirth ?? ''
});

export const getKycSchemaAndDefaultValue = (
	tier: 'onboarding' | 'deposit' | 'withdrawal',
	userKycProfile?: KycUserProfile | null
): [z.ZodObject<any>, any] => {
	switch (tier) {
		case 'onboarding':
			return [complianceSchemaOnboarding, getDefaultOnboardingValue(userKycProfile)];
		case 'deposit':
			return [complianceSchemaDeposit, getDefaultDepositValue(userKycProfile)];
		case 'withdrawal':
			return [complianceSchemaWithdrawal, getDefaultWithdrawalValue(userKycProfile)];
		default:
			throw new Error('Invalid KYC tier');
	}
};
