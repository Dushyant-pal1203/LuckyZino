'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ExoBlackFont } from '@/static/fonts';
import StyledButton from '../StyledButton';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './MainSection.module.scss';

export const MainSection = ({ mainBtnText }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: mainBtnText, feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  return (
    <section className={styles.mainSectionComponent}>
      <div className={styles.mainSectionContainer}>
        {/* <div className={styles.mainSectionTopTextContainer}>
          <div>
            <img
              className={styles.hundredPercentLegal}
              src='/images/mainPage/mainSection/hundred-percent-legal.svg'
              alt='100% US LEGAL!'
              draggable='false'
            />
          </div>
        </div> */}
        <div className={`${styles.mainSectionRightSide} ${ExoBlackFont.className}`}>
          <h1 className={styles.mainSectionTitle}>100% WELCOME BONUS OFFER!</h1>
          <div className={styles.mainSectionFreeTextContainer}>
            <h2 className={styles.mainSectionFreeTextShadow}>FREE 20 SC +</h2>
            <h2 className={styles.mainSectionFreeTextGradient}>FREE 20 SC +</h2>
          </div>
          <div className={styles.mainSectionSubTitle}>
            <span className={styles.textShadow}>80,000,000 GC</span>
            <span className={styles.textGradient}>80,000,000 GC</span>
          </div>
          <div className={styles.mainSectionLimitLabel}>
            <img
              className={styles.limitTimeImage}
              src='/images/mainPage/mainSection/Limited-time-label.png'
              alt='Limited time label'
              draggable='false'
            />
            <span className={styles.limitTimeSubText}>$29.99</span>
            <p className={styles.limitTimeText}>NOW ONLY <b>$9.99!</b></p>
          </div>
          <StyledButton
            text={mainBtnText}
            type='button'
            customClass='mainSectionButton'
            handleClick={handleButtonClick}
          />
        </div>
        <div className={styles.mainSectionLeftSide}>
          <img
            className={styles.slotMachine}
            src='/images/mainPage/mainSection/slotMachine.png'
            alt='slot machine'
            draggable='false'
          />
          {/* <img
            className={styles.no1SlotMachines}
            src='/images/mainPage/mainSection/no1-us-slot-machines.png'
            alt='coming-soon'
            draggable='false'
          /> */}
          <img className={styles.coins} src='/images/mainPage/mainSection/coins.png' alt='coins' draggable='false' />
          <img
            className={styles.coinsMobile}
            src='/images/mainPage/mainSection/coins-mobile.png'
            alt='coins'
            draggable='false'
          />
          <div className={styles.coinsMobileGradient}></div>
          <img className={styles.girl} src='/images/mainPage/mainSection/girl.png' alt='person' draggable='false' />
          <img
            className={`${styles.flyCoins} ${styles.coin1} ${styles.coin}`}
            src='/images/mainPage/mainSection/flyCoinsAndDollars/coin1.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.coin2} ${styles.coin}`}
            src='/images/mainPage/mainSection/flyCoinsAndDollars/coin2.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.coin3} ${styles.coin}`}
            src='/images/mainPage/mainSection/flyCoinsAndDollars/coin3.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.coin4} ${styles.coin}`}
            src='/images/mainPage/mainSection/flyCoinsAndDollars/coin4.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.coin5} ${styles.coin}`}
            src='/images/mainPage/mainSection/flyCoinsAndDollars/coin5.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.coin6} ${styles.coin}`}
            src='/images/mainPage/mainSection/flyCoinsAndDollars/coin6.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.dollar1} ${styles.coin}`}
            src='/images/mainPage/mainSection/flyCoinsAndDollars/dollar1.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.dollar2} ${styles.coin}`}
            src='/images/mainPage/mainSection/flyCoinsAndDollars/dollar2.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.dollar3} ${styles.coin}`}
            src='/images/mainPage/mainSection/flyCoinsAndDollars/dollar3.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.dollar4} ${styles.coin}`}
            src='/images/mainPage/mainSection/flyCoinsAndDollars/dollar4.png'
            alt='fly-coin'
            draggable='false'
          />
          <img
            className={`${styles.flyCoins} ${styles.dollar4Copy} ${styles.coin}`}
            src='/images/mainPage/mainSection/flyCoinsAndDollars/dollar4.png'
            alt='fly-coin'
            draggable='false'
          />
        </div>
      </div>
    </section>
  );
};
