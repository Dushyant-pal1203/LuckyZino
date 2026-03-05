import Link from 'next/link';
import styles from './StyledButton.module.scss';
import { ButtonInnerComponent } from './ButtonInnerComponent';

const StyledButton = ({ text = 'Click me', type, linkTo = '/', handleClick, customClass }) => {
  return type === 'button' ? (
    <button className={`${styles.styledButton} ${customClass ? styles[customClass] : ''}`} onClick={handleClick}>
      <ButtonInnerComponent text={text} customClass={customClass} />
    </button>
  ) : type === 'link' ? (
    <Link href={linkTo} className={`${styles.styledButton} ${customClass ? styles[customClass] : ''}`}>
      <ButtonInnerComponent text={text} customClass={customClass} />
    </Link>
  ) : null;
};

export default StyledButton;
