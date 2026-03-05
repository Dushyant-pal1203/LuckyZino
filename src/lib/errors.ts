export enum ErrorCode {
  FAILED_TO_REFRESH_TOKEN = 'failedToRefreshToken',
  INVALID_GEOLOCATION = 'invalidGeolocation',
  INVALID_GEOLOCATION_LOCATION = 'invalidGeolocationLocation',
  INVALID_GEOLOCATION_AREA = 'invalidGeolocationArea',
  INVALID_GEOLOCATION_PROXY = 'invalidGeolocationProxy',
  INVALID_GEOLOCATION_SUPPORT = 'invalidGeolocationSupport',
  INVALID_GEOLOCATION_PERMISSIONS = 'invalidGeolocationPermissions',
  INVALID_GEOLOCATION_NETWORK = 'invalidGeolocationNetwork',
  INVALID_FINGERPRINT = 'invalidFingerprint',
  PHONE_VERIFICATION_REQUIRED = 'phoneVerificationRequired',
	KYC_PROCESS_NOT_COMPLETED = 'kycProcessNotCompleted',
	EMAIL_DUBLICATE = 'email_duplicate'
}

export const FailureReasonUserMessage: Record<ErrorCode | string, string> = {
  [ErrorCode.INVALID_GEOLOCATION]:
    'Unable to verify your location. Please try again.',
  [ErrorCode.INVALID_GEOLOCATION_LOCATION]:
    'Unable to determine your location. Please make sure location services and wi-fi are enabled and try again.',
  [ErrorCode.INVALID_GEOLOCATION_AREA]:
    'Unable to verify your location. Please make sure you\'re in an allowed area and try again.',
  [ErrorCode.INVALID_GEOLOCATION_PROXY]:
    'Unable to verify your location. Please disconnect from any VPNs or proxy servers you may be using and try again.',
  [ErrorCode.INVALID_GEOLOCATION_SUPPORT]:
    'Unable to verify your location. Please contact support.',
  [ErrorCode.INVALID_GEOLOCATION_PERMISSIONS]:
    'Unable to determine your location. Please make sure you\'ve granted location permissions and try again.',
  [ErrorCode.INVALID_GEOLOCATION_NETWORK]:
    'Unable to determine your location. Please make sure you\'re connected to the Internet and try again.',
  [ErrorCode.INVALID_FINGERPRINT]:
    'Unable to verify your device. Please try again.'
};

const userExistRegExp = /user\b.*\bexist(s)?\b/i;
export const parseErrorMessage = (error: string) => {
	if(userExistRegExp.test(error)) {
		return ErrorCode.EMAIL_DUBLICATE;
	}
	return 'unknown';
}
