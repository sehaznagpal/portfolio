import type { ReactNode } from 'react';
import { useScaleToFitMobile } from '../../lib/useScaleToFitMobile';
import styles from './MobileViewportFrame.module.css';

/* Mobile counterpart to ViewportFrame — same fixed-stage-scaled-to-fit approach and
   same dark/grid-fade mechanism, sized to the 393x852 mobile frame instead of the
   desktop 1280x832 one. Kept as a fully separate component so the desktop file is
   never touched. */
export default function MobileViewportFrame({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  const scale = useScaleToFitMobile();

  return (
    <div className={styles.outer}>
      <div className={`${styles.grid} ${dark ? '' : styles.gridVisible}`} />
      <div className={styles.stage} style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
