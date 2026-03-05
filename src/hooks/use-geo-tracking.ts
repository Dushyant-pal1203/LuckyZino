/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 14/05/2025 18:40
 */

import { useRef } from 'react';
import { GeoTrackingLoaderRef } from '@/components/geo-tracking';

export const useGeoTracking = () => {
  const geoTrackingRef = useRef<GeoTrackingLoaderRef>(null);

  const verifyGeoTracking = async (): Promise<boolean> => {
    const isChecked = await geoTrackingRef.current?.verifyGeoTracking();
    return isChecked ?? false;
  };

  return { geoTrackingRef, verifyGeoTracking };
};
