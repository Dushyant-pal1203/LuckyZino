/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 17/04/2025 18:42
 */
import { SessionContextProp } from '@/hocs/with-auth';
import { IUnityProviderConfig } from '@/hooks/use-unity-loader';
import { IAnalyticsContext } from '@/lib/trackers';
import * as mmdb from 'mmdb-lib';

export interface WithAuthBuildProps {
  sessionContext: SessionContextProp;
  webglBuildId: string;
	unityConfig?: IUnityProviderConfig
	analyticsContext?: IAnalyticsContext
}

export type ViewportInfo = {
  width: number;
  height: number;
  devicePixelRatio?: number;
  orientation?: 'portrait' | 'landscape';
};

export interface UserAgent {
  isBot: boolean;
  ua: string;
  browser: {
    name?: string;
    version?: string;
    major?: string;
  };
  device: {
    model?: string;
    type?: string;
    vendor?: string;
  };
  engine: {
    name?: string;
    version?: string;
  };
  os: {
    name?: string;
    version?: string;
  };
  cpu: {
    architecture?: string;
  };
}

export interface GeoIpInfo {
  geo: mmdb.CityResponse | null;
  ip: string | null | undefined;
  ua: UserAgent | null;
}
