import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import type { CardDef } from './cardData';
import { useIsMobile } from '../../../../../lib/useIsMobile';
import { usePanelSwipe } from '../../../../../lib/usePanelSwipe';
import AboutPanelBody from './AboutPanelBody';
import ConstraintsPanelBody from './ConstraintsPanelBody';
import ResearchPanelBody from './ResearchPanelBody';
import DecisionsPanelBody from './DecisionsPanelBody';
import OutcomePanelBody from './OutcomePanelBody';
import styles from './DrCuterusCard.module.css';

const PANEL_BODIES: Partial<Record<string, ComponentType>> = {
  about: AboutPanelBody,
  constraints: ConstraintsPanelBody,
  research: ResearchPanelBody,
  decisions: DecisionsPanelBody,
  outcome: OutcomePanelBody,
};

/* All five cards have their own Figma-authored headline positioned as part of the body
   copy rather than the generic centered heading — those render it themselves, so the
   generic heading is skipped here. */
const CARDS_WITH_CUSTOM_HEADING = new Set(['about', 'constraints', 'research', 'decisions', 'outcome']);

const LAYOUT_TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

export default function DrCuterusPanel({
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
  const isMobile = useIsMobile();
  const { onTouchStart, onTouchEnd } = usePanelSwipe(isMobile, onPrev, onNext);

  return (
    <motion.div
      layoutId={`card-${card.id}`}
      layout="position"
      className={styles.panel}
      transition={{ layout: LAYOUT_TRANSITION }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
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
