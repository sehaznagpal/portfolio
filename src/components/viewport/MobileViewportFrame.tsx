import type { ReactNode } from 'react';
import styles from './MobileViewportFrame.module.css';

/* Mobile counterpart to ViewportFrame — same dark/grid-fade mechanism, and (like
   ViewportFrame) fills the true viewport with no scaled/letterboxed inner canvas.
   MobileCardShell sizes the flip card itself fluidly (see its own module.css)
   rather than the whole stage scaling together as one fixed 393x852 unit. Kept as
   a fully separate component so the desktop file is never touched. */
export default function MobileViewportFrame({
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
