'use client';

import styles from './HeroSection.module.scss';
import { useRouter } from 'next/navigation';

export const HeroSection = () => {
  const router = useRouter();

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroBackground}>
        {/* Desktop Background */}
        <img
          className={styles.backgroundImageDesktop}
          src="/images/lp_v15/desktop/background.png"
          alt="Hero Background"
          draggable="false"
        />

        {/* Mobile Background (use mobile image if different) */}
        <img
          className={styles.backgroundImageMobile}
          src="/images/lp_v15/mobile/background.png"
          alt="Hero Background"
          draggable="false"
        />
      </div>

      <div className={styles.heroContent}>
        <div className={styles.textBlock}>
          <img
            className={styles.textImage}
            onClick={() => router.replace('/sign-up')}
            src="/images/lp_v15/desktop/hero_text.png"
            alt="Hero Text"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
};
