'use client';
import { ExoFont, ExoBlackFont } from '@/static/fonts';
import { usePathname, useRouter } from 'next/navigation';
import StyledButton from '../StyledButton';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './WinSection.module.scss';

export const WinSection = () => {
  const router = useRouter();
  const pathname = usePathname();

  const btnText = 'Play and Win!';

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: mainBtnText, feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  return (
    <section className={styles.winSectionComponent}>
      <div className={`${styles.winSectionContainer} ${ExoFont.className}`}>
        <div className={styles.imageSide}>
          <img className={styles.chest} src='/images/mainPage/winSection/chest.png' alt='icon' draggable='false' />
          <img
            className={styles.chestGlow}
            src='/images/mainPage/winSection/chest_glow.png'
            alt='icon'
            draggable='false'
          />

          <img
            className={`${styles.flyCoins} ${styles.flyCoin_1} ${styles.coinLeft}`}
            src='/images/mainPage/winSection/flyCoins/fly-coin-1.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.flyCoin_2} ${styles.coinLeft}`}
            src='/images/mainPage/winSection/flyCoins/fly-coin-2.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.flyCoin_3} ${styles.coinLeft}`}
            src='/images/mainPage/winSection/flyCoins/fly-coin-3.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.flyCoin_4} ${styles.coinRight}`}
            src='/images/mainPage/winSection/flyCoins/fly-coin-4.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.flyCoin_5} ${styles.coinRight}`}
            src='/images/mainPage/winSection/flyCoins/fly-coin-5.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.flyCoin_6} ${styles.coinRight}`}
            src='/images/mainPage/winSection/flyCoins/fly-coin-6.png'
            alt='fly-coin'
            draggable='false'
          />
        </div>

        <div className={`${styles.contentSide} ${ExoBlackFont.className}`}>
          <h2 className={`${styles.winSectionTitle} ${ExoBlackFont.className}`}>
            play for free <br />{' '}
            <span className={`${styles.winSectionTitleGlow} ${ExoBlackFont.className}`}>and win</span>
          </h2>
          <h2 className={`${styles.winSectionTitle} ${ExoBlackFont.className}`}>real prizes!</h2>
          <StyledButton
            text={btnText}
            type='button'
            customClass={'winSectionButton'}
            handleClick={handleButtonClick}
          />
        </div>
      </div>
    </section>
  );
};
