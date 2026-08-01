import MoolroopHero from '../components/case-studies/Moolroop/detail/MoolroopHero';
import MoolroopTabShell from '../components/case-studies/Moolroop/detail/MoolroopTabShell';
import styles from './CaseStudyMoolroopPage.module.css';

export default function CaseStudyMoolroopPage() {
  return (
    <div className={styles.page}>
      <MoolroopHero />
      <MoolroopTabShell />
    </div>
  );
}
