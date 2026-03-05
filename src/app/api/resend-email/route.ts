import { NextRequest, NextResponse } from 'next/server';
import { toNextResponse } from '@/services/server-request';
import { authApiService } from '@/services/api-service';
import { withLogging } from '@/lib/logging/withLogging';
import { checkRecaptcha } from '@/lib/utils';

export const POST = withLogging(async (req: NextRequest): Promise<NextResponse> => {
	try {
		const { recaptcha, token } = await req.json();
		checkRecaptcha(recaptcha, false);

		return await toNextResponse(
			authApiService.resendEmail({ token }, recaptcha)
		);
	} catch (error: any) {
		if (['ZodError', 'RecaptchaError'].includes(error.name)) {
			return NextResponse.json(
				{ error: error.errors || error.message },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ error: 'An error occurred' },
			{ status: 500 }
		);
	}
});