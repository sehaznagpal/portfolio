import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MobileViewportFrame from '../components/viewport/MobileViewportFrame';
import MobileLoader from '../components/loader/MobileLoader';
import MobileWordmark from '../components/chrome/MobileWordmark';
import MobileToolbar from '../components/chrome/MobileToolbar';
import MobileHero from '../components/hero/MobileHero';
import MobileCardShell from '../components/card/MobileCardShell';
import MobileCaseStudyShell, { type MobileCaseStudyDef } from '../components/card/MobileCaseStudyShell';
import MobileMoolroopCard from '../components/case-studies/Moolroop/MobileMoolroopCard';
import MobileDrCuterusCard from '../components/case-studies/DrCuterus/MobileDrCuterusCard';
import MobileFraudCard from '../components/case-studies/Fraud/MobileFraudCard';
import { useViewState } from '../state/ViewStateContext';
import type { CaseStudyTab } from '../types';

const caseStudies: Record<CaseStudyTab, MobileCaseStudyDef> = {
  1: { content: <MobileMoolroopCard />, viewProjectHref: '/case-study/moolroop', viewProjectTop: 222 },
  2: { content: <MobileDrCuterusCard />, viewProjectHref: '/case-study/dr-cuterus', viewProjectTop: 225 },
  3: {
    content: <MobileFraudCard />,
    viewProjectHref: '/case-study/designing-against-fraud',
    viewProjectTop: 235,
  },
};

/* Mobile counterpart to IndexContent — identical loader-then-pause-then-reveal
   sequencing as desktop (see IndexPage.tsx), wired to the mobile-sized components
   instead. Desktop's IndexContent is untouched; this is a fully separate render path
   selected by IndexPage based on useIsMobile(). */
const REVEAL_PAUSE_MS = 400;

export default function MobileIndexContent() {
  const { view, finishLoading } = useViewState();
  const cameFromLoader = useRef(view === 'loading').current;
  const [backgroundVisible, setBackgroundVisible] = useState(!cameFromLoader);
  const [heroReady, setHeroReady] = useState(!cameFromLoader);

  function handleLoaderExitComplete() {
    setBackgroundVisible(true);
    setTimeout(() => setHeroReady(true), REVEAL_PAUSE_MS);
  }

  return (
    <MobileViewportFrame dark={!backgroundVisible}>
      <AnimatePresence onExitComplete={handleLoaderExitComplete}>
        {view === 'loading' && (
          <motion.div
            key="loader"
            style={{ position: 'absolute', inset: 0, zIndex: 50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <MobileLoader onDone={finishLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      {view !== 'loading' && heroReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <MobileWordmark />
          <MobileToolbar />
          <MobileCardShell front={<MobileHero />} back={<MobileCaseStudyShell studies={caseStudies} />} />
        </motion.div>
      )}
    </MobileViewportFrame>
  );
}
