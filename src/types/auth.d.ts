import 'next-auth';
import { DefaultSession } from 'next-auth';
import { AdapterUser } from '@auth/core/adapters';
import { User as AppUser } from '@/types/user';
import { ErrorCode } from '@/lib/errors';

declare module 'jose' {
	export interface JWTPayload extends JWTPayload {
		typ?: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id?: string;
		accessToken?: string;
		refreshToken?: string;
		expiration?: number;
		error?: string;
		reason?: ErrorCode;
	}
}

declare module 'next-auth' {
	interface Session {
		accessToken?: string;
		user: AppUser & DefaultSession['user'] & AdapterUser & {
			socialProfile?: {
				email?: string,
				lastName?: string,
				firstName?: string
			}
		};
		error?: string;
		reason?: ErrorCode;
	}
}

export interface SignInDto {
	email: string;
	password: string;
}

export interface SignInEntity {
	jwtSession?: {
		accessToken: string;
		refreshToken: string;
	},
	user: AppUser;
}

export interface SignUpDto {
	email: string;
	password: string;
	confirmPassword: string;
}

export interface RefreshTokenEntity {
	accessToken: string;
	refreshToken: string;
}

export interface ResetPasswordDto {
	token: string;
	password: string;
}

export interface ResendMailDto {
	token: string;
}

export interface TokenDto {
	token: string;
}

export interface ForgotPasswordDto {
	email: string;
}
