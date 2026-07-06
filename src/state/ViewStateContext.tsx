import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CaseStudyTab, ViewState } from '../types';

const LOADER_SEEN_KEY = 'portfolio:loader-seen';

function hasSeenLoader(): boolean {
  try {
    return sessionStorage.getItem(LOADER_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markLoaderSeen(): void {
  try {
    sessionStorage.setItem(LOADER_SEEN_KEY, '1');
  } catch {
    // sessionStorage unavailable (e.g. private browsing) — loader will just replay next visit
  }
}

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
  const [view, setView] = useState<ViewState>(() => (hasSeenLoader() ? 'hero' : 'loading'));
  const [activeTab, setActiveTab] = useState<CaseStudyTab>(1);
  const [flipDirection, setFlipDirection] = useState<1 | -1>(1);

  const value = useMemo<ViewStateContextValue>(
    () => ({
      view,
      activeTab,
      isFlipped: view === 'case-study',
      flipDirection,
      finishLoading: () => {
        markLoaderSeen();
        setView('hero');
      },
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
