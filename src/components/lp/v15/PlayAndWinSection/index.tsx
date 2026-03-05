import React from 'react';
import styles from './PlayAndWin.module.scss';

const PlayAndWinSection = () => {
  return (
    <div className={styles.playWinCard}>
      {/* Main headline */}
      <div className={styles.playWinCardTitleImageDesktop}>
        <img
          src="/images/lp_v15/desktop/play_and_win.png"
          alt="Play & Win"
          draggable="false"
        />
      </div>
      <div className={styles.playWinCardTitleImageMobile}>
        <img
          src="/images/lp_v15/mobile/play_and_win.png"
          alt="Play & Win"
          draggable="false"
        />
      </div>
      {/* content */}
      <div className={styles.playWinCardContentImageDesktop}>
        <img
          src="/images/lp_v15/desktop/play-and-win-content.png"
          alt="Coins & Prizes"
          draggable="false"
        />
      </div>
      <div className={styles.playWinCardContentImageMobile}>
        <img
          src="/images/lp_v15/desktop/play-and-win-content2.png"
          alt="Coins & Prizes"
          draggable="false"
        />
      </div>

      {/* Feature list with icons (visual representation) */}
      <div className={styles.playWinCardFeatures}>
        <div className={styles.playWinCardFeatureItemImage}>
          <img
            src="/images/lp_v15/desktop/hundred-of-games.png"
            alt="Hundreds of Games"
            draggable="false"
          />
        </div>
        <div className={styles.playWinCardFeatureItemImage}>
          <img
            src="/images/lp_v15/desktop/no-purchase-necessary.png"
            alt="No Purchase Necessary"
            draggable="false"
          />
        </div>
        <div className={styles.playWinCardFeatureItemImage}>
          <img
            src="/images/lp_v15/desktop/fast-and-easy-redeems.png"
            alt="Fast & Easy Redeems"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayAndWinSection;
