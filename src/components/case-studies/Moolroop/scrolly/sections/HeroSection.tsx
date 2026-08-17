import { HERO_SCREENS } from '../../detail/MoolroopHero';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <div className={styles.hero}>
      <p className={styles.tag}>Making authenticity as easy to verify as price.</p>
      <div className={styles.screens}>
        {HERO_SCREENS.map((screen) => (
          <div className={styles.phone} key={screen.alt}>
            <img src={screen.src} alt={screen.alt} />
            <div className={styles.notch} />
          </div>
        ))}
      </div>
      <h1 className={styles.heading}>MoolRoop App</h1>
    </div>
  );
}
