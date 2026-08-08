import styles from './MobileAboutModalLink.module.css';

export default function MobileAboutModalLink({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className={styles.link} onClick={onClick}>
      about
    </button>
  );
}
