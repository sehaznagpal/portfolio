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
          <Link to="/case-study/designing-against-fraud" className={styles.nextCaseStudy}>
            Next Case Study →
          </Link>
        </div>

        <div className={styles.main}>
          <h1 className={styles.heading}>Website Design</h1>

          <div className={styles.screens}>
            <div className={styles.screenshot}>
              <img src={homepageScreenshot} alt="Dr Cuterus homepage" />
              <div className={styles.notch} />
            </div>
          </div>
        </div>

        <p className={styles.caption}>Client Project. Design + Partial Frontend Development. Personal Website.</p>

        <a className={styles.exploreButton} href={LIVE_SITE_URL} target="_blank" rel="noreferrer">
          Go to Live Website →
        </a>

        <p className={styles.summary}>
          Went from a scattered online presence to a single live site that books patients,
          showcases content, and handles brand inquiries, without losing the playful,
          science-first tone she&apos;s known for.
        </p>
      </div>
    </section>
  );
}
