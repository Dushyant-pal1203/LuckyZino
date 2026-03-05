import { NextRequest, NextResponse } from 'next/server';
import { toNextResponse } from '@/services/server-request';
import { authApiService } from '@/services/api-service';
import { resetPasswordSchema } from '@/schemas/reset-password';
import { checkRecaptcha } from '@/lib/utils';
import { withLogging } from '@/lib/logging/withLogging';

export const POST = withLogging(async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { recaptcha, token, ...form } = await req.json();
    checkRecaptcha(recaptcha, false);

    if (!token) {
      return NextResponse.json(
        { error: 'Token not provided' },
        { status: 400 }
      );
    }
    const { password } = await resetPasswordSchema.parseAsync(form);

    return await toNextResponse(
      authApiService.resetPassword({ token, password }, recaptcha)
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
