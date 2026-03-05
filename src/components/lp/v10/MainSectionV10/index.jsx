'use client';
import { usePathname, useRouter } from 'next/navigation';
import { TopContainerV10 } from '../TopContainerV10';
import { TopContainerV11 } from '../../v11/TopContainerV11';
import { StyledButtonV7 } from '../../v7/StyledButtonV7';
import { ExoFont } from '@/static/fonts';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './MainSectionV10.module.scss';

export const MainSectionV10 = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isLandingV11 = pathname === '/lp/v11';

  const handleButtonClick = (buttonText) => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: buttonText, feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  return (
    <div className={`${styles.pageContainerV10} ${isLandingV11 && styles['landingV11']}`}>
      <section className={styles.mainSectionV10}>
        {!isLandingV11 ? (
          <TopContainerV10 />
        ) : (
          <TopContainerV11 />
        )}

        <div className={styles.middleContainer}>
          <img
            className={styles.middleContainerTextImage}
            src='/images/lp_v10/Text_2.png'
            alt='exclusive offer on your first purchase'
            draggable='false'
          />
          <img
            className={styles.middleContainerTextImageMobile}
            src='/images/lp_v10/Text_2_Mobile.png'
            alt='exclusive offer on your first purchase'
            draggable='false'
          />

          <div className={styles.middleContainerBanner}>
            <img
              className={styles.middleContainerBannerImage}
              src='/images/lp_v10/Banner.png'
              alt='Banner'
              draggable='false'
            />
            <img
              className={styles.middleContainerLabelImage}
              src='/images/lp_v10/Label.png'
              alt='Label'
              draggable='false'
            />
          </div>
          <div className={styles.middleContainerBannerMobile}>
            <img
              className={styles.middleContainerBannerImageMobile}
              src='/images/lp_v10/Banner_Mobile.png'
              alt='Banner'
              draggable='false'
            />
          </div>
          <div className={styles.middleContainerCTA}>
            <StyledButtonV7
              text='choose your bonus'
              type='button'
              customClass='middleContainerCTAButtonV10'
              handleClick={() => handleButtonClick('choose your bonus')}
            />
          </div>
        </div>

        <div className={styles.bottomContainer}>
          <div className={styles.bottomContainerContent}>
            <img
              className={styles.bottomContainerTextImage}
              src='/images/lp_v10/Text_3.png'
              alt='NO PURCHASE NECESSARY!'
              draggable='false'
            />
            <h3 className={`${styles.bottomContainerTitle} ${ExoFont.className}`}>IT&apos;S ALWAYS FREE TO PLAY</h3>
          </div>

          <div className={styles.bottomContainerLana}>
            <img
              className={styles.bottomContainerLanaImage}
              src='/images/lp_v10/Lana_2.png'
              alt='Lana'
              draggable='false'
            />
            <img
              className={styles.bottomContainerLanaCoins}
              src='/images/lp_v10/coins_Lana_2.png'
              alt='coins'
              draggable='false'
            />
            <div className={styles.bottomContainerLanaCTA}>
              <StyledButtonV7
                text='spin'
                type='button'
                customClass='bottomContainerCTAButtonV10Phone'
                handleClick={() => handleButtonClick('spin')}
              />
            </div>
          </div>

          <div className={`${styles.circleGlow} ${styles.circleGlow1}`}></div>
          <div className={`${styles.circleGlow} ${styles.circleGlow2}`}></div>
          <div className={`${styles.circleGlow} ${styles.circleGlow3}`}></div>
          <div className={`${styles.circleGlow} ${styles.circleGlow4}`}></div>
          <div className={`${styles.circleGlow} ${styles.circleGlow5}`}></div>
          <div className={`${styles.circleGlow} ${styles.circleGlow6}`}></div>
        </div>

        <div className={styles.bottomContainerLastCTA}>
          <StyledButtonV7
            text='find out more'
            type='button'
            customClass='bottomContainerLastV10Button'
            handleClick={() => handleButtonClick('find out more')}
          />
        </div>

        <div className={styles.bottomContainerTitleNext}>
          <img
            className={styles.bottomContainerTitleNextImage}
            src='/images/lp_v10/Text_PROVIDERS.png'
            alt='Our PROVIDERS'
            draggable='false'
          />
        </div>
      </section>
    </div>
  );
};
