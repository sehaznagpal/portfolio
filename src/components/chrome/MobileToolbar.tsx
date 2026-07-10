import { Link } from 'react-router-dom';
import { Star, Pencil, Mail, Download } from 'lucide-react';
import { useViewState } from '../../state/ViewStateContext';
import styles from './MobileToolbar.module.css';

const CV_FILE_ID = '18_6-pwbMks1uB9uSN2tfnRyZ0YACjbjC';
const CV_URL = `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`;
const MAIL_SUBJECT = 'Loved your portfolio';
const MAIL_BODY =
  "Hi Sehaz,\n\nI came across your portfolio and wanted to reach out, we'd love to connect.\n\nBest,\n";
const MAILTO = `mailto:sehaznagpal@gmail.com?subject=${encodeURIComponent(MAIL_SUBJECT)}&body=${encodeURIComponent(MAIL_BODY)}`;

/* Mobile counterpart to Toolbar — same four destinations/hrefs/handlers as desktop
   (home, experiment zone, contact, CV), positioned per Figma's mobile "nav bar icons"
   frame (539:235). The desktop version's hover-triggered tooltip/highlight has no
   equivalent on touch, so it's simply omitted here rather than faked with tap state;
   the underlying navigation logic is unchanged. */
export default function MobileToolbar() {
  const { isFlipped, goToHero } = useViewState();

  return (
    <div className={styles.toolbar}>
      <button className={styles.iconButton} aria-label="Home" onClick={() => isFlipped && goToHero()}>
        <Star size={18} strokeWidth={1.75} />
      </button>

      <Link className={styles.iconButton} aria-label="Experiment Zone" to="/experiment-zone">
        <Pencil size={18} strokeWidth={1.75} />
      </Link>

      <a className={styles.iconButton} aria-label="Contact" href={MAILTO}>
        <Mail size={18} strokeWidth={1.75} />
      </a>

      <a
        className={styles.iconButton}
        aria-label="Download my CV"
        href={CV_URL}
        download
        target="_blank"
        rel="noopener noreferrer"
      >
        <Download size={18} strokeWidth={1.75} />
      </a>
    </div>
  );
}
