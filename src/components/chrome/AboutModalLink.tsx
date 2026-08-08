import styles from './AboutModalLink.module.css';

export default function AboutModalLink({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className={styles.link} onClick={onClick}>
      about
    </button>
  );
}
