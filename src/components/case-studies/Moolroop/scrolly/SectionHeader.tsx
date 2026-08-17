import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

export default function SectionHeader({
  number,
  title,
  action,
}: {
  number: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className={styles.header}>
      <div className={styles.titleGroup}>
        <span>{number}</span>
        <span>{title}</span>
      </div>
      {action}
    </div>
  );
}
