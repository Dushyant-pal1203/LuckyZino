import { ExoFont } from '@/static/fonts';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
  const fbLink = 'https://www.facebook.com/profile.php?id=61574664105322';
  return (
    <nav className={styles.headerComponent}>
      <div className={styles.headerContainer}>
        <Link href='/' className={styles.headerLogoContainer}>
          <img src='/images/mainPage/LZino_logo.png' alt='Lucky Zino logo' draggable='false' />
        </Link>

        <Link className={`${styles.headerLinkContainer} ${ExoFont.className}`} href={fbLink} target='_blank'>
          <img
            className={styles.headerLinkLogo}
            src='/images/mainPage/FB_icon.png'
            alt='facebook icon'
            draggable='false'
          />
          <p className={styles.headerLinkText}>Follow us!</p>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
