import { Link } from 'react-router-dom';
import styles from './DrCuterusClosingNav.module.css';

export default function DrCuterusClosingNav() {
  return (
    <div className={styles.nav}>
      <Link to="/case-study/designing-against-fraud" className={styles.link}>
        Explore My Dissertation Project →
      </Link>
      <Link to="/case-study/moolroop" className={styles.link}>
        Explore MoolRoop Project (self-initiated) →
      </Link>
    </div>
  );
}
