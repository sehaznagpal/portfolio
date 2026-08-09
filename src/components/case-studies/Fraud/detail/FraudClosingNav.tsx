import { Link } from 'react-router-dom';
import styles from './FraudClosingNav.module.css';

const CONTACT_SUBJECT = 'Re: Designing Against Fraud Case Study';
const CONTACT_BODY =
  "Hi Sehaz,\n\nI came across your Designing Against Fraud dissertation case study and wanted to reach out, we'd love to connect.\n\nBest,\n";
/* Gmail's web compose URL, not a mailto: link — mailto: hands off to whatever
   mail client is registered on the OS (often an empty native Mail app), while
   this always opens the pre-filled draft in Gmail on the web. Same pattern as
   the experiment zone's contact link (ExperimentContent.tsx). */
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=sehaznagpal@gmail.com&su=${encodeURIComponent(CONTACT_SUBJECT)}&body=${encodeURIComponent(CONTACT_BODY)}`;

export default function FraudClosingNav() {
  return (
    <div className={styles.nav}>
      <Link to="/case-study/moolroop" className={styles.link}>
        Next Case Study →
      </Link>
      <a href={GMAIL_COMPOSE_URL} target="_blank" rel="noreferrer" className={styles.linkDark}>
        Contact Via Mail →
      </a>
    </div>
  );
}
