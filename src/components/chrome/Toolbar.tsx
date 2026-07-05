import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Pencil, Mail, Download } from 'lucide-react';
import { useViewState } from '../../state/ViewStateContext';
import styles from './Toolbar.module.css';

const CV_URL = 'https://drive.google.com/drive/u/0/folders/1piWk9aM3m2brOJ4pr_IumCHQrA0tu30U';
const MAIL_SUBJECT = 'Loved your portfolio';
const MAIL_BODY =
  "Hi Sehaz,\n\nI came across your portfolio and wanted to reach out, we'd love to connect.\n\nBest,\n";
const MAILTO = `mailto:sehaznagpal@gmail.com?subject=${encodeURIComponent(MAIL_SUBJECT)}&body=${encodeURIComponent(MAIL_BODY)}`;

type IconKey = 'home' | 'lab' | 'contact' | 'cv';

export default function Toolbar() {
  const { isFlipped, goToHero } = useViewState();
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
        <button className={iconClass('home')} aria-label="Home" onClick={() => isFlipped && goToHero()}>
          <Star size={18} strokeWidth={1.75} />
        </button>
        {renderBadge('home', 'Home')}
      </div>

      <div {...slotProps('lab')}>
        <Link className={iconClass('lab')} aria-label="Experiment Zone" to="/experiment-zone">
          <Pencil size={18} strokeWidth={1.75} />
        </Link>
        {renderBadge('lab', 'Experiment Zone')}
      </div>

      <div {...slotProps('contact')}>
        <a className={iconClass('contact')} aria-label="Contact" href={MAILTO}>
          <Mail size={18} strokeWidth={1.75} />
        </a>
        {renderBadge('contact', 'Contact')}
      </div>

      <div {...slotProps('cv')}>
        <a
          className={iconClass('cv')}
          aria-label="Download my CV"
          href={CV_URL}
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
