'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { StyledButtonV13 } from '../../v13/StyledButtonV13';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './TopContainerV13.module.scss';

export const TopContainerV13 = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const buttonText = 'join now!';
  const titleImage = isMobile ? '/images/lp_v13/heroTextMobile.png' : '/images/lp_v13/heroText.png';
  const charactersImage = isMobile ? '/images/lp_v13/HeroMobile.png' : '/images/lp_v13/Hero.png';

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: buttonText, feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className={styles.topContainerV13}>
      <div className={styles.topContainerV13Inner}>

        <div className={styles.topContainerV13ImageSide}>
          <img
            className={styles.topContainerV13CharactersImage}
            src={charactersImage}
            alt='main image'
            draggable='false'
          />
        </div>

        <div className={styles.topContainerV13ContentSide}>
          <img
            className={styles.topContainerV13TitleImage}
            src={titleImage}
            alt='Welcome Offer'
            draggable='false'
          />
          {!isMobile &&
            <div className={styles.topContainerV13ButtonContainer}>
              <div className={styles.topContainerV13ButtonAnim}>
                <StyledButtonV13 text={buttonText} customClass='' handleClick={handleButtonClick} />
              </div>
            </div>
          }
        </div>

        {isMobile &&
          <div className={styles.topContainerV13ButtonContainer}>
            <div className={styles.topContainerV13ButtonAnim}>
              <StyledButtonV13 text={buttonText} customClass='' handleClick={handleButtonClick} />
            </div>
          </div>
        }
      </div>
    </div>
  );
};
