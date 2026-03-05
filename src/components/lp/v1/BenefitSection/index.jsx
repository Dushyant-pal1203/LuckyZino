import { ExoFont, ExoBlackFont } from '@/static/fonts';
import styles from './BenefitSection.module.scss';

export const BenefitSection = () => {
  return (
    <section className={styles.benefitSectionComponent}>
      <h2 className={`${styles.benefitSectionTitle} ${ExoBlackFont.className}`}>endless fun for everyone!</h2>
      <div className={`${styles.benefitSectionContainer} ${ExoFont.className}`}>
        <div className={styles.contentTile}>
          <img
            className={styles.icon}
            src='/images/mainPage/benefitSection/icon_slotMachine.png'
            alt='icon'
            draggable='false'
          />
          <div className={styles.infoContainer}>
            <h4 className={styles.infoTitle}>Hundreds of Games</h4>
            <p className={styles.infoText}>Dive into a world of hundreds of fun and engaging games</p>
          </div>
        </div>

        <div className={styles.contentTile}>
          <img
            className={styles.icon}
            src='/images/mainPage/benefitSection/icon_heart.png'
            alt='icon'
            draggable='false'
          />
          <div className={styles.infoContainer}>
            <h4 className={styles.infoTitle}>No Purchase Necessary</h4>
            <p className={styles.infoText}>Play and Win without spending a dime - zero cost, infinite Fun</p>
          </div>
        </div>

        <div className={styles.contentTile}>
          <img
            className={styles.icon}
            src='/images/mainPage/benefitSection/icon_dollar.png'
            alt='icon'
            draggable='false'
          />
          <div className={styles.infoContainer}>
            <h4 className={styles.infoTitle}>Fast & Easy Redeems</h4>
            <p className={styles.infoText}>Fast and simple reward redemptions are just a few clicks away</p>
          </div>
        </div>
      </div>
    </section>
  );
};
