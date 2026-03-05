'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { ExoFont } from '@/static/fonts';
import styles from './PlayNowSlider.module.scss';

export const PlayNowSlider = () => {
  return (
    <section className={styles.playNowSliderSliderComponent}>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination]}
        pagination={{
          clickable: true,
          el: `.${styles.playNowSliderBar}`,
          bulletClass: `${styles.playNowSliderBullet}`,
          bulletActiveClass: `${styles.playNowSliderBulletActive}`,
        }}
        className="playNowSlider"
      >
        <SwiperSlide className={styles.playNowSliderSlide}>
          <div className={styles.playNowSlideContainer}>
            <div className={`${styles.playNowCardContent} ${ExoFont.className}`}>
              <h3 className={styles.playNowCardTitle}>Booming Games is Live</h3>
              <p className={styles.playNowCardText}>Start playing and discover new favorite game today</p>
              <div className={styles.playNowCardAction}>
                <button className={styles.playNowCardButton} onClick={() => {}}>Play Now!</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.playNowSliderSlide}>
          <div className={styles.playNowSlideContainer}>
            <div className={`${styles.playNowCardContent} ${ExoFont.className}`}>
              <h3 className={styles.playNowCardTitle}>Booming Games is Live</h3>
              <p className={styles.playNowCardText}>Start playing and discover new favorite game today</p>
              <div className={styles.playNowCardAction}>
                <button className={styles.playNowCardButton} onClick={() => {}}>Play Now!</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.playNowSliderSlide}>
          <div className={styles.playNowSlideContainer}>
            <div className={`${styles.playNowCardContent} ${ExoFont.className}`}>
              <h3 className={styles.playNowCardTitle}>Booming Games is Live</h3>
              <p className={styles.playNowCardText}>Start playing and discover new favorite game today</p>
              <div className={styles.playNowCardAction}>
                <button className={styles.playNowCardButton} onClick={() => {}}>Play Now!</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.playNowSliderSlide}>
          <div className={styles.playNowSlideContainer}>
            <div className={`${styles.playNowCardContent} ${ExoFont.className}`}>
              <h3 className={styles.playNowCardTitle}>Booming Games is Live</h3>
              <p className={styles.playNowCardText}>Start playing and discover new favorite game today</p>
              <div className={styles.playNowCardAction}>
                <button className={styles.playNowCardButton} onClick={() => {}}>Play Now!</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.playNowSliderSlide}>
          <div className={styles.playNowSlideContainer}>
            <div className={`${styles.playNowCardContent} ${ExoFont.className}`}>
              <h3 className={styles.playNowCardTitle}>Booming Games is Live</h3>
              <p className={styles.playNowCardText}>Start playing and discover new favorite game today</p>
              <div className={styles.playNowCardAction}>
                <button className={styles.playNowCardButton} onClick={() => {}}>Play Now!</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.playNowSliderSlide}>
          <div className={styles.playNowSlideContainer}>
            <div className={`${styles.playNowCardContent} ${ExoFont.className}`}>
              <h3 className={styles.playNowCardTitle}>Booming Games is Live</h3>
              <p className={styles.playNowCardText}>Start playing and discover new favorite game today</p>
              <div className={styles.playNowCardAction}>
                <button className={styles.playNowCardButton} onClick={() => {}}>Play Now!</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.playNowSliderSlide}>
          <div className={styles.playNowSlideContainer}>
            <div className={`${styles.playNowCardContent} ${ExoFont.className}`}>
              <h3 className={styles.playNowCardTitle}>Booming Games is Live</h3>
              <p className={styles.playNowCardText}>Start playing and discover new favorite game today</p>
              <div className={styles.playNowCardAction}>
                <button className={styles.playNowCardButton} onClick={() => {}}>Play Now!</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.playNowSliderSlide}>
          <div className={styles.playNowSlideContainer}>
            <div className={`${styles.playNowCardContent} ${ExoFont.className}`}>
              <h3 className={styles.playNowCardTitle}>Booming Games is Live</h3>
              <p className={styles.playNowCardText}>Start playing and discover new favorite game today</p>
              <div className={styles.playNowCardAction}>
                <button className={styles.playNowCardButton} onClick={() => {}}>Play Now!</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className={styles.playNowSliderSlide}>
          <div className={styles.playNowSlideContainer}>
            <div className={`${styles.playNowCardContent} ${ExoFont.className}`}>
              <h3 className={styles.playNowCardTitle}>Booming Games is Live</h3>
              <p className={styles.playNowCardText}>Start playing and discover new favorite game today</p>
              <div className={styles.playNowCardAction}>
                <button className={styles.playNowCardButton} onClick={() => {}}>Play Now!</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <div className={styles.playNowSliderBar}></div>
      </Swiper>
    </section>
  );
}