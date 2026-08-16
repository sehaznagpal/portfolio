import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import type { CardDef } from './cardData';
import { useIsMobile } from '../../../../../lib/useIsMobile';
import { usePanelSwipe } from '../../../../../lib/usePanelSwipe';
import TopicPanelBody from './TopicPanelBody';
import MethodologyPanelBody from './MethodologyPanelBody';
import ProcessProgressPanelBody from './ProcessProgressPanelBody';
import ResearchDesignPanelBody from './ResearchDesignPanelBody';
import ResultsOutcomesPanelBody from './ResultsOutcomesPanelBody';
import styles from './FraudCard.module.css';

const PANEL_BODIES: Partial<Record<string, ComponentType>> = {
  topic: TopicPanelBody,
  methodology: MethodologyPanelBody,
  process: ProcessProgressPanelBody,
  design: ResearchDesignPanelBody,
  results: ResultsOutcomesPanelBody,
};

/* Topic, Methodology, Process & Progress, Research Design, and Results & Outcomes have
   their own Figma-authored headline positioned as part of the body copy rather than the
   generic centered heading — those render it themselves, so the generic heading is
   skipped here. */
const CARDS_WITH_CUSTOM_HEADING = new Set(['topic', 'methodology', 'process', 'design', 'results']);

const LAYOUT_TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };
const NAV_EASE = [0.22, 1, 0.36, 1] as const;

export default function FraudPanel({
  card,
  direction = 0,
  onClose,
  onPrev,
  onNext,
}: {
  card: CardDef;
  direction?: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const isMobile = useIsMobile();
  const { onTouchStart, onTouchEnd } = usePanelSwipe(isMobile, onPrev, onNext);
  const isNavigating = direction !== 0;

  return (
    <motion.div
      /* This instance always remounts fresh per card (see the CardGrid's
         key={card.id} on this component), so reading isNavigating here is
         always a fresh-mount read, never a live prop flip on an
         already-mounted node — unlike FraudCardFace, there's no risk of
         leaving a stale shared-layout registration behind. Suppressing
         layoutId while navigating is what keeps this a plain directional
         slide instead of a card<->panel morph; it's restored for the
         open/close mount so those still get the shared-element transition. */
      layoutId={`card-${card.id}`}
      layout
      className={styles.panel}
      transition={{ layout: LAYOUT_TRANSITION }}
      initial={isNavigating ? { x: direction * 48, opacity: 0 } : false}
      animate={
        isNavigating ? { x: 0, opacity: 1, transition: { duration: 0.28, ease: NAV_EASE } } : undefined
      }
      exit={
        isNavigating
          ? { x: direction * -48, opacity: 0, transition: { duration: 0.22, ease: NAV_EASE } }
          : { opacity: 0, transition: { duration: 0.15 } }
      }
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
        initial={isNavigating ? false : { opacity: 0 }}
        animate={isNavigating ? { opacity: 1 } : { opacity: 1, transition: { duration: 0.3, delay: 0.22 } }}
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
