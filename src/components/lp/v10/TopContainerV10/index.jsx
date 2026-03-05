'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ExoFont } from '@/static/fonts';
import { StyledButtonV7 } from '../../v7/StyledButtonV7';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './TopContainerV10.module.scss';

export const TopContainerV10 = () => {
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
    <div className={styles.topContainer}>
      <div className={styles.topContainerZuzu}>
        <img
          className={styles.topContainerImage}
          src='/images/lp_v10/Zuzu_1.png'
          alt='Zuzu'
          draggable='false'
        />
      </div>

      <div className={styles.topContainerContent}>
        <img
          className={styles.topContainerTextImage}
          src='/images/lp_v10/Text_1.png'
          alt='Social Casino in america'
          draggable='false'
        />
        <h1 className={`${styles.topContainerTitle} ${ExoFont.className}`}>GET READY TO WIN REAL PRIZES!</h1>
        <div className={styles.topContainerCTA}>
          <StyledButtonV7
            text={buttonText}
            type='button'
            customClass='topContainerCTAButtonV10'
            handleClick={handleButtonClick}
          />
        </div>
      </div>

      <div className={styles.topContainerLana}>
        <img
          className={styles.topContainerImage}
          src='/images/lp_v10/Lana_1.png'
          alt='Lana'
          draggable='false'
        />
      </div>

      <div className={styles.topContainerCharactersMobile}>
        <img
          className={styles.topContainerImage}
          src='/images/lp_v10/Characters.png'
          alt='Lana'
          draggable='false'
        />
      </div>
    </div>
  );
};
