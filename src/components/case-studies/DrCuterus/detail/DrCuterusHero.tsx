import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import CursorTooltip from '../../../chrome/CursorTooltip';
import homepageScreenshot from '../../../../assets/images/dr-cuterus/homepage-screenshot.jpg';
import styles from './DrCuterusHero.module.css';

export const LIVE_SITE_URL = 'https://drcuterus.com';
export { homepageScreenshot };

export default function DrCuterusHero() {
  return (
    <section className={`${styles.hero} grid-background`}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Link to="/" className={styles.portfolio}>
            Sehaz Nagpal
          </Link>
          <div className={styles.exploreZoneWrap}>
            <CursorTooltip text="Playground">
              <Link to="/experiment-zone" className={styles.exploreZone}>
                <span className={styles.exploreZoneFill} aria-hidden="true" />
                <span className={styles.exploreZoneLabel}>
                  More designs &amp; smaller projects{' '}
                  <ArrowUpRight
                    className={styles.arrow}
                    size={18}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </span>
              </Link>
            </CursorTooltip>
          </div>
        </div>

        <div className={styles.main}>
          <h1 className={styles.heading}>Website Design</h1>

          <div className={styles.screensWrap}>
            <Link
              to="/case-study/moolroop"
              className={`${styles.navArrow} ${styles.navArrowPrev}`}
              aria-label="Previous case study"
            >
              &lt;
            </Link>
            <div className={styles.screens}>
              <div className={styles.screenshot}>
                <img src={homepageScreenshot} alt="Dr Cuterus homepage" />
                <div className={styles.notch} />
              </div>
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

        <a className={styles.exploreButton} href={LIVE_SITE_URL} target="_blank" rel="noreferrer">
          Go to Live Website →
        </a>
      </div>
    </section>
  );
}
