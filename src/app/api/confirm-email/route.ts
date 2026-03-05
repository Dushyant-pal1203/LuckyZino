import { NextRequest, NextResponse } from 'next/server';
import { toNextResponse } from '@/services/server-request';
import { authApiService } from '@/services/api-service';
import { radarServerService } from '@/lib/geolocation/radar/radar-server.service';
import { withLogging } from '@/lib/logging/withLogging';

export const POST = withLogging(async (req: NextRequest): Promise<NextResponse> => {
  try {
    const body = await req.json();
    if (!body.token) {
      return NextResponse.json(
        { error: 'Token not provided' },
        { status: 400 }
      );
    }

    const geoToken = radarServerService.validateAndGetGeoToken(req);

    return await toNextResponse(
      authApiService.confirmEmail({ token: body.token }, geoToken)
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
});