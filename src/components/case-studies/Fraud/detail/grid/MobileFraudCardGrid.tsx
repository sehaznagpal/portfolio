import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FraudPanel from './FraudPanel';
import { CARDS } from './cardData';
import styles from './MobileFraudCardGrid.module.css';

/* Plain vertical stack, numeric order (no top/bottom row split — that's a
   desktop-only "controlled scatter" arrangement) and no hover states, since
   touch has no hover. Tapping a card reuses the same FraudPanel used on
   desktop (open/close/prev/next), just triggered by tap instead of click. */
export default function MobileFraudCardGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = openIndex !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [openIndex]);

  return (
    <div className={`${styles.list} grid-background`}>
      {CARDS.map((card, i) => (
        <button type="button" key={card.id} className={styles.card} onClick={() => setOpenIndex(i)}>
          <span className={styles.number}>{card.number}</span>
          <p className={styles.title}>
            {card.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <div className={styles.captionStack}>
            <p className={styles.subtitle}>{card.subtitle}</p>
            {card.tag && <span className={styles.tag}>{card.tag}</span>}
          </div>
        </button>
      ))}

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            key="click-catcher"
            className={styles.clickCatcher}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpenIndex(null)}
          />
        )}
        {openIndex !== null && (
          <FraudPanel
            key={CARDS[openIndex].id}
            card={CARDS[openIndex]}
            onClose={() => setOpenIndex(null)}
            onPrev={() => setOpenIndex((openIndex - 1 + CARDS.length) % CARDS.length)}
            onNext={() => setOpenIndex((openIndex + 1) % CARDS.length)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
