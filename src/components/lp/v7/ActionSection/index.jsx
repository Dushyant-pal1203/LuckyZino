'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { StyledButtonV7 } from '../StyledButtonV7';
import { TrackerEvents } from '@/enum/trackers';
import { sendBIEvent } from '@/lib/trackers';
import styles from './ActionSection.module.scss';

export const ActionSection = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const hasScrolled = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  const buttonText = 'join now!';

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: buttonText, feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const element = document.getElementById('landingPageV7')
      || document.getElementById('landingPageV9')
      || document.getElementById('landingPageV12')
      || document.getElementById('landingPageV14');

    const container = element || window;

    const check = () => {
      const scrollY = container instanceof Window ? window.scrollY : container.scrollTop;
      const innerH = container instanceof Window ? window.innerHeight : container.clientHeight;
      const docH = container instanceof Window ? document.documentElement.scrollHeight : container.scrollHeight;

      if (scrollY > 50) hasScrolled.current = true;

      const atBottom = scrollY + innerH >= docH - 20;

      if (atBottom && hasScrolled.current) {
        setVisible(false);
      } else if (scrollY < lastY.current) {
        setVisible(true);
      }

      lastY.current = scrollY;
    };

    container.addEventListener("scroll", check);
    return () => container.removeEventListener("scroll", check);
  }, []);

  return (
    <>
      {isMobile && <div className={styles.actionSection} style={{
        transition: "transform 300ms ease, opacity 300ms ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        pointerEvents: visible ? "auto" : "none",
      }}>
        <div className={styles.actionSectionText}>
          <p>DAILY RELOAD <br />DAILY REWARDS!</p>
        </div>
        <div className={styles.actionSectionButtonContainer}>
          <StyledButtonV7 text={buttonText} handleClick={handleButtonClick} />
        </div>
      </div>}
    </>
  )
};
