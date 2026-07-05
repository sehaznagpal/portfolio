import { Link } from 'react-router-dom';
import styles from './ViewProjectButton.module.css';

export default function ViewProjectButton({ to }: { to: string }) {
  return (
    <Link className={styles.button} to={to}>
      <span className={styles.label}>VIEW PROJECT →</span>
    </Link>
  );
}
