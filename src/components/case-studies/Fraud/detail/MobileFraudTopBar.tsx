import { Link } from 'react-router-dom';
import styles from './MobileFraudTopBar.module.css';

/* Mobile-only persistent bar — desktop keeps Portfolio/Next Case Study inside
   the hero itself (see FraudHero); this is a deliberate mobile exception,
   not a shared component, so desktop's layout stays untouched. */
export default function MobileFraudTopBar() {
  return (
    <div className={styles.topBar}>
      <Link to="/" className={styles.portfolio}>
        Portfolio
      </Link>
      <Link to="/case-study/moolroop" className={styles.nextCaseStudy}>
        Next Case Study →
      </Link>
    </div>
  );
}
