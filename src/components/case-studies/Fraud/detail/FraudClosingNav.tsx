import { Link } from 'react-router-dom';
import styles from './FraudClosingNav.module.css';

export default function FraudClosingNav() {
  return (
    <div className={styles.nav}>
      <Link to="/case-study/moolroop" className={styles.link}>
        Explore Moolroop Project (self-initiated) →
      </Link>
      <Link to="/case-study/dr-cuterus" className={styles.link}>
        Explore Dr Cuterus Website Story →
      </Link>
    </div>
  );
}
