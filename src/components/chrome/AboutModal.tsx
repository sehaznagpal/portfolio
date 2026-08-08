import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import styles from './AboutModal.module.css';
import aboutPhoto from '../../assets/images/chrome/about-photo.png';

const EXIT_MS = 220;

const CV_FILE_ID = '14b5dhUaxDMVNoWJ5dAXC9HyvFMgPKnYl';
const CV_URL = `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`;
const MAIL_SUBJECT = 'Re-directed from your portfolio';
const MAIL_BODY =
  "Hi Sehaz,\n\nI came across your portfolio and wanted to reach out, we'd love to connect.\n\nBest,\n";
/* Gmail's web compose URL, not a mailto: link — mailto: hands off to whatever
   mail client is registered on the OS (often an empty native Mail app), while
   this always opens the pre-filled draft in Gmail on the web. Same destination
   the old toolbar's Contact icon used. */
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=sehaznagpal@gmail.com&su=${encodeURIComponent(MAIL_SUBJECT)}&body=${encodeURIComponent(MAIL_BODY)}`;

const TICKER_PHRASE = 'Sehaz Nagpal · Product Designer';
/* Wide enough to overflow the ticker's viewport (and so stay seamless) at any
   realistic screen width, from a phone up to an ultrawide monitor. */
const TICKER_REPEATS = 10;
const TICKER_TEXT = `${Array.from({ length: TICKER_REPEATS }, () => TICKER_PHRASE).join(' · ')} · `;

const BULLETS = [
  'UI/UX design & prototyping',
  'Product thinking & scoping',
  'UX research',
  'Content strategy & writing',
  'Front-end coding assistance (vibe coding)',
];

export default function AboutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setRendered(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      return () => cancelAnimationFrame(raf);
    }
    if (rendered) {
      setVisible(false);
      const timeout = setTimeout(() => setRendered(false), EXIT_MS);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!rendered) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rendered, onClose]);

  if (!rendered) return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${visible ? styles.overlayVisible : ''}`}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`${styles.panel} ${visible ? styles.panelVisible : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="About Me"
        onClick={(event) => event.stopPropagation()}
      >
        <button className={styles.closeButton} aria-label="Close" onClick={onClose}>
          X
        </button>

        <div className={styles.scroll}>
          <p className={styles.heading}>
            <span className={styles.headingItalic}>About</span>
            <span className={styles.headingBold}>Me</span>
          </p>

          <div className={styles.tickerViewport} aria-hidden="true">
            <div className={styles.tickerTrack}>
              <span className={styles.tickerCopy}>{TICKER_TEXT}</span>
              <span className={styles.tickerCopy}>{TICKER_TEXT}</span>
            </div>
          </div>

          <div className={styles.body}>
            <p className={styles.paragraph}>
              I'm a self-taught product designer who learns by building. Right now I'm looking for
              my first full-time role, though I'm open to good collaborations and work along the
              way too. Here's what I bring to that:
            </p>

            <ul className={styles.bullets}>
              {BULLETS.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <div className={styles.actions}>
              <a
                className={styles.button}
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Via Mail
              </a>
              <p className={styles.caption}>*for work, queries, feedback, discussion or just a hi!</p>
              <a className={styles.button} href={CV_URL} download target="_blank" rel="noopener noreferrer">
                Download CV
              </a>
            </div>
          </div>

          <img className={styles.photo} src={aboutPhoto} alt="Sehaz Nagpal" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
