import { useEffect, useRef, useState } from 'react';
import { useSectionScroll } from './useSectionScroll';
import PersistentFrame from './PersistentFrame';
import DetailOverlay from './DetailOverlay';
import ComparisonTable from '../detail/ComparisonTable';
import SitemapView from '../detail/grid/SitemapView';
import HeroSection from './sections/HeroSection';
import ContextSection from './sections/ContextSection';
import ResearchSection from './sections/ResearchSection';
import SolutionSection from './sections/SolutionSection';
import ScreensSection from './sections/ScreensSection';
import CtaSection from './sections/CtaSection';
import styles from './MoolroopScrollytelling.module.css';

type OverlayKind = 'none' | 'comparison' | 'sitemap';

export default function MoolroopScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [overlay, setOverlay] = useState<OverlayKind>('none');
  const { activeIndex, direction } = useSectionScroll(containerRef, overlay !== 'none');

  /* Nothing else in this codebase locks body scroll — needed here since the
     native page must not scroll behind this fixed, translateY-driven track.
     Cleanup restores the previous value, including if useIsMobile() flips
     mid-session and unmounts this branch for the mobile page instead. */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function closeOverlay() {
    setOverlay('none');
  }

  return (
    <div className={styles.root} ref={containerRef}>
      <PersistentFrame activeIndex={activeIndex} direction={direction} />

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateY(calc(${activeIndex} * -100dvh))` }}
        >
          <div className={styles.panel}>
            <HeroSection />
          </div>
          <div className={styles.panel}>
            <ContextSection />
          </div>
          <div className={styles.panel}>
            <ResearchSection onOpenComparison={() => setOverlay('comparison')} />
          </div>
          <div className={styles.panel}>
            <SolutionSection onOpenSitemap={() => setOverlay('sitemap')} />
          </div>
          <div className={styles.panel}>
            <ScreensSection />
          </div>
          <div className={styles.panel}>
            <CtaSection />
          </div>
        </div>
      </div>

      <DetailOverlay open={overlay === 'comparison'} variant="content" onClose={closeOverlay}>
        <ComparisonTable />
      </DetailOverlay>
      <DetailOverlay open={overlay === 'sitemap'} variant="panel" onClose={closeOverlay}>
        <SitemapView onBack={closeOverlay} />
      </DetailOverlay>
    </div>
  );
}
