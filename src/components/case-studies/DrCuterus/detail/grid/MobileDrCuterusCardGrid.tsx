import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DrCuterusPanel from './DrCuterusPanel';
import { CARDS } from './cardData';
import styles from './MobileDrCuterusCardGrid.module.css';

const LAYOUT_TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

/* Plain vertical stack, numeric order (no top/bottom row split — that's a
   desktop-only "controlled scatter" arrangement) and no hover states, since
   touch has no hover. Tapping a card reuses the same DrCuterusPanel used on
   desktop (open/close/prev/next), just triggered by tap instead of click. */
export default function MobileDrCuterusCardGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  /* See DrCuterusCardGrid: ±1 while navigating (directional slide), 0 while
     opening/closing (card<->panel morph). Cards only offer their layoutId
     while no panel is open at all — see the layoutId prop below. */
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    document.body.style.overflow = openIndex !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [openIndex]);

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

  return (
    <div className={`${styles.list} grid-background`}>
      {CARDS.map((card, i) =>
        openIndex === i ? null : (
          /* Stable outer button — never remounts, so it never disturbs this
             card's position in the flex list. The inner motion.div carries
             the actual card styling plus the Framer layoutId/layout morph,
             and is keyed on morphEnabled so a live true->false flip (which
             would otherwise leave a stale shared-layout registration behind
             until this card is eventually removed — see DrCuterusCardFace)
             instead gets a clean remount right when it toggles. */
          <button type="button" key={card.id} className={styles.cardButton} onClick={() => handleOpen(i)}>
            <motion.div
              key={openIndex === null ? 'morph' : 'plain'}
              layoutId={openIndex === null ? `card-${card.id}` : undefined}
              layout
              transition={{ layout: LAYOUT_TRANSITION }}
              initial={false}
              className={styles.card}
            >
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
            </motion.div>
          </button>
        ),
      )}

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
          <DrCuterusPanel
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
