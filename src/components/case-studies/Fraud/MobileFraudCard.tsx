import { useState } from 'react';
import { TriangleAlert } from 'lucide-react';
import phoneBezelImg from '../../../assets/images/moolroop/phone-bezel.png';
import styles from './MobileFraudCard.module.css';

/* Mobile counterpart to FraudCard, per Figma 539:1343 (tag copy corrected back to the
   actual desktop text — the Figma mobile frame had a leftover copy-paste of the Dr
   Cuterus tag). Desktop's phone-rotation/glow reveal is hover-triggered; here it's
   triggered by tapping the phone pair instead. */
export default function MobileFraudCard() {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>
        <span className={styles.titleItalic}>Designing Against </span>
        <span className={styles.titleBold}>Fraud</span>
      </p>

      <div className={styles.tag}>
        Behavioural research + interface design · Academic dissertation · UPI Payment Simulation
      </div>

      <p className={styles.body}>
        India&rsquo;s digital <span className={styles.bodyBold}>fraud losses nearly tripled</span>{' '}
        between 2023 and 2025. <span className={styles.bodyBold}>Warning banners</span> and{' '}
        <span className={styles.bodyBold}>prominent cancel buttons</span> already work well
        against it in the UK and China, but do they hold up the same way in India, where both the
        users and the fraud itself look nothing alike?
      </p>

      <div
        className={`${styles.phonePair} ${active ? styles.active : ''}`}
        onClick={() => setActive((a) => !a)}
      >
        <div className={`${styles.phone} ${styles.backPhone}`}>
          <div className={styles.phoneScreen}>
            <div className={styles.alertBanner}>
              <TriangleAlert className={styles.alertIcon} size={10} strokeWidth={2.5} />
              <span className={styles.alertText}>
                Fraudsters may impersonate trusted sources. Please{' '}
                <span className={styles.alertTextBold}>verify</span> before making the payment.
              </span>
            </div>
          </div>
          <div className={styles.phoneBezel}>
            <img src={phoneBezelImg} alt="" />
          </div>
        </div>

        <div className={`${styles.phone} ${styles.frontPhone}`}>
          <div className={`${styles.phoneScreen} ${styles.ctaScreen}`}>
            <div className={styles.ctaButtons}>
              <div className={styles.cancelButton}>
                <span className={styles.cancelButtonLabel}>Cancel Payment</span>
              </div>
              <div className={styles.continueButton}>
                <span className={styles.continueButtonLabel}>Continue anyway</span>
              </div>
            </div>
          </div>
          <div className={styles.phoneBezel}>
            <img src={phoneBezelImg} alt="" />
          </div>
        </div>
      </div>

      <div className={styles.speechBubble}>
        <span className={styles.speechBubbleLabel}>Which performs better?</span>
      </div>
    </div>
  );
}
