import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Pencil, Mail, Download } from 'lucide-react';
import styles from './ExperimentToolbar.module.css';

const CV_FILE_ID = '14b5dhUaxDMVNoWJ5dAXC9HyvFMgPKnYl';
const CV_URL = `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`;
const MAIL_SUBJECT = 'Re-directed from your portfolio';
const MAIL_BODY =
  "Hi Sehaz,\n\nI came across your portfolio and wanted to reach out, we'd love to connect.\n\nBest,\n";
/* Gmail's web compose URL, not a mailto: link — mailto: hands off to whatever
   mail client is registered on the OS (often an empty native Mail app), while
   this always opens the pre-filled draft in Gmail on the web. */
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=sehaznagpal@gmail.com&su=${encodeURIComponent(MAIL_SUBJECT)}&body=${encodeURIComponent(MAIL_BODY)}`;

type IconKey = 'home' | 'lab' | 'contact' | 'cv';

export default function ExperimentToolbar() {
  const [hovered, setHovered] = useState<IconKey | null>(null);

  function slotProps(key: IconKey) {
    return {
      className: styles.slot,
      onMouseEnter: () => setHovered(key),
      onMouseLeave: () => setHovered(null),
    };
  }

  function iconClass(key: IconKey) {
    return `${styles.iconButton} ${hovered === key ? styles.iconActive : ''}`;
  }

  function renderBadge(key: IconKey, label: string) {
    const active = hovered === key;
    return (
      <>
        {active && <div className={styles.highlight} />}
        <div className={`${styles.dot} ${active ? styles.dotActive : ''}`} />
        {active && <div className={styles.label}>{label}</div>}
      </>
    );
  }

  return (
    <div className={styles.toolbar}>
      <div {...slotProps('home')}>
        <Link className={iconClass('home')} aria-label="Home" to="/">
          <Star size={18} strokeWidth={1.75} />
        </Link>
        {renderBadge('home', 'Home')}
      </div>

      <div {...slotProps('lab')}>
        <Link className={iconClass('lab')} aria-label="Experiment Zone" to="/experiment-zone">
          <Pencil size={18} strokeWidth={1.75} />
        </Link>
        {renderBadge('lab', 'Experiment Zone')}
      </div>

      <div {...slotProps('contact')}>
        <a
          className={iconClass('contact')}
          aria-label="Contact"
          href={GMAIL_COMPOSE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail size={18} strokeWidth={1.75} />
        </a>
        {renderBadge('contact', 'Contact')}
      </div>

      <div {...slotProps('cv')}>
        <a
          className={iconClass('cv')}
          aria-label="Download my CV"
          href={CV_URL}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download size={18} strokeWidth={1.75} />
        </a>
        {renderBadge('cv', 'Download my CV')}
      </div>
    </div>
  );
}
