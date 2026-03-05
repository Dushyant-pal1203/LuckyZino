/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 27/02/2025 15:37
 */

import { NextRequest, NextResponse } from 'next/server';
import { ErrorCode } from '@/lib/errors';
import { radarServerService } from '@/lib/geolocation/radar/radar-server.service';
import { GeolocationError } from '@/lib/geolocation/geolocation.error';
import { GEO_TRACKING_COOKIE_NAME } from '@/lib/geolocation/radar/base-radar.service';
import { withLogging } from '@/lib/logging/withLogging';

export const POST = withLogging(async (request: NextRequest): Promise<NextResponse> => {
  try {
    const allowedOrigin = process.env.NEXT_PUBLIC_BASE_URL || '';
    const origin = request.headers.get('origin') || request.headers.get('referer');

    if (!origin || !origin.startsWith(allowedOrigin)) {
      return NextResponse.json(
        { error: 'Forbidden: Invalid origin', reason: ErrorCode.INVALID_GEOLOCATION },
        { status: 403 }
      );
    }

    const { fingerprintId, geoToken } = await request.json();
    if (!fingerprintId || !geoToken) {
      return NextResponse.json(
        { error: 'Missing fingerprintId or geoToken', reason: ErrorCode.INVALID_GEOLOCATION },
        { status: 400 }
      );
    }

    const { jwt, expiresIn } = radarServerService.validateRadarTokenAndCreateGeoToken(
      request,
      geoToken,
      fingerprintId
    );

    const response = NextResponse.json({ success: true });
    response.cookies.set(GEO_TRACKING_COOKIE_NAME, jwt, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: expiresIn,
      path: '/',
      secure: !process.env.DISABLED_SECURE
    });

    return response;
  } catch (error) {
    if (error instanceof GeolocationError) {
      return NextResponse.json(
        { error: error.message, reason: error.reason },
        { status: 400 }
      );
    }
    console.error('geo-store error:', error);
    return NextResponse.json(
      { reason: ErrorCode.INVALID_GEOLOCATION_SUPPORT },
      { status: 500 }
    );
  }
});
