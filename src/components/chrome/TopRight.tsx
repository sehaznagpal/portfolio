import { useEffect, useRef, useState } from 'react';
import { useTheme, THEME_OPTIONS } from '../../state/ThemeContext';
import avatar from '../../assets/images/chrome/avatar.jpg';
import styles from './TopRight.module.css';

type ShareState = 'idle' | 'copied' | 'manual';

export default function TopRight() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [shareState, setShareState] = useState<ShareState>('idle');
  const [pulsing, setPulsing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  /* Nudges attention toward the theme toggle every 5s by replaying its hover
     spin on its own — a separate transient class rather than a permanently
     running animation, so normal :hover behavior is untouched the rest of
     the time. */
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsing(true);
      setTimeout(() => setPulsing(false), 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!open && shareState !== 'manual') return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
        setShareState('idle');
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        setShareState('idle');
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, shareState]);

  function fallbackCopy(text: string): boolean {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    let succeeded = false;
    try {
      succeeded = document.execCommand('copy');
    } catch {
      succeeded = false;
    }
    document.body.removeChild(textarea);
    return succeeded;
  }

  async function handleShare() {
    const url = window.location.href;
    let succeeded = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        succeeded = true;
      } catch {
        succeeded = fallbackCopy(url);
      }
    } else {
      succeeded = fallbackCopy(url);
    }

    if (succeeded) {
      setShareState('copied');
      setTimeout(() => setShareState('idle'), 1500);
    } else {
      // Clipboard access blocked (permissions/insecure context) — fall back to
      // a manually-selectable link so "Share" always leaves the user with a
      // copyable URL, never a silent no-op.
      setShareState('manual');
    }
  }

  return (
    <div ref={rootRef} className={`${styles.pill} ${open ? styles.pillOpen : ''}`}>
      <div className={styles.row}>
        <div className={styles.avatar}>
          <img src={avatar} alt="Sehaz Nagpal" className={styles.avatarImg} />
        </div>
        <button type="button" className={styles.share} onClick={handleShare}>
          {shareState === 'copied' ? 'Copied!' : 'Share'}
        </button>
        <button
          type="button"
          className={`${styles.themeToggle} ${pulsing ? styles.pulse : ''}`}
          aria-label="Change theme"
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 11.1719L25.8994 3.27246L28.7275 6.10059L20.8281 14H32V18H20.7109L28.5527 26.1201L25.6758 28.8984L18 20.9492V32H14V20.8281L6.10059 28.7275L3.27246 25.8994L11.1719 18H0V14H11.2881L3.44629 5.87988L6.32324 3.10156L14 11.0508V0H18V11.1719Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className={styles.dropdown} role="menu">
          <p className={styles.dropdownLabel}>Theme</p>
          <div className={styles.divider} />
          {THEME_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="menuitemradio"
              aria-checked={theme === option.id}
              className={styles.option}
              onClick={() => {
                setTheme(theme === option.id ? 'default' : option.id);
                setOpen(false);
              }}
            >
              <span className={styles.optionLabel}>{option.label}</span>
              <span
                className={`${styles.swatch} ${theme === option.id ? styles.swatchActive : ''}`}
                style={{ background: option.swatchFill, borderColor: option.swatchStroke }}
              />
            </button>
          ))}
        </div>
      )}

      {shareState === 'manual' && (
        <div className={styles.manualCopy} role="dialog" aria-label="Copy link">
          <p className={styles.manualCopyLabel}>Copy this link:</p>
          <input
            type="text"
            readOnly
            className={styles.manualCopyInput}
            value={window.location.href}
            ref={(el) => el?.select()}
            onFocus={(event) => event.currentTarget.select()}
          />
        </div>
      )}
    </div>
  );
}
