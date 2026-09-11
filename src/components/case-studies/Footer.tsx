import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/sehaznagpal';

interface FooterProps {
  /** Route of the next case study in the MoolRoop → Dr Cuterus → Dissertation → MoolRoop loop. */
  nextCaseStudyHref: string;
  /** This case study's own pre-filled Gmail compose URL (see *ClosingNav.tsx). */
  mailtoHref: string;
}

/* Shared across all three case study pages — sticky-positioned beneath the
   page's own content (see each CaseStudy*Page.module.css's .mainContent),
   so it reveals itself from underneath on the final scroll rather than
   appearing as a normal in-flow block. */
export default function Footer({ nextCaseStudyHref, mailtoHref }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <p className={styles.wordmark}>
          <span className={styles.wordmarkItalic}>Sehaz</span>
          <span className={styles.wordmarkBold}>Nagpal</span>
        </p>

        <div className={styles.linksArea}>
          <div className={styles.linkGroup}>
            <span className={styles.groupLabel}>navigate</span>
            <Link to="/" className={styles.navLink}>
              (home)
            </Link>
            <Link to="/experiment-zone" className={styles.navLink}>
              (playground)
            </Link>
            <Link to={nextCaseStudyHref} className={styles.navLink}>
              (next case study)
            </Link>
          </div>
          <div className={styles.linkGroup}>
            <span className={styles.groupLabel}>let&rsquo;s talk</span>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className={styles.navLink}>
              (linkedin)
            </a>
            <a href={mailtoHref} target="_blank" rel="noreferrer" className={styles.navLink}>
              (mail)
            </a>
          </div>
        </div>
      </div>

      <p className={styles.copyright}>© 2026 Sehaz. All rights reserved.</p>
    </footer>
  );
}
