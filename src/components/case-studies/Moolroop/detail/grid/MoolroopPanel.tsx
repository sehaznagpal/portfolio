import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import type { CardDef } from './cardData';
import MotivationPanelBody from './MotivationPanelBody';
import ProblemPanelBody from './ProblemPanelBody';
import ResearchPanelBody from './ResearchPanelBody';
import IdeationPanelBody from './IdeationPanelBody';
import SolutionPanelBody from './SolutionPanelBody';
import styles from './MoolroopCard.module.css';

const PANEL_BODIES: Partial<Record<string, ComponentType>> = {
  motivation: MotivationPanelBody,
  problem: ProblemPanelBody,
  research: ResearchPanelBody,
  ideation: IdeationPanelBody,
  solution: SolutionPanelBody,
};

/* Solution's Figma layout has its own "Solution" + "Reflection" headings
   positioned beside the phone mockup rather than one shared centered title —
   SolutionPanelBody renders those itself, so the generic heading is skipped here. */
const CARDS_WITH_CUSTOM_HEADING = new Set(['solution']);

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
      layout="position"
      className={styles.panel}
      transition={{ layout: LAYOUT_TRANSITION }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
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
        {!CARDS_WITH_CUSTOM_HEADING.has(card.id) && <h2 className={styles.panelHeading}>{card.panelHeading}</h2>}
        {(() => {
          const Body = PANEL_BODIES[card.id];
          return Body ? <Body /> : null;
        })()}
      </motion.div>
    </motion.div>
  );
}
