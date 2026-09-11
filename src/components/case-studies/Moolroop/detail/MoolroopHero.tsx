import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import CursorTooltip from '../../../chrome/CursorTooltip';
import homeScreen from '../../../../assets/images/moolroop/case-study/screens/home.jpg';
import rajasthanScreen from '../../../../assets/images/moolroop/case-study/screens/rajasthan.jpg';
import pashminaProductScreen from '../../../../assets/images/moolroop/case-study/screens/pashmina-product.jpg';
import styles from './MoolroopHero.module.css';

export const PROTOTYPE_URL = 'https://bit.ly/moolroop-casestudy-prototype-sehaz';

export const HERO_SCREENS = [
  { src: homeScreen, alt: 'MoolRoop home screen — Welcome, Sehaz' },
  { src: rajasthanScreen, alt: 'Explore Products — Rajasthan state page' },
  { src: pashminaProductScreen, alt: 'Pashmina Kurta product detail with verification panel' },
];

export default function MoolroopHero() {
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
          <h1 className={styles.heading}>MoolRoop App</h1>

          <div className={styles.screensWrap}>
            <Link
              to="/case-study/designing-against-fraud"
              className={`${styles.navArrow} ${styles.navArrowPrev}`}
              aria-label="Previous case study"
            >
              &lt;
            </Link>
            <div className={styles.screens}>
              {HERO_SCREENS.map((screen) => (
                <div className={styles.phone} key={screen.alt}>
                  <img src={screen.src} alt={screen.alt} />
                  <div className={styles.notch} />
                </div>
              ))}
            </div>
            <Link
              to="/case-study/dr-cuterus"
              className={`${styles.navArrow} ${styles.navArrowNext}`}
              aria-label="Next case study"
            >
              &lt;
            </Link>
          </div>
        </div>

        <a
          className={styles.exploreButton}
          href={PROTOTYPE_URL}
          target="_blank"
          rel="noreferrer"
        >
          Explore Prototype →
        </a>
      </div>
    </section>
  );
}
