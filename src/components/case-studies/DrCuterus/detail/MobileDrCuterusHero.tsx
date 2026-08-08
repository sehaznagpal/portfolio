import { homepageScreenshot, LIVE_SITE_URL } from './DrCuterusHero';
import { useHeroCarousel } from '../../../../lib/useHeroCarousel';
import styles from './MobileDrCuterusHero.module.css';

export default function MobileDrCuterusHero() {
  const { viewportRef, stripRef, offset, isDragging, handlePointerDown, handlePointerMove, handlePointerUp } =
    useHeroCarousel(3);

  return (
    <section className={styles.hero}>
      <h1 className={styles.heading}>Website Design</h1>

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
          <div className={styles.screenshot}>
            <img src={homepageScreenshot} alt="Dr Cuterus homepage" draggable={false} />
            <div className={styles.notch} />
          </div>
        </div>
      </div>

      <a className={styles.exploreButton} href={LIVE_SITE_URL} target="_blank" rel="noreferrer">
        Go to Live Website →
      </a>

      <p className={styles.caption}>Client Project. Design + Partial Frontend Development. Personal Website.</p>
    </section>
  );
}
