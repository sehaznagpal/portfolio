import { Link } from 'react-router-dom';
import { HERO_SCREENS, PROTOTYPE_URL } from './MoolroopHero';
import { useHeroCarousel } from '../../../../lib/useHeroCarousel';
import styles from './MobileMoolroopHero.module.css';

export default function MobileMoolroopHero() {
  const { viewportRef, stripRef, offset, isDragging, handlePointerDown, handlePointerMove, handlePointerUp } =
    useHeroCarousel(HERO_SCREENS.length);

  return (
    <section className={styles.hero}>
      <h1 className={styles.heading}>MoolRoop App</h1>

      <div className={styles.screensViewportWrap}>
        <Link
          to="/case-study/designing-against-fraud"
          className={`${styles.navArrow} ${styles.navArrowPrev}`}
          aria-label="Previous case study"
        >
          &lt;
        </Link>
        <div className={styles.screensViewport} ref={viewportRef}>
          <div
            className={`${styles.screensStrip} ${isDragging ? '' : styles.settling}`}
            ref={stripRef}
            style={{ transform: `translateX(${offset}px)` }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {HERO_SCREENS.map((screen) => (
              <div className={styles.phone} key={screen.alt}>
                <img src={screen.src} alt={screen.alt} draggable={false} />
                <div className={styles.notch} />
              </div>
            ))}
          </div>
        </div>
        <Link
          to="/case-study/dr-cuterus"
          className={`${styles.navArrow} ${styles.navArrowNext}`}
          aria-label="Next case study"
        >
          &lt;
        </Link>
      </div>

      <a className={styles.exploreButton} href={PROTOTYPE_URL} target="_blank" rel="noreferrer">
        Explore Prototype →
      </a>

      <p className={styles.caption}>Buyer-side mobile application. Self initiated project. Figma Prototype.</p>
    </section>
  );
}
