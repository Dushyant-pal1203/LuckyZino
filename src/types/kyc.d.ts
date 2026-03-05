/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 24/03/2025 23:08
 */

export interface KycUserTierState {
  tier: KycTier;
  status: KycStatus;
  docvToken?: string;
}

export type KycStatus =
  | 'NOT_VERIFIED'
  | 'ON_HOLD'
  | 'IN_PROGRESS'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'REJECTED';

export type SucureDocVSDKStatus =
  | 'WAITING_FOR_USER_TO_REDIRECT'
  | 'WAITING_FOR_UPLOAD'
  | 'DOCUMENTS_UPLOADED'
  | 'CONSENT_DECLINED'
  | 'DOCUMENTS_UPLOAD_FAILED'
  | 'TOKEN_EXPIRED';

interface SocureDocVSDKEvent {
  docvTransactionToken: string;
  status: SucureDocVSDKStatus,
  key: string;
  customerUserId: string;
  mobileNumber?: string
  deviceSessionToken?: string;
}

export type KycTier = 'onboarding' | 'deposit' | 'withdrawal';

export interface KycTierStateRequest {
  tier: KycTier;
}

export interface KycTierStateUpdate {
  tier: KycTier;
  status: KycStatus;
}

export interface KycUserProfile {
  userId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  additionalEmail?: string;
  phone?: string;
  ssn?: string;
  dateOfBirth?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  updatedAt?: string;
}
