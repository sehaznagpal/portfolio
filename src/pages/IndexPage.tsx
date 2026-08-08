import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsMobile } from '../lib/useIsMobile';
import { usePageMeta } from '../lib/usePageMeta';
import MobileIndexContent from './MobileIndexContent';
import ViewportFrame from '../components/viewport/ViewportFrame';
import Loader from '../components/loader/Loader';
import AboutModalLink from '../components/chrome/AboutModalLink';
import ExploreBeyondLink from '../components/chrome/ExploreBeyondLink';
import AboutModal from '../components/chrome/AboutModal';
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

/* Brief hold between the loader clearing and the hero starting, so the two don't read
   as one abrupt cut. Only applies right after the loader plays; on a normal refresh
   (loader already seen this session) the hero mounts immediately, same as before. */
const REVEAL_PAUSE_MS = 400;

function IndexContent() {
  const { view, finishLoading } = useViewState();
  const cameFromLoader = useRef(view === 'loading').current;
  const [backgroundVisible, setBackgroundVisible] = useState(!cameFromLoader);
  const [heroReady, setHeroReady] = useState(!cameFromLoader);
  const [aboutOpen, setAboutOpen] = useState(false);

  function handleLoaderExitComplete() {
    setBackgroundVisible(true);
    setTimeout(() => setHeroReady(true), REVEAL_PAUSE_MS);
  }

  return (
    <ViewportFrame dark={!backgroundVisible}>
      {/* Soft dissolve: the loader fades out, then (only on the run right after the
          loader) a brief pause lets the grid fade in gently before the hero's existing
          fade-in plays. On a normal refresh backgroundVisible/heroReady already start
          true, so this collapses back to the plain immediate render from before. */}
      <AnimatePresence onExitComplete={handleLoaderExitComplete}>
        {view === 'loading' && (
          <motion.div
            key="loader"
            style={{ position: 'absolute', inset: 0, zIndex: 50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Loader onDone={finishLoading} />
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
          <AboutModalLink onClick={() => setAboutOpen(true)} />
          <ExploreBeyondLink />
          <CardShell front={<Hero />} back={<CaseStudyShell studies={caseStudies} />} />
        </motion.div>
      )}

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </ViewportFrame>
  );
}

export default function IndexPage() {
  const isMobile = useIsMobile();

  usePageMeta({
    title: 'Sehaz Nagpal — UI/UX Designer Portfolio',
    description:
      'Portfolio of Sehaz Nagpal, a UI-UX designer intrigued by why people do what they do — case studies on the MoolRoop app, the Dr Cuterus website, and a behavioural-economics dissertation on payment fraud.',
    image: '/og-image.jpg',
  });

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  return (
    <ViewStateProvider>
      {isMobile ? <MobileIndexContent /> : <IndexContent />}
    </ViewStateProvider>
  );
}
