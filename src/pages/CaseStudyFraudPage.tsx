import FraudHero from '../components/case-studies/Fraud/detail/FraudHero';
import FraudCardGrid from '../components/case-studies/Fraud/detail/grid/FraudCardGrid';
import styles from './CaseStudyFraudPage.module.css';

export default function CaseStudyFraudPage() {
  return (
    <div className={styles.page}>
      <FraudHero />
      <FraudCardGrid />
    </div>
  );
}
