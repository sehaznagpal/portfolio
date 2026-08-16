import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { THEME_OPTIONS, THEME_CYCLE } from '../../state/ThemeContext';
import type { ThemeName } from '../../types';
import styles from './ThemeDotCluster.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const SWATCH_TRANSITION = { duration: 0.3, ease: EASE };
const SPIN_TRANSITION = { duration: 0.3, ease: EASE };
/* Cyclic slot order is top-left, top-right, bottom-right, bottom-left — but
   the 2-column CSS grid these render into fills row-major (top-left,
   top-right, bottom-LEFT, bottom-RIGHT), so the DOM render order has to swap
   the last two to land each cyclic slot in its correct visual corner. */
const SLOT_RENDER_ORDER = [0, 1, 3, 2] as const;
const ACTIVE_SLOT = 0;

/* Two independent animations, driven by two independent signals, layered on
   the same static (always-correct) 2x2 arrangement:

   1. The active (top-left) slot's own color cross-fades — new color slides
      in from the left, old one is pushed out to the right — every time
      `activeTheme` changes, from either trigger. This is a plain
      AnimatePresence content-swap local to that one slot.

   2. The whole cluster does a single rigid 90°-anticlockwise spin, but only
      when `spinSignal` increments (the caller bumps it only for a cluster-
      click advance, never for a direct list pick). Rather than animating the
      cluster from its *current* rotation forward (which would accumulate
      forever), each spin jumps the container to +90° and animates back down
      to 0° against the arrangement that's *already* the new, correct one —
      pre-rotating +90° makes the new arrangement look exactly like the old
      one did, so unwinding to 0° reads as the dots physically rotating
      anticlockwise into place, even though no per-dot position ever
      actually moves and the container always settles back at neutral. */
export default function ThemeDotCluster({
  activeTheme,
  spinSignal,
}: {
  activeTheme: ThemeName;
  spinSignal: number;
}) {
  const spinControls = useAnimationControls();
  const isFirstSpin = useRef(true);

  useEffect(() => {
    if (isFirstSpin.current) {
      isFirstSpin.current = false;
      return;
    }
    spinControls.set({ rotate: 90 });
    spinControls.start({ rotate: 0, transition: SPIN_TRANSITION });
  }, [spinSignal, spinControls]);

  const rawIndex = THEME_CYCLE.indexOf(activeTheme as (typeof THEME_CYCLE)[number]);
  const activeIndex = rawIndex === -1 ? 0 : rawIndex;

  return (
    <motion.div className={styles.cluster} initial={{ rotate: 0 }} animate={spinControls}>
      {SLOT_RENDER_ORDER.map((slot) => {
        const themeId = THEME_CYCLE[(activeIndex + slot) % THEME_CYCLE.length];
        const option = THEME_OPTIONS.find((candidate) => candidate.id === themeId);
        if (!option) return <div key={slot} className={styles.slot} />;
        const dotStyle = { background: option.swatchFill, borderColor: option.swatchStroke };
        return (
          <div key={slot} className={styles.slot}>
            {slot === ACTIVE_SLOT ? (
              <AnimatePresence initial={false}>
                <motion.span
                  key={option.id}
                  className={styles.dot}
                  style={dotStyle}
                  initial={{ x: -8, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 8, opacity: 0 }}
                  transition={SWATCH_TRANSITION}
                />
              </AnimatePresence>
            ) : (
              <span className={styles.dot} style={dotStyle} />
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
