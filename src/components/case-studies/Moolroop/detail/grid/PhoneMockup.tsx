import phoneSilverBezel from '../../../../../assets/images/moolroop/case-study/phone-silver-bezel.png';
import styles from './PhoneMockup.module.css';

type PhoneMockupProps =
  | { src: string; alt: string; screenColor?: undefined; className?: string }
  | { src?: undefined; alt?: undefined; screenColor: string; className?: string };

export default function PhoneMockup({ src, alt, screenColor, className }: PhoneMockupProps) {
  return (
    <div className={`${styles.mockup} ${className ?? ''}`}>
      <div className={styles.screen} style={screenColor ? { background: screenColor } : undefined}>
        {src && <img src={src} alt={alt} className={styles.screenImage} />}
      </div>
      <img src={phoneSilverBezel} alt="" className={styles.bezel} />
    </div>
  );
}
