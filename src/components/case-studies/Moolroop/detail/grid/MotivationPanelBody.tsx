import PolaroidPhoto from './PolaroidPhoto';
import { MOTIVATION_PHOTOS } from './cardData';
import styles from './MotivationPanelBody.module.css';

export default function MotivationPanelBody() {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.qaBlock}>
          <p className={styles.qLabel}>Why the need?</p>
          <p className={styles.qAnswer}>
            Buyers have no easy way to verify a craft is genuine without leaving the product page
            to dig through a separate database.
          </p>
        </div>
        <div className={styles.qaBlock}>
          <p className={styles.qLabel}>What is a GI tag?</p>
          <p className={styles.qAnswer}>
            A <span className={styles.highlight}>government-issued</span> legal certification
            that ties a product to a specific place, process, and community of makers, a
            Kashmiri Pashmina, a Sanganeri block print, a piece of Moradabad metalware. India has
            over 400 GI-certified crafts.
          </p>
        </div>
        <div className={styles.qaBlock}>
          <p className={styles.qLabel}>How I came across this</p>
          <p className={styles.qAnswer}>
            I noticed the gap during a freelance gig writing product descriptions for craft
            sellers, sourced from government-verified databases. That&apos;s when I wondered:
            what if this verified information lived inside the shopping experience itself?
            MoolRoop was built to close that gap, bringing verification{' '}
            <span className={styles.highlight}>from several clicks away down to one</span>.
          </p>
        </div>
      </div>

      <div className={styles.photoStrip}>
        {MOTIVATION_PHOTOS.map((photo) => (
          <PolaroidPhoto key={photo.alt} {...photo} />
        ))}
      </div>
    </>
  );
}
