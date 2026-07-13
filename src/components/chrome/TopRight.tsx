import { useEffect, useRef, useState } from 'react';
import { useTheme, THEME_OPTIONS } from '../../state/ThemeContext';
import avatar from '../../assets/images/chrome/avatar.jpg';
import styles from './TopRight.module.css';

export default function TopRight() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — silently no-op
    }
  }

  return (
    <div ref={rootRef} className={`${styles.pill} ${open ? styles.pillOpen : ''}`}>
      <div className={styles.row}>
        <div className={styles.avatar}>
          <img src={avatar} alt="Sehaz Nagpal" className={styles.avatarImg} />
        </div>
        <button type="button" className={styles.share} onClick={handleShare}>
          {copied ? 'Copied!' : 'Share'}
        </button>
        <button
          type="button"
          className={styles.themeToggle}
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
    </div>
  );
}
