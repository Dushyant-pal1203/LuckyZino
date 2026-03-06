'use client';

import styles from './MassivePayoutSection.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { OurProviders } from '../OurProviders';

export const MassivePayoutSection = () => {
  const router = useRouter();
  return (
    <section className={styles.massivePayoutSection}>
      {/* Background Image */}
      <div className={styles.backgroundWrapperDesktop}>
        <Image
          src="/images/lp_v15/desktop/massivepayload_bg.png"
          alt="Massive Payout Background"
          fill
          priority
          className={styles.backgroundImage}
        />
      </div>
      <div className={styles.backgroundWrapperMobile}>
        <Image
          src="/images/lp_v15/mobile/massivepayload_bg.png"
          alt="Massive Payout Background"
          fill
          priority
          className={styles.backgroundImage}
        />
      </div>

      {/* Content */}
      <div className={styles.contentWrapper}>
        <div className={styles.leftContentDesktop}>
          <Image
            src="/images/lp_v15/desktop/massivepayload_text.png"
            alt="Massive Payout Text"
            width={800}
            height={400}
            className={styles.textImage}
            onClick={() => router.replace('/sign-up')}
            style={{ cursor: 'pointer' }}
            priority
          />
        </div>
        <div className={styles.ContentMobile}>
          <OurProviders customClassName="ourProvidersDark" />
          {/* <Image
            src="/images/lp_v15/mobile/massivepayload_text.png"
            alt="Massive Payout Text"
            width={800}
            height={400}
            className={styles.textImage}
            onClick={() => router.replace('/sign-up')}
            style={{ cursor: 'pointer' }}
            priority
          /> */}
          <Image
            src="/images/lp_v15/mobile/massivepayload_button.png"
            alt="Massive Payout Text"
            width={200}
            height={200}
            className={styles.textImageButton}
            onClick={() => router.replace('/sign-up')}
            style={{ cursor: 'pointer' }}
            priority
          />
        </div>
      </div>
    </section>
  );
};
