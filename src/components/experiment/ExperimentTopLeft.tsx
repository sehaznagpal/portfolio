import { Link } from 'react-router-dom';
import styles from './ExperimentTopLeft.module.css';

export default function ExperimentTopLeft() {
  return (
    <Link to="/" className={styles.pill} aria-label="Back to home">
      <p className={styles.text}>Portfolio</p>
    </Link>
  );
}
