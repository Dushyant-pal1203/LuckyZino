import { ExoBlackFont } from '@/static/fonts';
import styles from './ButtonInnerComponent.module.scss';

export const ButtonInnerComponent = ({ text, customClass }) => {
  return (
    <div className={`${styles.buttonInnerBorder} ${styles.border0}`}>
      <div className={`${styles.buttonInnerBorder} ${styles.border1}`}>
        <div className={`${styles.buttonInnerBorder} ${styles.border2}`}>
          <div className={`${styles.buttonInnerFill} ${styles.fill0}`}>
            <div className={`${styles.buttonInnerFill} ${styles.fill1}`}>
              <div className={styles.fill1Blur}></div>
              <div className={`${styles.buttonInnerFill} ${styles.fill2}`}>
                <div className={`${styles.buttonInnerFill} ${styles.fill3}`}>
                  <div className={`${styles.buttonInnerFill} ${styles.fill4}`}>
                    <span
                      className={`${styles.buttonInnerText} ${ExoBlackFont.className} ${customClass ? styles[customClass] : ''}`}
                    >
                      {text}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
