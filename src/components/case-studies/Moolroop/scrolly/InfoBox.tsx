import type { ReactNode } from 'react';
import styles from './InfoBox.module.css';

export default function InfoBox({
  variant,
  heading,
  children,
}: {
  variant: 'white' | 'yellow';
  heading?: string;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.box} ${variant === 'yellow' ? styles.yellow : styles.white}`}>
      {heading && <p className={styles.heading}>{heading}</p>}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
