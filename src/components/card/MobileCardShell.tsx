import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useViewState } from '../../state/ViewStateContext';
import {
  MOBILE_HERO_CARD_W,
  MOBILE_HERO_CARD_H,
  MOBILE_CASE_CARD_W,
  MOBILE_CASE_CARD_H,
} from '../../lib/mobileLayout';
import styles from './MobileCardShell.module.css';

/* Mobile counterpart to CardShell — same fluid-percentage approach (see
   CardShell.tsx), sized to the 336x336 / 336x527 mobile Figma frames instead of
   desktop's 806x468 / 984x554. Both faces share the same 336 width, so only the
   height percentage actually animates during the flip. */
const HERO_WIDTH_PCT = (MOBILE_HERO_CARD_W / MOBILE_CASE_CARD_W) * 100;
const HERO_HEIGHT_PCT = (MOBILE_HERO_CARD_H / MOBILE_CASE_CARD_H) * 100;

export default function MobileCardShell({ front, back }: { front: ReactNode; back: ReactNode }) {
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
