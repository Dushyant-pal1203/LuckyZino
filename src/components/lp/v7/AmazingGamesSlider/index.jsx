'use client';

import ImageWithFallback from '@/components/image-with-fallback';
import { usePathname, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Autoplay } from 'swiper/modules';
import { StyledButtonV7 } from '../StyledButtonV7';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './AmazingGamesSlider.module.scss';

export const AmazingGamesSlider = () => {
  const router = useRouter();
  const pathname = usePathname();

  const buttonText = 'GAME ON - let’s go!';

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: buttonText, feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  return (
    <section className={styles.amazingGamesSliderComponent}>
      <div className={styles.amazingGamesTitle}>
        <ImageWithFallback
          src='/images/lp_v7/AmazingGamesSlider/FavGameText.avif'
          fallbackSrc='/images/lp_v7/AmazingGamesSlider/FavGameText.png'
          alt='Amazing Games Title'
          draggable='false'
          width={600}
          height={100}
          priority
        />
      </div>
      <div className={styles.amazingGamesTitleMobile}>
        <ImageWithFallback
          src='/images/lp_v7/AmazingGamesSlider/FavGameTextMob.avif'
          fallbackSrc='/images/lp_v7/AmazingGamesSlider/FavGameTextMob.png'
          alt='Amazing Games Title'
          draggable='false'
          width={400}
          height={80}
          priority
        />
      </div>

      <div className={styles.amazingGamesSliderContainer}>
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          loop={true}
          speed={3500}
          waitForTransition={false}
          pagination={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            enabled: true,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
            480: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            992: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
            1720: {
              slidesPerView: 8,
              spaceBetween: 40,
            },
          }}
          modules={[Grid, Autoplay]}
          className={styles.amazingGamesSlider}
          wrapperClass="amazing-games-slider"
        >
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <div className={styles.amazingGamesSliderSlideRow}>
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon1.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon1.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-1.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-1.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <div className={styles.amazingGamesSliderSlideRow}>
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon2.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon2.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-2.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-2.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <div className={styles.amazingGamesSliderSlideRow}>
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon3.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon3.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-3.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-3.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <div className={styles.amazingGamesSliderSlideRow}>
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon4.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon4.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-4.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-4.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <div className={styles.amazingGamesSliderSlideRow}>
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon5.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon5.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-5.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-5.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <div className={styles.amazingGamesSliderSlideRow}>
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon6.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon6.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-6.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-6.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <div className={styles.amazingGamesSliderSlideRow}>
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon7.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon7.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-7.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-7.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <div className={styles.amazingGamesSliderSlideRow}>
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon8.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon8.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-8.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-8.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <div className={styles.amazingGamesSliderSlideRow}>
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon9.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon9.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-9.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-9.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <div className={styles.amazingGamesSliderSlideRow}>
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon10.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row1/SlotIcon10.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
              <ImageWithFallback
                src='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-10.avif'
                fallbackSrc='/images/lp_v7/AmazingGamesSlider/row2/SlotIcon02-10.png'
                alt='Amazing Game Icon'
                draggable='false'
                width={100}
                height={100}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className={styles.amazingGamesButtonContainer}>
        <StyledButtonV7 text={buttonText} handleClick={handleButtonClick} />
      </div>
    </section>
  );
};
