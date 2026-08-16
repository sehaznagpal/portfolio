import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MoolroopCardFace from './MoolroopCardFace';
import MoolroopPanel from './MoolroopPanel';
import MoolroopClosingNav from '../MoolroopClosingNav';
import { CARDS } from './cardData';
import styles from './MoolroopCardGrid.module.css';

export default function MoolroopCardGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  /* ±1 while navigating to the next/previous card (drives MoolroopPanel's
     directional slide); 0 while opening/closing (drives its card<->panel
     morph instead). Cards only ever offer their layoutId for the morph while
     no panel is open at all (see morphEnabled below), so a card can never be
     mistaken for the panel's shared-element partner mid-nav. */
  const [direction, setDirection] = useState(0);

  const handleOpen = useCallback((i: number) => {
    setDirection(0);
    setOpenIndex(i);
  }, []);
  const handleClose = useCallback(() => {
    setDirection(0);
    setOpenIndex(null);
  }, []);
  const handleNext = useCallback(() => {
    setDirection(1);
    setOpenIndex((i) => (i === null ? i : (i + 1) % CARDS.length));
  }, []);
  const handlePrev = useCallback(() => {
    setDirection(-1);
    setOpenIndex((i) => (i === null ? i : (i - 1 + CARDS.length) % CARDS.length));
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [openIndex, handleClose, handleNext, handlePrev]);

  return (
    <div className={`${styles.viewport} grid-background`}>
      <div className={styles.frame}>
        <div className={styles.section}>
          <div className={styles.canvas}>
            {CARDS.map((card, i) =>
              openIndex === i ? null : (
                <MoolroopCardFace
                  key={card.id}
                  card={card}
                  index={i}
                  onOpen={() => handleOpen(i)}
                  morphEnabled={openIndex === null}
                />
              ),
            )}
          </div>
        </div>

        <div className={styles.navWrap}>
          <MoolroopClosingNav />
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
            onClick={handleClose}
          />
        )}
        {openIndex !== null && (
          <MoolroopPanel
            key={CARDS[openIndex].id}
            card={CARDS[openIndex]}
            direction={direction}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
