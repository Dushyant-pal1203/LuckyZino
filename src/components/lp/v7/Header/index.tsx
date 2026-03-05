'use client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './Header.module.scss';
import ImageWithFallback from '@/components/image-with-fallback';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: 'Log in', feature_name: pathname }
    });
    router.replace('/sign-up');
  }

  return (
    <nav className={styles.headerComponent}>
      <div className={styles.headerContainer}>
        <Link href='/' className={styles.headerLogoContainer}>
          <ImageWithFallback
            src='/images/lp_v7/LOGO.avif'
            fallbackSrc='/images/lp_v7/LOGO.png'
            alt='LuckyZino logo'
            draggable='false'
            width={200}
            height={60}
            priority
          />
        </Link>

        <button type='button' className={styles.headerButton} onClick={handleButtonClick}>Log in</button>
      </div>
    </nav>
  );
};

export default Header;
