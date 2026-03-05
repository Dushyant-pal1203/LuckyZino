'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { StyledButtonV7 } from '../StyledButtonV7';
import { ExoBlackFont } from '@/static/fonts';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './VideoSection.module.scss';
import ImageWithFallback from '@/components/image-with-fallback';

export const VideoSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const isLandingV9 = pathname === '/lp/v9';
  const isLandingV12 = pathname === '/lp/v12';
  const isLandingV14 = pathname === '/lp/v14';
  const videoVersion = isLandingV12 ? 'v12' : 'v7';

  const buttonText = isLandingV9 || isLandingV12 || isLandingV14 ? 'Get Offer' : 'Join now!';

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: buttonText, feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  return (
    <section className={styles.videoSectionComponent}>
      {(isMobile === false || isMobile === null) && (
        <video
          className={styles.videoSectionHeroVideo}
          src={`/images/lp_${videoVersion}/video/Welcome_Compress.mp4`}
          poster={isLandingV12 ? '/images/lp_v12/Center_bg.jpg' : '/images/lp_v7/Main_bg.jpg'}
          autoPlay
          muted
          loop
          playsInline
        ></video>
      )}
      {isMobile === true && (
        <video
          className={styles.videoSectionHeroVideoMobile}
          src={`/images/lp_${videoVersion}/video/Welcome_Compress_Mob.mp4`}
          poster={isLandingV12 ? '/images/lp_v12/Center_bg.jpg' : '/images/lp_v7/Main_bg.jpg'}
          autoPlay
          muted
          loop
          playsInline
        ></video>
      )}

      <div className={`${styles.videoSectionContent} ${ExoBlackFont.className} ${(isLandingV9 || isLandingV12 || isLandingV14) && styles.videoSectionContentV9}`}>
        {isLandingV9 || isLandingV12 || isLandingV14 ? (
          <div className={`${styles.videoSectionTitle} ${isLandingV9 && styles.videoSectionTitleV9} ${isLandingV12 && styles.videoSectionTitleV12} ${isLandingV14 && styles.videoSectionTitleV14}`}>
            <ImageWithFallback
              className={styles.videoSectionTitleImage}
              src={`/images/${isLandingV12 ? 'lp_v12' : isLandingV14 ? 'lp_v14' : isLandingV9 ? 'lp_v9' : ''}/CLAIM_UP.avif`}
              fallbackSrc={`/images/${isLandingV12 ? 'lp_v12' : isLandingV14 ? 'lp_v14' : isLandingV9 ? 'lp_v9' : ''}/CLAIM_UP.png`}
              alt='Claim up to'
              draggable='false'
              width={500}
              height={200}
              priority
            />
          </div>
        ) : (
          <div className={styles.videoSectionTitle}>
            <ImageWithFallback
              className={styles.videoSectionTitleImage}
              src='/images/lp_v7/CLAIM.avif'
              fallbackSrc='/images/lp_v7/CLAIM.png'
              alt='Claim up to'
              draggable='false'
              width={500}
              height={200}
              priority
            />
          </div>
        )}

        {isLandingV9 || isLandingV12 || isLandingV14 ? (
          <div className={`${styles.videoSectionSubTitle} ${(isLandingV9 || isLandingV12 || isLandingV14) && styles.videoSectionSubTitleV9}`}>
            <ImageWithFallback
              className={styles.videoSectionSubTitleImage}
              src={`/images/${isLandingV12 ? 'lp_v12' : isLandingV14 ? 'lp_v14' : isLandingV9 ? 'lp_v9' : ''}/25000_GC.avif`}
              fallbackSrc={`/images/${isLandingV12 ? 'lp_v12' : isLandingV14 ? 'lp_v14' : isLandingV9 ? 'lp_v9' : ''}/25000_GC.png`}
              alt={isLandingV14 ? '30,000 GC' : '25,000 GC'}
              draggable='false'
              width={600}
              height={300}
              priority
            />
          </div>
        ) : (
          <div className={styles.videoSectionSubTitle}>
            <ImageWithFallback
              className={styles.videoSectionSubTitleImage}
              src='/images/lp_v7/80_GC.avif'
              fallbackSrc='/images/lp_v7/80_GC.png'
              alt='80,000,000 GC'
              draggable='false'
              width={600}
              height={300}
              priority
            />
          </div>
        )}

        {isLandingV9 || isLandingV12 || isLandingV14 ? (
          <div className={`${styles.videoSectionFreeTextContainer} ${(isLandingV9 || isLandingV12 || isLandingV14) && styles.videoSectionFreeTextContainerV9}`}>
            <ImageWithFallback
              className={styles.videoSectionFreeTextImage}
              src={`/images/${isLandingV12 ? 'lp_v12' : isLandingV14 ? 'lp_v14' : isLandingV9 ? 'lp_v9' : ''}/25_free.avif`}
              fallbackSrc={`/images/${isLandingV12 ? 'lp_v12' : isLandingV14 ? 'lp_v14' : isLandingV9 ? 'lp_v9' : ''}/25_free.png`}
              alt='FREE_SC'
              draggable='false'
              width={600}
              height={300}
              priority
            />
            <ImageWithFallback
              className={styles.videoSectionFreeTextImage}
              src={`/images/${isLandingV12 ? 'lp_v12' : 'lp_v9'}/sweeps_coins.avif`}
              fallbackSrc={`/images/${isLandingV12 ? 'lp_v12' : 'lp_v9'}/sweeps_coins.png`}
              alt='FREE_SC'
              draggable='false'
              width={200}
              height={100}
              priority
            />
          </div>
        ) : (
          <div className={styles.videoSectionFreeTextContainer}>
            <ImageWithFallback
              className={styles.videoSectionFreeTextImage}
              src='/images/lp_v7/Free-SC.avif'
              fallbackSrc='/images/lp_v7/Free-SC.png'
              alt='FREE_SC'
              draggable='false'
              width={200}
              height={100}
              priority
            />
          </div>
        )}

        <StyledButtonV7 text={buttonText} customClass={isLandingV9 || isLandingV12 || isLandingV14 ? 'videoSectionButtonV9' : 'videoSectionButton'} handleClick={handleButtonClick} />
      </div>
    </section>
  );
};
