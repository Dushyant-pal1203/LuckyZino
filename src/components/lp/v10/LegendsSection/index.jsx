'use client';
import { useEffect, useState } from 'react';
import styles from './LegendsSection.module.scss';

export const LegendsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section className={styles.legendsSectionComponent}>
      <div className={styles.legendsSectionShine}>
        <div className={styles.legendsSectionShine1}></div>
        <div className={styles.legendsSectionShine2}></div>
      </div>
      <div className={styles.legendsSectionTitle}>
        <img
          className={styles.legendsSectionTitleImage}
          src='/images/lp_v10/Legend_Title.png'
          alt='Legends have Arrived!'
          draggable='false'
        />
      </div>
      <div className={styles.legendsSectionContainer}>

        {isMobile ? (
          <div className={styles.legendsSectionMaskMobile}>
            <img
              className={styles.legendsSectionMaskImageMobile}
              src='/images/lp_v10/legendsSection_Mask_Mobile.png'
              alt='Mask Image'
              draggable='false'
            />
          </div>
        ) : (
          <div className={styles.legendsSectionMask}>
            <img
              className={styles.legendsSectionMaskImage}
              src='/images/lp_v10/legendsSection_Mask.png'
              alt='Mask Image'
              draggable='false'
            />
          </div>
        )}

        {isMobile ? (
          <div className={styles.legendsSectionCoinsMobile}>
            <img
              className={styles.legendsSectionCoinsMobileImage}
              src='/images/lp_v10/CoinsContainer_Mobile.png'
              alt='Legends Image'
              draggable='false'
            />
          </div>
        ) : (
          <>
            <div className={styles.legendsSectionCoinsLeft}>
              <img
                className={styles.legendsSectionCoinsLeftImage}
                src='/images/lp_v10/coinsLeft.png'
                alt='coins with stars'
                draggable='false' />
            </div><div className={styles.legendsSectionCoinsRight}>
              <img
                className={styles.legendsSectionCoinsLeftImage}
                src='/images/lp_v10/coinsRight.png'
                alt='coins with stars'
                draggable='false' />
            </div>
          </>
        )}
      </div>

      <div className={styles.legendsSectionProviders}>
        <div className={styles.legendsSectionProvidersContainer}>
          <img
            className={styles.legendsSectionProvidersImage}
            src='/images/lp_v10/Netent.png'
            alt='Netent'
            draggable='false'
          />
          <img
            className={styles.legendsSectionProvidersImage}
            src='/images/lp_v10/BTGlogo.png'
            alt='big time gaming'
            draggable='false'
          />
          <img
            className={styles.legendsSectionProvidersImage}
            src='/images/lp_v10/NoLimit.png'
            alt='NoLimit city'
            draggable='false'
          />
          <img
            className={styles.legendsSectionProvidersImage}
            src='/images/lp_v10/RED_TIGER.png'
            alt='RED TIGER'
            draggable='false'
          />
        </div>
      </div>

      {isMobile && <div className={styles.legendsSectionMobileOverlay}></div>}

    </section>
  );
};
