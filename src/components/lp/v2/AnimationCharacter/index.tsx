import { useEffect } from 'react';
import styles from './AnimationCharacter.module.scss';

export const AnimationCharacter = () => {
  function supportsWebM() {
    const video = document.createElement('video');
    return video.canPlayType('video/webm; codecs="vp8, vorbis"') !== '';
  }

  function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  useEffect(() => {
    const animations = document.querySelectorAll('#animation-placeholder');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const container = entry.target as HTMLElement;
          const isMob = isMobile();
          const isSaf = isSafari();

          let useLottie;

          if (isSaf) {
            useLottie = true;
          } else {
            useLottie = !supportsWebM();
          }

          if (useLottie) {
            const player = document.createElement('lottie-player');
            player.setAttribute('src', isMob ? container.dataset.mobileLottie! : container.dataset.desktopLottie!);
            player.setAttribute('background', 'transparent');
            player.setAttribute('speed', '1');
            player.setAttribute('autoplay', '');
            player.setAttribute('loop', '');
            player.style.width = '100%';
            player.style.height = '100%';
            container.appendChild(player);
          }
          else {
            const video = document.createElement('video');
            video.src = isMob ? container.dataset.mobileWebm! : container.dataset.desktopWebm!;
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.style.width = '100%';
            video.style.height = '100%';
            container.appendChild(video);
          }

          observer.unobserve(container);
        }
      });
    }, { threshold: 0.1 });

    animations.forEach(animation => observer.observe(animation));
  }, []);

  return (
    <>
      <div id="animation-placeholder" className={styles.lana}
        data-desktop-lottie="/images/lp_v2/animCharacter/lana.json"
        data-mobile-lottie="/images/lp_v2/animCharacter/lana-mobile.json"
        data-desktop-webm="/images/lp_v2/animCharacter/lana.webm"
        data-mobile-webm="/images/lp_v2/animCharacter/lana-mobile.webm"
      ></div>

      <div id="animation-placeholder" className={styles.zuzu}
        data-desktop-lottie="/images/lp_v2/animCharacter/zuzu.json"
        data-mobile-lottie="/images/lp_v2/animCharacter/zuzu.json"
        data-desktop-webm="/images/lp_v2/animCharacter/zuzu.webm"
        data-mobile-webm="/images/lp_v2/animCharacter/zuzu.webm"
      ></div>
    </>
  );
};
