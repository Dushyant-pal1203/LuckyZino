'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import ImageWithFallback from '@/components/image-with-fallback';
import styles from './ProvidersSlider.module.scss';

export const ProvidersSlider = () => {
  return (
    <section className={styles.providersSliderComponent}>
      <div className={styles.providersSliderTitle}>
        <ImageWithFallback
          src='/images/lp_v7/ProvidersSlider/OUR_PROVIDERS.avif'
          fallbackSrc='/images/lp_v7/ProvidersSlider/OUR_PROVIDERS.png'
          alt='OUR PROVIDERS'
          draggable='false'
          width={400}
          height={60}
        />
      </div>

      <div className={styles.providersSliderContainer}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={30}
          freeMode={true}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            enabled: true,
            pauseOnMouseEnter: false,
          }}
          waitForTransition={false}
          pagination={false}
          breakpoints={{
            992: {
              enabled: false,
              spaceBetween: 0,
            },
          }}
          modules={[FreeMode, Autoplay]}
          className="providersSlider"
          wrapperClass="providers-slider"
        >
          <SwiperSlide className={styles.providersSliderSlide}>
            <ImageWithFallback
              src='/images/lp_v7/ProvidersSlider/3oaks.avif'
              fallbackSrc='/images/lp_v7/ProvidersSlider/3oaks.png'
              alt='3oaks Icon'
              draggable='false'
              fill={true}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.providersSliderSlide}>
            <ImageWithFallback
              src='/images/lp_v7/ProvidersSlider/gaming-corps.avif'
              fallbackSrc='/images/lp_v7/ProvidersSlider/gaming-corps.png'
              alt='gaming-corps Icon'
              draggable='false'
              fill={true}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.providersSliderSlide}>
            <ImageWithFallback
              src='/images/lp_v7/ProvidersSlider/novomatic.avif'
              fallbackSrc='/images/lp_v7/ProvidersSlider/novomatic.png'
              alt='novomatic Icon'
              draggable='false'
              fill={true}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.providersSliderSlide}>
            <ImageWithFallback
              src='/images/lp_v7/ProvidersSlider/booming.avif'
              fallbackSrc='/images/lp_v7/ProvidersSlider/booming.png'
              alt='booming Icon'
              draggable='false'
              fill={true}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.providersSliderSlide}>
            <ImageWithFallback
              src='/images/lp_v7/ProvidersSlider/Betsoft.avif'
              fallbackSrc='/images/lp_v7/ProvidersSlider/Betsoft.png'
              alt='Betsoft Icon'
              draggable='false'
              width={128}
              height={100}
              style={{ objectFit: 'contain', objectPosition: 'center', display: 'block' }}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
