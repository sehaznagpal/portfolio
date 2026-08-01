import bezel from '../../../../assets/images/moolroop/case-study/phone-silver-bezel.png';
import styles from './PhoneBezelFrame.module.css';

export default function PhoneBezelFrame({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
}) {
  return (
    <div className={styles.frame} onClick={onClick}>
      <div className={styles.screenClip}>
        <img className={styles.screenImg} src={src} alt={alt} />
      </div>
      <img className={styles.bezel} src={bezel} alt="" aria-hidden="true" />
    </div>
  );
}
