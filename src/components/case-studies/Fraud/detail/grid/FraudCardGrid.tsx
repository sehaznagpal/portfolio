import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FraudCardFace from './FraudCardFace';
import FraudPanel from './FraudPanel';
import FraudClosingNav from '../FraudClosingNav';
import { CARDS } from './cardData';
import { useCaseStudyGridScale } from '../../../../../lib/useCaseStudyGridScale';
import styles from './FraudCardGrid.module.css';

export default function FraudCardGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scale = useCaseStudyGridScale(sectionRef);

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
    <div className={`${styles.viewport} grid-background`}>
      <div className={styles.frame}>
        <div className={styles.section} ref={sectionRef}>
          <div className={styles.scaleBox} style={{ transform: `scale(${scale})` }}>
            {CARDS.map((card, i) =>
              openIndex === i ? null : (
                <FraudCardFace key={card.id} card={card} index={i} onOpen={() => setOpenIndex(i)} />
              ),
            )}
          </div>
        </div>

        <div className={styles.navWrap}>
          <FraudClosingNav />
        </div>
      </div>

      {/* Rendered outside the scaled frame: a CSS transform on an ancestor becomes the
          containing block for position:fixed descendants, which would break the panel's
          true-viewport centering (and the click-catcher's full-viewport coverage). */}
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
