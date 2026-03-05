'use client';
import { usePathname, useRouter } from 'next/navigation';
import { StyledButtonV7 } from '../../v7/StyledButtonV7';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './TopContainerV11.module.scss';

export const TopContainerV11 = () => {
  const router = useRouter();
  const pathname = usePathname();

  const buttonText = 'Join now!';

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: buttonText, feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  return (
    <div className={styles.topContainerV11}>
      <div className={styles.topContainerV11Inner}>
        <div className={styles.topContainerV11ButtonContainer}>
          <StyledButtonV7 text={buttonText} customClass={'topContainerV11Button'} handleClick={handleButtonClick} />
        </div>

        <div className={styles.topContainerV11ContentSide}>
          <img
            className={styles.topContainerV11TitleImage}
            src='/images/lp_v11/TitleV11.png'
            alt='Welcome Offer'
            draggable='false'
          />

        </div>

        <div className={styles.topContainerV11ImageSide}>
          <img
            className={styles.topContainerV11CharactersImage}
            src='/images/lp_v11/LanaV11.png'
            alt='Lana'
            draggable='false'
          />
        </div>
      </div>
    </div>
  );
};
