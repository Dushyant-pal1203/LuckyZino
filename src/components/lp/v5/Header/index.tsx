'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
  const router = useRouter();

  return (
    <nav className={styles.headerComponent}>
      <div className={styles.headerContainer}>
        <Link href='/' className={styles.headerLogoContainer}>
          <img src='/images/lp_v5/LOGO.png' alt='LuckyZino logo' draggable='false' />
        </Link>

        <button type='button' className={styles.headerButton} onClick={() => router.replace('/sign-in')} >Log in</button>
      </div>
    </nav>
  );
};

export default Header;
