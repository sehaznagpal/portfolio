import { createPortal } from 'react-dom';
import styles from './PageTransitionOverlay.module.css';

/* Paired with ExperimentZonePage's own fade-in-on-mount reveal to form a
   full crossfade — this half only ever fades IN (it dies with the
   component that renders it, right as the route swaps, which is fine
   since covering that swap moment is its whole job). */
export default function PageTransitionOverlay({ active }: { active: boolean }) {
  if (!active) return null;
  return createPortal(<div className={styles.overlay} />, document.body);
}
