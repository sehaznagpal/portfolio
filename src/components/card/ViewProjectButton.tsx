import { Link } from 'react-router-dom';
import styles from './ViewProjectButton.module.css';

export default function ViewProjectButton({ to, inline = false }: { to: string; inline?: boolean }) {
  return (
    <Link className={`${styles.button} ${inline ? styles.inline : ''}`} to={to}>
      <span className={styles.label}>VIEW PROJECT →</span>
    </Link>
  );
}
