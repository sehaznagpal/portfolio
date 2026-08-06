import plushToys from '../../../../../assets/images/dr-cuterus/plush-toys.png';
import styles from './ConstraintsPanelBody.module.css';

export default function ConstraintsPanelBody() {
  return (
    <>
      <h2 className={styles.heading}>What I was working within?</h2>
      <div className={styles.body}>
        <p>
          <span className={styles.highlight}>Multiple audiences, one site.</span> Patients booking
          appointments, followers who just want her content, brands and organisations looking to
          collaborate, workshops to promote. Each needed a clear path in, without the site turning
          into five disconnected pages pretending to be one.
        </p>
        <p>
          <span className={styles.highlight}>No pink, but still hers.</span> She was firm on
          gender-neutral, no default &quot;women&apos;s health&quot; pink. She wanted purple and
          yellow, bright, not muted, which meant building a palette that felt playful without
          tipping into looking unserious for a practising doctor.
        </p>
        <p>
          <span className={styles.highlight}>Credibility and fun, at once.</span> She&apos;s
          quirky and disarming online, but she&apos;s also treating actual patients. The site had
          to hold both without either one undercutting the other.
        </p>
        <p>
          <span className={styles.highlight}>Two languages, one voice.</span> Most of her content
          runs in Hinglish, but a chunk of her audience is fully global or from parts of India
          where Hindi isn&apos;t the default. The site needed to speak both without feeling like a
          translation of itself.
        </p>
      </div>

      <div className={styles.plush}>
        <img src={plushToys} alt="Uterus and organ-shaped plush toys" />
      </div>
    </>
  );
}
