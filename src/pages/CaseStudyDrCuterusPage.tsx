import DrCuterusHero from '../components/case-studies/DrCuterus/detail/DrCuterusHero';
import DrCuterusCardGrid from '../components/case-studies/DrCuterus/detail/grid/DrCuterusCardGrid';
import styles from './CaseStudyDrCuterusPage.module.css';

export default function CaseStudyDrCuterusPage() {
  return (
    <div className={styles.page}>
      <DrCuterusHero />
      <DrCuterusCardGrid />
    </div>
  );
}
