import { NextRequest } from 'next/server';
import { isProdServerEnv } from '@/lib/utils';
import { ErrorCode } from '@/lib/errors';
import { createToken, verifyToken } from '@/lib/jwt';
import { GeolocationToken } from '@/types/geo';
import { GeolocationError } from '@/lib/geolocation/geolocation.error';
import { BaseRadarService, GEO_TRACKING_COOKIE_NAME } from '@/lib/geolocation/radar/base-radar.service';
import { RadarResponse } from '@/lib/geolocation/radar/radar';
import jwt from 'jsonwebtoken';
import { GeoIpInfo } from '@/types/common';
import { geoIpService } from '@/services/geo-ip-service';

class RadarServerService extends BaseRadarService {
  private readonly secretGeoJwt: string;
  private readonly secretRadarJwt: string;
  private readonly expiresInGeoJwt: number;

  constructor() {
    super();
    this.secretGeoJwt = process.env.GEO_JWT_SECRET!;
    if (!this.secretGeoJwt) {
      throw new GeolocationError(
        'Missed GEO_JWT_SECRET',
        ErrorCode.INVALID_GEOLOCATION_SUPPORT
      );
    }

    this.secretRadarJwt = process.env.RADAR_JWT_SECRET!;
    if (!this.secretRadarJwt) {
      throw new GeolocationError(
        'Missed GEO_PROVIDER_JWT_SECRET',
        ErrorCode.INVALID_GEOLOCATION_SUPPORT
      );
    }

    this.expiresInGeoJwt = parseInt(process.env.GEO_JWT_EXPIRES_IN || '') || 120;
  }

  validateAndGetGeoToken(request: any): string {
    let geoToken;
    if (!request?.req) {
      geoToken = request.cookies?.get(GEO_TRACKING_COOKIE_NAME)?.value;
    } else {
      geoToken = request.cookies?.[GEO_TRACKING_COOKIE_NAME];
    }

    if (!geoToken) {
      throw new GeolocationError('Missed geo token', ErrorCode.INVALID_GEOLOCATION);
    }

    let geoData;
    try {
        geoData = verifyToken<GeolocationToken>(this.secretGeoJwt, geoToken);
    } catch (e) {
      console.log('verifyToken', e);
      throw new GeolocationError('Invalid or expired geo token', ErrorCode.INVALID_GEOLOCATION);
    }

    const geoIpInfo = geoIpService.getGeoIpInfo(request?.req ? request.req : request)

    this.checkIpAndUA(
      geoIpInfo,
      { ip: geoData.ip, ua: geoData.ua }
    );

    return geoToken
  }

  validateRadarTokenAndCreateGeoToken(
    request: NextRequest,
    geoToken: string,
    fingerprintId: string
  ): { jwt: string, expiresIn: number } {
    const geoIpInfo = geoIpService.getGeoIpInfo(request)

    const jwtData = isProdServerEnv()
      ? this.getRadarJwtData(geoIpInfo, geoToken, fingerprintId)
      : this.getMockedJwtData(geoIpInfo, fingerprintId);

    const jwt = createToken(
      this.secretGeoJwt,
      jwtData,
      { expiresIn: this.expiresInGeoJwt }
    );

    return { jwt, expiresIn: this.expiresInGeoJwt };
  }

  private verifyToken(token?: string): RadarResponse {
    if (!token) {
      throw new GeolocationError('Missed geolocation token', ErrorCode.INVALID_GEOLOCATION);
    }

    let geoData: RadarResponse;
    try {
      geoData = jwt.verify(token, this.secretRadarJwt) as RadarResponse;
    } catch {
      throw new GeolocationError('Invalid geolocation token', ErrorCode.INVALID_GEOLOCATION);
    }

    if (geoData.exp < Date.now() / 1000) {
      throw new GeolocationError('Expired geolocation token', ErrorCode.INVALID_GEOLOCATION);
    }

    if (!geoData.passed) {
      this.generateError(geoData.failureReasons);
    }

    return geoData;
  }

  private checkIpAndUA(
    geoIpInfo: GeoIpInfo,
    tokenData: { ip?: string, ua?: string }
  ): void {
    /** fixme: Perform a check with the client's IP and not with the radar one */
    if (!isProdServerEnv() || true) {
      return;
    }

    if (geoIpInfo.ip !== tokenData.ip || geoIpInfo.ua?.ua !== tokenData.ua) {
      throw new GeolocationError(
        'Invalid device or network',
        ErrorCode.INVALID_GEOLOCATION
      );
    }
  }

  private getRadarJwtData(
    geoIpInfo: GeoIpInfo,
    geoToken: string,
    fingerprintId: string
  ): GeolocationToken {
    const geoData: RadarResponse = this.verifyToken(geoToken);

    this.checkIpAndUA(
      geoIpInfo,
      { ip: geoData.user.ip, ua: geoData.user.userAgent }
    );

    return {
      id: geoData.user.userId,
      country: geoData.user?.country?.code,
      state: geoData.user?.state?.code,
      zip: geoData.user?.postalCode?.code,
      ip: geoData.user.ip,
      ua: geoData.user.userAgent,
      fingerprintId
    };
  }

  private getMockedJwtData(
    geoIpInfo: GeoIpInfo,
    fingerprintId: string
  ): GeolocationToken {
    return {
      id: fingerprintId,
      country: geoIpInfo.geo?.country?.iso_code || 'UA',
      state: geoIpInfo.geo?.subdivisions?.[0]?.iso_code ?? 'DP',
      zip: geoIpInfo.geo?.postal?.code || '49000',
      ip: geoIpInfo.ip as string,
      ua: geoIpInfo.ua?.ua,
      fingerprintId
    };
  }
}

export const radarServerService = new RadarServerService();
