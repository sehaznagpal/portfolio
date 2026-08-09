import { GMAIL_COMPOSE_URL } from './FraudClosingNav';
import styles from './MobileFraudStickyCTA.module.css';

/* Mail-only on mobile — case-study-to-case-study navigation lives in the
   persistent top bar's "Next Case Study" link instead, so it isn't repeated
   down here too. */
export default function MobileFraudStickyCTA() {
  return (
    <a href={GMAIL_COMPOSE_URL} target="_blank" rel="noreferrer" className={styles.cta}>
      Contact Via Mail →
    </a>
  );
}
