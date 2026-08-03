import PolaroidPhoto from './PolaroidPhoto';
import { MOTIVATION_PHOTOS } from './cardData';
import styles from './MotivationPanelBody.module.css';

export default function MotivationPanelBody() {
  return (
    <>
      <div className={styles.body}>
        <p>
          India has over 400 Geographical Indication certified crafts.{' '}
          <span className={styles.highlight}>
            A GI tag is a government-issued legal certification that ties a product to a specific
            place, a specific process, and a specific community
          </span>{' '}
          of makers, a Kashmiri Pashmina, a Sanganeri block print, a piece of Moradabad metalware.
        </p>
        <p>
          I noticed this gap during a freelance gig writing product descriptions for craft
          sellers. The content I wrote had to come from government-verified databases. Working
          with these, I wondered what if the verified information was embedded into the shopping
          experience itself? A buyer who wanted to check it NOW will have to leave the product
          page, search for the right database, and dig through it separately.{' '}
          <span className={styles.emphasis}>MoolRoop</span> was built to close that gap, bringing
          verification from several clicks away down to one.
        </p>
      </div>

      <div className={styles.photoStrip}>
        {MOTIVATION_PHOTOS.map((photo) => (
          <PolaroidPhoto key={photo.alt} {...photo} />
        ))}
      </div>
    </>
  );
}
