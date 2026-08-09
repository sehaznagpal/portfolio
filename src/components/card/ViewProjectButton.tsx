import { Link } from 'react-router-dom';
import styles from './ViewProjectButton.module.css';

export default function ViewProjectButton({ to }: { to: string }) {
  return (
    <Link className={styles.button} to={to}>
      <span className={styles.label}>View project →</span>
      {/* Hover-only green duplicate, revealed via a growing clip-path circle
          from the bottom-right corner (see .sweep) — decorative, so hidden
          from assistive tech rather than announcing the label twice. */}
      <span className={styles.sweep} aria-hidden="true">
        <span className={styles.sweepLabel}>View project →</span>
      </span>
    </Link>
  );
}
