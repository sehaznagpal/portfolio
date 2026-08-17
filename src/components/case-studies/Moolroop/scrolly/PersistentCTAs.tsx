import { PROTOTYPE_URL } from '../detail/MoolroopHero';
import { GMAIL_COMPOSE_URL } from '../detail/MoolroopClosingNav';
import styles from './PersistentCTAs.module.css';

export default function PersistentCTAs() {
  return (
    <div className={styles.ctas}>
      <a className={styles.prototype} href={PROTOTYPE_URL} target="_blank" rel="noreferrer">
        Explore Prototype →
      </a>
      <a className={styles.mail} href={GMAIL_COMPOSE_URL} target="_blank" rel="noreferrer">
        Contact Via Mail →
      </a>
    </div>
  );
}
