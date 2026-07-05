import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ExperimentZonePage.module.css';

export default function ExperimentZonePage() {
  useEffect(() => {
    document.body.classList.remove('no-scroll');
  }, []);

  return (
    <div className={styles.page}>
      <p className={styles.title}>Under construction.</p>
      <Link className={styles.link} to="/">
        ← back to portfolio
      </Link>
    </div>
  );
}
