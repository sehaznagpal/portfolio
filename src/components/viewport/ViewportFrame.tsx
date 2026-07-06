import type { ReactNode } from 'react';
import { useScaleToFit } from '../../lib/useScaleToFit';
import styles from './ViewportFrame.module.css';

export default function ViewportFrame({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  const scale = useScaleToFit();

  return (
    <div className={`${styles.outer} ${dark ? styles.outerDark : ''}`}>
      <div className={styles.stage} style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
