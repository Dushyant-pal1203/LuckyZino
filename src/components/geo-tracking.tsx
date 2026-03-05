/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 26/02/2025 15:59
 */

'use client';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadarClientService } from '@/lib/geolocation/radar/radar-client.service';
import { FormContainer } from './ui/auth/form-container';
import { useRouter } from 'next/navigation';

export interface GeoTrackingLoaderRef {
  verifyGeoTracking: () => Promise<boolean>;
}

interface GeoTrackingLoaderProps {
  userId?: string;
  children?: React.ReactNode;
}

const GeoTrackingLoader = forwardRef<
  GeoTrackingLoaderRef,
  GeoTrackingLoaderProps
>(({ userId, children }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const verifyGeoTracking = async (): Promise<boolean> => {
    setIsLoading(true);

    const errorReason = await new RadarClientService().performGeoTracking(
      userId
    );
    setIsLoading(false);
    if (errorReason) {
      router.replace(`/blocked?reason=${errorReason}`);
      return false;
    }

    return true;
  };

  useImperativeHandle(ref, () => ({
    verifyGeoTracking
  }));

  if (isLoading) {
    return (
      <div className="absolute inset-0 !m-0 flex items-center justify-center z-50">
        <AnimatePresence>
          <motion.div
            key="geo-loader-page"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative w-80"
          >
            <FormContainer>
              <motion.div
                key="geo-key"
                animate={{ y: [0, -10, 0] }}
                initial={{ y: -10 }}
                transition={{
                  repeat: Infinity,
                  type: 'tween',
                  duration: 1,
                  ease: 'easeInOut'
                }}
                className="flex flex-col items-center jusify-center gap-0 relative"
              >
                <img src={'/images/icons/location.png'} />
              </motion.div>
              <h1
                className="text-xl text-center font-bold mb-2 font-['Exo_2'] relative mt-2"
                style={{
                  textShadow: `0px -0.559px 12.754px rgba(244, 153, 24, 0.73), 0px 0.559px 6.992px #F49918`,
                  lineHeight: '88%',
                  letterSpacing: '1.12px'
                }}
              >
                Checking your location...
              </h1>
            </FormContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return children;
});

GeoTrackingLoader.displayName = 'GeoTrackingLoader';

export default GeoTrackingLoader;
