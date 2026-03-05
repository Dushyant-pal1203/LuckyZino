import { toast } from 'react-toastify';
import { getGameServerUrl, getIPFromCookie } from '@/lib/utils';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const sendRequest = async <T>({
	path,
	data,
	method = 'GET',
	isGameRequest = false,
	showError = true,
	suppressToastErrorCodes = []
}: {
	path: string;
	method?: Method;
	data?: unknown;
	isGameRequest?: boolean;
	showError?: boolean;
	suppressToastErrorCodes?: string[];
}): Promise<T> => {
	if (isGameRequest) {
		path = getGameServerUrl(path);
	} else if (!path.startsWith('/')) {
		path = '/' + path;
	}
	const userIp = getIPFromCookie();
	const params: any = {
		method,
		headers: {
			'Content-Type': 'application/json',
			'User-IP-Address': userIp
		}
	};
	if (data) {
		params.body = JSON.stringify(data);
	}
	const res = await fetch(path, params);

	if (res.status === 204) {
		return null as T;
	}

	const output = await res.json();

	if (!res.ok) {
		const shouldShowError =
			showError && !suppressToastErrorCodes.includes(output?.reason);
		if (shouldShowError) {
			toast.error((output.error || 'Something went wrong').replace('withdrawal', 'redemption'), {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored'
			});
		}
		throw output;
	}

	return output as T;
};

export const request = async <T>(
	path: string,
	data?: unknown,
	method: Method = 'GET',
	showError = true,
	suppressToastErrorCodes: string[] = []
): Promise<T> => {
	return await sendRequest<T>({ path, data, method, showError, suppressToastErrorCodes });
};

export const gameRequest = async <T>(
	path: string,
	data?: unknown,
	method: Method = 'GET'
): Promise<T> => {
	return await sendRequest<T>({ path, data, method, isGameRequest: true });
};

export const fileRequest = async (url: string): Promise<string> => {
	const res = await fetch(url);
	const fileString = await res.text();
	if (!res.ok || !fileString) {
		toast.error('Something went wrong', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored'
		});
		throw new Error('Something went wrong');
	}
	return String(fileString).trim();
};
