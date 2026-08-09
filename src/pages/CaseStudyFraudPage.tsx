import { usePageMeta } from '../lib/usePageMeta';
import payingScreenImage from '../assets/images/fraud/case-study/screens/paying-screen.jpg';
import FraudHero from '../components/case-studies/Fraud/detail/FraudHero';
import FraudCardGrid from '../components/case-studies/Fraud/detail/grid/FraudCardGrid';
import styles from './CaseStudyFraudPage.module.css';

export default function CaseStudyFraudPage() {
  usePageMeta({
    title: 'Designing Against Fraud: Dissertation Case Study | Sehaz Nagpal',
    description:
      'A behavioural-economics dissertation and randomised controlled trial testing whether redesigned warnings and cancel buttons actually reduce payment fraud in India.',
    image: payingScreenImage,
  });

  return (
    <div className={styles.page}>
      <FraudHero />
      <FraudCardGrid />
    </div>
  );
}
