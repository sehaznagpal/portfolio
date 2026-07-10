import type { CaseStudyTab } from '../../types';
import { useViewState } from '../../state/ViewStateContext';
import styles from './MobileNumberedTabs.module.css';

/* Mobile counterpart to NumberedTabs — same tab-switching logic, sized/positioned per
   the Figma mobile "numbers" node (shared across all three mobile card frames). */
export default function MobileNumberedTabs() {
  const { activeTab, switchTab } = useViewState();
  const tabs: CaseStudyTab[] = [1, 2, 3];

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            className={`${styles.tab} ${isActive ? styles.active : styles.inactive}`}
            onClick={() => switchTab(tab)}
          >
            <span className={styles.tabLabel}>{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
