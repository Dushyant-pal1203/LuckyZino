// StyledButtonV15.jsx
'use client';
import { ExoBlackFont } from '@/static/fonts';
import styles from './StyledButtonV15.module.scss';

export const StyledButtonV15 = ({ text = 'GET OFFER', handleClick }) => {
    return (
        <button
            className={`${styles.goldButton} ${ExoBlackFont.className}`}
            onClick={handleClick}
        >
            <span className={styles.goldenGlow}></span>
            <span className={styles.buttonText}>{text}</span>
        </button>
    );
};