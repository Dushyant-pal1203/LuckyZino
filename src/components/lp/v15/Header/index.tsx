'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
  const router = useRouter();

  return (
    <nav className={styles.headerComponent}>
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.headerLogoContainer}>
          <img
            src="/images/lp_v7/LOGO.png"
            alt="LuckyZino logo"
            draggable="false"
          />
        </Link>

        <div className={styles.headerbuttonContainer}>
          <img
            src="/images/lp_v15/desktop/Sign_up_button.png"
            alt="Sign Up"
            className={styles.header_button}
            onClick={() => router.replace('/sign-up')}
          />
          <img
            src="/images/lp_v15/desktop/log_in_button.png"
            alt="Log In"
            className={styles.header_button}
            onClick={() => router.replace('/log-in')}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
