import MoolroopHero from '../components/case-studies/Moolroop/detail/MoolroopHero';
import MoolroopCardGrid from '../components/case-studies/Moolroop/detail/grid/MoolroopCardGrid';
import styles from './CaseStudyMoolroopPage.module.css';

export default function CaseStudyMoolroopPage() {
  return (
    <div className={styles.page}>
      <MoolroopHero />
      <MoolroopCardGrid />
    </div>
  );
}
