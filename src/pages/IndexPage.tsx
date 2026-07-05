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
  1: { content: <MoolroopCard />, viewProjectHref: '/case-study/moolroop', ownsChrome: true },
  2: { content: <DrCuterusCard />, viewProjectHref: '/case-study/dr-cuterus' },
  3: { content: <FraudCard />, viewProjectHref: '/case-study/designing-against-fraud' },
};

function IndexContent() {
  const { view, finishLoading } = useViewState();

  return (
    <ViewportFrame>
      <div className="grid-background" style={{ position: 'absolute', inset: 0 }} />

      <AnimatePresence>
        {view === 'loading' && (
          <motion.div
            key="loader"
            style={{ position: 'absolute', inset: 0, zIndex: 50 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            <Loader onDone={finishLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      {view !== 'loading' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
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
