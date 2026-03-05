export enum BIEvents {
  PhoneVerification = 'lz-phone-verification',
}

export enum PhoneVerificationStatus {
  Started = 'started',
  Finished = 'finished',
  FailedCode = 'failed_code',
  FailedPhone = 'failed_phone',
  FailedRecaptcha = 'failed_recapcha'
}

export enum PhoneVerificationReason {
  Redemption = 'redeem',
  Spin = 'spin',
}