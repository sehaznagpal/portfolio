import { usePageMeta } from '../lib/usePageMeta';
import productScreenImage from '../assets/images/moolroop/product-screen.jpg';
import MoolroopHero from '../components/case-studies/Moolroop/detail/MoolroopHero';
import MoolroopCardGrid from '../components/case-studies/Moolroop/detail/grid/MoolroopCardGrid';
import styles from './CaseStudyMoolroopPage.module.css';

export default function CaseStudyMoolroopPage() {
  usePageMeta({
    title: 'MoolRoop App — Case Study | Sehaz Nagpal',
    description:
      'A self-initiated buyer-side mobile app case study exploring whether GI-certified craft authenticity can be verified inside the shopping flow itself, instead of a database several clicks away.',
    image: productScreenImage,
  });

  return (
    <div className={styles.page}>
      <MoolroopHero />
      <MoolroopCardGrid />
    </div>
  );
}
