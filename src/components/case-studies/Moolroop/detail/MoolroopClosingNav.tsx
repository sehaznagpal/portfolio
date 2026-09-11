import { Link } from 'react-router-dom';
import styles from './MoolroopClosingNav.module.css';

/* Same subject/body everywhere a mail link exists on the site (About
   section, experiment zone, every case study) — always reads as
   redirected from the portfolio in general, never naming this specific
   page. */
const CONTACT_SUBJECT = 'Re-directed from your portfolio';
const CONTACT_BODY =
  "Hi Sehaz,\n\nI came across your portfolio and wanted to reach out, we'd love to connect.\n\nBest,\n";
/* Gmail's web compose URL, not a mailto: link — mailto: hands off to whatever
   mail client is registered on the OS (often an empty native Mail app), while
   this always opens the pre-filled draft in Gmail on the web. Same pattern as
   the experiment zone's contact link (ExperimentContent.tsx). */
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=sehaznagpal@gmail.com&su=${encodeURIComponent(CONTACT_SUBJECT)}&body=${encodeURIComponent(CONTACT_BODY)}`;

export default function MoolroopClosingNav() {
  return (
    <div className={styles.nav}>
      <Link to="/case-study/dr-cuterus" className={styles.link}>
        Next Case Study →
      </Link>
      <a href={GMAIL_COMPOSE_URL} target="_blank" rel="noreferrer" className={styles.linkDark}>
        Contact Via Mail →
      </a>
    </div>
  );
}
