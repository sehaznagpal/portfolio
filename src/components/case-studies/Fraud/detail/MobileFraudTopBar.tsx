import { Link } from 'react-router-dom';
import styles from './MobileFraudTopBar.module.css';

/* Mobile-only persistent bar — desktop keeps Portfolio/Explore Experiment Zone
   inside the hero itself (see FraudHero); this is a deliberate mobile
   exception, not a shared component, so desktop's layout stays untouched. */
export default function MobileFraudTopBar() {
  return (
    <div className={styles.topBar}>
      <Link to="/" className={styles.portfolio}>
        Sehaz
      </Link>
      <div className={styles.exploreZoneWrap}>
        <Link to="/experiment-zone" className={styles.exploreZone}>
          <span className={styles.exploreZoneFill} aria-hidden="true" />
          <span className={styles.exploreZoneLabel}>Explore Experiment Zone →</span>
        </Link>
        <div className={styles.tooltip} role="tooltip">
          <p className={styles.tooltipText}>More website designs, smaller projects &amp; experiments.</p>
        </div>
      </div>
    </div>
  );
}
