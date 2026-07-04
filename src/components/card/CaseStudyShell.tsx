import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CaseStudyTab } from '../../types';
import { useViewState } from '../../state/ViewStateContext';
import NumberedTabs from './NumberedTabs';
import AboutLink from './AboutLink';
import ViewProjectButton from './ViewProjectButton';
import styles from './CaseStudyShell.module.css';

export interface CaseStudyDef {
  content: ReactNode;
  viewProjectHref: string;
}

/* The tab bar, about link, and view-project button are global to the shell and never
   unmount on tab switch — only the content region crossfades + slides per active tab,
   per the brief's "same grammar, different content" requirement. */
export default function CaseStudyShell({ studies }: { studies: Record<CaseStudyTab, CaseStudyDef> }) {
  const { activeTab } = useViewState();
  const current = studies[activeTab];

  return (
    <div className={styles.shell}>
      <NumberedTabs />
      <AboutLink />
      <ViewProjectButton to={current.viewProjectHref} />
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
