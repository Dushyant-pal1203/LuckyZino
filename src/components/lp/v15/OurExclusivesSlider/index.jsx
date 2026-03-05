'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';

import styles from './OurExclusivesSlider.module.scss';

export const OurExclusivesSlider = () => {

  const games = [
    {
      image: '/images/lp_v15/desktop/caveofhundredsecrets.png',
      alt: 'Cave of Hundreds Secrets Icon',

      isTwoLines: true,
    },
    {
      image: '/images/lp_v15/desktop/chilifire.png',
      alt: 'Chili Fire Icon',

      isTwoLines: false,
    },
    {
      image: '/images/lp_v15/desktop/dragonsdisciple.png',
      alt: "Dragon's Disciple Icon",

      isTwoLines: true,
    },
    {
      image: '/images/lp_v15/desktop/fiftywolves.png',
      alt: 'Fifty Wolves Icon',

      isTwoLines: false,
    },
    {
      image: '/images/lp_v15/desktop/fudaowealth.png',
      alt: 'Fudao Wealth Icon',

      isTwoLines: true,
    },
    {
      image: '/images/lp_v15/desktop/gypsyspirit.png',
      alt: 'Gypsy Spirit Icon',

      isTwoLines: true,
    },
    {
      image: '/images/lp_v15/desktop/harshboss.png',
      alt: 'Harsh Boss Icon',

      isTwoLines: false,
    },
    {
      image: '/images/lp_v15/desktop/jacksfortunes.png',
      alt: 'Jacks Fortunes Icon',
      isTwoLines: true,
    },
    {
      image: '/images/lp_v15/desktop/luckypotion.png',
      alt: 'Lucky Potion Icon',
      isTwoLines: true,
    },
    {
      image: '/images/lp_v15/desktop/monkeysjourney.png',
      alt: 'Monkey\'s Journey Icon',
      isTwoLines: true,
    },
    {
      image: '/images/lp_v15/desktop/octoberfest.png',
      alt: 'Octoberfest Icon',
      isTwoLines: true,
    },
    {
      image: '/images/lp_v15/desktop/starbarks.png',
      alt: 'Starbarks Icon',
      isTwoLines: true,
    },
    {
      image: '/images/lp_v15/desktop/theclash.png',
      alt: 'The Clash Icon',
      isTwoLines: true,
    },
    {
      image: '/images/lp_v15/desktop/thiefoflightning.png',
      alt: 'Thief of Lightnings Icon',
      isTwoLines: true,
    },
    {
      image: '/images/lp_v15/desktop/venicemystery.png',
      alt: 'Venice Mystery Icon',
      isTwoLines: true,
    },
    {
      image: '/images/lp_v15/desktop/wildasticbeasts.png',
      alt: 'Wildastic Beasts Icon',
      isTwoLines: true,
    },
    {
      image: '/images/lp_v15/desktop/wildfiregold.png',
      alt: 'Wildfire Gold Icon',
      isTwoLines: true,
    },
  ];

  return (
    <section className={styles.ourExclusivesSliderComponent}>
      {/* Title  */}
      <div className={styles.ourExclusivesSliderComponentTitle}>
        <img
          className={styles.ourExclusivesSliderComponentTitleImageDesktop}
          src='/images/lp_v15/desktop/OurExclusivesSlider.png'
          alt='Our Excluscives'
          draggable='false'
        />
        <img
          className={styles.ourExclusivesSliderComponentTitleImageMobile}
          src='/images/lp_v15/mobile/OurExclusivesSlider.png'
          alt='Our Excluscives'
          draggable='false'
        />
      </div>
      {/* Slider  */}
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
      {/* Button  */}
      <div className={styles.ourExclusivesSliderButtonContainer}>
        <img
          src="/images/lp_v15/desktop/join_button.png"
          alt="JOIN NOW"
          className={styles.slider_button}
          onClick={() => router.replace('/sign-up')}
        />
      </div>
    </section>
  );
};