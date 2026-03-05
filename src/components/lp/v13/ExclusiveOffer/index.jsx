'use client';
import { usePathname, useRouter } from 'next/navigation';
import { StyledButtonV13 } from '../StyledButtonV13';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './exclusiveOffer.module.scss';

export const ExclusiveOffer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const buttonText = 'choose your bonus';

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: buttonText, feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  return (
    <div className={styles.exclusiveOfferV13}>
      <section className={styles.exclusiveOfferV13Container}>
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
          <StyledButtonV13
            text={buttonText}
            type='button'
            customClass=''
            handleClick={handleButtonClick}
          />
        </div>
      </section>
    </div>
  );
};
