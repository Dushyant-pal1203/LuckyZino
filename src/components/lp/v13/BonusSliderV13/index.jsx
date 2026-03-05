'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './BonusSliderV13.module.scss';

export const BonusSliderV13 = ({ customClassName }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSlideClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: 'Slider Slide Click', feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  const ITEMS = [
    { id: 1, src: '/images/lp_v13/bonusSliderItems/new_games.png', alt: 'Amazing Game Icon' },
    { id: 2, src: '/images/lp_v13/bonusSliderItems/hourly_bonus.png', alt: 'Amazing Game Icon' },
    { id: 3, src: '/images/lp_v13/bonusSliderItems/welcome_bonus.png', alt: 'Amazing Game Icon' },
    { id: 4, src: '/images/lp_v13/bonusSliderItems/daily_bonus.png', alt: 'Amazing Game Icon' },
  ];

  return (
    <section className={`${styles.bonusSliderV13Component} ${customClassName ? styles[customClassName] : ''}`}>
      <div className={styles.bonusSliderV13Container}>
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
          className="BonusSliderV13"
          wrapperClass="bonus-sliderV13"
        >
          {Array.from({ length: 4 }).flatMap((_, repeatIndex) =>
            ITEMS.map((item) => (
              <SwiperSlide key={`${item.id}-${repeatIndex}`} className={styles.bonusSliderV13Slide} onClick={handleSlideClick}>
                <img
                  src={item.src}
                  alt={item.alt}
                  draggable='false'
                />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
};
