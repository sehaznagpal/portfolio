import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ViewportFrame from '../components/viewport/ViewportFrame';
import Loader from '../components/loader/Loader';
import Wordmark from '../components/chrome/Wordmark';
import Toolbar from '../components/chrome/Toolbar';
import Hero from '../components/hero/Hero';
import CardShell from '../components/card/CardShell';
import CaseStudyShell, { type CaseStudyDef } from '../components/card/CaseStudyShell';
import MoolroopCard from '../components/case-studies/Moolroop/MoolroopCard';
import DrCuterusCard from '../components/case-studies/DrCuterus/DrCuterusCard';
import FraudCard from '../components/case-studies/Fraud/FraudCard';
import { ViewStateProvider, useViewState } from '../state/ViewStateContext';
import type { CaseStudyTab } from '../types';

const caseStudies: Record<CaseStudyTab, CaseStudyDef> = {
  1: { content: <MoolroopCard />, viewProjectHref: '/case-study/moolroop' },
  2: { content: <DrCuterusCard />, viewProjectHref: '/case-study/dr-cuterus' },
  3: { content: <FraudCard />, viewProjectHref: '/case-study/designing-against-fraud' },
};

function IndexContent() {
  const { view, finishLoading } = useViewState();

  return (
    <ViewportFrame dark={view === 'loading'}>
      {/* Loader exits as a curtain lift (transform-only, GPU-cheap) rather than a plain
          fade, and the hero begins its own reveal underneath before the curtain finishes
          clearing, so the two motions overlap into one continuous gesture instead of a
          sequential cut. Both share the same "expo-out" curve for a unified, premium feel. */}
      <AnimatePresence>
        {view === 'loading' && (
          <motion.div
            key="loader"
            style={{ position: 'absolute', inset: 0, zIndex: 50 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Loader onDone={finishLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      {view !== 'loading' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Wordmark />
          <Toolbar />
          <CardShell front={<Hero />} back={<CaseStudyShell studies={caseStudies} />} />
        </motion.div>
      )}
    </ViewportFrame>
  );
}

export default function IndexPage() {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  return (
    <ViewStateProvider>
      <IndexContent />
    </ViewStateProvider>
  );
}
