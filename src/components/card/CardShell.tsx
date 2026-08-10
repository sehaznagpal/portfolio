import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useViewState } from '../../state/ViewStateContext';
import { HERO_CARD_W, HERO_CARD_H, CASE_CARD_W, CASE_CARD_H } from '../../lib/layout';
import styles from './CardShell.module.css';

/* Hero (806x468) and case-study (984x554) cards are genuinely different sizes in
   Figma. .perspective is sized fluidly by CSS alone (see CardShell.module.css) to
   the larger case-study box; .inner is expressed as a *percentage* of that box —
   100% for the case-study face, and the hero box's own 806x468 re-derived as a
   percentage of 984x554 for the hero face — so Framer Motion tweens between two
   percentages instead of two raw px sizes. That removes the old uniform
   transform: scale() entirely: every size here is a genuine CSS relationship that
   the browser recomputes continuously, not one fixed-px canvas stretched by a
   JS-computed factor.

   The resize still animates in lockstep with rotateY in the same animate call so
   it reads as part of one continuous flip, not a separate step. Both faces stay
   mounted at all times (never conditionally rendered) so the backface-hidden face
   is always ready to rotate into view without popping in. */
const HERO_WIDTH_PCT = (HERO_CARD_W / CASE_CARD_W) * 100;
const HERO_HEIGHT_PCT = (HERO_CARD_H / CASE_CARD_H) * 100;

export default function CardShell({ front, back }: { front: ReactNode; back: ReactNode }) {
  const { isFlipped } = useViewState();

  return (
    <div className={styles.perspective}>
      <motion.div
        className={styles.inner}
        style={{ x: '-50%', y: '-50%' }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          width: isFlipped ? '100%' : `${HERO_WIDTH_PCT}%`,
          height: isFlipped ? '100%' : `${HERO_HEIGHT_PCT}%`,
        }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className={styles.face}>{front}</div>
        <div className={`${styles.face} ${styles.faceBack}`}>{back}</div>
      </motion.div>
    </div>
  );
}
