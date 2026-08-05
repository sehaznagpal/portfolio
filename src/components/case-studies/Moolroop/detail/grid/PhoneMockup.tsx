import phoneSilverBezel from '../../../../../assets/images/moolroop/case-study/phone-silver-bezel.png';
import styles from './PhoneMockup.module.css';

export default function PhoneMockup({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`${styles.mockup} ${className ?? ''}`}>
      <div className={styles.screen}>
        <img src={src} alt={alt} className={styles.screenImage} />
      </div>
      <img src={phoneSilverBezel} alt="" className={styles.bezel} />
    </div>
  );
}
