/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 27/02/2025 14:32
 */

import { ErrorCode } from '@/lib/errors';
import { GeolocationError } from '@/lib/geolocation/geolocation.error';
import { RadarFailureReason } from '@/lib/geolocation/radar/radar-failure-reason.enum';

export const GEO_TRACKING_COOKIE_NAME = 'geo-visitor-token';

export class BaseRadarService {
  generateError(reasons: string[]): never {
    const failureReasons = new Set(reasons);
    const errorMap: Map<Set<string>, GeolocationError> = new Map([
      [
        new Set([
          RadarFailureReason.FRAUD_PROXY_KNOWN_PROXY_IP,
          RadarFailureReason.FRAUD_PROXY_NETWORK_CONFIGURATION,
        ]),
        new GeolocationError(
          "VPNs or proxy servers may be using",
          ErrorCode.INVALID_GEOLOCATION_PROXY
        ),
      ],
      [
        new Set([
          RadarFailureReason.COUNTRY_NOT_ALLOWED,
          RadarFailureReason.COUNTRY_NOT_EXPECTED,
          RadarFailureReason.COUNTRY_IN_BUFFER_ZONE,
          RadarFailureReason.COUNTRY_IN_EXCLUSION_ZONE,
          RadarFailureReason.STATE_NOT_ALLOWED,
          RadarFailureReason.STATE_NOT_EXPECTED,
          RadarFailureReason.STATE_IN_BUFFER_ZONE,
          RadarFailureReason.STATE_IN_EXCLUSION_ZONE,
        ]),
        new GeolocationError("Not allowed area", ErrorCode.INVALID_GEOLOCATION_AREA),
      ],
      [
        new Set([RadarFailureReason.UNABLE_TO_VERIFY_GEOLOCATION]),
        new GeolocationError(
          "Unable to verify geolocation",
          ErrorCode.INVALID_GEOLOCATION_LOCATION
        ),
      ],
    ]);

    for (const [reasonSet, error] of errorMap.entries()) {
      if ([...reasonSet].some((reason) => failureReasons.has(reason))) {
        throw error;
      }
    }

    throw new GeolocationError("Contact support", ErrorCode.INVALID_GEOLOCATION_SUPPORT);
  }
}
