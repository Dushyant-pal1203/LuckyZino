import { NextResponse } from 'next/server';
import { auth } from 'auth';
import { cookies, headers } from 'next/headers';
import { getGameServerUrl } from '@/lib/utils';
import { USER_ANALYTICS_CONTEXT, USER_FINGERPRINT_COOKIE } from '@/constants/auth';

interface ServerRequestParams {
	method?: string;
	requestInit?: RequestInit;
	body?: unknown;
	tags?: string[];
}

export interface ApiErrorData {
	error: any;
	status: number;
	reason?: string;
}

export class ApiError extends Error {
	status: number;
	error: any;
	reason?: string;

	constructor({ error, status, reason }: ApiErrorData) {
		super(error);
		this.error = error;
		this.status = status;
		this.reason = reason;
	}
}

export const getUserIp = async () => {
	const nextheaders = await headers();
	const userIp = nextheaders.get('x-user-ip') ?? '';
	return userIp;
};


export async function serverRequest<Res>(
	path: string,
	params?: ServerRequestParams,
	withAuth: boolean = true,
	recaptcha?: string,
	geoToken?: string
): Promise<Res> {
	let session = null;
	if (withAuth) {
		session = await auth();
		if (!session) {
			throw new ApiError({
				error: 'Unauthorized',
				status: 401
			});
		}
	}
	const xIpAddress = await getUserIp();
	const fpReqId = (await cookies()).get(USER_FINGERPRINT_COOKIE)?.value;
	const analyticsobj = (await cookies()).get(USER_ANALYTICS_CONTEXT)?.value;
	const { body } = (params as any);
	if (analyticsobj && body) {
		try {
			const context = JSON.parse(analyticsobj);
			Object.assign(body, { analytics: context });
		} catch (e) {
			console.log(e);
		}
	}
	const headers = {
		...(withAuth && { Authorization: `Bearer ${session?.accessToken}` }),
		...(recaptcha && { 'X-Recaptcha-Token': recaptcha }),
		...(geoToken && { 'X-Geolocation-Token': geoToken }),
		'Content-Type': 'application/json',
		'Response-Type': 'application/json',
		'User-IP-Address': xIpAddress || "",
		'Request-Id': fpReqId || ""
	};

	const res: Response = await fetch(
		getGameServerUrl(path),
		{
			...params?.requestInit,
			headers,
			cache: 'default',
			body: JSON.stringify(body),
			next: { tags: params?.tags }
		}
	);

	if (res.status === 204) {
		return null as Res;
	}

	let data: any = null;
	try {
		data = await res.text();
		data = JSON.parse(data);
	} catch (e: any) {
		console.log('Invalid server response', e.message, data);
		throw new ApiError({
			error: `Internal error`,
			status: 500
		});
	}

	if (!res.ok) {
		console.log('Server error', res.status, data);
		throw new ApiError({
			error: data?.message,
			reason: data?.reason,
			status: res.status
		});
	}

	return data as Res;
}

export const toNextResponse = async (
	cb: Promise<unknown>
): Promise<NextResponse> => {
	try {
		const data = await cb;
		if (!data) {
			return new NextResponse(null, { status: 204 });
		}

		return NextResponse.json(data);
	} catch (e: any) {
		if (e instanceof ApiError) {
			return NextResponse.json({ error: e.error, reason: e.reason }, { status: e.status });
		}
		return NextResponse.json({ error: 'Error Occurred', message: e.message }, { status: 500 });
	}
};
