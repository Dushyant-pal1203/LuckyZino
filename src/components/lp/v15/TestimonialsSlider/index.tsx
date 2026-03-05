'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import { ExoFont, ExoBlackFont } from '@/static/fonts';
import Image from 'next/image';
import styles from './TestimonialsSlider.module.scss';

export const TestimonialsSlider = ({
  customClassName
}: {
  customClassName?: string;
}) => {
  const isV10Slider = customClassName === 'testimonialsSliderV10';

  return (
    <section
      className={`${styles.testimonialsSliderComponent} ${customClassName ? styles[customClassName] : ''}`}
    >
      <div className={styles.testimonialsSliderTitle}>
        {isV10Slider ? (
          <img
            src="/images/lp_v10/TestimonialsSlider_Title.png"
            alt="REAL STORIES FROM REAL WINNERS"
            draggable="false"
          />
        ) : (
          <img
            src="/images/lp_v15/desktop/REAL_STORIES.png"
            alt="REAL STORIES FROM REAL WINNERS"
            draggable="false"
          />
        )}
      </div>
      <div className={styles.testimonialsSliderTitleMobile}>
        {isV10Slider ? (
          <img
            src="/images/lp_v10/TestimonialsSlider_Title.png"
            alt="REAL STORIES FROM REAL WINNERS"
            draggable="false"
          />
        ) : (
          <img
            src="/images/lp_v15/mobile/REAL_STORIES.png"
            alt="REAL STORIES FROM REAL WINNERS"
            draggable="false"
          />
        )}
      </div>

      <div className={styles.testimonialsSliderContainer}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={30}
          centeredSlides={true}
          freeMode={true}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false
          }}
          pagination={{
            clickable: false
          }}
          modules={[FreeMode, Autoplay]}
          className="testimonialsSlider"
          wrapperClass="testimonials-slider"
        >
          <SwiperSlide className={styles.testimonialsSliderSlide}>
            <div
              className={`${styles.testimonialsSliderCard} ${ExoFont.className}`}
            >
              <p
                className={`${styles.winContentText} ${ExoBlackFont.className}`}
              >
                <span className={styles.greenText}>1,950&nbsp;SC</span> won from{' '}
                <span className={styles.greenText}>5&nbsp;SC</span> spin on
                Monkey’s Journey
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.testimonialsSliderSlide}>
            <div
              className={`${styles.testimonialsSliderCard} ${ExoFont.className}`}
            >
              <Image
                src="/images/lp_v7/Stars.png"
                width={88}
                height={24}
                alt="rating"
              />
              <h3 className={styles.testimonialsSliderMainText}>
                I think you guys are amazing.
              </h3>
              <p className={styles.testimonialsSliderInfo}>
                You are thee go to online casino where I felt like the family
              </p>
              <p className={styles.testimonialsSliderName}>Michael RS</p>
            </div>
          </SwiperSlide>

          <SwiperSlide className={styles.testimonialsSliderSlide}>
            <div
              className={`${styles.testimonialsSliderCard} ${ExoFont.className}`}
            >
              <p
                className={`${styles.winContentText} ${ExoBlackFont.className}`}
              >
                <span className={styles.greenText}>1,000&nbsp;SC</span> won from{' '}
                <span className={styles.greenText}>4&nbsp;SC</span> spin on Fish
                Tales Monster Bass
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.testimonialsSliderSlide}>
            <div
              className={`${styles.testimonialsSliderCard} ${ExoFont.className}`}
            >
              <Image
                src="/images/lp_v7/Stars.png"
                width={88}
                height={24}
                alt="rating"
              />
              <h3 className={styles.testimonialsSliderMainText}>
                The game is great as is the games are on point.
              </h3>
              <p className={styles.testimonialsSliderInfo}>
                I don&apos;t know what anybody else feels about it, but I love
                it. The everything is better.
              </p>
              <p className={styles.testimonialsSliderName}>Daniel C</p>
            </div>
          </SwiperSlide>

          <SwiperSlide className={styles.testimonialsSliderSlide}>
            <div
              className={`${styles.testimonialsSliderCard} ${ExoFont.className}`}
            >
              <p
                className={`${styles.winContentText} ${ExoBlackFont.className}`}
              >
                <span className={styles.greenText}>888&nbsp;SC</span> won from{' '}
                <span className={styles.greenText}>12.5&nbsp;SC</span> spin on
                Black Wolf 2
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.testimonialsSliderSlide}>
            <div
              className={`${styles.testimonialsSliderCard} ${ExoFont.className}`}
            >
              <Image
                src="/images/lp_v7/Stars.png"
                width={88}
                height={24}
                alt="rating"
              />
              <h3 className={styles.testimonialsSliderMainText}>
                I love the graphics they are bright and enthusiastic.
              </h3>
              <p className={styles.testimonialsSliderInfo}>
                Customer service is wonderful and I&apos;m glad I get to be
                apart of the LuckyZino fam thanks.
              </p>
              <p className={styles.testimonialsSliderName}>Amy C</p>
            </div>
          </SwiperSlide>

          <SwiperSlide className={styles.testimonialsSliderSlide}>
            <div
              className={`${styles.testimonialsSliderCard} ${ExoFont.className}`}
            >
              <p
                className={`${styles.winContentText} ${ExoBlackFont.className}`}
              >
                <span className={styles.greenText}>850&nbsp;SC</span> won from{' '}
                <span className={styles.greenText}>2&nbsp;SC</span> spin on TNT
                Bonanza 2
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.testimonialsSliderSlide}>
            <div
              className={`${styles.testimonialsSliderCard} ${ExoFont.className}`}
            >
              <Image
                src="/images/lp_v7/Stars.png"
                width={88}
                height={24}
                alt="rating"
              />
              <h3 className={styles.testimonialsSliderMainText}>
                I really enjoy the bonuses.
              </h3>
              <p className={styles.testimonialsSliderInfo}>
                If I were to recommend to a friend I’d tell them that’s it’s
                easy to use and has a fun and upbeat atmosphere.
              </p>
              <p className={styles.testimonialsSliderName}>Christine B</p>
            </div>
          </SwiperSlide>

          <SwiperSlide className={styles.testimonialsSliderSlide}>
            <div
              className={`${styles.testimonialsSliderCard} ${ExoFont.className}`}
            >
              <p
                className={`${styles.winContentText} ${ExoBlackFont.className}`}
              >
                <span className={styles.greenText}>571&nbsp;SC</span> won from{' '}
                <span className={styles.greenText}>2&nbsp;SC</span> spin on
                Million Dollar Heist
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.testimonialsSliderSlide}>
            <div
              className={`${styles.testimonialsSliderCard} ${ExoFont.className}`}
            >
              <Image
                src="/images/lp_v7/Stars.png"
                width={88}
                height={24}
                alt="rating"
              />
              <h3 className={styles.testimonialsSliderMainText}>
                I honestly really enjoyed playing on your platform.
              </h3>
              <p className={styles.testimonialsSliderInfo}>
                Is what keeps you getting up everyday with something to look
                forward to.
              </p>
              <p className={styles.testimonialsSliderName}>
                Tiphanie Renee Stranix
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
