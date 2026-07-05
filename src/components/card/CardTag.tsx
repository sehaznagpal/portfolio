import type { ReactNode } from 'react';
import styles from './CardTag.module.css';

export default function CardTag({
  children,
  fullWidth = false,
}: {
  children: ReactNode;
  fullWidth?: boolean;
}) {
  return <p className={`${styles.tag} ${fullWidth ? styles.fullWidth : ''}`}>{children}</p>;
}
