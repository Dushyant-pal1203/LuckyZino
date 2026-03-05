'use client';
import { usePathname, useRouter } from 'next/navigation';
import { sendBIEvent } from '@/lib/trackers';
import { TrackerEvents } from '@/enum/trackers';
import styles from './BonusSection.module.scss';

export const BonusSection = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleButtonClick = () => {
    sendBIEvent(TrackerEvents.SiteButtonClicked, {
      button: { id: 'Hourly/Daily Bonus Base', feature_name: pathname }
    });
    router.replace('/sign-in');
  }

  return (
    <section className={styles.bonusSectionComponent}>
      <button className={styles.bonusContentTop} onClick={handleButtonClick}>
        <img
          className={styles.hourlyBonusIcon}
          src='/images/lp_v5/HourlyBonusBase.png'
          alt='icon'
          draggable='false'
        />
      </button>
      <button className={styles.bonusContentBottom} onClick={handleButtonClick}>
        <img
          className={styles.dailyBonusIcon}
          src='/images/lp_v5/DailyBonusBase.png'
          alt='icon'
          draggable='false'
        />
      </button>
    </section>
  );
};
