import { useState, type ReactNode } from 'react';
import ArticleCardsToggle, { type CaseStudySecondView } from './ArticleCardsToggle';
import styles from './CaseStudySecondSection.module.css';

interface CaseStudySecondSectionProps {
  children: ReactNode;
}

/* Shared shell for every case study's second section: the Article/Cards
   toggle plus a flat brand-light background (no grid — that's the hero's
   signature, not this section's). Cards is the default view; switching to
   Article unmounts `children` (the case study's own five-card grid) rather
   than just hiding it, so its open-panel state can't linger underneath. */
export default function CaseStudySecondSection({ children }: CaseStudySecondSectionProps) {
  const [view, setView] = useState<CaseStudySecondView>('cards');

  return (
    <div className={styles.viewport}>
      <ArticleCardsToggle active={view} onChange={setView} />
      {view === 'cards' ? children : <p className={styles.comingSoon}>Coming soon</p>}
    </div>
  );
}
