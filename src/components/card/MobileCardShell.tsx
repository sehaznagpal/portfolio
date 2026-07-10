import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useViewState } from '../../state/ViewStateContext';
import { MOBILE_HERO_CARD_W, MOBILE_HERO_CARD_H, MOBILE_CASE_CARD_W, MOBILE_CASE_CARD_H } from '../../lib/mobileLayout';
import styles from './MobileCardShell.module.css';

/* Mobile counterpart to CardShell — identical flip logic (rotateY + size animate in
   lockstep, both faces always mounted), just the 336x336 / 336x527 mobile card sizes
   from the Figma mobile frames instead of desktop's 806x468 / 984x554. */
export default function MobileCardShell({ front, back }: { front: ReactNode; back: ReactNode }) {
  const { isFlipped } = useViewState();

  return (
    <div className={styles.perspective}>
      <motion.div
        className={styles.inner}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          width: isFlipped ? MOBILE_CASE_CARD_W : MOBILE_HERO_CARD_W,
          height: isFlipped ? MOBILE_CASE_CARD_H : MOBILE_HERO_CARD_H,
        }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className={styles.face}>{front}</div>
        <div className={`${styles.face} ${styles.faceBack}`}>{back}</div>
      </motion.div>
    </div>
  );
}
