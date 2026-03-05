export enum PaymentEvents {
	PaymentStatus = 'payment.session_status',
	PaymentCreate = 'payment.launch_session',
	PaymentCancel = 'payment.cancel_session',
	PaymentFailed = 'payment.failed_session',
	PaymentCancelIframe = 'payment.cancel_session_iframe',
	PaymentFailedIframe = 'payment.failed_session_iframe',
}

export enum ProviderNames {
	NUVEI = "NUVEI",
	WORLDPAY = "WORLDPAY"
}