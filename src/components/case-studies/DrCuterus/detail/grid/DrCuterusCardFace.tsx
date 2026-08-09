import { motion } from 'framer-motion';
import type { CardDef } from './cardData';
import { CARD_POSITIONS } from './cardData';
import type { CaseStudyGridScale } from '../../../../../lib/useCaseStudyGridScale';
import styles from './DrCuterusCard.module.css';

const LAYOUT_TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

// Matches .card's own width/height in DrCuterusCard.module.css.
const CARD_W = 252;
const CARD_H = 260;

export default function DrCuterusCardFace({
  card,
  index,
  onOpen,
  contentScale,
  xScale,
  yScale,
}: {
  card: CardDef;
  index: number;
  onOpen: () => void;
} & CaseStudyGridScale) {
  const { dx, dy } = CARD_POSITIONS[index];

  return (
    /* Plain (non-motion) positioner — resize-driven left/top changes apply
       instantly, with no layout animation, exactly like the old ancestor-
       transform approach. Only the inner motion.div (scale + the open/close
       shared-element transition) is Framer-managed. */
    <div
      className={styles.cardPositioner}
      style={{
        left: `calc(50% + ${dx * xScale - CARD_W / 2}px)`,
        top: `calc(50% + ${dy * yScale - CARD_H / 2}px)`,
      }}
    >
      <motion.div
        layoutId={`card-${card.id}`}
        layout="position"
        className={styles.card}
        style={{ scale: contentScale }}
        onClick={onOpen}
        transition={{ layout: LAYOUT_TRANSITION }}
        initial={false}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      >
        <motion.div
          className={styles.cardFace}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.1 } }}
        >
          <p className={styles.title}>
            {card.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <span className={styles.number}>{card.number}</span>
          <div className={styles.captionStack}>
            <p className={styles.subtitle}>{card.subtitle}</p>
            {card.tag && <span className={styles.tag}>{card.tag}</span>}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
