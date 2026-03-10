'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ExoBlackFont } from '@/static/fonts';
import styles from './ExclusiveSection.module.scss';

export const ExclusiveSection = () => {
    const router = useRouter();
    const pathname = usePathname();

    const isLandingV9 = pathname === '/lp/v9';

    return (
        <section className={styles.exclusiveSectionComponent}>
            <div className={styles.exclusiveSectionContainer}>
                <div className={styles.exclusiveSectionTitle}>
                    <img
                        src='/images/lp_v15/desktop/exclusive-offers.png'
                        alt='YOUR EXCLUSIVE OFFERS'
                        draggable='false'
                    />
                </div>
                <div className={styles.exclusiveSectionTitleMobile}>
                    <img
                        src='/images/lp_v15/mobile/exclusive-offers.png'
                        alt='YOUR EXCLUSIVE OFFERS'
                        draggable='false'
                    />
                </div>
                <div className={styles.exclusiveSectionContent}>


                    <div className={styles.exclusiveSectionImageSide}>
                        <img
                            className={styles.exclusiveSectionCoinsL}
                            src='/images/lp_v15/desktop/coins_shine_right.png'
                            alt='coins'
                            draggable='false'
                        />
                        <div className={styles.exclusiveSectionCard} onClick={() => router.replace('/sign-up')}>
                            <div className={styles.exclusiveSectionCardName}>
                                <img
                                    src='/images/lp_v15/desktop/welcome.png'
                                    alt='icon'
                                    draggable='false'
                                />
                            </div>
                            <div className={styles.exclusiveSectionCardCoins}>
                                <div className={styles.coinsFree}>
                                    <div className={styles.coinsFreeIcon}>
                                        <img
                                            src='/images/lp_v7/ExclusiveSectionCard/GoldCoinsIcon.png'
                                            alt='icon'
                                            draggable='false'
                                        />
                                    </div>
                                    {isLandingV9 ? (
                                        <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                                            <span className={styles.coinsFreeTextShadow}>+ FREE 25 SC</span>
                                            <span className={styles.coinsFreeTextGradient}>+ FREE 25 SC</span>
                                        </div>
                                    ) : (
                                        <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                                            <span className={styles.coinsFreeTextShadow}>+ FREE 25 SC</span>
                                            <span className={styles.coinsFreeTextGradient}>+ FREE 25 SC</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {isLandingV9 ? (
                                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                                    <span className={styles.coinsTotalTextShadow}>25,000 GC</span>
                                    <span className={styles.coinsTotalTextGradient}>25,000 GC</span>
                                </div>
                            ) : (
                                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                                    <span className={styles.coinsTotalTextShadow}>25,000 GC</span>
                                    <span className={styles.coinsTotalTextGradient}>25,000 GC</span>
                                </div>
                            )}
                            <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                                <span className={styles.coinsDiscountValue}>+150%</span>
                                <span className={styles.coinsDiscountGet}>get discount</span>
                            </div>
                            <div className={styles.coinsAction}>
                                <button className={styles.coinsActionButton}>
                                    <div className={styles.coinsActionValue} style={{ padding: '8px' }}>
                                        <img
                                            src='/images/lp_v15/desktop/discount.png'
                                            alt='icon'
                                            draggable='false'
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.exclusiveSectionImageSide}>
                        <div className={styles.exclusiveSectionCard} onClick={() => router.replace('/sign-up')}>
                            <div className={styles.exclusiveSectionCardName}>
                                <img
                                    src='/images/lp_v15/desktop/best_value.png'
                                    alt='icon'
                                    draggable='false'
                                />
                            </div>
                            <div className={styles.exclusiveSectionCardCoins}>
                                <div className={styles.coinsFree}>
                                    <div className={styles.coinsFreeIcon}>
                                        <img
                                            src='/images/lp_v7/ExclusiveSectionCard/GoldCoinsIcon.png'
                                            alt='icon'
                                            draggable='false'
                                        />
                                    </div>
                                    {isLandingV9 ? (
                                        <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                                            <span className={styles.coinsFreeTextShadow}>+ FREE 7 SC</span>
                                            <span className={styles.coinsFreeTextGradient}>+ FREE 7 SC</span>
                                        </div>
                                    ) : (
                                        <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                                            <span className={styles.coinsFreeTextShadow}>+ FREE 150 SC</span>
                                            <span className={styles.coinsFreeTextGradient}>+ FREE 150 SC</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {isLandingV9 ? (
                                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                                    <span className={styles.coinsTotalTextShadow}>7,000 GC</span>
                                    <span className={styles.coinsTotalTextGradient}>7,000 GC</span>
                                </div>
                            ) : (
                                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                                    <span className={styles.coinsTotalTextShadow}>150,000 GC</span>
                                    <span className={styles.coinsTotalTextGradient}>150,000 GC</span>
                                </div>
                            )}
                            <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                                {isLandingV9 ? (
                                    <span className={styles.coinsDiscountValue}>40%</span>
                                ) : (
                                    <span className={styles.coinsDiscountValue}>+120%</span>
                                )}
                                <span className={styles.coinsDiscountGet}>get discount</span>
                            </div>
                            <div className={styles.coinsAction}>
                                <button className={styles.coinsActionButton}>
                                    <div className={styles.coinsActionValue} style={{ padding: '8px' }}>
                                        <img
                                            src={isLandingV9 ? '/images/lp_v7/ExclusiveSectionCard/499_799.png' : '/images/lp_v15/desktop/discount1.png'}
                                            alt='icon'
                                            draggable='false'
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>
                        <img
                            className={styles.exclusiveSectionCoinsR}
                            src='/images/lp_v15/desktop/coins_shine_left.png'
                            alt='coins'
                            draggable='false'
                        />
                    </div>
                </div>

                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={0}
                    centeredSlides={true}
                    navigation={true}
                    modules={[Navigation]}
                    style={{
                        "--swiper-navigation-color": "#fff", "--swiper-navigation-size": "25px"
                    }}
                    className={styles.exclusiveSectionSlider}
                >
                    <SwiperSlide className={styles.exclusiveSectionSliderSlide}>
                        <div className={styles.exclusiveSectionCard} onClick={() => router.replace('/sign-up')}>
                            <div className={styles.exclusiveSectionCardName}>
                                <img
                                    src='/images/lp_v15/desktop/welcome.png'
                                    alt='icon'
                                    draggable='false'
                                />
                            </div>
                            <div className={styles.exclusiveSectionCardCoins}>
                                <div className={styles.coinsFree}>
                                    <div className={styles.coinsFreeIcon}>
                                        <img
                                            src='/images/lp_v7/ExclusiveSectionCard/GoldCoinsIcon.png'
                                            alt='icon'
                                            draggable='false'
                                        />
                                    </div>
                                    {isLandingV9 ? (
                                        <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                                            <span className={styles.coinsFreeTextShadow}>+ FREE 25 SC</span>
                                            <span className={styles.coinsFreeTextGradient}>+ FREE 25 SC</span>
                                        </div>
                                    ) : (
                                        <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                                            <span className={styles.coinsFreeTextShadow}>+ FREE 25 SC</span>
                                            <span className={styles.coinsFreeTextGradient}>+ FREE 25 SC</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {isLandingV9 ? (
                                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                                    <span className={styles.coinsTotalTextShadow}>25,000 GC</span>
                                    <span className={styles.coinsTotalTextGradient}>25,000 GC</span>
                                </div>
                            ) : (
                                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                                    <span className={styles.coinsTotalTextShadow}>25,000 GC</span>
                                    <span className={styles.coinsTotalTextGradient}>25,000 GC</span>
                                </div>
                            )}
                            <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                                <span className={styles.coinsDiscountValue}>+150%</span>
                                <span className={styles.coinsDiscountGet}>get discount</span>
                            </div>
                            <div className={styles.coinsAction}>
                                <button className={styles.coinsActionButton}>
                                    <div className={styles.coinsActionValue} style={{ padding: '5px' }}>
                                        <img
                                            src='/images/lp_v15/desktop/discount.png'
                                            alt='icon'
                                            draggable='false'
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.exclusiveSectionSliderSlide}>
                        <div className={styles.exclusiveSectionCard} onClick={() => router.replace('/sign-up')}>
                            <div className={styles.exclusiveSectionCardName}>
                                <img
                                    src='/images/lp_v15/desktop/best_value.png'
                                    alt='icon'
                                    draggable='false'
                                />
                            </div>
                            <div className={styles.exclusiveSectionCardCoins}>
                                <div className={styles.coinsFree}>
                                    <div className={styles.coinsFreeIcon}>
                                        <img
                                            src='/images/lp_v7/ExclusiveSectionCard/GoldCoinsIcon.png'
                                            alt='icon'
                                            draggable='false'
                                        />
                                    </div>
                                    {isLandingV9 ? (
                                        <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                                            <span className={styles.coinsFreeTextShadow}>+ FREE 7 SC</span>
                                            <span className={styles.coinsFreeTextGradient}>+ FREE 7 SC</span>
                                        </div>
                                    ) : (
                                        <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                                            <span className={styles.coinsFreeTextShadow}>+ FREE 150 SC</span>
                                            <span className={styles.coinsFreeTextGradient}>+ FREE 150 SC</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {isLandingV9 ? (
                                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                                    <span className={styles.coinsTotalTextShadow}>7,000 GC</span>
                                    <span className={styles.coinsTotalTextGradient}>7,000 GC</span>
                                </div>
                            ) : (
                                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                                    <span className={styles.coinsTotalTextShadow}>150,000 GC</span>
                                    <span className={styles.coinsTotalTextGradient}>150,000 GC</span>
                                </div>
                            )}
                            <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                                {isLandingV9 ? (
                                    <span className={styles.coinsDiscountValue}>40%</span>
                                ) : (
                                    <span className={styles.coinsDiscountValue}>+120%</span>
                                )}
                                <span className={styles.coinsDiscountGet}>get discount</span>
                            </div>
                            <div className={styles.coinsAction}>
                                <button className={styles.coinsActionButton}>
                                    <div className={styles.coinsActionValue} style={{ padding: '5px' }}>
                                        <img
                                            src={isLandingV9 ? '/images/lp_v7/ExclusiveSectionCard/499_799.png' : '/images/lp_v15/desktop/discount1.png'}
                                            alt='icon'
                                            draggable='false'
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                {/* <div className={styles.exclusiveSectionButtonContainer}>
                    <img
                        src="/images/lp_v15/desktop/choose_your_bonus_button.png"
                        alt="choose your bonus"
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.replace('/sign-up')}
                    />
                </div> */}
            </div>
        </section>
    );
};
