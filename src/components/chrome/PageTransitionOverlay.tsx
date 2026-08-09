import { createPortal } from 'react-dom';
import styles from './PageTransitionOverlay.module.css';

/* Paired with ExperimentZonePage's own PageRevealOverlay to read as one
   continuous grid-pattern sweep rather than two separate animations: this
   half slides a grid curtain down from off-screen-top to fully cover the
   viewport, then (once the route swaps) PageRevealOverlay continues the
   same downward motion off the bottom of the screen, uncovering the new
   page as it passes. This half only ever slides IN (it dies with the
   component that renders it, right as the route swaps, which is fine
   since covering that swap moment is its whole job). */
export default function PageTransitionOverlay({ active }: { active: boolean }) {
  if (!active) return null;
  return createPortal(<div className={`${styles.overlay} grid-background`} aria-hidden="true" />, document.body);
}
