import { HERO_SCREENS, PROTOTYPE_URL, DISSERTATION_URL } from './FraudHero';
import { useHeroCarousel } from '../../../../lib/useHeroCarousel';
import styles from './MobileFraudHero.module.css';

export default function MobileFraudHero() {
  const { viewportRef, stripRef, offset, isDragging, handlePointerDown, handlePointerMove, handlePointerUp } =
    useHeroCarousel(HERO_SCREENS.length);

  return (
    <section className={styles.hero}>
      <h1 className={styles.heading}>Dissertation</h1>

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

      <div className={styles.buttons}>
        <a className={styles.exploreButton} href={PROTOTYPE_URL} target="_blank" rel="noreferrer">
          Explore Prototype →
        </a>
        <a className={styles.exploreButton} href={DISSERTATION_URL} target="_blank" rel="noreferrer">
          Read Dissertation →
        </a>
      </div>

      <p className={styles.caption}>Research Project. Randomised Controlled Trials. Study on Fraud.</p>
    </section>
  );
}
