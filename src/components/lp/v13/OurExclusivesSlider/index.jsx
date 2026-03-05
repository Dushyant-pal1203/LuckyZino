'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';

import styles from './OurExclusivesSlider.module.scss';

export const OurExclusivesSlider = () => {

  const games = [
    {
      image: '/images/lp_v13/Exclusive/fivetigers.png',
      alt: 'Five Tigers Icon',

      isTwoLines: true,
    },
    {
      image: '/images/lp_v13/Exclusive/fudaowealth.png',
      alt: 'Fudao Wealth Icon',

      isTwoLines: false,
    },
    {
      image: '/images/lp_v13/Exclusive/magnificencebingo.png',
      alt: 'Magnificence Bingo Icon',

      isTwoLines: true,
    },
    {
      image: '/images/lp_v13/Exclusive/nefertiti.png',
      alt: 'Nefertiti Icon',

      isTwoLines: true,
    },
    {
      image: '/images/lp_v13/Exclusive/vegaslightning.png',
      alt: 'Vegas Lightning Icon',

      isTwoLines: true,
    },
    {
      image: '/images/lp_v13/Exclusive/Atlantis.png',
      alt: 'Atlantis Icon',

      isTwoLines: true,
    },
    {
      image: '/images/lp_v13/Exclusive/fiftywolves.png',
      alt: 'Fifty Wolves Icon',

      isTwoLines: false,
    },
    {
      image: '/images/lp_v13/Exclusive/desertgold.png',
      alt: 'Desert Gold Icon',
      isTwoLines: true,
    },
  ];

  return (
    <section className={styles.ourExclusivesSliderComponent}>
      <div className={styles.ourExclusivesSliderComponentTitle}>
        <img
          className={styles.ourExclusivesSliderComponentTitleImage}
          src='/images/lp_v13/Exclusive/OurExcluscives.png'
          alt='Our Excluscives'
          draggable='false'
        />
      </div>
      <div className={styles.ourExclusivesSliderContainer}>
        <Swiper
          slidesPerView={4}
          spaceBetween={5}
          loop={true}
          speed={1800}
          pagination={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            enabled: true,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 5,
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
            1200: {
              slidesPerView: 6,
              spaceBetween: 40,
            },
            1720: {
              slidesPerView: 8,
              spaceBetween: 40,
            },
          }}
          modules={[Grid, Autoplay]}
          className={`${styles.ourExclusivesSliderSwiper}`}
        >
          {games.map((game, index) => (
            <SwiperSlide key={index} className={styles.ourExclusivesSliderSlide}>
              <div className={styles.gameCard}>
                <div className={styles.imageContainer}>
                  <Image
                    src={game.image}
                    alt={game.alt}
                    draggable={false}
                    width={100}
                    height={100}
                    className={styles.gameImage}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};