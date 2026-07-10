import type { ReactNode } from 'react';
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
      own body copy (222 / 225 / 207), unlike desktop's single fixed position. */
  viewProjectTop: number;
}

/* Mobile counterpart to CaseStudyShell — identical tab bar / about link / view-project
   button / crossfade logic, mobile-sized chrome. */
export default function MobileCaseStudyShell({
  studies,
}: {
  studies: Record<CaseStudyTab, MobileCaseStudyDef>;
}) {
  const { activeTab } = useViewState();
  const current = studies[activeTab];

  return (
    <div className={styles.shell}>
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
