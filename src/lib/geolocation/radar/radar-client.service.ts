/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 27/02/2025 14:32
 */

import Radar from 'radar-sdk-js';
import { generateUserId, isProdEnv } from '@/lib/utils';
import { ErrorCode } from '@/lib/errors';
import { GeolocationError } from '@/lib/geolocation/geolocation.error';
import { RadarFailureReason } from '@/lib/geolocation/radar/radar-failure-reason.enum';
import { BaseRadarService } from '@/lib/geolocation/radar/base-radar.service';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';

export class RadarClientService extends BaseRadarService {
	constructor() {
		super();
		const radarKey = process.env.NEXT_PUBLIC_RADAR_KEY;
		if (!radarKey) {
			throw new GeolocationError(
				'Geolocation key not found',
				ErrorCode.INVALID_GEOLOCATION_SUPPORT
			);
		}
		Radar.initialize(radarKey);
	}

	async performGeoTracking(userId?: string): Promise<ErrorCode | null> {
		if (userId) {
			Radar.setUserId(userId);
		}

		try {
			const result = isProdEnv()
        ? await Radar.trackVerified({ skipVerifyApp: true })
        : {passed: true, token: 'dev'};
			console.log('[Radar] result:', result);
			if (result.passed && result.token) {
				const fingerprintId = await generateUserId();
				const geoToken = result.token;
				const resp = await fetch('/api/geo-store', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ fingerprintId, geoToken })
				});
				if (!resp.ok) {
					const { reason } = await resp.json();
					return reason;
				}
				await sendBIEvent(TrackerEvents.LocationVerification, { location_status: 'approved' });
				return null;
			}
			await sendBIEvent(TrackerEvents.LocationVerification, { location_status: 'blocked' });
			return this.generateError(result.failureReasons!);
		} catch (err: any) {
			if (err instanceof GeolocationError) {
				return err.reason;
			}

			if (err?.status) {
				switch (err.status) {
					case RadarFailureReason.ERROR_PERMISSIONS:
						return ErrorCode.INVALID_GEOLOCATION_PERMISSIONS;
					case RadarFailureReason.ERROR_LOCATION:
						return ErrorCode.INVALID_GEOLOCATION_LOCATION;
					case RadarFailureReason.ERROR_NETWORK:
						return ErrorCode.INVALID_GEOLOCATION_NETWORK;
				}
			}

			return ErrorCode.INVALID_GEOLOCATION_LOCATION;
		}
	}
}
