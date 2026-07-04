import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useViewState } from '../../state/ViewStateContext';
import { HERO_CARD_W, HERO_CARD_H, CASE_CARD_W, CASE_CARD_H } from '../../lib/layout';
import styles from './CardShell.module.css';

/* Hero (806x468) and case-study (984x554) cards are genuinely different sizes in
   Figma. Per the confirmed approach, the resize animates in lockstep with rotateY in
   the same animate call so it reads as part of one continuous flip, not a separate
   step. Both faces stay mounted at all times (never conditionally rendered) so the
   backface-hidden face is always ready to rotate into view without popping in. */
export default function CardShell({ front, back }: { front: ReactNode; back: ReactNode }) {
  const { isFlipped } = useViewState();

  return (
    <div className={styles.perspective}>
      <motion.div
        className={styles.inner}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          width: isFlipped ? CASE_CARD_W : HERO_CARD_W,
          height: isFlipped ? CASE_CARD_H : HERO_CARD_H,
        }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className={styles.face}>{front}</div>
        <div className={`${styles.face} ${styles.faceBack}`}>{back}</div>
      </motion.div>
    </div>
  );
}
