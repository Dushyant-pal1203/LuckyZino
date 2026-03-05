import { Montserrat } from 'next/font/google';
import styles from './StyledButtonV13.module.scss';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['800'],
});

export const StyledButtonV13 = ({ text = 'Click me', handleClick, customClass }) => {
    return (
        <button className={`${styles.styledButtonV13} ${customClass ? styles[customClass] : ''}`} onClick={handleClick}>
            <div className={`${styles.buttonInnerBorderV13} ${styles.border0}`}>
                <div className={`${styles.buttonInnerBorderV13} ${styles.border1}`}>
                    <div className={`${styles.buttonInnerBorderV13} ${styles.border2}`}>
                        <div className={`${styles.buttonInnerFillV13} ${styles.fill0}`}>
                            <div className={styles.fill1Blur}></div>
                            <div className={`${styles.buttonInnerFillV13} ${styles.fill1}`}>
                                <span
                                    className={`${styles.buttonInnerTextV13} ${montserrat.className} ${customClass ? styles[customClass] : ''}`}
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
