import type { ReactNode, TouchEvent } from 'react';
import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CaseStudyTab } from '../../types';
import { useViewState } from '../../state/ViewStateContext';
import MobileNumberedTabs from './MobileNumberedTabs';
import MobileAboutLink from './MobileAboutLink';
import MobileViewProjectButton from './MobileViewProjectButton';
import styles from './MobileCaseStudyShell.module.css';

export interface MobileCaseStudyDef {
  content: ReactNode;
  viewProjectHref: string;
  /** Figma positions this button slightly differently per card to clear that card's
      own body copy, unlike desktop's single fixed position — a % of the mobile
      case-study face's 527px height (see MobileIndexContent.tsx). */
  viewProjectTop: number;
}

/* A swipe needs to clear both a minimum distance and a minimum speed — distance
   alone would make a slow scroll-ish drag mid-card mistakenly change tabs. */
const SWIPE_DISTANCE = 48;
const SWIPE_MAX_DURATION_MS = 600;

/* Mobile counterpart to CaseStudyShell — identical tab bar / about link / view-project
   button / crossfade logic, mobile-sized chrome. Adds horizontal swipe-to-switch on
   top of that (desktop keeps click-only numbered tabs) via plain touchstart/touchend
   tracking — nothing visually follows the finger, so normal scrolling/taps inside the
   card are untouched; the tab change itself still runs through the existing crossfade. */
export default function MobileCaseStudyShell({
  studies,
}: {
  studies: Record<CaseStudyTab, MobileCaseStudyDef>;
}) {
  const { activeTab, switchTab } = useViewState();
  const current = studies[activeTab];
  const touchStart = useRef<{ x: number; time: number } | null>(null);

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, time: Date.now() };
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const elapsed = Date.now() - start.time;
    if (Math.abs(dx) < SWIPE_DISTANCE || elapsed > SWIPE_MAX_DURATION_MS) return;

    if (dx < 0 && activeTab < 3) {
      switchTab((activeTab + 1) as CaseStudyTab);
    } else if (dx > 0 && activeTab > 1) {
      switchTab((activeTab - 1) as CaseStudyTab);
    }
  }

  return (
    <div className={styles.shell} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <MobileNumberedTabs />
      <MobileAboutLink />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          style={{ position: 'absolute', inset: 0 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
        >
          <MobileViewProjectButton to={current.viewProjectHref} top={current.viewProjectTop} />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className={styles.contentArea}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
        >
          {current.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
