import { Link } from 'react-router-dom';
import homepageScreenshot from '../../../../assets/images/dr-cuterus/homepage-screenshot.jpg';
import styles from './DrCuterusHero.module.css';

export const LIVE_SITE_URL = 'https://drcuterus.com';
export { homepageScreenshot };

export default function DrCuterusHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Link to="/" className={styles.portfolio}>
            Portfolio
          </Link>
          <Link to="/experiment-zone" className={styles.exploreZone}>
            Explore Experiment Zone →
          </Link>
        </div>

        <div className={styles.main}>
          <h1 className={styles.heading}>Website Design</h1>

          <div className={styles.screens}>
            <Link
              to="/case-study/moolroop"
              className={`${styles.navArrow} ${styles.navArrowPrev}`}
              aria-label="Previous case study"
            >
              &lt;
            </Link>
            <div className={styles.screenshot}>
              <img src={homepageScreenshot} alt="Dr Cuterus homepage" />
              <div className={styles.notch} />
            </div>
            <Link
              to="/case-study/designing-against-fraud"
              className={`${styles.navArrow} ${styles.navArrowNext}`}
              aria-label="Next case study"
            >
              &lt;
            </Link>
          </div>
        </div>

        <p className={styles.caption}>Client Project. Design + Partial Frontend Development. Personal Website.</p>

        <a className={styles.exploreButton} href={LIVE_SITE_URL} target="_blank" rel="noreferrer">
          Go to Live Website →
        </a>

        <div className={styles.summary}>
          <p className={styles.summaryLine}>
            <span className={styles.summaryLabel}>Problem:</span> No single, on-brand home for Dr.
            Cuterus&apos;s patients, followers, and brand collaborators, just a scattered presence
            spread across platforms.
          </p>
          <p className={styles.summaryLine}>
            <span className={styles.summaryLabel}>Solution:</span> A custom website in her own
            voice: purple and yellow, bilingual, built around to act as a single place for
            audiences.
          </p>
        </div>
      </div>
    </section>
  );
}
