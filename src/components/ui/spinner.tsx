import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CSpinnerProps {
  size?: number; // Optional size prop, defaults to 150
	strokeWidth?: number;
  children?: React.ReactNode;
}

export function GradientSpinner({ size = 64, strokeWidth = 2, children }:CSpinnerProps) {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="absolute">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#692ad8" stopOpacity="0" />
            <stop offset="50%" stopColor="#f56576" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f5bb00" stopOpacity="1" />
          </linearGradient>
        </defs>

        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          animate={{ rotate: -360 }}
          initial={{ rotate: 0 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          style={{
            transformOrigin: 'center'
          }}
        />
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

const Spinner: React.FC<CSpinnerProps> = ({ size = 150, strokeWidth = 2, children }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="geo-loader"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center w-full py-0"
      >
        <div style={styles.loaderContainer}>
          <GradientSpinner size={size} strokeWidth={strokeWidth}>
            <img
              src="/images/main-logo.png"
              alt="Home"
              width={size * 0.8}
              height="48"
              className="min-w-8"
            />
          </GradientSpinner>
        </div>
				{children}
      </motion.div>
    </AnimatePresence>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
};

export default Spinner;
