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
  /* When true, the card's own content renders its own tabs/about/view-project
     (positioned via its own layout) instead of the shell's shared fixed-position
     chrome — used while migrating cards to Figma's new centered auto-layout
     structure one at a time. */
  ownsChrome?: boolean;
}

/* The tab bar, about link, and view-project button are global to the shell and never
   unmount on tab switch — only the content region crossfades + slides per active tab,
   per the brief's "same grammar, different content" requirement. */
export default function CaseStudyShell({ studies }: { studies: Record<CaseStudyTab, CaseStudyDef> }) {
  const { activeTab } = useViewState();
  const current = studies[activeTab];

  return (
    <div className={styles.shell}>
      {!current.ownsChrome && (
        <>
          <NumberedTabs />
          <AboutLink />
          <ViewProjectButton to={current.viewProjectHref} />
        </>
      )}
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
