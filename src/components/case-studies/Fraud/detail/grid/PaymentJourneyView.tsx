import { useEffect, useState } from 'react';
import moneyTransferScreen from '../../../../../assets/images/fraud/case-study/payment-journey/money-transfer.jpg';
import selectAccountScreen from '../../../../../assets/images/fraud/case-study/payment-journey/select-account.jpg';
import selectAccountCtaScreen from '../../../../../assets/images/fraud/case-study/payment-journey/select-account-cta.jpg';
import pinScreen from '../../../../../assets/images/fraud/case-study/payment-journey/pin.jpg';
import pinWarningScreen from '../../../../../assets/images/fraud/case-study/payment-journey/pin-warning.jpg';
import transferringScreen from '../../../../../assets/images/fraud/case-study/payment-journey/transferring.jpg';
import successScreen from '../../../../../assets/images/fraud/case-study/payment-journey/success.jpg';
import phoneBezel from '../../../../../assets/images/fraud/case-study/payment-journey/phone-bezel.png';
import connectorTop from '../../../../../assets/images/fraud/case-study/payment-journey/connector-top.svg';
import connectorBottom from '../../../../../assets/images/fraud/case-study/payment-journey/connector-bottom.svg';
import styles from './PaymentJourneyView.module.css';

const AUTO_ADVANCE_MS = 6500;

const GROUPS = ['Control', 'Warning', 'CTA'] as const;

const PHONE_LEFT = ['3.922%', '22.444%', '40.966%', '59.488%', '78.011%'];

const CONNECTORS: { left: string; variant: 'top' | 'bottom' }[] = [
  { left: '13.116%', variant: 'top' },
  { left: '32.165%', variant: 'bottom' },
  { left: '50.665%', variant: 'top' },
  { left: '70.204%', variant: 'bottom' },
];

/* Three independent 5-step flows (Control / Warning / CTA), not one row with two
   swappable slots — steps 1, 4, and 5 just happen to share the same screenshot
   across all three groups, and step 3 (PIN) only diverges for Warning while step 2
   (account select) only diverges for CTA. */
function screensForGroup(group: number) {
  return [
    moneyTransferScreen,
    group === 2 ? selectAccountCtaScreen : selectAccountScreen,
    group === 1 ? pinWarningScreen : pinScreen,
    transferringScreen,
    successScreen,
  ];
}

export default function PaymentJourneyView({ onBack }: { onBack: () => void }) {
  const [group, setGroup] = useState(0);
  const screens = screensForGroup(group);

  useEffect(() => {
    const id = setTimeout(() => setGroup((i) => (i + 1) % GROUPS.length), AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [group]);

  const goPrev = () => setGroup((i) => (i - 1 + GROUPS.length) % GROUPS.length);
  const goNext = () => setGroup((i) => (i + 1) % GROUPS.length);

  return (
    <>
      <h2 className={styles.heading}>Flow of a {GROUPS[group]} Group Participant</h2>
      <button type="button" className={styles.goBack} onClick={onBack}>
        ←Go Back
      </button>

      <div className={styles.navDots}>
        {GROUPS.map((label, i) => (
          <button
            key={label}
            type="button"
            className={`${styles.navDot} ${i === group ? styles.navDotActive : ''}`}
            onClick={() => setGroup(i)}
            aria-label={`Show ${label} group`}
            aria-pressed={i === group}
          />
        ))}
      </div>

      <button type="button" className={`${styles.sideButton} ${styles.sideButtonLeft}`} onClick={goPrev} aria-label="Previous group">
        ‹
      </button>
      <button type="button" className={`${styles.sideButton} ${styles.sideButtonRight}`} onClick={goNext} aria-label="Next group">
        ›
      </button>

      <div className={styles.phones}>
        {screens.map((src, i) => (
          <div className={styles.phone} key={i} style={{ left: PHONE_LEFT[i] }}>
            <div className={styles.phoneScreen}>
              <img src={src} alt={`Step ${i + 1} of the ${GROUPS[group]} group payment flow`} />
            </div>
            <img className={styles.bezel} src={phoneBezel} alt="" />
          </div>
        ))}

        {CONNECTORS.map((c, i) => (
          <div
            key={i}
            className={`${styles.connector} ${c.variant === 'top' ? styles.connectorTop : styles.connectorBottom}`}
            style={{ left: c.left }}
          >
            <img src={c.variant === 'top' ? connectorTop : connectorBottom} alt="" />
          </div>
        ))}
      </div>
    </>
  );
}
