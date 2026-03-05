export type PaymentEvent = {
	name: string,
	data: PaymentCreate|PaymentStatus
}

export type PaymentStatus = {
	provider: string,
	status: string,
	currency?: string,
	totalAmount?: number,
	id?: string
}

export type PaymentCreate = {
	senderId: string,
	configuration: string
	sessionId: string,
}

export type PaymentConfiguration = {
	provider: string,
	data: {
		url: string,
		orderId?: string,
    description?: string,
    price?: string
	}
}
