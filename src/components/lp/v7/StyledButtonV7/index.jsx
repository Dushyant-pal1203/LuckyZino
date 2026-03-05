import { ExoBlackFont } from '@/static/fonts';
import styles from './StyledButtonV7.module.scss';

export const StyledButtonV7 = ({ text = 'Click me', handleClick, customClass }) => {
  return (
    <button className={`${styles.styledButtonV7} ${customClass ? styles[customClass] : ''}`} onClick={handleClick}>
      <div className={`${styles.buttonInnerBorder} ${styles.border0}`}>
        <div className={`${styles.buttonInnerBorder} ${styles.border1}`}>
          <div className={`${styles.buttonInnerBorder} ${styles.border2}`}>
            <div className={`${styles.buttonInnerFill} ${styles.fill0}`}>
              <div className={styles.fill1Blur}></div>
              <div className={`${styles.buttonInnerFill} ${styles.fill1}`}>
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
    </button>
  )
};
