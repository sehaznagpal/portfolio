import { motion } from 'framer-motion';
import type { CardDef } from './cardData';
import { CARD_POSITIONS } from './cardData';
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
  return (
    <motion.div
      layoutId={`card-${card.id}`}
      layout
      className={styles.card}
      style={CARD_POSITIONS[index]}
      onClick={onOpen}
      transition={{ layout: LAYOUT_TRANSITION }}
      initial={false}
      exit={{ transition: { duration: 0 } }}
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
        <p className={styles.subtitle}>{card.subtitle}</p>
      </motion.div>
    </motion.div>
  );
}
