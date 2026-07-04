import { useState } from 'react';
import { TriangleAlert } from 'lucide-react';
import CardTag from '../../card/CardTag';
import phoneBezelImg from '../../../assets/images/moolroop/phone-bezel.png';
import styles from './FraudCard.module.css';

export default function FraudCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>
        <span className={styles.titleItalic}>Designing Against</span>
        <span className={styles.titleBold}>Fraud</span>
      </p>

      <div className={styles.tagWrapper}>
        <CardTag>
          Behavioural research + interface design · Academic dissertation · UPI Payment
          Simulation
        </CardTag>
      </div>

      <p className={styles.body}>
        India&rsquo;s digital <span className={styles.bodyBold}>fraud losses nearly tripled</span>{' '}
        between 2023 and 2025, and almost every case shares the same root cause: a user authorising
        their own payment. International fixes for this, <span className={styles.bodyBold}>warning banners</span>,
        prominent <span className={styles.bodyBold}>cancel buttons</span>, work well in the UK and
        China, but nobody had tested whether they hold up in India&rsquo;s UPI ecosystem or against
        India&rsquo;s specific fraud types. I ran a{' '}
        <span className={styles.bodyBold}>116-participant experiment</span> on a simulated payment
        user journey I built myself to find out, and the results split sharply by fraud type rather
        than by any single design. This is a mixed-method dissertation testing exactly that.
      </p>

      <div
        className={`${styles.phonePair} ${hovered ? styles.hovered : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
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
