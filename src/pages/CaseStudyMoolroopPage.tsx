import { usePageMeta } from '../lib/usePageMeta';
import { useIsMobile } from '../lib/useIsMobile';
import productScreenImage from '../assets/images/moolroop/product-screen.jpg';
import MoolroopHero from '../components/case-studies/Moolroop/detail/MoolroopHero';
import MoolroopCardGrid from '../components/case-studies/Moolroop/detail/grid/MoolroopCardGrid';
import MobileMoolroopTopBar from '../components/case-studies/Moolroop/detail/MobileMoolroopTopBar';
import MobileMoolroopHero from '../components/case-studies/Moolroop/detail/MobileMoolroopHero';
import MobileMoolroopCardGrid from '../components/case-studies/Moolroop/detail/grid/MobileMoolroopCardGrid';
import MobileMoolroopStickyCTA from '../components/case-studies/Moolroop/detail/MobileMoolroopStickyCTA';
import styles from './CaseStudyMoolroopPage.module.css';

export default function CaseStudyMoolroopPage() {
  const isMobile = useIsMobile();

  usePageMeta({
    title: 'MoolRoop App: Case Study | Sehaz Nagpal',
    description:
      'A self-initiated buyer-side mobile app case study exploring whether GI-certified craft authenticity can be verified inside the shopping flow itself, instead of a database several clicks away.',
    image: productScreenImage,
  });

  return (
    <div className={isMobile ? styles.page : `${styles.page} ${styles.pageDesktop}`}>
      {isMobile ? (
        <>
          <MobileMoolroopTopBar />
          <MobileMoolroopHero />
          <MobileMoolroopCardGrid />
          <MobileMoolroopStickyCTA />
        </>
      ) : (
        <>
          <MoolroopHero />
          <MoolroopCardGrid />
        </>
      )}
    </div>
  );
}
