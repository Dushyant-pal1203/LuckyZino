'use client';
import { usePathname, useRouter } from 'next/navigation';
import { StyledButtonV13 } from '../../v13/StyledButtonV13';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './MainSectionV13.module.scss';

export const MainSectionV13 = () => {
  const router = useRouter();
  const pathname = usePathname();

  const buttonText = 'join now!';

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: buttonText, feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  return (
    <section className={styles.mainSectionV13}>
      <div className={styles.mainSectionV13Container}>
        <div className={styles.mainSectionV13ContainerContent}>
          <img
            className={styles.mainSectionV13ContainerTitleImage}
            src='/images/lp_v13/title.png'
            alt='number one social casino in america'
            draggable='false'
          />
          <img
            className={styles.mainSectionV13ContainerTextImage}
            src='/images/lp_v13/text.png'
            alt='NO PURCHASE NECESSARY! IT`S ALWAYS FREE TO PLAY'
            draggable='false'
          />
        </div>

        <div className={styles.mainSectionV13ContainerLana}>
          <img
            className={styles.mainSectionV13ContainerLanaImage}
            src='/images/lp_v10/Lana_2.png'
            alt='Lana'
            draggable='false'
          />
          <img
            className={styles.mainSectionV13ContainerLanaCoins}
            src='/images/lp_v10/coins_Lana_2.png'
            alt='coins'
            draggable='false'
          />
          <div className={styles.mainSectionV13ContainerLanaCTA}>
            <StyledButtonV13
              text='spin'
              type='button'
              customClass='bottomContainerCTAButtonV10Phone'
              handleClick={handleButtonClick}
            />
          </div>
        </div>

        <div className={`${styles.mainSectionV13circleGlow} ${styles.mainSectionV13circleGlow1}`}></div>
        <div className={`${styles.mainSectionV13circleGlow} ${styles.mainSectionV13circleGlow2}`}></div>
        <div className={`${styles.mainSectionV13circleGlow} ${styles.mainSectionV13circleGlow3}`}></div>
        <div className={`${styles.mainSectionV13circleGlow} ${styles.mainSectionV13circleGlow4}`}></div>
        <div className={`${styles.mainSectionV13circleGlow} ${styles.mainSectionV13circleGlow5}`}></div>
        <div className={`${styles.mainSectionV13circleGlow} ${styles.mainSectionV13circleGlow6}`}></div>
      </div>

      <div className={styles.mainSectionV13ContainerLastCTA}>
        <StyledButtonV13
          text='find out more'
          type='button'
          customClass=''
          handleClick={handleButtonClick}
        />
      </div>

      <div className={styles.mainSectionV13ContainerTitleNext}>
        <img
          className={styles.mainSectionV13ContainerTitleNextImage}
          src='/images/lp_v10/Text_PROVIDERS.png'
          alt='Our PROVIDERS'
          draggable='false'
        />
      </div>
    </section>
  );
};
