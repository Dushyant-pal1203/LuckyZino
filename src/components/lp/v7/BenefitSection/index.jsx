'use client';
import { useRouter, usePathname } from 'next/navigation';
import ImageWithFallback from '@/components/image-with-fallback';
import { StyledButtonV7 } from '../StyledButtonV7';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './BenefitSection.module.scss';

export const BenefitSection = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isLandingV12 = pathname === '/lp/v12';
  const sectionClass = isLandingV12
    ? styles.benefitSectionComponentV12
    : styles.benefitSectionComponent;

  const buttonText = 'Play now!';

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: buttonText, feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  return (
    <section className={sectionClass}>
      <div className={styles.benefitSectionContainer}>
        <div className={styles.benefitSectionContentSide}>
          <ImageWithFallback
            className={styles.benefitSectionTitleImage}
            src='/images/lp_v7/EndlessGameTitle.avif'
            fallbackSrc='/images/lp_v7/EndlessGameTitle.png'
            alt='Welcome Offer'
            draggable='false'
            width={600}
            height={200}
          />
          <div className={styles.benefitSectionButtonContainer}>
            <StyledButtonV7 text={buttonText} customClass={'benefitSectionButton'} handleClick={handleButtonClick} />
          </div>
        </div>

        <div className={styles.benefitSectionImageSide}>
          <ImageWithFallback
            className={styles.benefitSectionCharactersImage}
            src='/images/lp_v7/characters.avif'
            fallbackSrc='/images/lp_v7/characters.png'
            alt='icon'
            draggable='false'
            width={500}
            height={400}
          />
        </div>
      </div>
    </section>
  );
};
