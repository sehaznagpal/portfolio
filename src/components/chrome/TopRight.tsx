import { memo, useEffect, useRef, useState } from 'react';
import { useTheme, THEME_OPTIONS, THEME_CYCLE } from '../../state/ThemeContext';
import avatar from '../../assets/images/chrome/avatar.jpg';
import ThemeDotCluster from './ThemeDotCluster';
import styles from './TopRight.module.css';

type ShareState = 'idle' | 'copied' | 'manual';

const THEME_MENU_CLOSE_DELAY_MS = 120;

/* Fixed viewport chrome — memoized so it never re-renders as
   ExperimentCanvas's pan/zoom state changes on every wheel tick; it takes
   no props, so its own state/context subscriptions are the only things
   that should trigger a re-render. */
function TopRight() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [shareState, setShareState] = useState<ShareState>('idle');
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  /* The theme dropdown is hover-revealed (the dot-cluster trigger is a click
     target in its own right — see handleCycleTheme), so opening/closing it
     needs to tolerate the mouse briefly leaving the trigger while crossing
     the gap to the dropdown below (or vice versa) without flickering shut.
     A short cancellable delay on close does that; opening is always instant. */
  function openThemeMenu() {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpen(true);
  }

  function scheduleCloseThemeMenu() {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimeoutRef.current = null;
    }, THEME_MENU_CLOSE_DELAY_MS);
  }

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) window.clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  /* Advances the dot cluster's fixed rotation by exactly one step from
     whatever it's currently showing at top-left — including the very first
     click while no theme is active yet, which just activates the theme
     already being previewed there rather than skipping past it. */
  function handleCycleTheme() {
    const currentIndex = THEME_CYCLE.indexOf(theme as (typeof THEME_CYCLE)[number]);
    if (currentIndex === -1) {
      setTheme(THEME_CYCLE[0]);
      return;
    }
    setTheme(THEME_CYCLE[(currentIndex + 1) % THEME_CYCLE.length]);
  }

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
          className={styles.themeToggle}
          aria-label="Change theme"
          aria-haspopup="true"
          aria-expanded={open}
          onClick={handleCycleTheme}
          onMouseEnter={openThemeMenu}
          onMouseLeave={scheduleCloseThemeMenu}
          onFocus={openThemeMenu}
          onBlur={scheduleCloseThemeMenu}
        >
          <ThemeDotCluster activeTheme={theme} />
        </button>
      </div>

      {open && (
        <div
          className={styles.dropdown}
          role="menu"
          onMouseEnter={openThemeMenu}
          onMouseLeave={scheduleCloseThemeMenu}
          onFocus={openThemeMenu}
          onBlur={scheduleCloseThemeMenu}
        >
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
                setTheme(option.id);
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

export default memo(TopRight);
