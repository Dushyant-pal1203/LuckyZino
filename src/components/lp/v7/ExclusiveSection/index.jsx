'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { StyledButtonV7 } from '../StyledButtonV7';
import { ExoBlackFont } from '@/static/fonts';
import { TrackerEvents } from '@/enum/trackers';
import { sendBIEvent } from '@/lib/trackers';
import styles from './ExclusiveSection.module.scss';
import ImageWithFallback from '@/components/image-with-fallback';

export const ExclusiveSection = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isLandingV9 = pathname === '/lp/v9';
  const isLandingV14 = pathname === '/lp/v14';

  const buttonText = 'choose your bonus';

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: buttonText, feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  return (
    <section className={styles.exclusiveSectionComponent}>
      <div className={styles.exclusiveSectionContainer}>
        <div className={styles.exclusiveSectionTitle}>
          <ImageWithFallback
            src='/images/lp_v7/EXCLUSIVE_OFFERS.avif'
            fallbackSrc='/images/lp_v7/EXCLUSIVE_OFFERS.png'
            alt='YOUR EXCLUSIVE OFFERS'
            draggable='false'
            width={600}
            height={100}
            priority
          />
        </div>
        <div className={styles.exclusiveSectionTitleMobile}>
          <ImageWithFallback
            src='/images/lp_v7/EXCLUSIVE_OFFERS.avif'
            fallbackSrc='/images/lp_v7/EXCLUSIVE_OFFERS.png'
            alt='YOUR EXCLUSIVE OFFERS'
            draggable='false'
            width={400}
            height={80}
            priority
          />
        </div>
        <div className={styles.exclusiveSectionContent}>


          <div className={styles.exclusiveSectionImageSide}>
            <ImageWithFallback
              className={styles.exclusiveSectionCoinsL}
              src='/images/lp_v7/coins_L.avif'
              fallbackSrc='/images/lp_v7/coins_L.png'
              alt='coins'
              draggable='false'
              width={200}
              height={200}
            />
            <div className={styles.exclusiveSectionCard} onClick={handleButtonClick}>
              <div className={styles.exclusiveSectionCardName}>
                <ImageWithFallback
                  src='/images/lp_v7/ExclusiveSectionCard/welcome.avif'
                  fallbackSrc='/images/lp_v7/ExclusiveSectionCard/welcome.png'
                  alt='icon'
                  draggable='false'
                  width={150}
                  height={50}
                />
              </div>
              <div className={styles.exclusiveSectionCardCoins}>
                <div className={styles.coinsFree}>
                  <div className={styles.coinsFreeIcon}>
                    <ImageWithFallback
                      src='/images/lp_v7/ExclusiveSectionCard/GoldCoinsIcon.avif'
                      fallbackSrc='/images/lp_v7/ExclusiveSectionCard/GoldCoinsIcon.png'
                      alt='icon'
                      draggable='false'
                      width={30}
                      height={30}
                    />
                  </div>
                  {isLandingV14 ? (
                    <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                      <span className={styles.coinsFreeTextShadow}>+ FREE 30 SC</span>
                      <span className={styles.coinsFreeTextGradient}>+ FREE 30 SC</span>
                    </div>
                  ) : isLandingV9 ? (
                    <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                      <span className={styles.coinsFreeTextShadow}>+ FREE 25 SC</span>
                      <span className={styles.coinsFreeTextGradient}>+ FREE 25 SC</span>
                    </div>
                  ) : (
                    <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                      <span className={styles.coinsFreeTextShadow}>+ FREE 20 SC</span>
                      <span className={styles.coinsFreeTextGradient}>+ FREE 20 SC</span>
                    </div>
                  )}
                </div>
              </div>
              {isLandingV14 ? (
                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                  <span className={styles.coinsTotalTextShadow}>30,000 GC</span>
                  <span className={styles.coinsTotalTextGradient}>30,000 GC</span>
                </div>
              ) : isLandingV9 ? (
                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                  <span className={styles.coinsTotalTextShadow}>25,000 GC</span>
                  <span className={styles.coinsTotalTextGradient}>25,000 GC</span>
                </div>
              ) : (
                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                  <span className={styles.coinsTotalTextShadow}>800,000,000 GC</span>
                  <span className={styles.coinsTotalTextGradient}>800,000,000 GC</span>
                </div>
              )}

              {isLandingV14 ? (
                <>
                  <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsDiscountValue}>+100%</span>
                    <span className={styles.coinsDiscountGet}>get extra</span>
                  </div>
                  <div className={styles.coinsAction}>
                    <button className={styles.coinsActionButton}>
                      <div className={styles.coinsActionValue}>
                        <ImageWithFallback
                          src='/images/lp_v14/1499.avif'
                          fallbackSrc='/images/lp_v14/1499.png'
                          alt='icon'
                          draggable='false'
                          width={100}
                          height={40}
                        />
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsDiscountValue}>50%</span>
                    <span className={styles.coinsDiscountGet}>get discount</span>
                  </div>
                  <div className={styles.coinsAction}>
                    <button className={styles.coinsActionButton}>
                      <div className={styles.coinsActionValue}>
                        <ImageWithFallback
                          src='/images/lp_v7/ExclusiveSectionCard/999.avif'
                          fallbackSrc='/images/lp_v7/ExclusiveSectionCard/999.png'
                          alt='icon'
                          draggable='false'
                          width={100}
                          height={40}
                        />
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.exclusiveSectionImageSide}>
            <div className={styles.exclusiveSectionCard} onClick={handleButtonClick}>
              <div className={styles.exclusiveSectionCardName}>
                <ImageWithFallback
                  src='/images/lp_v7/ExclusiveSectionCard/BestValue.avif'
                  fallbackSrc='/images/lp_v7/ExclusiveSectionCard/BestValue.png'
                  alt='icon'
                  draggable='false'
                  width={150}
                  height={50}
                />
              </div>
              <div className={styles.exclusiveSectionCardCoins}>
                <div className={styles.coinsFree}>
                  <div className={styles.coinsFreeIcon}>
                    <ImageWithFallback
                      src='/images/lp_v7/ExclusiveSectionCard/GoldCoinsIcon.avif'
                      fallbackSrc='/images/lp_v7/ExclusiveSectionCard/GoldCoinsIcon.png'
                      alt='icon'
                      draggable='false'
                      width={30}
                      height={30}
                    />
                  </div>
                  {isLandingV14 ? (
                    <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                      <span className={styles.coinsFreeTextShadow}>+ FREE 100 SC</span>
                      <span className={styles.coinsFreeTextGradient}>+ FREE 100 SC</span>
                    </div>
                  ) : isLandingV9 ? (
                    <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                      <span className={styles.coinsFreeTextShadow}>+ FREE 7 SC</span>
                      <span className={styles.coinsFreeTextGradient}>+ FREE 7 SC</span>
                    </div>
                  ) : (
                    <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                      <span className={styles.coinsFreeTextShadow}>+ FREE 5 SC</span>
                      <span className={styles.coinsFreeTextGradient}>+ FREE 5 SC</span>
                    </div>
                  )}
                </div>
              </div>
              {isLandingV14 ? (
                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                  <span className={styles.coinsTotalTextShadow}>100,000 GC</span>
                  <span className={styles.coinsTotalTextGradient}>100,000 GC</span>
                </div>
              ) : isLandingV9 ? (
                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                  <span className={styles.coinsTotalTextShadow}>7,000 GC</span>
                  <span className={styles.coinsTotalTextGradient}>7,000 GC</span>
                </div>
              ) : (
                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                  <span className={styles.coinsTotalTextShadow}>11,000,000 GC</span>
                  <span className={styles.coinsTotalTextGradient}>11,000,000 GC</span>
                </div>
              )}

              {isLandingV14 ? (
                <>
                  <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsDiscountValue}>+100%</span>
                    <span className={styles.coinsDiscountGet}>get extra</span>
                  </div>
                  <div className={styles.coinsAction}>
                    <button className={styles.coinsActionButton}>
                      <div className={styles.coinsActionValue}>
                        <ImageWithFallback
                          src='/images/lp_v14/4999.avif'
                          fallbackSrc='/images/lp_v14/4999.png'
                          alt='icon'
                          draggable='false'
                          width={100}
                          height={40}
                        />
                      </div>
                    </button>
                  </div>
                </>
              ) : isLandingV9 ? (
                <>
                  <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsDiscountValue}>40%</span>
                    <span className={styles.coinsDiscountGet}>get discount</span>
                  </div>
                  <div className={styles.coinsAction}>
                    <button className={styles.coinsActionButton}>
                      <div className={styles.coinsActionValue}>
                        <ImageWithFallback
                          src='/images/lp_v7/ExclusiveSectionCard/499_799.avif'
                          fallbackSrc='/images/lp_v7/ExclusiveSectionCard/499_799.png'
                          alt='icon'
                          draggable='false'
                          width={100}
                          height={40}
                        />
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsDiscountValue}>75%</span>
                    <span className={styles.coinsDiscountGet}>get discount</span>
                  </div>
                  <div className={styles.coinsAction}>
                    <button className={styles.coinsActionButton}>
                      <div className={styles.coinsActionValue}>
                        <ImageWithFallback
                          src='/images/lp_v7/ExclusiveSectionCard/499.avif'
                          fallbackSrc='/images/lp_v7/ExclusiveSectionCard/499.png'
                          alt='icon'
                          draggable='false'
                          width={100}
                          height={40}
                        />
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
            <ImageWithFallback
              className={styles.exclusiveSectionCoinsR}
              src='/images/lp_v7/coins_R.avif'
              fallbackSrc='/images/lp_v7/coins_R.png'
              alt='coins'
              draggable='false'
              width={200}
              height={200}
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
            "--swiper-navigation-color": "#fff",
          }}
          className={styles.exclusiveSectionSlider}
        >
          <SwiperSlide className={styles.exclusiveSectionSliderSlide}>
            <div className={styles.exclusiveSectionCard} onClick={handleButtonClick}>
              <div className={styles.exclusiveSectionCardName}>
                <ImageWithFallback
                  src='/images/lp_v7/ExclusiveSectionCard/welcome.avif'
                  fallbackSrc='/images/lp_v7/ExclusiveSectionCard/welcome.png'
                  alt='icon'
                  draggable='false'
                  width={150}
                  height={50}
                />
              </div>
              <div className={styles.exclusiveSectionCardCoins}>
                <div className={styles.coinsFree}>
                  <div className={styles.coinsFreeIcon}>
                    <ImageWithFallback
                      src='/images/lp_v7/ExclusiveSectionCard/GoldCoinsIcon.avif'
                      fallbackSrc='/images/lp_v7/ExclusiveSectionCard/GoldCoinsIcon.png'
                      alt='icon'
                      draggable='false'
                      width={30}
                      height={30}
                    />
                  </div>
                  {isLandingV14 ? (
                    <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                      <span className={styles.coinsFreeTextShadow}>+ FREE 30 SC</span>
                      <span className={styles.coinsFreeTextGradient}>+ FREE 30 SC</span>
                    </div>
                  ) : isLandingV9 ? (
                    <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                      <span className={styles.coinsFreeTextShadow}>+ FREE 25 SC</span>
                      <span className={styles.coinsFreeTextGradient}>+ FREE 25 SC</span>
                    </div>
                  ) : (
                    <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                      <span className={styles.coinsFreeTextShadow}>+ FREE 20 SC</span>
                      <span className={styles.coinsFreeTextGradient}>+ FREE 20 SC</span>
                    </div>
                  )}
                </div>
              </div>
              {isLandingV14 ? (
                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                  <span className={styles.coinsTotalTextShadow}>30,000 GC</span>
                  <span className={styles.coinsTotalTextGradient}>30,000 GC</span>
                </div>
              ) : isLandingV9 ? (
                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                  <span className={styles.coinsTotalTextShadow}>25,000 GC</span>
                  <span className={styles.coinsTotalTextGradient}>25,000 GC</span>
                </div>
              ) : (
                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                  <span className={styles.coinsTotalTextShadow}>800,000,000 GC</span>
                  <span className={styles.coinsTotalTextGradient}>800,000,000 GC</span>
                </div>
              )}
              {isLandingV14 ? (
                <>
                  <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsDiscountValue}>+100%</span>
                    <span className={styles.coinsDiscountGet}>get extra</span>
                  </div>
                  <div className={styles.coinsAction}>
                    <button className={styles.coinsActionButton}>
                      <div className={styles.coinsActionValue}>
                        <ImageWithFallback
                          src='/images/lp_v14/1499.avif'
                          fallbackSrc='/images/lp_v14/1499.png'
                          alt='icon'
                          draggable='false'
                          width={100}
                          height={40}
                        />
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsDiscountValue}>50%</span>
                    <span className={styles.coinsDiscountGet}>get discount</span>
                  </div>
                  <div className={styles.coinsAction}>
                    <button className={styles.coinsActionButton}>
                      <div className={styles.coinsActionValue}>
                        <ImageWithFallback
                          src='/images/lp_v7/ExclusiveSectionCard/999.avif'
                          fallbackSrc='/images/lp_v7/ExclusiveSectionCard/999.png'
                          alt='icon'
                          draggable='false'
                          width={100}
                          height={40}
                        />
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.exclusiveSectionSliderSlide}>
            <div className={styles.exclusiveSectionCard} onClick={handleButtonClick}>
              <div className={styles.exclusiveSectionCardName}>
                <ImageWithFallback
                  src='/images/lp_v7/ExclusiveSectionCard/BestValue.avif'
                  fallbackSrc='/images/lp_v7/ExclusiveSectionCard/BestValue.png'
                  alt='icon'
                  draggable='false'
                  width={150}
                  height={50}
                />
              </div>
              <div className={styles.exclusiveSectionCardCoins}>
                <div className={styles.coinsFree}>
                  <div className={styles.coinsFreeIcon}>
                    <ImageWithFallback
                      src='/images/lp_v7/ExclusiveSectionCard/GoldCoinsIcon.avif'
                      fallbackSrc='/images/lp_v7/ExclusiveSectionCard/GoldCoinsIcon.png'
                      alt='icon'
                      draggable='false'
                      width={30}
                      height={30}
                    />
                  </div>
                  {isLandingV14 ? (
                    <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                      <span className={styles.coinsFreeTextShadow}>+ FREE 100 SC</span>
                      <span className={styles.coinsFreeTextGradient}>+ FREE 100 SC</span>
                    </div>
                  ) : isLandingV9 ? (
                    <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                      <span className={styles.coinsFreeTextShadow}>+ FREE 7 SC</span>
                      <span className={styles.coinsFreeTextGradient}>+ FREE 7 SC</span>
                    </div>
                  ) : (
                    <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                      <span className={styles.coinsFreeTextShadow}>+ FREE 5 SC</span>
                      <span className={styles.coinsFreeTextGradient}>+ FREE 5 SC</span>
                    </div>
                  )}
                </div>
              </div>
              {isLandingV14 ? (
                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                  <span className={styles.coinsTotalTextShadow}>100,000 GC</span>
                  <span className={styles.coinsTotalTextGradient}>100,000 GC</span>
                </div>
              ) : isLandingV9 ? (
                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                  <span className={styles.coinsTotalTextShadow}>7,000 GC</span>
                  <span className={styles.coinsTotalTextGradient}>7,000 GC</span>
                </div>
              ) : (
                <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                  <span className={styles.coinsTotalTextShadow}>11,000,000 GC</span>
                  <span className={styles.coinsTotalTextGradient}>11,000,000 GC</span>
                </div>
              )}
              {isLandingV14 ? (
                <>
                  <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsDiscountValue}>+100%</span>
                    <span className={styles.coinsDiscountGet}>get extra</span>
                  </div>
                  <div className={styles.coinsAction}>
                    <button className={styles.coinsActionButton}>
                      <div className={styles.coinsActionValue}>
                        <ImageWithFallback
                          src='/images/lp_v14/4999.avif'
                          fallbackSrc='/images/lp_v14/4999.png'
                          alt='icon'
                          draggable='false'
                          width={100}
                          height={40}
                        />
                      </div>
                    </button>
                  </div>
                </>
              ) : isLandingV9 ? (
                <>
                  <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsDiscountValue}>40%</span>
                    <span className={styles.coinsDiscountGet}>get discount</span>
                  </div>
                  <div className={styles.coinsAction}>
                    <button className={styles.coinsActionButton}>
                      <div className={styles.coinsActionValue}>
                        <ImageWithFallback
                          src='/images/lp_v7/ExclusiveSectionCard/499_799.avif'
                          fallbackSrc='/images/lp_v7/ExclusiveSectionCard/499_799.png'
                          alt='icon'
                          draggable='false'
                          width={100}
                          height={40}
                        />
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsDiscountValue}>75%</span>
                    <span className={styles.coinsDiscountGet}>get discount</span>
                  </div>
                  <div className={styles.coinsAction}>
                    <button className={styles.coinsActionButton}>
                      <div className={styles.coinsActionValue}>
                        <ImageWithFallback
                          src='/images/lp_v7/ExclusiveSectionCard/499.avif'
                          fallbackSrc='/images/lp_v7/ExclusiveSectionCard/499.png'
                          alt='icon'
                          draggable='false'
                          width={100}
                          height={40}
                        />
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </SwiperSlide>
        </Swiper>

        <div className={styles.exclusiveSectionButtonContainer}>
          <StyledButtonV7 text={buttonText} handleClick={handleButtonClick} />
        </div>
      </div>
    </section>
  );
};
