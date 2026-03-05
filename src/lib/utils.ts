import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import urlJoin from 'url-join';
import { toast } from 'react-toastify';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { userAgent, userAgentFromString } from 'next/server';
import requestIp from 'request-ip';
import Cookies from 'js-cookie';
import { UserAgent } from '@/types/common';

export const compose = (...hocs: any[]) => (Component: any) =>
	hocs.reduceRight((acc, hoc) => hoc(acc), Component);

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getGameServerUrl(path: string) {
	const url = process.env.NEXT_PUBLIC_GAME_SERVER_URL;
	if (!url) {
		throw new Error("NEXT_PUBLIC_GAME_SERVER_URL is not defined");
	}

	return urlJoin(url, path);
}

export function checkRecaptcha(recaptchaToken: string, isClientSide = true) {
	if (!recaptchaToken) {
		if (isClientSide) {
			toast.error('Recaptcha token is required', {
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
		throw new RecaptchaError();
	}
}

export class RecaptchaError extends Error {
	constructor() {
		super("Recaptcha token is required");
		this.name = "RecaptchaError";
	}
}

export const generateUserId = async () => {
	const fp = await FingerprintJS.load();
	const result = await fp.get();
	return result.visitorId;
};

export const isIP = (value: string): boolean => {
	const regexes = {
		ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
		ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i
	};

	return (
		!!value &&
		(regexes.ipv4.test(String(value)) || regexes.ipv6.test(String(value)))
	);
};

export const getClientIpFromXForwardedFor = (value: string | null | undefined): string | null => {
	if (!value) return null;
	const forwardedIps = value.split(',').map((e) => {
		const ip = e.trim();
		if (ip.includes(':')) {
			const splitted = ip.split(':');
			if (splitted.length === 2) return splitted[0];
		}
		return ip;
	});
	for (let i = 0; i < forwardedIps.length; i++) {
		if (isIP(forwardedIps[i])) {
			return forwardedIps[i];
		}
	}
	return null;
};

export const getIPFromRequest = (request: any): string | null | undefined => {
	const ip = requestIp.getClientIp(request);
	if (!ip) {
		return getClientIpFromXForwardedFor(
			request?.headers?.get?.('x-forwarded-for')
		);
	}
}

export const getUAFromRequest = (request: any): UserAgent | null => {
	const ua = request?.headers?.['user-agent'];
  if (ua) {
    return userAgentFromString(ua);
  }

  return userAgent(request);
}

export const isProdEnv = () => {
	return process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';
}

export const isStageEnv = () => {
	return process.env.NEXT_PUBLIC_ENVIRONMENT === 'staging';
}

export const isDevEnv = () => {
	return process.env.NEXT_PUBLIC_ENVIRONMENT === 'development';
}

export const isRegistrationEnabled = () => {
	return process.env.NEXT_PUBLIC_REGISTRATION_DISABLED !== 'true';
};

export const isProdServerEnv = () => {
  return process.env.ENVIRONMENT === 'production';
}

export const isStageServerEnv = () => {
  return process.env.ENVIRONMENT === 'staging';
}

export const isDevServerEnv = () => {
  return process.env.ENVIRONMENT === 'development';
}

export const stringToBase64 = (str: string) => window.btoa(str);

export function capitalizeFirstLetter(str: string) {
	if (typeof str !== 'string' || str.length === 0) {
		return str; // Handle non-string or empty inputs
	}
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isAndroidUserAgent() {
	// navigator.userAgent returns the user agent string of the browser.
	// We convert it to lowercase to perform a case-insensitive check.
	const userAgent = navigator.userAgent.toLowerCase();

	// Check if the user agent string contains the word "android".
	// This is a common and generally reliable way to detect Android devices.
	return userAgent.includes("android");
}

/**
 * Recursively removes all properties with a `null` value from an object or array. Picked from Lodash lib
 *
 * @param {any} obj The object or array to clean.
 * @returns {any} A new object or array with all `null` values removed.
 */
export function removeNullsDeep(obj: any): any {
	// If the value is not an object, or is null, return it as is.
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	// If the value is an array, recursively clean each item,
	// then filter out any resulting nulls.
	if (Array.isArray(obj)) {
		return obj
			.map(item => removeNullsDeep(item))
			.filter(item => item !== null);
	}

	// If the value is an object, build a new object by recursively
	// cleaning each value and only including it if it's not null.
	return Object.entries(obj).reduce((acc, [key, value]) => {
		const cleanedValue = removeNullsDeep(value);

		if (cleanedValue !== null) {
			acc[key] = cleanedValue;
		}

		return acc;
	}, {} as { [key: string]: any });
}

const isIPad = () => {
	return (
		// Old iPads
		navigator.platform === 'MacIntel' &&
		// New iPads (pretending to be Macs) have Touch Points
		navigator.maxTouchPoints > 1
	);
};

const isMobileWebKit = () => { return "ongesturechange" in window; }

export const isIOSUserAgent = (): boolean => {
	// Check if we are in a browser environment
	if (typeof window === 'undefined' || typeof navigator === 'undefined') {
		return false;
	}
	// Regular expression to test for iPhone, iPad, or iPod in the user agent string.
	const iOsDeviceRegex = /iPad|iPhone|iPod/;
	const isIOSDevice = iOsDeviceRegex.test(navigator.userAgent) || isIPad() || isMobileWebKit();

	return isIOSDevice;
};

export function floorToTwoDecimals(num: number) {
	return Math.floor(num * 100) / 100;
}

export function getIPFromCookie() {
	return Cookies.get("user-ip") ?? null;
}
