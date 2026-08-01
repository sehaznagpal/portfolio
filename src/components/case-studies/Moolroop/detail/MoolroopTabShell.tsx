import { useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './msTypography.css';
import { MOOLROOP_TABS, type MoolroopTabId } from './types';
import PremiseScopeTab from './tabs/PremiseScopeTab';
import ResearchTab from './tabs/ResearchTab';
import DecisionsTab from './tabs/DecisionsTab';
import FlowTab from './tabs/FlowTab';
import ScreensTab from './tabs/ScreensTab';
import ReflectionTab from './tabs/ReflectionTab';
import MoolroopClosingNav from './MoolroopClosingNav';
import styles from './MoolroopTabShell.module.css';

const TAB_CONTENT: Record<MoolroopTabId, ComponentType> = {
  premise: PremiseScopeTab,
  research: ResearchTab,
  decisions: DecisionsTab,
  flow: FlowTab,
  screens: ScreensTab,
  reflection: ReflectionTab,
};

export default function MoolroopTabShell() {
  const [activeTab, setActiveTab] = useState<MoolroopTabId>('premise');
  const ActiveContent = TAB_CONTENT[activeTab];

  return (
    <div className={styles.wrap}>
      <div className={styles.nav}>
        {MOOLROOP_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tabButton} ${tab.id === activeTab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.card}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={styles.cardContent}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <ActiveContent />
          </motion.div>
        </AnimatePresence>
      </div>

      <MoolroopClosingNav />
    </div>
  );
}
