export enum TrackerEvents {
	LandingPageView = 'landing-page-view',
	PageView = 'page-view',
	PageLeave = 'page-leave',
	SiteButtonClicked = 'site-button-clicked',
	ButtonClicked = 'button-clicked',
	UserRegistration = 'user-registration ',
	CheckboxAccept = 'checkbox-accept',
	LocationVerification = 'location-verification',
	LinkClicked = 'link-clicked',
	UserBlocked = 'user-blocked',
	KYCHeartbeat = 'kyc-page-heartbeat',
	RegistrationFormError = 'error-registration-form',
	PopupShown = 'popup-showed',
	PopupClosed = 'popup-closed',
	SlotLoadingStarted = 'lz-slot-initialization-started',
	SlotLoadingFinished = 'lz-slot-initialization-finished',
	SlotError = 'lz-slot-error'
}