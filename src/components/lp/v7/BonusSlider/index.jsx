'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './BonusSlider.module.scss';
import ImageWithFallback from '@/components/image-with-fallback';

export const BonusSlider = ({ customClassName }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSlideClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: 'Slider Slide Click', feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  return (
    <section className={`${styles.bonusSliderComponent} ${customClassName ? styles[customClassName] : ''}`}>
      <div className={styles.bonusSliderContainer}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={20}
          centeredSlides={true}
          freeMode={true}
          loop={true}
          speed={1500}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            enabled: true,
            pauseOnMouseEnter: false,
          }}
          waitForTransition={false}
          pagination={{
            clickable: false,
          }}
          modules={[FreeMode, Autoplay]}
          className="BonusSlider"
          wrapperClass="bonus-slider"
        >
          <SwiperSlide className={styles.bonusSliderSlide} onClick={handleSlideClick}>
            <ImageWithFallback
              src='/images/lp_v7/BonusSlider/new_games.avif'
              fallbackSrc='/images/lp_v7/BonusSlider/new_games.png'
              alt='Amazing Game Icon'
              draggable='false'
              fill
            />
          </SwiperSlide>
          <SwiperSlide className={styles.bonusSliderSlide} onClick={handleSlideClick}>
            <ImageWithFallback
              src='/images/lp_v7/BonusSlider/hourly_bonus.avif'
              fallbackSrc='/images/lp_v7/BonusSlider/hourly_bonus.png'
              alt='Amazing Game Icon'
              draggable='false'
              fill
            />
          </SwiperSlide>
          <SwiperSlide className={styles.bonusSliderSlide} onClick={handleSlideClick}>
            <ImageWithFallback
              src='/images/lp_v7/BonusSlider/welcome_bonus.avif'
              fallbackSrc='/images/lp_v7/BonusSlider/welcome_bonus.png'
              alt='Amazing Game Icon'
              draggable='false'
              fill
            />
          </SwiperSlide>
          <SwiperSlide className={styles.bonusSliderSlide} onClick={handleSlideClick}>
            <ImageWithFallback
              src='/images/lp_v7/BonusSlider/daily_bonus.avif'
              fallbackSrc='/images/lp_v7/BonusSlider/daily_bonus.png'
              alt='Amazing Game Icon'
              draggable='false'
              fill
            />
          </SwiperSlide>
          <SwiperSlide className={styles.bonusSliderSlide} onClick={handleSlideClick}>
            <ImageWithFallback
              src='/images/lp_v7/BonusSlider/new_games.avif'
              fallbackSrc='/images/lp_v7/BonusSlider/new_games.png'
              alt='Amazing Game Icon'
              draggable='false'
              fill
            />
          </SwiperSlide>
          <SwiperSlide className={styles.bonusSliderSlide} onClick={handleSlideClick}>
            <ImageWithFallback
              src='/images/lp_v7/BonusSlider/hourly_bonus.avif'
              fallbackSrc='/images/lp_v7/BonusSlider/hourly_bonus.png'
              alt='Amazing Game Icon'
              draggable='false'
              fill
            />
          </SwiperSlide>
          <SwiperSlide className={styles.bonusSliderSlide} onClick={handleSlideClick}>
            <ImageWithFallback
              src='/images/lp_v7/BonusSlider/welcome_bonus.avif'
              fallbackSrc='/images/lp_v7/BonusSlider/welcome_bonus.png'
              alt='Amazing Game Icon'
              draggable='false'
              fill
            />
          </SwiperSlide>
          <SwiperSlide className={styles.bonusSliderSlide} onClick={handleSlideClick}>
            <ImageWithFallback
              src='/images/lp_v7/BonusSlider/daily_bonus.avif'
              fallbackSrc='/images/lp_v7/BonusSlider/daily_bonus.png'
              alt='Amazing Game Icon'
              draggable='false'
              fill
            />
          </SwiperSlide>
          <SwiperSlide className={styles.bonusSliderSlide} onClick={handleSlideClick}>
            <ImageWithFallback
              src='/images/lp_v7/BonusSlider/new_games.avif'
              fallbackSrc='/images/lp_v7/BonusSlider/new_games.png'
              alt='Amazing Game Icon'
              draggable='false'
              fill
            />
          </SwiperSlide>
          <SwiperSlide className={styles.bonusSliderSlide} onClick={handleSlideClick}>
            <ImageWithFallback
              src='/images/lp_v7/BonusSlider/hourly_bonus.avif'
              fallbackSrc='/images/lp_v7/BonusSlider/hourly_bonus.png'
              alt='Amazing Game Icon'
              draggable='false'
              fill
            />
          </SwiperSlide>
          <SwiperSlide className={styles.bonusSliderSlide} onClick={handleSlideClick}>
            <ImageWithFallback
              src='/images/lp_v7/BonusSlider/welcome_bonus.avif'
              fallbackSrc='/images/lp_v7/BonusSlider/welcome_bonus.png'
              alt='Amazing Game Icon'
              draggable='false'
              fill
            />
          </SwiperSlide>
          <SwiperSlide className={styles.bonusSliderSlide} onClick={handleSlideClick}>
            <ImageWithFallback
              src='/images/lp_v7/BonusSlider/daily_bonus.avif'
              fallbackSrc='/images/lp_v7/BonusSlider/daily_bonus.png'
              alt='Amazing Game Icon'
              draggable='false'
              fill
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
