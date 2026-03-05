import React, { useEffect } from 'react';
import './loader.css';
import { motion, AnimatePresence, progress, useAnimation } from 'framer-motion';

interface LZLoaderProps {
  size?: number; // Optional size prop, defaults to 150
  children?: React.ReactNode;
  loadingProgression?: number;
}

const LZLoader: React.FC<LZLoaderProps> = ({
  children,
  loadingProgression
}) => {
  const shimmerControls = useAnimation();

  useEffect(() => {
    if (loadingProgression === undefined) {
      shimmerControls.start({
        x: ['-100%', '100%'],
        transition: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 1.2,
          ease: 'linear'
        }
      });
    }
  }, [loadingProgression, progress, shimmerControls]);

  return (
    <AnimatePresence>
      <motion.div
        key="geo-loader"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.225 }}
        className="flex flex-col items-center justify-end h-full w-full"
      >
        <div className="flex flex-col items-center justify-center w-full pb-[2rem] xs:pb-[6rem]">
          <img src="/logo.png" style={styles.logo}></img>
          <div className="-mt-2 w-[70%] min-w-[300px] mx-auto">
            <div
              style={{
                background: 'linear-gradient(90deg, gold, goldenrod)',
                padding: '2px',
                borderRadius: '9999px',
                width: '100%',
                maxWidth: '800px',
                margin: '0px auto'
              }}
            >
              <div
                style={{
                  backgroundColor: '#1a1a1a',
                  borderRadius: '9999px',
                  overflow: 'hidden'
                }}
              >
                <motion.div
                  animate={
                    loadingProgression
                      ? {
                          width: `${Math.round(loadingProgression * 100)}%`
                        }
                      : shimmerControls
                  }
                  initial={{ width: 0 }}
                  transition={{ ease: 'linear', duration: 0.2 }}
                  style={{
                    height: '1rem',
                    background: 'linear-gradient(to bottom, #51127f, #d70a84)',
                    borderRadius: '9999px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const styles = {
  logo: {
    maxHeight: '50%',
    minHeight: '20%',
    zIndex: 1
  }
};

export default LZLoader;
