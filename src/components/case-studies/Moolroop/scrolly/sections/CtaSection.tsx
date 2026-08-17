import { Link } from 'react-router-dom';
import styles from './CtaSection.module.css';

export default function CtaSection() {
  return (
    <div className={styles.section}>
      <div className={styles.buttons}>
        <Link to="/case-study/dr-cuterus" className={`${styles.button} ${styles.drCuterus}`}>
          Explore Dr Cuterus Website Story →
        </Link>
        <Link
          to="/case-study/designing-against-fraud"
          className={`${styles.button} ${styles.dissertation}`}
        >
          Explore My Dissertation Project →
        </Link>
      </div>
    </div>
  );
}
