import NextAuth, { DefaultSession, NextAuthConfig } from 'next-auth';
import 'next-auth/jwt';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import { decodeJwt } from 'jose';
import { createStorage } from 'unstorage';
import memoryDriver from 'unstorage/drivers/memory';
import redisDriver from 'unstorage/drivers/redis';
import { UnstorageAdapter } from '@auth/unstorage-adapter';
import { signInSchema } from '@/schemas/sign-in';
import { authApiService } from '@/services/api-service';
import { ApiError } from '@/services/server-request';
import { ErrorCode } from '@/lib/errors';
import { radarServerService } from '@/lib/geolocation/radar/radar-server.service';
import { GeolocationError } from '@/lib/geolocation/geolocation.error';
import { isProdServerEnv } from '@/lib/utils';

const password = process.env.REDIS_PASSWORD;
const storage = createStorage({
	driver: isProdServerEnv()
		? redisDriver({
			base: 'webapp:auth:',
			url: process.env.REDIS_URL!,
			...(password && { password }),
		})
		: memoryDriver()
});

const refreshAccessToken = async (token: string): Promise<JWT | null> => {
	try {
		const data = await authApiService.refreshToken({ token });

		return {
			accessToken: data.accessToken,
			refreshToken: data.refreshToken ?? token,
			expiration: decodeJwt(data.accessToken || '')?.exp || 0
		};
	} catch (error) {
		console.error('Error refreshing access token:', error);
		return null;
	}
};

const authorize = async ({ emailConfirmation, recaptcha, request, ...credentials }: any): Promise<any> => {
	try {
		const geoToken = radarServerService.validateAndGetGeoToken(request);

		let response;
		if (emailConfirmation) {
			response = await authApiService.confirmEmail({ token: emailConfirmation }, geoToken);
		} else {
			const validCredentials = await signInSchema.parseAsync(credentials);
			response = await authApiService.signIn(
				validCredentials,
				recaptcha,
				geoToken
			);
		}

		return {
			accessToken: response.jwtSession?.accessToken,
			refreshToken: response.jwtSession?.refreshToken,
			user: response.user
		};

	} catch (error) {
		console.error('Error signing in:', error);
		if (error instanceof GeolocationError || error instanceof ApiError) {
			return {
				error: error.message,
				...((error as any)?.reason && { reason: (error as any).reason })
			};
		}
	}

	return null;
};

const jwt = async ({ token, user, account, request }: any): Promise<JWT | null> => {
	// Initial sign-in
	if (user && account) {
		if (account.provider === 'google') {
			try {
				const googleAccessToken = account.access_token;
				if (!googleAccessToken) {
					return { error: 'Google access token not found' };
				}

				const geoToken = radarServerService.validateAndGetGeoToken(request);

				const data = await authApiService.googleSignIn(
					{ token: googleAccessToken },
					geoToken
				);
				if (data.jwtSession?.accessToken && data.jwtSession?.refreshToken) {
					return {
						accessToken: data.jwtSession?.accessToken,
						refreshToken: data.jwtSession?.refreshToken,
						expiration: decodeJwt(data.jwtSession?.accessToken || '')?.exp || 0,
						user: data.user
					};
				}
			} catch (error) {
				console.error('Error signing in with Google:', error);

				if (error instanceof ApiError || error instanceof GeolocationError) {
					return {
						error: error.message,
						...(error?.reason && { reason: error.reason as ErrorCode })
					};
				}
			}

			return { error: 'Google sign-in failed' };
		}

		if (account.provider === 'facebook') {
			try {
				const geoToken = radarServerService.validateAndGetGeoToken(request);

				const facebookAccessToken = account.access_token;
				if (!facebookAccessToken) {
					return { error: 'Facebook access token not found' };
				}

				const data = await authApiService.facebookSignIn(
					{ token: facebookAccessToken },
					geoToken
				);
				if (data.jwtSession?.accessToken && data.jwtSession?.refreshToken) {
					return {
						accessToken: data.jwtSession?.accessToken,
						refreshToken: data.jwtSession?.refreshToken,
						expiration: decodeJwt(data.jwtSession?.accessToken || '')?.exp || 0,
						user: data.user
					};
				}
			} catch (error) {
				console.error('Error signing in with Facebook:', error);

				if (error instanceof ApiError || error instanceof GeolocationError) {
					return {
						error: error.message,
						...(error?.reason && { reason: error.reason as ErrorCode })
					};
				}
			}

			return { error: 'Facebook sign-in failed' };
		}

		return {
			accessToken: user.accessToken,
			refreshToken: user.refreshToken,
			expiration: decodeJwt(user.accessToken || '')?.exp || 0,
			user: user.user
		};
	}

	if (token.error) {
		return { error: token.error, reason: token?.reason };
	}

	// Return the token if the access token has not expired yet
	if (token.expiration && Date.now() / 1000 < token.expiration - 90) {
		return token;
	}

	// Refresh the access token
	const refreshedTokens = await refreshAccessToken(token.refreshToken || '');
	if (refreshedTokens) {
		return {
			accessToken: refreshedTokens.accessToken,
			refreshToken: refreshedTokens.refreshToken,
			expiration: refreshedTokens.expiration,
			user: token.user
		};
	}

	// If refresh fails, invalidate the token
	return {
		error: 'Refresh token failed',
		reason: ErrorCode.FAILED_TO_REFRESH_TOKEN
	};
};

const session = async ({ session, token }: any): Promise<DefaultSession> => {
	if (token.accessToken) {
		session.accessToken = token.accessToken;
		session.user = token.user;
	}
	session.error = token.error;
	session.reason = token?.reason;

	return session;
};

const signIn = async ({ user, account }: any) => {
	if (account?.provider === 'google' || account?.provider === 'facebook') {
		return true;
	}

	return user?.user?.status === 'CONFIRMED';
};

export const authOptions: NextAuthConfig = {
	debug: !!process.env.AUTH_DEBUG,
	adapter: UnstorageAdapter(storage) as any,
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			authorize
		}),
		Google({
			clientId: process.env.AUTH_GOOGLE_ID!,
			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
			allowDangerousEmailAccountLinking: true
		}),
		Facebook({
			clientId: process.env.AUTH_FACEBOOK_CLIENT_ID!,
			clientSecret: process.env.AUTH_FACEBOOK_CLIENT_SECRET!,
			allowDangerousEmailAccountLinking: true
		})
	],
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/sign-in'
	},
	callbacks: {
		jwt,
		session,
		signIn
	}
};

export const { auth, handlers } = NextAuth(authOptions);
