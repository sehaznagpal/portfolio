import laptopScreen from '../../../../../assets/images/dr-cuterus/outcome-laptop-screen.jpg';
import laptopBezel from '../../../../../assets/images/dr-cuterus/laptop-bezel.png';
import phoneScreen from '../../../../../assets/images/dr-cuterus/outcome-phone-screen.jpg';
import phoneBezel from '../../../../../assets/images/dr-cuterus/mockup-phone-bezel.png';
import styles from './OutcomePanelBody.module.css';

export default function OutcomePanelBody() {
  return (
    <>
      <h2 className={styles.heading}>Outcome is a live website</h2>
      <div className={styles.intro}>
        <p>
          The site is live at{' '}
          <a
            className={`${styles.highlight} ${styles.link}`}
            href="https://drcuterus.com"
            target="_blank"
            rel="noreferrer"
          >
            drcuterus.com
          </a>
          , built in Astro alongside a developer collaborator, with me leading design end to end
          and contributing roughly 40% of the actual build, full component styling and at least
          one page coded solo.
        </p>
        <p>
          It runs clean across mobile, tablet, and desktop, holds her tone in both English and
          Hinglish, and still does the job it was built for: patients can book appointments,
          followers land on content that actually looks like her, and brands or organisations
          have a clear page to reach out from. The blog is live and growing, one question at a
          time.
        </p>
      </div>

      <div className={styles.laptop}>
        <img className={styles.laptopBezel} src={laptopBezel} alt="" />
        <div className={styles.laptopScreen}>
          <img src={laptopScreen} alt="Dr Cuterus homepage on desktop — Your Next Door Sexpert" />
        </div>
      </div>

      <div className={styles.phone}>
        <div className={styles.phoneScreen}>
          <img src={phoneScreen} alt="Dr Cuterus site footer — Found something you liked? Let's talk." />
        </div>
        <img className={styles.bezel} src={phoneBezel} alt="" />
      </div>
    </>
  );
}
