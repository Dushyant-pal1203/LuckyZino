import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LP_REDIRECT_CONFIG } from './constants/lp-redirections'

export function middleware(request: NextRequest) {
	const { nextUrl } = request
	const pathname = nextUrl.pathname

	// Handle Landing Page Redirections
	if (pathname.startsWith('/lp')) {
		const config = LP_REDIRECT_CONFIG

		// 1. Global Redirect
		if (config.redirectAllTo && pathname !== config.redirectAllTo) {
			return NextResponse.redirect(new URL(config.redirectAllTo, request.url))
		}

		// 2. Specific Redirects
		if (!config.redirectAllTo && config.redirects[pathname]) {
			const target = config.redirects[pathname]
			return NextResponse.redirect(new URL(target, request.url))
		}
	}

	const ip =
		request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
		request.headers.get('x-real-ip') ||
		request.headers.get('x-client-ip') || "";

	// Clone the request and add IP to headers
	const requestHeaders = new Headers(request.headers)
	requestHeaders.set('x-user-ip', ip)

	// Store in cookies for client-side access (optional)
	const response = NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	})

	// Set IP in cookie for client-side access
	response.cookies.set('user-ip', ip, {
		httpOnly: false,
		maxAge: 60 * 60, // 1 hour
		path: '/',
	})

	return response
}
