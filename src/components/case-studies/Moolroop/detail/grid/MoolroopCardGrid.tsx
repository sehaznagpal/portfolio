import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MoolroopCard from './MoolroopCard';
import MoolroopClosingNav from '../MoolroopClosingNav';
import { CARDS } from './cardData';
import styles from './MoolroopCardGrid.module.css';

export default function MoolroopCardGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i === null ? i : (i + 1) % CARDS.length));
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i === null ? i : (i - 1 + CARDS.length) % CARDS.length));
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [openIndex]);

  return (
    <div className={`${styles.wrapper} grid-background`}>
      <div className={styles.section}>
        <AnimatePresence>
          {openIndex !== null && (
            <motion.div
              className={styles.clickCatcher}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpenIndex(null)}
            />
          )}
        </AnimatePresence>

        {CARDS.map((card, i) => (
          <MoolroopCard
            key={card.id}
            card={card}
            index={i}
            isOpen={openIndex === i}
            onOpen={() => setOpenIndex(i)}
            onClose={() => setOpenIndex(null)}
            onPrev={() => setOpenIndex((i - 1 + CARDS.length) % CARDS.length)}
            onNext={() => setOpenIndex((i + 1) % CARDS.length)}
          />
        ))}

        <div className={styles.navWrap}>
          <MoolroopClosingNav />
        </div>
      </div>
    </div>
  );
}
