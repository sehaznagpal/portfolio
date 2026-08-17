import { Link } from 'react-router-dom';
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
          <h1 className={styles.heading}>MoolRoop App</h1>

          <div className={styles.screens}>
            <Link
              to="/case-study/designing-against-fraud"
              className={`${styles.navArrow} ${styles.navArrowPrev}`}
              aria-label="Previous case study"
            >
              &lt;
            </Link>
            {HERO_SCREENS.map((screen) => (
              <div className={styles.phone} key={screen.alt}>
                <img src={screen.src} alt={screen.alt} />
                <div className={styles.notch} />
              </div>
            ))}
            <Link
              to="/case-study/dr-cuterus"
              className={`${styles.navArrow} ${styles.navArrowNext}`}
              aria-label="Next case study"
            >
              &lt;
            </Link>
          </div>
        </div>

        <p className={styles.caption}>
          Buyer-side mobile application. Self initiated project. Figma Prototype
        </p>

        <a
          className={styles.exploreButton}
          href={PROTOTYPE_URL}
          target="_blank"
          rel="noreferrer"
        >
          Explore Prototype →
        </a>

        <div className={styles.summary}>
          <p className={styles.summaryLine}>
            <span className={styles.summaryLabel}>Problem:</span> No easy way for buyers to verify
            a handicraft&apos;s authenticity without leaving the product page to dig through a
            separate government database.
          </p>
          <p className={styles.summaryLine}>
            <span className={styles.summaryLabel}>Solution:</span> MoolRoop, a buyer-side app that
            embeds GI verification directly into the shopping flow itself, cutting a five-step
            check down to one tap.
          </p>
        </div>
      </div>
    </section>
  );
}
