import { NextRequest, NextResponse } from 'next/server';
import { toNextResponse } from '@/services/server-request';
import { authApiService } from '@/services/api-service';
import { forgotPasswordSchema } from '@/schemas/forgot-password';
import { checkRecaptcha } from '@/lib/utils';
import { withLogging } from '@/lib/logging/withLogging';

export const POST = withLogging(async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { recaptcha, ...body } = await req.json();
    checkRecaptcha(recaptcha, false);

    const data = await forgotPasswordSchema.parseAsync(body);

    return await toNextResponse(
      authApiService.forgotPassword(data, recaptcha)
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
