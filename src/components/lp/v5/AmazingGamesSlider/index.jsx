'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { ExoFont } from '@/static/fonts';
import styles from './AmazingGamesSlider.module.scss';

export const AmazingGamesSlider = () => {
  return (
    <section className={styles.amazingGamesSliderComponent}>
      <div className={`${styles.amazingGamesTitle} ${ExoFont.className}`}>
        <img
          className={styles.mainSectionFreeTextImage}
          src='/images/lp_v5/AmazingGamesSlider/AmazingGamesTitle.png'
          alt='Amazing Games Title'
          draggable='false'
        />
      </div>

      <div className={styles.amazingGamesSliderContainer}>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          loop={true}
          speed={3500}
          waitForTransition={false}
          pagination={{
            clickable: false,
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            enabled: true,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
            480: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            992: {
              slidesPerView: 6,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay]}
          className={styles.amazingGamesSlider}
          wrapperClass="amazing-games-slider"
        >
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <Image
              className={styles.mainSectionFreeTextImage}
              src='/images/lp_v5/AmazingGamesSlider/AmazingGamesIcons/slide_1.png'
              alt='Amazing Game Icon'
              draggable='false'
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <Image
              className={styles.mainSectionFreeTextImage}
              src='/images/lp_v5/AmazingGamesSlider/AmazingGamesIcons/slide_2.png'
              alt='Amazing Game Icon'
              draggable='false'
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <Image
              className={styles.mainSectionFreeTextImage}
              src='/images/lp_v5/AmazingGamesSlider/AmazingGamesIcons/slide_3.png'
              alt='Amazing Game Icon'
              draggable='false'
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <Image
              className={styles.mainSectionFreeTextImage}
              src='/images/lp_v5/AmazingGamesSlider/AmazingGamesIcons/slide_4.png'
              alt='Amazing Game Icon'
              draggable='false'
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <Image
              className={styles.mainSectionFreeTextImage}
              src='/images/lp_v5/AmazingGamesSlider/AmazingGamesIcons/slide_5.png'
              alt='Amazing Game Icon'
              draggable='false'
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <Image
              className={styles.mainSectionFreeTextImage}
              src='/images/lp_v5/AmazingGamesSlider/AmazingGamesIcons/slide_6.png'
              alt='Amazing Game Icon'
              draggable='false'
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <Image
              className={styles.mainSectionFreeTextImage}
              src='/images/lp_v5/AmazingGamesSlider/AmazingGamesIcons/slide_7.png'
              alt='Amazing Game Icon'
              draggable='false'
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <Image
              className={styles.mainSectionFreeTextImage}
              src='/images/lp_v5/AmazingGamesSlider/AmazingGamesIcons/slide_8.png'
              alt='Amazing Game Icon'
              draggable='false'
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <Image
              className={styles.mainSectionFreeTextImage}
              src='/images/lp_v5/AmazingGamesSlider/AmazingGamesIcons/slide_9.png'
              alt='Amazing Game Icon'
              draggable='false'
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <Image
              className={styles.mainSectionFreeTextImage}
              src='/images/lp_v5/AmazingGamesSlider/AmazingGamesIcons/slide_10.png'
              alt='Amazing Game Icon'
              draggable='false'
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <Image
              className={styles.mainSectionFreeTextImage}
              src='/images/lp_v5/AmazingGamesSlider/AmazingGamesIcons/slide_11.png'
              alt='Amazing Game Icon'
              draggable='false'
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.amazingGamesSliderSlide}>
            <Image
              className={styles.mainSectionFreeTextImage}
              src='/images/lp_v5/AmazingGamesSlider/AmazingGamesIcons/slide_12.png'
              alt='Amazing Game Icon'
              draggable='false'
              width={100}
              height={100}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
