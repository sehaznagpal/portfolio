import { ArrowRight } from 'lucide-react';
import styles from './StatDisplay.module.css';

export function StatDisplay({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.stat}>
      <p className={styles.value}>{value}</p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}

export function StatComparison({
  from,
  to,
}: {
  from: { value: string; label: string };
  to: { value: string; label: string };
}) {
  return (
    <div className={styles.comparison}>
      <StatDisplay value={from.value} label={from.label} />
      <ArrowRight className={styles.arrow} size={28} strokeWidth={1.5} />
      <StatDisplay value={to.value} label={to.label} />
    </div>
  );
}
