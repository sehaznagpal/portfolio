import { usePageMeta } from '../lib/usePageMeta';
import homepageScreenshotImage from '../assets/images/dr-cuterus/homepage-screenshot.jpg';
import DrCuterusHero from '../components/case-studies/DrCuterus/detail/DrCuterusHero';
import DrCuterusCardGrid from '../components/case-studies/DrCuterus/detail/grid/DrCuterusCardGrid';
import styles from './CaseStudyDrCuterusPage.module.css';

export default function CaseStudyDrCuterusPage() {
  usePageMeta({
    title: 'Dr Cuterus Website Design — Case Study | Sehaz Nagpal',
    description:
      'Website design case study for Dr Cuterus, a sex educator with millions of followers — one site built to carry patient trust, corporate credibility, and her voice, in English and Hinglish.',
    image: homepageScreenshotImage,
  });

  return (
    <div className={styles.page}>
      <DrCuterusHero />
      <DrCuterusCardGrid />
    </div>
  );
}
