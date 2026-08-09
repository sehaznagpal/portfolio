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
          <Link to="/case-study/dr-cuterus" className={styles.nextCaseStudy}>
            Next Case Study →
          </Link>
        </div>

        <div className={styles.main}>
          <h1 className={styles.heading}>MoolRoop App</h1>

          <div className={styles.screens}>
            {HERO_SCREENS.map((screen) => (
              <div className={styles.phone} key={screen.alt}>
                <img src={screen.src} alt={screen.alt} />
                <div className={styles.notch} />
              </div>
            ))}
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

        <p className={styles.summary}>
          MoolRoop lets buyers verify a craft&apos;s authenticity without leaving the product page,
          pulling straight from government GI registries instead of a separate database search.
          It&apos;s scoped narrowly on purpose as a test of whether verification can live inside
          browsing.
        </p>
      </div>
    </section>
  );
}
