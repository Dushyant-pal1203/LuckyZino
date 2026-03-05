import { ExoFont } from '@/static/fonts';
import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerComponent}>
      <div className={`${styles.footerContainer} ${ExoFont.className}`}>
        <div className={styles.logoSide}>
          <Link href='/' className={styles.footerLogoContainer}>
            <img src='/images/mainPage/LZino_logo.png' alt='Lucky Zino logo' draggable='false' />
          </Link>
          <p className={styles.footerCopy}>&copy; {currentYear} Lucky Zino | All Rights Reserved</p>
        </div>
        <p className={styles.footerText}>
          No Purchase Necessary. Experience a completely free gaming experience. Play with both Gold Coins and Sweep
          Coins immediately without any payment! You can claim your free Sweep Coins via our Customer Benefits, Daily
          Bonus, Mail a Request, or receive a Free Sweep Coins Bonus when you purchase any Gold Coins package.
          <br />
          Void where prohibited by law. 18+
        </p>
      </div>
    </footer>
  );
};

export default Footer;
