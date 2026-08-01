import { Link } from 'react-router-dom';
import styles from './MoolroopClosingNav.module.css';

export default function MoolroopClosingNav() {
  return (
    <div className={styles.nav}>
      <Link to="/case-study/dr-cuterus" className={styles.link}>
        Explore Dr Cuterus Website Story →
      </Link>
      <Link to="/case-study/designing-against-fraud" className={styles.link}>
        Explore My Dissertation Project →
      </Link>
    </div>
  );
}
