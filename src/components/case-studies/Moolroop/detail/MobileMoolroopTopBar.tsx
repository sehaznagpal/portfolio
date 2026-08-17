import { Link } from 'react-router-dom';
import styles from './MobileMoolroopTopBar.module.css';

/* Mobile-only persistent bar — desktop keeps Portfolio/Explore Experiment Zone
   inside the hero itself (see MoolroopHero); this is a deliberate mobile
   exception, not a shared component, so desktop's layout stays untouched. */
export default function MobileMoolroopTopBar() {
  return (
    <div className={styles.topBar}>
      <Link to="/" className={styles.portfolio}>
        Portfolio
      </Link>
      <Link to="/experiment-zone" className={styles.exploreZone}>
        Explore Experiment Zone →
      </Link>
    </div>
  );
}
