import { motion } from 'framer-motion';
import type { CardDef } from './cardData';
import { CARD_POSITIONS, GRID_FRAME_W, GRID_FRAME_H } from './cardData';
import styles from './FraudCard.module.css';

const LAYOUT_TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

export default function FraudCardFace({
  card,
  index,
  onOpen,
}: {
  card: CardDef;
  index: number;
  onOpen: () => void;
}) {
  const { dx, dy } = CARD_POSITIONS[index];

  return (
    /* Plain (non-motion) positioner, as a % of .canvas (see
       FraudCardGrid.module.css) — resize-driven left/top changes apply
       instantly, with no layout animation, exactly like before. Only the
       inner motion.div (the open/close shared-element transition) is
       Framer-managed; there's no JS-computed scale left to apply to it. */
    <div
      className={styles.cardPositioner}
      style={{
        left: `calc(50% + ${(dx / GRID_FRAME_W) * 100}%)`,
        top: `calc(50% + ${(dy / GRID_FRAME_H) * 100}%)`,
      }}
    >
      <motion.div
        layoutId={`card-${card.id}`}
        layout="position"
        className={styles.card}
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
