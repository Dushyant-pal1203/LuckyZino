'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { StyledButtonV7 } from '../../v7/StyledButtonV7';
import { ExoBlackFont } from '@/static/fonts';
import styles from './ExclusiveSectionThree.module.scss';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';

export const ExclusiveSectionThree = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isLandingV12 = pathname === '/lp/v12';

  const buttonText = 'choose your bonus';

  const exclusiveSectionContentStyles = isLandingV12
    ? styles.exclusiveSectionContentV12
    : styles.exclusiveSectionContent;

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
          {
            isLandingV12 ? (
              <img
                src='/images/lp_v12/ExclusiveChristmasDeals.png'
                alt='YOUR EXCLUSIVE CHRISTMAS DEALS'
                draggable='false'
              />
            ) : (
              <img
                src='/images/lp_v7/EXCLUSIVE_OFFERS.png'
                alt='YOUR EXCLUSIVE OFFERS'
                draggable='false'
              />
            )
          }
        </div>
        <div className={styles.exclusiveSectionTitleMobile}>
          {
            isLandingV12 ? (
              <img
                src='/images/lp_v12/ExclusiveChristmasDeals.png'
                alt='YOUR EXCLUSIVE CHRISTMAS DEALS'
                draggable='false'
              />
            ) : (
              <img
                src='/images/lp_v7/EXCLUSIVE_OFFERS.png'
                alt='YOUR EXCLUSIVE OFFERS'
                draggable='false'
              />
            )
          }
        </div>
        <div className={exclusiveSectionContentStyles}>
          <div className={styles.exclusiveSectionImageSide}>
            {isLandingV12 ? (
              <img
                className={styles.exclusiveSectionCoinsL}
                src='/images/lp_v12/ExclusiveSectionCard/shine_L.png'
                alt='shine'
                draggable='false'
              />
            ) : (
              <img
                className={styles.exclusiveSectionCoinsL}
                src='/images/lp_v7/coins_L.png'
                alt='coins'
                draggable='false'
              />
            )}
            <div className={`${styles.exclusiveSectionCard} ${styles.christmas}`} onClick={handleButtonClick}>
              <div className={styles.exclusiveSectionCardName}>
                <img
                  src='/images/lp_v7/ExclusiveSectionCard/welcome.png'
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
                  <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsFreeTextShadow}>+ FREE 25 SC</span>
                    <span className={styles.coinsFreeTextGradient}>+ FREE 25 SC</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                <span className={styles.coinsTotalTextShadow}>25,000 GC</span>
                <span className={styles.coinsTotalTextGradient}>25,000 GC</span>
              </div>
              <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                <span className={styles.coinsDiscountValue}>50%</span>
                <span className={styles.coinsDiscountGet}>get discount</span>
              </div>
              <div className={styles.coinsAction}>
                <button className={styles.coinsActionButton}>
                  <div className={styles.coinsActionValue}>
                    <img
                      src='/images/lp_v7/ExclusiveSectionCard/999.png'
                      alt='icon'
                      draggable='false'
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.exclusiveSectionImageSide}>
            <div className={`${styles.exclusiveSectionCard} ${styles.christmas}`} onClick={handleButtonClick}>
              <div className={styles.exclusiveSectionCardName}>
                <img
                  src='/images/lp_v7/ExclusiveSectionCard/BestValue.png'
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
                  <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsFreeTextShadow}>+ FREE 35 SC</span>
                    <span className={styles.coinsFreeTextGradient}>+ FREE 35 SC</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                <span className={styles.coinsTotalTextShadow}>30,000 GC</span>
                <span className={styles.coinsTotalTextGradient}>30,000 GC</span>
              </div>
              <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                <span className={styles.coinsDiscountValue}>40%</span>
                <span className={styles.coinsDiscountGet}>get discount</span>
              </div>
              <div className={styles.coinsAction}>
                <button className={styles.coinsActionButton}>
                  <div className={styles.coinsActionValue}>
                    <img
                      src='/images/lp_v12/ExclusiveSectionCard/299_399.png'
                      alt='icon'
                      draggable='false'
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.exclusiveSectionImageSide}>
            <div className={`${styles.exclusiveSectionCard} ${styles.christmas}`} onClick={handleButtonClick}>
              <div className={styles.exclusiveSectionCardName}>
                <img
                  src='/images/lp_v12/ExclusiveSectionCard/finalDeal.png'
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
                  <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsFreeTextShadow}>+ FREE 10 SC</span>
                    <span className={styles.coinsFreeTextGradient}>+ FREE 10 SC</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                <span className={styles.coinsTotalTextShadow}>10,000 GC</span>
                <span className={styles.coinsTotalTextGradient}>10,000 GC</span>
              </div>
              <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                <span className={styles.coinsDiscountValue}>50%</span>
                <span className={styles.coinsDiscountGet}>get discount</span>
              </div>
              <div className={styles.coinsAction}>
                <button className={styles.coinsActionButton}>
                  <div className={styles.coinsActionValue}>
                    <img
                      src='/images/lp_v12/ExclusiveSectionCard/499_999.png'
                      alt='icon'
                      draggable='false'
                    />
                  </div>
                </button>
              </div>
            </div>
            {isLandingV12 ? (
              <img
                className={styles.exclusiveSectionCoinsR}
                src='/images/lp_v12/ExclusiveSectionCard/shine_R.png'
                alt='shine'
                draggable='false'
              />
            ) : (
              <img
                className={styles.exclusiveSectionCoinsR}
                src='/images/lp_v7/coins_R.png'
                alt='coins'
                draggable='false'
              />
            )}

          </div>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          centeredSlides={true}
          navigation={true}
          modules={[Navigation]}
          style={{
            "--swiper-navigation-color": "#fff",
          }}
          breakpoints={{
            992: {
              slidesPerView: 2,
              spaceBetween: 20,
              centeredSlides: false,
            },
          }}
          className={styles.exclusiveSectionSliderV12}
        >
          <SwiperSlide className={styles.exclusiveSectionSliderSlide}>
            <div className={`${styles.exclusiveSectionCard} ${styles.christmas}`} onClick={handleButtonClick}>
              <div className={styles.exclusiveSectionCardName}>
                <img
                  src='/images/lp_v7/ExclusiveSectionCard/welcome.png'
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
                  <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsFreeTextShadow}>+ FREE 25 SC</span>
                    <span className={styles.coinsFreeTextGradient}>+ FREE 25 SC</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                <span className={styles.coinsTotalTextShadow}>25,000 GC</span>
                <span className={styles.coinsTotalTextGradient}>25,000 GC</span>
              </div>
              <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                <span className={styles.coinsDiscountValue}>50%</span>
                <span className={styles.coinsDiscountGet}>get discount</span>
              </div>
              <div className={styles.coinsAction}>
                <button className={styles.coinsActionButton}>
                  <div className={styles.coinsActionValue}>
                    <img
                      src='/images/lp_v7/ExclusiveSectionCard/999.png'
                      alt='icon'
                      draggable='false'
                    />
                  </div>
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.exclusiveSectionSliderSlide}>
            <div className={`${styles.exclusiveSectionCard} ${styles.christmas}`} onClick={handleButtonClick}>
              <div className={styles.exclusiveSectionCardName}>
                <img
                  src='/images/lp_v7/ExclusiveSectionCard/BestValue.png'
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
                  <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsFreeTextShadow}>+ FREE 35 SC</span>
                    <span className={styles.coinsFreeTextGradient}>+ FREE 35 SC</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                <span className={styles.coinsTotalTextShadow}>30,000 GC</span>
                <span className={styles.coinsTotalTextGradient}>30,000 GC</span>
              </div>
              <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                <span className={styles.coinsDiscountValue}>40%</span>
                <span className={styles.coinsDiscountGet}>get discount</span>
              </div>
              <div className={styles.coinsAction}>
                <button className={styles.coinsActionButton}>
                  <div className={styles.coinsActionValue}>
                    <img
                      src='/images/lp_v12/ExclusiveSectionCard/299_399.png'
                      alt='icon'
                      draggable='false'
                    />
                  </div>
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.exclusiveSectionSliderSlide}>
            <div className={`${styles.exclusiveSectionCard} ${styles.christmas}`} onClick={handleButtonClick}>
              <div className={styles.exclusiveSectionCardName}>
                <img
                  src='/images/lp_v12/ExclusiveSectionCard/finalDeal.png'
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
                  <div className={`${styles.coinsFreeText} ${ExoBlackFont.className}`}>
                    <span className={styles.coinsFreeTextShadow}>+ FREE 10 SC</span>
                    <span className={styles.coinsFreeTextGradient}>+ FREE 10 SC</span>
                  </div>
                </div>
              </div>
              <div className={`${styles.coinsTotal} ${ExoBlackFont.className}`}>
                <span className={styles.coinsTotalTextShadow}>10,000 GC</span>
                <span className={styles.coinsTotalTextGradient}>10,000 GC</span>
              </div>
              <div className={`${styles.coinsDiscount} ${ExoBlackFont.className}`}>
                <span className={styles.coinsDiscountValue}>50%</span>
                <span className={styles.coinsDiscountGet}>get discount</span>
              </div>
              <div className={styles.coinsAction}>
                <button className={styles.coinsActionButton}>
                  <div className={styles.coinsActionValue}>
                    <img
                      src={isLandingV12 ? '/images/lp_v12/ExclusiveSectionCard/499_999.png' : '/images/lp_v7/ExclusiveSectionCard/499.png'}
                      alt='icon'
                      draggable='false'
                    />
                  </div>
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className={styles.exclusiveSectionButtonContainer}>
          <StyledButtonV7 text='choose your bonus' handleClick={handleButtonClick} />
        </div>
      </div>
    </section>
  );
};
