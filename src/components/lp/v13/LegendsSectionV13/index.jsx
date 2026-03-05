'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css/autoplay';
import styles from './LegendsSectionV13.module.scss';

export const LegendsSectionV13 = () => {

    const PROVIDERS = [
        { id: 1, src: '/images/lp_v13/providers/armadilo.png', alt: 'armadilo' },
        { id: 2, src: '/images/lp_v13/providers/betsoft.png', alt: 'betsoft' },
        { id: 3, src: '/images/lp_v13/providers/bigtimegaming.png', alt: 'bigtimegaming' },
        { id: 4, src: '/images/lp_v13/providers/booming.png', alt: 'booming' },
        { id: 5, src: '/images/lp_v13/providers/evoplay.png', alt: 'evoplay' },
        { id: 6, src: '/images/lp_v13/providers/fantasma.png', alt: 'fantasma' },
        { id: 7, src: '/images/lp_v13/providers/gamingcorps.png', alt: 'gamingcorps' },
        { id: 8, src: '/images/lp_v13/providers/gamzix.png', alt: 'gamzix' },
        { id: 9, src: '/images/lp_v13/providers/habanero.png', alt: 'habanero' },
        { id: 10, src: '/images/lp_v13/providers/kalamba.png', alt: 'kalamba' },
        { id: 11, src: '/images/lp_v13/providers/mascot.png', alt: 'mascot' },
        { id: 12, src: '/images/lp_v13/providers/netent.png', alt: 'netent' },
        { id: 13, src: '/images/lp_v13/providers/nolimitcity.png', alt: 'nolimitcity' },
        { id: 14, src: '/images/lp_v13/providers/novomatic.png', alt: 'novomatic' },
        { id: 15, src: '/images/lp_v13/providers/redtiger.png', alt: 'redtiger' },
        { id: 16, src: '/images/lp_v13/providers/reelriot.png', alt: 'reelriot' },
        { id: 17, src: '/images/lp_v13/providers/spinomenal.png', alt: 'spinomenal' },
        { id: 18, src: '/images/lp_v13/providers/threeoaksgaming.png', alt: 'threeoaksgaming' },
        { id: 19, src: '/images/lp_v13/providers/triplecherry.png', alt: 'triplecherry' },
    ];

    return (
        <section className={styles.legendsSectionV13Component}>
            <div className={styles.legendsSectionV13Shine}>
                <div className={styles.legendsSectionV13Shine1}></div>
                <div className={styles.legendsSectionV13Shine2}></div>
            </div>
            <div className={styles.legendsSectionV13Title}>
                <img
                    className={styles.legendsSectionV13TitleImage}
                    src='/images/lp_v10/Legend_Title.png'
                    alt='Legends have Arrived!'
                    draggable='false'
                />
            </div>
            <div className={styles.legendsSectionV13Container}>
                <div className={styles.legendsSectionV13Mask}>
                    <img
                        className={styles.legendsSectionV13MaskImage}
                        src='/images/lp_v10/legendsSection_Mask.png'
                        alt='Mask Image'
                        draggable='false'
                    />
                </div>

                <div className={styles.legendsSectionV13CoinsLeft}>
                    <img
                        className={styles.legendsSectionV13CoinsLeftImage}
                        src='/images/lp_v10/coinsLeft.png'
                        alt='coins with stars'
                        draggable='false' />
                </div>
                <div className={styles.legendsSectionV13CoinsRight}>
                    <img
                        className={styles.legendsSectionV13CoinsLeftImage}
                        src='/images/lp_v10/coinsRight.png'
                        alt='coins with stars'
                        draggable='false' />
                </div>
            </div>

            <div className={styles.legendsSectionV13Providers}>
                <Swiper
                    slidesPerView={5}
                    spaceBetween={10}
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
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        576: {
                            slidesPerView: 5,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                        992: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                        },
                        1400: {
                            slidesPerView: 6,
                            spaceBetween: 30,
                        },
                        1720: {
                            slidesPerView: 8,
                            spaceBetween: 30,
                        },
                    }}
                    modules={[Grid, FreeMode, Autoplay]}
                    wrapperClass="legends-section-sliderV13"
                    className={styles.providersSwiperV13}
                >
                    {PROVIDERS.map((provider) => (
                        <SwiperSlide key={provider.id}>
                            <Image
                                className={styles.legendsSectionV13ProvidersImage}
                                src={provider.src}
                                alt={provider.alt}
                                draggable='false'
                                width={158}
                                height={78}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};