import { PhoneVerificationReason, PhoneVerificationStatus } from '@/types/enums/trackers';

export interface PhoneVerificationData {
  phone: PhoneVerificationPhoneData;
}

export interface PhoneVerificationPhoneData {
  status: PhoneVerificationStatus;
  reason: PhoneVerificationReason;
}
