import { AnimatePresence, motion } from 'framer-motion';
import type { CardDef } from './cardData';
import { CARD_POSITIONS } from './cardData';
import MotivationPanelBody from './MotivationPanelBody';
import styles from './MoolroopCard.module.css';

const LAYOUT_TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

export default function MoolroopCard({
  card,
  index,
  isOpen,
  onOpen,
  onClose,
  onPrev,
  onNext,
}: {
  card: CardDef;
  index: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const position = CARD_POSITIONS[index];

  return (
    <motion.div
      layout
      className={isOpen ? styles.panel : styles.card}
      style={isOpen ? undefined : position}
      onClick={!isOpen ? onOpen : undefined}
      transition={{ layout: LAYOUT_TRANSITION }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {isOpen ? (
          <motion.div
            key="panel"
            className={styles.panelInner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.22 } }}
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

            <h2 className={styles.panelHeading}>{card.panelHeading}</h2>

            {card.id === 'motivation' ? <MotivationPanelBody /> : null}
          </motion.div>
        ) : (
          <motion.div
            key="face"
            className={styles.cardFace}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <p className={styles.title}>
              {card.titleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <span className={styles.number}>{card.number}</span>
            <p className={styles.subtitle}>{card.subtitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
