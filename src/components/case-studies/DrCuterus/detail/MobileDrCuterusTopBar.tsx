import { Link } from 'react-router-dom';
import styles from './MobileDrCuterusTopBar.module.css';

/* Mobile-only persistent bar — desktop keeps Portfolio/Next Case Study inside
   the hero itself (see DrCuterusHero); this is a deliberate mobile exception,
   not a shared component, so desktop's layout stays untouched. */
export default function MobileDrCuterusTopBar() {
  return (
    <div className={styles.topBar}>
      <Link to="/" className={styles.portfolio}>
        Portfolio
      </Link>
      <Link to="/case-study/designing-against-fraud" className={styles.nextCaseStudy}>
        Next Case Study →
      </Link>
    </div>
  );
}
