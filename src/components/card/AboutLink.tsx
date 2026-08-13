import { useViewState } from '../../state/ViewStateContext';
import styles from './AboutLink.module.css';

export default function AboutLink() {
  const { goToHero } = useViewState();
  return (
    <button className={styles.link} onClick={goToHero}>
      <span className={styles.label}>Back</span>
      {/* Hover-only green duplicate, revealed via a growing clip-path circle
          from the bottom-right corner (see .sweep) — decorative, so hidden
          from assistive tech rather than announcing the label twice. */}
      <span className={styles.sweep} aria-hidden="true">
        <span className={styles.sweepLabel}>Back</span>
      </span>
    </button>
  );
}
