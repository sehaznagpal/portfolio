import type { ReactNode } from 'react';
import styles from './ViewportFrame.module.css';

/* Fills the true viewport at any desktop aspect ratio — no scaled/letterboxed
   inner canvas. Chrome (AboutModalLink/ExploreBeyondLink) anchors to the real
   edges via this stage's full-bleed box, and the flip card sizes itself fluidly
   with CSS (see CardShell.module.css) rather than the whole page scaling
   together. */
export default function ViewportFrame({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={styles.outer}>
      <div className={`${styles.grid} ${dark ? '' : styles.gridVisible}`} />
      <div className={styles.stage}>{children}</div>
    </div>
  );
}
