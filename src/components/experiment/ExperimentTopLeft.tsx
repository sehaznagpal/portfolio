import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './ExperimentTopLeft.module.css';

/* Fixed viewport chrome — memoized so it never re-renders (and never
   repaints) as ExperimentCanvas's pan/zoom state changes on every wheel
   tick; it takes no props, so its own state is the only thing that should
   ever trigger a re-render. */
function ExperimentTopLeft() {
  return (
    <Link to="/" className={styles.pill} aria-label="Back to home">
      <p className={styles.text}>Portfolio</p>
    </Link>
  );
}

export default memo(ExperimentTopLeft);
