import type { ReactNode } from 'react';
import { useScaleToFit } from '../../lib/useScaleToFit';
import styles from './ViewportFrame.module.css';

export default function ViewportFrame({ children }: { children: ReactNode }) {
  const scale = useScaleToFit();

  return (
    <div className={styles.outer}>
      <div className={styles.stage} style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
