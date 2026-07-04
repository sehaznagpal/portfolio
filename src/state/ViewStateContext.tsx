import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CaseStudyTab, ViewState } from '../types';

interface ViewStateContextValue {
  view: ViewState;
  activeTab: CaseStudyTab;
  isFlipped: boolean;
  flipDirection: 1 | -1;
  finishLoading: () => void;
  goToCaseStudy: (tab: CaseStudyTab) => void;
  switchTab: (tab: CaseStudyTab) => void;
  goToHero: () => void;
}

const ViewStateContext = createContext<ViewStateContextValue | null>(null);

export function ViewStateProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ViewState>('loading');
  const [activeTab, setActiveTab] = useState<CaseStudyTab>(1);
  const [flipDirection, setFlipDirection] = useState<1 | -1>(1);

  const value = useMemo<ViewStateContextValue>(
    () => ({
      view,
      activeTab,
      isFlipped: view === 'case-study',
      flipDirection,
      finishLoading: () => setView('hero'),
      goToCaseStudy: (tab: CaseStudyTab) => {
        setFlipDirection(1);
        setActiveTab(tab);
        setView('case-study');
      },
      switchTab: (tab: CaseStudyTab) => setActiveTab(tab),
      goToHero: () => {
        setFlipDirection(-1);
        setView('hero');
      },
    }),
    [view, activeTab, flipDirection],
  );

  return <ViewStateContext.Provider value={value}>{children}</ViewStateContext.Provider>;
}

export function useViewState() {
  const ctx = useContext(ViewStateContext);
  if (!ctx) {
    throw new Error('useViewState must be used within a ViewStateProvider');
  }
  return ctx;
}
