import { GMAIL_COMPOSE_URL } from './MoolroopClosingNav';
import styles from './MobileMoolroopStickyCTA.module.css';

/* Mail-only on mobile — case-study-to-case-study navigation lives in the
   persistent top bar's "Next Case Study" link instead, so it isn't repeated
   down here too. */
export default function MobileMoolroopStickyCTA() {
  return (
    <a href={GMAIL_COMPOSE_URL} target="_blank" rel="noreferrer" className={styles.cta}>
      Contact Via Mail →
    </a>
  );
}
