'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ExoFont } from '@/static/fonts';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './ClaimSectionV8.module.scss';

export const ClaimSectionV8 = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: 'Claim Your Exclusive Offers', feature_name: pathname }
    });
    router.replace('/sign-in');
  }

  return (
    <section className={styles.claimSectionComponent}>
      <h2 className={`${styles.claimSectionTitle} ${ExoFont.className}`}>Claim Your Exclusive Offers</h2>
      <div className={styles.claimSectionContainerMobile}>
        <div className={styles.contentTileTop}>
          <button className={styles.contentTileBtn} onClick={handleButtonClick}>
            <img
              className={styles.iconMobileHorizontal}
              src='/images/lp_v5/GoldCard_Horizontal.png'
              alt='icon'
              draggable='false'
            />
          </button>
        </div>

        <div className={styles.contentTileBottom}>
          <button className={styles.contentTileBtn} style={{ width: '50%' }} onClick={handleButtonClick}>
            <img
              className={styles.iconMobileVertical}
              src='/images/lp_v8/Vertical_Card_4.png'
              alt='icon'
              draggable='false'
            />
          </button>

          <button className={styles.contentTileBtn} style={{ width: '50%' }} onClick={handleButtonClick}>
            <img
              className={styles.iconMobileVertical}
              src='/images/lp_v8/Vertical_Card_5.png'
              alt='icon'
              draggable='false'
            />
          </button>
        </div>
      </div>

      <div className={styles.claimSectionContainer}>
        <div className={styles.contentTile}>
          <button className={styles.contentTileBtn} onClick={handleButtonClick}>
            <img
              className={styles.icon}
              src='/images/lp_v5/GoldCard_Vertical.png'
              alt='icon'
              draggable='false'
            />
          </button>
        </div>
        <div className={styles.contentTile}>
          <button className={styles.contentTileBtn} onClick={handleButtonClick}>
            <img
              className={styles.icon}
              src='/images/lp_v8/Vertical_Card_4.png'
              alt='icon'
              draggable='false'
            />
          </button>
        </div>
        <div className={styles.contentTile}>
          <button className={styles.contentTileBtn} onClick={handleButtonClick}>
            <img
              className={styles.icon}
              src='/images/lp_v8/Vertical_Card_5.png'
              alt='icon'
              draggable='false'
            />
          </button>
        </div>
      </div>
    </section>
  );
};
