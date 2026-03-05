/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 26/01/2026 03:00
 */

import fs from 'fs';
import * as mmdb from "mmdb-lib";
import { getIPFromRequest, getUAFromRequest } from '@/lib/utils';
import { GeoIpInfo } from '@/types/common';

class GeoIpService {
  private reader?: mmdb.Reader<mmdb.CityResponse>;
  private isInitAttempted = false;

  private initReader(): void {
    if (this.isInitAttempted) {
      return;
    }

    const filePath = process.env.GEOIP_DATABASE_PATH;
    if (!filePath || !fs.existsSync(filePath)) {
      console.warn(
        'GeoIP database not found.',
        { filePath }
      );
      return;
    }

    try {
      const db = fs.readFileSync(filePath);
      this.reader = new mmdb.Reader<mmdb.CityResponse>(db);
      this.isInitAttempted = true;
    } catch (error) {
      console.warn(
        'Cannot initialize GeoIP database',
        { filePath, error }
      );
    }
  }

  getGeoIpInfo(request: any): GeoIpInfo {
    this.initReader();

    const ip = getIPFromRequest(request);
    const ua = getUAFromRequest(request);

    let geo = null;
    if (this.reader) {
      geo = this.reader.get(ip as string);
    }

    return {geo, ip, ua};
  }
}

export const geoIpService = new GeoIpService();
