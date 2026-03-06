'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import styles from './OurProviders.module.scss';

export const OurProviders = ({
  customClassName
}: {
  customClassName?: string;
}) => {
  return (
    <section
      className={`${styles.ourProvidersComponent} ${customClassName || ''}`}
    >
      <div className={styles.ourProvidersTitle}>
        <div className={styles.testimonialsSliderTitle}>
          <img
            src="/images/lp_v15/desktop/OurProviders.png"
            alt="Our Providers"
            draggable="false"
          />
        </div>
      </div>

      <div className={styles.ourProvidersContainer}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={20}
          centeredSlides={false}
          freeMode={true}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          modules={[FreeMode, Autoplay]}
          className="ourProvidersSlider"
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 15
            },
            576: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 25
            },
            992: {
              slidesPerView: 5,
              spaceBetween: 30
            },
            1200: {
              slidesPerView: 6,
              spaceBetween: 35
            }
          }}
        >
          {/* Armadilo */}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img src="/images/lp_v15/desktop/armadilo.png" alt="Armadilo" />
            </div>
          </SwiperSlide>

          {/* Bigtimegaming */}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img
                src="/images/lp_v15/desktop/bigtimegaming.png"
                alt="Bigtimegaming"
              />
            </div>
          </SwiperSlide>

          {/* Booming */}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img src="/images/lp_v15/desktop/booming.png" alt="Booming" />
            </div>
          </SwiperSlide>

          {/* Evoplay */}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img src="/images/lp_v15/desktop/evoplay.png" alt="Evoplay" />
            </div>
          </SwiperSlide>

          {/* Fantasma */}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img src="/images/lp_v15/desktop/fantasma.png" alt="Fantasma" />
            </div>
          </SwiperSlide>

          {/* GamingCorps */}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img
                src="/images/lp_v15/desktop/gamingcorps.png"
                alt="GamingCorps"
              />
            </div>
          </SwiperSlide>

          {/* Gamzix */}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img src="/images/lp_v15/desktop/gamzix.png" alt="Gamzix" />
            </div>
          </SwiperSlide>

          {/* BestSoft */}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img src="/images/lp_v15/desktop/bestsoft.png" alt="BestSoft" />
            </div>
          </SwiperSlide>

          {/* Habanero*/}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img src="/images/lp_v15/desktop/habanero.png" alt="Habanero" />
            </div>
          </SwiperSlide>

          {/* Kalamba*/}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img src="/images/lp_v15/desktop/kalamba.png" alt="Kalamba" />
            </div>
          </SwiperSlide>

          {/* Netent*/}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img src="/images/lp_v15/desktop/netent.png" alt="Netent" />
            </div>
          </SwiperSlide>

          {/* Nolimitcity*/}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img
                src="/images/lp_v15/desktop/nolimitcity.png"
                alt="Nolimitcity"
              />
            </div>
          </SwiperSlide>

          {/* RedTiger*/}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img src="/images/lp_v15/desktop/redtiger.png" alt="RedTiger" />
            </div>
          </SwiperSlide>

          {/* Spinomenal*/}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img
                src="/images/lp_v15/desktop/spinomenal.png"
                alt="Spinomenal"
              />
            </div>
          </SwiperSlide>

          {/* Three Oaks Gaming*/}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img
                src="/images/lp_v15/desktop/threeoaksgaming.png"
                alt="Three Oaks Gaming"
              />
            </div>
          </SwiperSlide>

          {/* Triple Cherry*/}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img
                src="/images/lp_v15/desktop/triplecherry.png"
                alt="Triple Cherry"
              />
            </div>
          </SwiperSlide>

          {/* Mascot*/}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img src="/images/lp_v15/desktop/mascot.png" alt="Mascot" />
            </div>
          </SwiperSlide>

          {/* Triple Cherry 2*/}
          <SwiperSlide className={styles.providerSlide}>
            <div className={styles.providerCard}>
              <img
                src="/images/lp_v15/desktop/triplecherry_2.png"
                alt="Triple Cherry 2"
              />
            </div>
          </SwiperSlide>

          {/* <SwiperSlide className={styles.providerSlide}>
                        <div className={styles.providerCard}>
                            <h3 className={`${styles.providerName} ${ExoBlackFont.className}`}>BETSOFT</h3>
                        </div>
                    </SwiperSlide> */}
        </Swiper>
      </div>
    </section>
  );
};
