import Link from 'next/link';
import { ButtonInnerComponent } from './ButtonInnerComponent';
import styles from './StyledButtonV5.module.scss';

export const StyledButtonV5 = ({ text = 'Click me', type, linkTo = '/', handleClick, customClass }) => {
  return type === 'button' ? (
    <button className={`${styles.styledButtonV5} ${customClass ? styles[customClass] : ''}`} onClick={handleClick}>
      <ButtonInnerComponent text={text} customClass={customClass} />
    </button>
  ) : type === 'link' ? (
    <Link href={linkTo} className={`${styles.styledButtonV5} ${customClass ? styles[customClass] : ''}`}>
      <ButtonInnerComponent text={text} customClass={customClass} />
    </Link>
  ) : null;
};
