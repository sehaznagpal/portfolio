import styles from './AboutModalLink.module.css';

export default function AboutModalLink({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className={styles.link} onClick={onClick}>
      {/* Same green fill-sweep mechanic as ExploreBeyondLink's .fill — a
          scaleX transform, not a color swap, so it reads as a wipe. */}
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>About</span>
    </button>
  );
}
