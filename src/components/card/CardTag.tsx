import type { ReactNode } from 'react';
import styles from './CardTag.module.css';

export default function CardTag({ children }: { children: ReactNode }) {
  return <p className={styles.tag}>{children}</p>;
}
