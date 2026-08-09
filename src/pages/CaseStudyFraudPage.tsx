import { usePageMeta } from '../lib/usePageMeta';
import { useIsMobile } from '../lib/useIsMobile';
import payingScreenImage from '../assets/images/fraud/case-study/screens/paying-screen.jpg';
import FraudHero from '../components/case-studies/Fraud/detail/FraudHero';
import FraudCardGrid from '../components/case-studies/Fraud/detail/grid/FraudCardGrid';
import MobileFraudTopBar from '../components/case-studies/Fraud/detail/MobileFraudTopBar';
import MobileFraudHero from '../components/case-studies/Fraud/detail/MobileFraudHero';
import MobileFraudCardGrid from '../components/case-studies/Fraud/detail/grid/MobileFraudCardGrid';
import MobileFraudStickyCTA from '../components/case-studies/Fraud/detail/MobileFraudStickyCTA';
import styles from './CaseStudyFraudPage.module.css';

export default function CaseStudyFraudPage() {
  const isMobile = useIsMobile();

  usePageMeta({
    title: 'Designing Against Fraud: Dissertation Case Study | Sehaz Nagpal',
    description:
      'A behavioural-economics dissertation and randomised controlled trial testing whether redesigned warnings and cancel buttons actually reduce payment fraud in India.',
    image: payingScreenImage,
  });

  return (
    <div className={isMobile ? styles.page : `${styles.page} ${styles.pageDesktop}`}>
      {isMobile ? (
        <>
          <MobileFraudTopBar />
          <MobileFraudHero />
          <MobileFraudCardGrid />
          <MobileFraudStickyCTA />
        </>
      ) : (
        <>
          <FraudHero />
          <FraudCardGrid />
        </>
      )}
    </div>
  );
}
