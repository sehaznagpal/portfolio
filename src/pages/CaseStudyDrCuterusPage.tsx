import { usePageMeta } from '../lib/usePageMeta';
import { useIsMobile } from '../lib/useIsMobile';
import homepageScreenshotImage from '../assets/images/dr-cuterus/homepage-screenshot.jpg';
import DrCuterusHero from '../components/case-studies/DrCuterus/detail/DrCuterusHero';
import DrCuterusCardGrid from '../components/case-studies/DrCuterus/detail/grid/DrCuterusCardGrid';
import MobileDrCuterusTopBar from '../components/case-studies/DrCuterus/detail/MobileDrCuterusTopBar';
import MobileDrCuterusHero from '../components/case-studies/DrCuterus/detail/MobileDrCuterusHero';
import MobileDrCuterusCardGrid from '../components/case-studies/DrCuterus/detail/grid/MobileDrCuterusCardGrid';
import MobileDrCuterusStickyCTA from '../components/case-studies/DrCuterus/detail/MobileDrCuterusStickyCTA';
import styles from './CaseStudyDrCuterusPage.module.css';

export default function CaseStudyDrCuterusPage() {
  const isMobile = useIsMobile();

  usePageMeta({
    title: 'Dr Cuterus Website Design — Case Study | Sehaz Nagpal',
    description:
      'Website design case study for Dr Cuterus, a sex educator with millions of followers — one site built to carry patient trust, corporate credibility, and her voice, in English and Hinglish.',
    image: homepageScreenshotImage,
  });

  return (
    <div className={isMobile ? styles.page : `${styles.page} ${styles.pageDesktop}`}>
      {isMobile ? (
        <>
          <MobileDrCuterusTopBar />
          <MobileDrCuterusHero />
          <MobileDrCuterusCardGrid />
          <MobileDrCuterusStickyCTA />
        </>
      ) : (
        <>
          <DrCuterusHero />
          <DrCuterusCardGrid />
        </>
      )}
    </div>
  );
}
