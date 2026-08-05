import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import type { CardDef } from './cardData';
import MotivationPanelBody from './MotivationPanelBody';
import ProblemPanelBody from './ProblemPanelBody';
import ResearchPanelBody from './ResearchPanelBody';
import styles from './MoolroopCard.module.css';

const PANEL_BODIES: Partial<Record<string, ComponentType>> = {
  motivation: MotivationPanelBody,
  problem: ProblemPanelBody,
  research: ResearchPanelBody,
};

const LAYOUT_TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

export default function MoolroopPanel({
  card,
  onClose,
  onPrev,
  onNext,
}: {
  card: CardDef;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      layoutId={`card-${card.id}`}
      layout
      className={styles.panel}
      transition={{ layout: LAYOUT_TRANSITION }}
      exit={{ transition: { duration: 0 } }}
    >
      <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
        X
      </button>
      <div className={styles.navButtons}>
        <button type="button" className={styles.navButton} onClick={onPrev} aria-label="Previous card">
          &lt;
        </button>
        <button type="button" className={`${styles.navButton} ${styles.navButtonNext}`} onClick={onNext} aria-label="Next card">
          &lt;
        </button>
      </div>

      <motion.div
        key="panel"
        className={styles.panelInner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.22 } }}
      >
        <h2 className={styles.panelHeading}>{card.panelHeading}</h2>
        {(() => {
          const Body = PANEL_BODIES[card.id];
          return Body ? <Body /> : null;
        })()}
      </motion.div>
    </motion.div>
  );
}
