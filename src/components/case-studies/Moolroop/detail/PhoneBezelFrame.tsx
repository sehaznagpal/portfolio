import bezel from '../../../../assets/images/moolroop/case-study/phone-silver-bezel.png';
import styles from './PhoneBezelFrame.module.css';

export default function PhoneBezelFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.frame}>
      <img className={styles.screen} src={src} alt={alt} />
      <img className={styles.bezel} src={bezel} alt="" aria-hidden="true" />
    </div>
  );
}
