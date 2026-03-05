'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimationCharacter } from '../AnimationCharacter';
import { ExoFont } from '@/static/fonts';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './MainSection.module.scss';

export const MainSection = ({ mainBtnText }: { mainBtnText: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: mainBtnText, feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  useEffect(() => {
    const cursorElements = [
      '#coin-green',
      '#coin-gold',
      '#coin-gold-light',
      '#coin-green-light',
      '#coin-green-blur',
      '#coin-green-blur-light',
      '#coin-gold-blur',
      '#coin-gold-blur-light',
      '#diamond-violet-cont',
      '#diamond-ruby-cont'
    ]
      .map((sel) => document.querySelector<HTMLElement>(sel))
      .filter(Boolean);

    const animationElements = [
      ...cursorElements,
      ...[
        '#stone-violet',
        '#diamond-violet-glow',
        '#stone-ruby',
        '#diamond-ruby-glow',
        '#spinning-wheel'
      ]
        .map((sel) => document.querySelector<HTMLElement>(sel))
        .filter(Boolean)
    ];

    animationElements.forEach((el) => el?.setAttribute('data-animate', 'true'));

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX * 0.02;
      const y = e.clientY * 0.02;
      cursorElements.forEach((el) => {
        if (el) {
          el.style.transform = `translate(calc(5% - ${x}px), calc(5% - ${y}px))`;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('lp-v2-theme');

    return () => {
      document.documentElement.classList.remove('lp-v2-theme');
    };
  }, []);

  return (
    <section className={`${styles.sectionV2} ${ExoFont.className}`}>
      <div className={styles.sectionV2Container}>
        <div className={styles.sectionV2TopTextContainer}>
          <h2>
            <b>Limited time</b>
            <br />
            100% <span>Bonus offer</span>!
          </h2>
        </div>
        <div className={styles.sectionV2purple}>
          <div className={styles.sectionV2TextShineContainer}>
            <h1 className={styles.sectionV2Text}>
              <b className={styles.sectionV2TextGreenGradient}>Free 20 sc</b>{' '}
              <span style={{ color: '#fff' }}>+</span> <b>80,000,000 GC</b>
              <br />
              <span style={{ color: '#fff' }}>
                <i className={styles.strikeAngled}>$29.99</i> -{' '}
                <span style={{ textTransform: 'lowercase' }}>now only</span>
              </span>{' '}
              <b>$9.99!</b>
            </h1>
            <h1 className={styles.sectionV2TextShine}>
              <b>Free 20 sc</b> <span style={{ color: '#fff' }}>+</span>{' '}
              <b>80,000,000 GC</b>
              <br />
              <span style={{ color: '#fff' }}>
                <i className={styles.strikeAngled}>$29.99</i> -{' '}
                <span style={{ textTransform: 'lowercase' }}>now only</span>
              </span>{' '}
              <b>$9.99!</b>
            </h1>
          </div>
        </div>
        <div className={styles.sectionV2TextContainer}>
          <h2>
            <b>One time</b> <span>per user only</span>
          </h2>
          <button
            type="button"
            tabIndex={0}
            className={styles.sectionV2cta}
            onClick={handleButtonClick}
          >
            {mainBtnText}
          </button>
        </div>
        <div className={styles.sectionV2ImageContainer}>
          <h2>
            <span>W</span>elcome <span>T</span>O
          </h2>
          <picture className={styles.sectionV2Picture}>
            <source
              type="image/webp"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/vertical_ornaments.webp"
            />
            <source
              type="image/png"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/vertical_ornaments.png"
            />
            <source
              type="image/webp"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/vertical_ornaments.webp"
            />
            <source
              type="image/png"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/vertical_ornaments.png"
            />
            <img
              className={styles.sectionV2VerticalOrnaments}
              src="/images/lp_v2/vertical_ornaments.png"
              alt="vertical-ornaments"
              draggable="false"
            />
          </picture>
          <picture className={styles.sectionV2Picture}>
            <source
              type="image/webp"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/lights.webp"
            />
            <source
              type="image/png"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/lights.png"
            />
            <source
              type="image/webp"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/lights.webp"
            />
            <source
              type="image/png"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/lights.png"
            />
            <img
              className={styles.sectionV2Lights}
              src="/images/lp_v2/lights.png"
              alt="lights"
              draggable="false"
            />
          </picture>
          <picture className={styles.sectionV2Picture}>
            <source
              type="image/webp"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/lightning.webp"
            />
            <source
              type="image/png"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/lightning.png"
            />
            <source
              type="image/webp"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/lightning.webp"
            />
            <source
              type="image/png"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/lightning.png"
            />
            <img
              className={styles.sectionV2Lightning}
              src="/images/lp_v2/lightning.png"
              alt="lightning"
              draggable="false"
            />
          </picture>

          <img
            src="/images/lp_v2/lz-logo.svg"
            className={styles.sectionV2ImageContainerLogo}
            alt="logo"
          />

          <div className={styles.sectionV2Spinner}>
            <picture className={styles.sectionV2Picture}>
              <source
                type="image/webp"
                media="(min-width: 576px)"
                srcSet="/images/lp_v2/spinning_wheel.webp"
              />
              <source
                type="image/png"
                media="(min-width: 576px)"
                srcSet="/images/lp_v2/spinning_wheel.png"
              />
              <source
                type="image/webp"
                media="(max-width: 576px)"
                srcSet="/images/lp_v2/spinning_wheel.webp"
              />
              <source
                type="image/png"
                media="(max-width: 576px)"
                srcSet="/images/lp_v2/spinning_wheel.png"
              />
              <img
                id="spinning-wheel"
                className={styles.sectionV2SpinningWheel}
                src="/images/lp_v2/spinning_wheel.png"
                alt="spinning-wheel"
                draggable="false"
              />
            </picture>
            <picture className={styles.sectionV2Picture}>
              <source
                type="image/webp"
                media="(min-width: 576px)"
                srcSet="/images/lp_v2/spinner-outline.webp"
              />
              <source
                type="image/png"
                media="(min-width: 576px)"
                srcSet="/images/lp_v2/spinner-outline.png"
              />
              <source
                type="image/webp"
                media="(max-width: 576px)"
                srcSet="/images/lp_v2/spinner-outline.webp"
              />
              <source
                type="image/png"
                media="(max-width: 576px)"
                srcSet="/images/lp_v2/spinner-outline.png"
              />
              <img
                className={styles.sectionV2SpinnerOutline}
                src="/images/lp_v2/spinner-outline.png"
                alt="spinner-outline"
                draggable="false"
              />
            </picture>
            <picture className={styles.sectionV2Picture}>
              <source
                type="image/webp"
                media="(min-width: 576px)"
                srcSet="/images/lp_v2/center-coin.webp"
              />
              <source
                type="image/png"
                media="(min-width: 576px)"
                srcSet="/images/lp_v2/center-coin.png"
              />
              <source
                type="image/webp"
                media="(max-width: 576px)"
                srcSet="/images/lp_v2/center-coin.webp"
              />
              <source
                type="image/png"
                media="(max-width: 576px)"
                srcSet="/images/lp_v2/center-coin.png"
              />
              <img
                className={styles.sectionV2CenterCoin}
                src="/images/lp_v2/center-coin.png"
                alt="center-coin"
                draggable="false"
              />
            </picture>
          </div>

          <picture className={styles.sectionV2Picture}>
            <source
              type="image/webp"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/spinner-glow-mobile.webp"
            />
            <source
              type="image/png"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/spinner-glow-mobile.png"
            />
            <source
              type="image/webp"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/spinner-glow-mobile.webp"
            />
            <source
              type="image/png"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/spinner-glow-mobile.png"
            />
            <img
              className={styles.sectionV2SpinnerGlowMobile}
              src="/images/lp_v2/spinner-glow-mobile.png"
              alt="spinner-glow-mobile"
              draggable="false"
            />
          </picture>

          <AnimationCharacter />

          {/* coin-green */}
          <picture className={styles.sectionV2Picture}>
            <source
              type="image/webp"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/coin-green.webp"
            />
            <source
              type="image/png"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/coin-green.png"
            />
            <source
              type="image/webp"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/coin-green.webp"
            />
            <source
              type="image/png"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/coin-green.png"
            />
            <img
              id="coin-green"
              className={styles.sectionV2CoinGreen}
              src="/images/lp_v2/coin-green.png"
              alt="coin-green"
              draggable="false"
            />
          </picture>
          <picture className={styles.sectionV2Picture}>
            <source
              type="image/webp"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/coin-light.webp"
            />
            <source
              type="image/png"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/coin-light.png"
            />
            <source
              type="image/webp"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/coin-light.webp"
            />
            <source
              type="image/png"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/coin-light.png"
            />
            <img
              id="coin-green-light"
              className={styles.sectionV2CoinGreenLight}
              src="/images/lp_v2/coin-light.png"
              alt="coin-green-light"
              draggable="false"
            />
          </picture>
          <picture className={styles.sectionV2Picture}>
            <source
              type="image/webp"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/coin-green-big.webp"
            />
            <source
              type="image/png"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/coin-green-big.png"
            />
            <source
              type="image/webp"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/coin-green-big.webp"
            />
            <source
              type="image/png"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/coin-green-big.png"
            />
            <img
              id="coin-green-blur"
              className={styles.sectionV2CoinGreenBlur}
              src="/images/lp_v2/coin-green-big.png"
              alt="coin-green-blur"
              draggable="false"
            />
          </picture>
          <picture className={styles.sectionV2Picture}>
            <source
              type="image/webp"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/blur-coin-light.webp"
            />
            <source
              type="image/png"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/blur-coin-light.png"
            />
            <source
              type="image/webp"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/blur-coin-light.webp"
            />
            <source
              type="image/png"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/blur-coin-light.png"
            />
            <img
              id="coin-green-blur-light"
              className={styles.sectionV2CoinGreenBlurLight}
              src="/images/lp_v2/blur-coin-light.png"
              alt="coin-green-blur-light"
              draggable="false"
            />
          </picture>
          {/* end coin-green */}

          {/* coin-gold */}
          <picture className={styles.sectionV2Picture}>
            <source
              type="image/webp"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/coin-gold.webp"
            />
            <source
              type="image/png"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/coin-gold.png"
            />
            <source
              type="image/webp"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/coin-gold.webp"
            />
            <source
              type="image/png"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/coin-gold.png"
            />
            <img
              id="coin-gold"
              className={styles.sectionV2CoinGold}
              src="/images/lp_v2/coin-gold.png"
              alt="coin-gold"
              draggable="false"
            />
          </picture>
          <picture className={styles.sectionV2Picture}>
            <source
              type="image/webp"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/coin-light.webp"
            />
            <source
              type="image/png"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/coin-light.png"
            />
            <source
              type="image/webp"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/coin-light.webp"
            />
            <source
              type="image/png"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/coin-light.png"
            />
            <img
              id="coin-gold-light"
              className={styles.sectionV2CoinGoldLight}
              src="/images/lp_v2/coin-light.png"
              alt="coin-gold-light"
              draggable="false"
            />
          </picture>
          <picture className={styles.sectionV2Picture}>
            <source
              type="image/webp"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/coin-gold-big.webp"
            />
            <source
              type="image/png"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/coin-gold-big.png"
            />
            <source
              type="image/webp"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/coin-gold-big.webp"
            />
            <source
              type="image/png"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/coin-gold-big.png"
            />
            <img
              id="coin-gold-blur"
              className={styles.sectionV2CoinGoldBlur}
              src="/images/lp_v2/coin-gold-big.png"
              alt="coin-gold-blur"
              draggable="false"
            />
          </picture>
          <picture className={styles.sectionV2Picture}>
            <source
              type="image/webp"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/blur-coin-light.webp"
            />
            <source
              type="image/png"
              media="(min-width: 576px)"
              srcSet="/images/lp_v2/blur-coin-light.png"
            />
            <source
              type="image/webp"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/blur-coin-light.webp"
            />
            <source
              type="image/png"
              media="(max-width: 576px)"
              srcSet="/images/lp_v2/blur-coin-light.png"
            />
            <img
              id="coin-gold-blur-light"
              className={styles.sectionV2CoinGoldBlurLight}
              src="/images/lp_v2/blur-coin-light.png"
              alt="coin-gold-blur-light"
              draggable="false"
            />
          </picture>
          {/* end coin-gold */}

          {/* diamond-violet */}
          <div className={styles.sectionV2DiamondVioletContainer}>
            <picture className={styles.sectionV2Picture}>
              <source
                type="image/webp"
                media="(min-width: 576px)"
                srcSet="/images/lp_v2/diamond-violet-glow.webp"
              />
              <source
                type="image/png"
                media="(min-width: 576px)"
                srcSet="/images/lp_v2/diamond-violet-glow.png"
              />
              <source
                type="image/webp"
                media="(max-width: 576px)"
                srcSet="/images/lp_v2/diamond-violet-glow.webp"
              />
              <source
                type="image/png"
                media="(max-width: 576px)"
                srcSet="/images/lp_v2/diamond-violet-glow.png"
              />
              <img
                id="diamond-violet-glow"
                className={styles.sectionV2DiamondVioletGlow}
                src="/images/lp_v2/diamond-violet-glow.png"
                alt="diamond-violet-glow"
                draggable="false"
              />
            </picture>
            <picture className={styles.sectionV2Picture}>
              <source
                type="image/webp"
                media="(min-width: 576px)"
                srcSet="/images/lp_v2/stone-violet.webp"
              />
              <source
                type="image/png"
                media="(min-width: 576px)"
                srcSet="/images/lp_v2/stone-violet.png"
              />
              <source
                type="image/webp"
                media="(max-width: 576px)"
                srcSet="/images/lp_v2/stone-violet.webp"
              />
              <source
                type="image/png"
                media="(max-width: 576px)"
                srcSet="/images/lp_v2/stone-violet.png"
              />
              <img
                id="stone-violet"
                className={styles.sectionV2StoneViolet}
                src="/images/lp_v2/stone-violet.png"
                alt="stone-violet"
                draggable="false"
              />
            </picture>
          </div>
          {/* end diamond-violet */}

          {/* diamond-ruby */}
          <div className={styles.sectionV2DiamondRubyContainer}>
            <picture className={styles.sectionV2Picture}>
              <source
                type="image/webp"
                media="(min-width: 576px)"
                srcSet="/images/lp_v2/diamond-ruby-glow.webp"
              />
              <source
                type="image/png"
                media="(min-width: 576px)"
                srcSet="/images/lp_v2/diamond-ruby-glow.png"
              />
              <source
                type="image/webp"
                media="(max-width: 576px)"
                srcSet="/images/lp_v2/diamond-ruby-glow.webp"
              />
              <source
                type="image/png"
                media="(max-width: 576px)"
                srcSet="/images/lp_v2/diamond-ruby-glow.png"
              />
              <img
                id="diamond-ruby-glow"
                className={styles.sectionV2DiamondRubyGlow}
                src="/images/lp_v2/diamond-ruby-glow.png"
                alt="diamond-ruby-glow"
                draggable="false"
              />
            </picture>
            <picture className={styles.sectionV2Picture}>
              <source
                type="image/webp"
                media="(min-width: 576px)"
                srcSet="/images/lp_v2/stone-ruby.webp"
              />
              <source
                type="image/png"
                media="(min-width: 576px)"
                srcSet="/images/lp_v2/stone-ruby.png"
              />
              <source
                type="image/webp"
                media="(max-width: 576px)"
                srcSet="/images/lp_v2/stone-ruby.webp"
              />
              <source
                type="image/png"
                media="(max-width: 576px)"
                srcSet="/images/lp_v2/stone-ruby.png"
              />
              <img
                id="stone-ruby"
                className={styles.sectionV2StoneRuby}
                src="/images/lp_v2/stone-ruby.png"
                alt="stone-ruby"
                draggable="false"
              />
            </picture>
          </div>
          {/* end diamond-ruby */}
        </div>
      </div>
    </section>
  );
};
