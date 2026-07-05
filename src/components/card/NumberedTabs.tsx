import type { CaseStudyTab } from '../../types';
import { useViewState } from '../../state/ViewStateContext';
import styles from './NumberedTabs.module.css';

export default function NumberedTabs({ inline = false }: { inline?: boolean }) {
  const { activeTab, switchTab } = useViewState();
  const tabs: CaseStudyTab[] = [1, 2, 3];

  return (
    <div className={`${styles.tabs} ${inline ? styles.inline : ''}`}>
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
