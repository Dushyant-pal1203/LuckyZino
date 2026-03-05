'use client';

import Cookies from 'js-cookie';
import { getGameServerUrl, removeNullsDeep } from './utils';
import { getSession } from "next-auth/react";
import { getDetailedDeviceInfo } from './device-detect';

export interface IAnalyticsContext {
  'user.ga_client_id': string | null;
  'user.adjust_web_uuid': string | null;
  'user.adjust_adid': string | null;
  'user.fb_click_id': string | null;
}

interface TrackerPayload {
  user: any;
  app: { route: string };
  device: any;
  client_time: string;
  client_seq_num: number;
  [key: string]: any;
}

let clientSeqNum = 0;
if (typeof window !== 'undefined') {
  clientSeqNum = Number(sessionStorage.getItem('seq_num')) || 0;
}
let _cachedStaticPayload: Partial<TrackerPayload> | null = null;

const getGAUserID = () => Cookies.get("_ga")?.substring(6) ?? null;
const getFBClickID = () => Cookies.get("_fbc") ?? Cookies.get("_fbp") ?? null;

const getAdjustAttr = async () => {
  if (typeof window === 'undefined' || !window.Adjust) return null;
  try {
    const webUuid = await window.Adjust.waitForWebUUID();
    const attr = await window.Adjust.waitForAttribution();
    return { webUuid, adid: attr?.adid };
  } catch (e) {
    console.warn("Adjust attribution failed:", e);
    return null;
  }
};

export const getAnalyticsContext = async (): Promise<IAnalyticsContext> => {
  const [adjustData, gaUserId, fbClickData] = await Promise.all([
    getAdjustAttr(),
    getGAUserID(),
    getFBClickID()
  ]);

  return {
    'user.ga_client_id': gaUserId,
    'user.adjust_web_uuid': adjustData?.webUuid ?? null,
    'user.adjust_adid': adjustData?.adid ?? null,
    'user.fb_click_id': fbClickData
  };
};


const getStaticPayload = async () => {
  if (_cachedStaticPayload) return _cachedStaticPayload;

  const analyticsContext = await getAnalyticsContext();
  const device = await getDetailedDeviceInfo();

  let finalRam = device.specs.ram;
  if (finalRam === "Unknown" || !finalRam) {
    const mem = (navigator as any).deviceMemory;
    finalRam = mem ? `${mem} GB` : "Unknown";
  }

  const userId = typeof localStorage !== 'undefined' ? localStorage.getItem('userId') : null;

  _cachedStaticPayload = {
    user: {
      'ga_client_id': analyticsContext['user.ga_client_id'],
      'adjust_web_uuid': analyticsContext['user.adjust_web_uuid'],
      'adjust_adid': analyticsContext['user.adjust_adid'],
      'fb_click_id': analyticsContext['user.fb_click_id'],
      ...(userId && { id: userId })
    },
    device: {
      "total_ram": finalRam,
      "model": device.model,
      "renderer": device.renderer,
      "gpu_tier": device.specs.gpuTier,
      "confidence": device.confidence
    }
  };

  return _cachedStaticPayload;
};

export const getTrackerParamsObject = async (params: any = {}) => {

  const [staticPayload, session] = await Promise.all([
    getStaticPayload(),
    getSession()
  ]);

  if (params.authorization && !params.authorization.email && session?.user?.email) {
    Object.assign(params.authorization, { email: session.user.email });
  }

  const route = typeof location !== 'undefined' ? location.pathname : '';

  const payload: TrackerPayload = {
    ...staticPayload,
    user: { ...staticPayload?.user },
    app: {
      "event_source": 'web',
      route,
    },
    "client_time": new Date().toISOString(),
    "client_seq_num": clientSeqNum,
    ...params
  };

  return { payload, accessToken: session?.accessToken };
};

export const sendBIEvent = async (name: string, params?: any) => {
  try {
    const { payload, accessToken } = await getTrackerParamsObject(params);

    clientSeqNum += 1;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('seq_num', String(clientSeqNum));
    }
    payload.client_seq_num = clientSeqNum;

    const res = await fetch(getGameServerUrl(`/e/${name}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify(removeNullsDeep(payload)),
      keepalive: true
    });

    return res.ok;
  } catch (e) {
    console.warn('Failed to send event:', e);
    return false;
  }
};