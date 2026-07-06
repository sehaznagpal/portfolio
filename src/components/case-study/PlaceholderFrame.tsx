import styles from './PlaceholderFrame.module.css';

export default function PlaceholderFrame({
  label,
  aspectRatio = '430 / 932',
}: {
  label: string;
  aspectRatio?: string;
}) {
  return (
    <div className={styles.frame} style={{ aspectRatio }}>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
