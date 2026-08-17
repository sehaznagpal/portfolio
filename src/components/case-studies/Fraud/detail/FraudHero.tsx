import { Link } from 'react-router-dom';
import payingScreen from '../../../../assets/images/fraud/case-study/screens/paying-screen.jpg';
import pinWarningScreen from '../../../../assets/images/fraud/case-study/screens/pin-warning-screen.jpg';
import confirmationScreen from '../../../../assets/images/fraud/case-study/screens/confirmation-screen.jpg';
import styles from './FraudHero.module.css';

export const PROTOTYPE_URL = 'https://bit.ly/dissertation-experiment-prototype';
export const DISSERTATION_URL =
  'https://drive.google.com/file/d/1T56QgmpiWvsrGIZ_S_NUWQY2uyhiHzYm/view?usp=share_link';

export const HERO_SCREENS = [
  { src: payingScreen, alt: 'Paying Delhi Traffic Police — payment screen' },
  { src: pinWarningScreen, alt: 'Enter PIN screen with fraud warning banner' },
  { src: confirmationScreen, alt: 'Payment confirmed screen' },
];

export default function FraudHero() {
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
          <h1 className={styles.heading}>Dissertation</h1>

          <div className={styles.screens}>
            <Link
              to="/case-study/dr-cuterus"
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
              to="/case-study/moolroop"
              className={`${styles.navArrow} ${styles.navArrowNext}`}
              aria-label="Next case study"
            >
              &lt;
            </Link>
          </div>
        </div>

        <p className={styles.caption}>Research Project. Randomised Controlled Trials. Study on Fraud.</p>

        <div className={styles.buttons}>
          <a className={styles.exploreButton} href={PROTOTYPE_URL} target="_blank" rel="noreferrer">
            Explore Prototype →
          </a>
          <a className={styles.exploreButton} href={DISSERTATION_URL} target="_blank" rel="noreferrer">
            Read Dissertation →
          </a>
        </div>

        <div className={styles.summary}>
          <p className={styles.summaryLine}>
            <span className={styles.summaryLabel}>Question:</span> Does redesigning a payment
            screen&apos;s choice architecture actually influence whether people fall for fraud?
          </p>
          <p className={styles.summaryLine}>
            <span className={styles.summaryLabel}>Answer:</span> A simulated UPI payment app
            (experiment) testing three interventions across three scam types on 116 participants,
            showing choice architecture works, but not evenly across every kind of fraud.
          </p>
        </div>
      </div>
    </section>
  );
}
