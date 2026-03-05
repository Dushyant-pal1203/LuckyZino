import { NextRequest, NextResponse } from 'next/server';
import { toNextResponse } from '@/services/server-request';
import { authApiService } from '@/services/api-service';
import { signUpSchema } from '@/schemas/sign-up';
import { checkRecaptcha } from '@/lib/utils';
import { radarServerService } from '@/lib/geolocation/radar/radar-server.service';
import { GeolocationError } from '@/lib/geolocation/geolocation.error';
import { withLogging } from '@/lib/logging/withLogging';

export const POST = withLogging(async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { recaptcha, ...data } = await req.json();
    checkRecaptcha(recaptcha, false);

    const geoToken = radarServerService.validateAndGetGeoToken(req);
    const credentials = await signUpSchema.parseAsync(data);

    return await toNextResponse(
      authApiService.signUp(credentials, recaptcha, geoToken)
    );
  } catch (error: any) {
    if (error instanceof GeolocationError) {
      return NextResponse.json(
        { error: error.message, reason: error.reason },
        { status: 400 }
      );
    }

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
