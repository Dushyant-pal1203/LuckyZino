'use client';
import { usePathname, useRouter } from 'next/navigation';
import { StyledButtonV5 } from '../../v5/StyledButtonV5';
import { ExoBlackFont } from '@/static/fonts';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './MainSectionV8.module.scss';

export const MainSectionV8 = () => {
  const router = useRouter();
  const pathname = usePathname();

  const buttonText = 'Get Offer!';

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: buttonText, feature_name: pathname }
    });
    router.replace('/sign-in');
  }

  return (
    <>
      <section className={styles.mainSectionComponent}>
        <div className={styles.mainSectionContainer}>
          <div className={`${styles.mainSectionRightSide} ${ExoBlackFont.className}`}>
            <div className={styles.mainSectionRightSideTop}>
              <div className={styles.mainSectionTitle}>
                <img
                  className={styles.mainSectionTitleImage}
                  src='/images/lp_v8/Special_Deal.png'
                  alt='Welcome Offer'
                  draggable='false'
                />
              </div>
              <div className={styles.mainSectionFreeTextContainer}>
                <img
                  className={styles.mainSectionFreeTextImage}
                  src='/images/lp_v8/FREE_20_SC.png'
                  alt='FREE_SC'
                  draggable='false'
                />
              </div>
              <div className={styles.mainSectionSubTitle}>
                <img
                  className={styles.mainSectionSubTitleImage}
                  src='/images/lp_v8/80_GC.png'
                  alt='SC'
                  draggable='false'
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            <StyledButtonV5
              text={buttonText}
              type='button'
              customClass='mainSectionButtonDesktop'
              handleClick={handleButtonClick}
            />
          </div>
          <div className={styles.mainSectionLeftSide}>
            <img
              className={styles.slotMachine}
              src='/images/lp_v5/Lana_V5.png'
              alt='slot machine'
              draggable='false'
            />

          </div>
        </div>
      </section>
      <div className={styles.mobileCTA}>
        <StyledButtonV5
          text={buttonText}
          type='button'
          customClass='mainSectionButtonMobile'
          handleClick={handleButtonClick}
        />
      </div>
    </>
  );
};
