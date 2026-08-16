import { AnimatePresence, motion } from 'framer-motion';
import { THEME_OPTIONS, THEME_CYCLE } from '../../state/ThemeContext';
import type { ThemeName } from '../../types';
import styles from './ThemeDotCluster.module.css';

const SLOT_TRANSITION = { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };
/* Cyclic slot order is top-left, top-right, bottom-right, bottom-left — but
   the 2-column CSS grid these render into fills row-major (top-left,
   top-right, bottom-LEFT, bottom-RIGHT), so the DOM render order has to swap
   the last two to land each cyclic slot in its correct visual corner. */
const SLOT_RENDER_ORDER = [0, 1, 3, 2] as const;

/* Purely presentational — four fixed slots (top-left, top-right, bottom-right,
   bottom-left, per the Figma reference) each showing whichever theme sits
   that many steps ahead of the active one in THEME_CYCLE. Top-left is always
   the active theme itself. Whenever `activeTheme` changes, every slot's dot
   independently swaps via a slide-in-from-the-left/slide-out-to-the-right
   transition, so the whole cluster reads as one clean reshuffle regardless of
   whether the change came from a single cycle step or a direct jump. */
export default function ThemeDotCluster({ activeTheme }: { activeTheme: ThemeName }) {
  const rawIndex = THEME_CYCLE.indexOf(activeTheme as (typeof THEME_CYCLE)[number]);
  const activeIndex = rawIndex === -1 ? 0 : rawIndex;

  return (
    <div className={styles.cluster}>
      {SLOT_RENDER_ORDER.map((slot) => {
        const themeId = THEME_CYCLE[(activeIndex + slot) % THEME_CYCLE.length];
        const option = THEME_OPTIONS.find((candidate) => candidate.id === themeId);
        if (!option) return <div key={slot} className={styles.slot} />;
        return (
          <div key={slot} className={styles.slot}>
            <AnimatePresence initial={false}>
              <motion.span
                key={option.id}
                className={styles.dot}
                style={{ background: option.swatchFill, borderColor: option.swatchStroke }}
                initial={{ x: -8, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 8, opacity: 0 }}
                transition={SLOT_TRANSITION}
              />
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
