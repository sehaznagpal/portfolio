import { useRef, useState } from 'react';
import stampImg from '../../../assets/images/moolroop/original-stamp.png';
import MobileMoolroopPhoneMockup, { type MockupPhase } from './MobileMoolroopPhoneMockup';
import styles from './MobileMoolroopCard.module.css';

/* Mobile counterpart to MoolroopCard, per Figma 539:287. Desktop reveals the
   verification overlay on phone hover; here the same scan/verify sequence is
   triggered by tapping the phone instead. */
export default function MobileMoolroopCard() {
  const [phase, setPhase] = useState<MockupPhase>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleTap() {
    if (phase === 'idle') {
      setPhase('scanning');
      timeoutRef.current = setTimeout(() => setPhase('verified'), 400);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase('idle');
    }
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>
        <span className={styles.titleItalic}>Moolroop </span>
        <span className={styles.titleBold}>App</span>
      </p>

      <div className={styles.tag}>
        Buyer-side mobile app · Self-Initiated project · Figma Prototype
      </div>

      <p className={styles.body}>
        Is a stamp that says &ldquo;original&rdquo; enough for us to trust that a product is
        actually genuine? What if verification used the{' '}
        <span className={styles.bodyBold}>government-allotted identification</span> these products
        already have, built directly into the shopping process, instead of sitting in a database
        several clicks away?
      </p>

      <MobileMoolroopPhoneMockup phase={phase} onTap={handleTap} />

      <p className={styles.vs}>Vs</p>

      <div className={`${styles.stamp} ${phase === 'verified' ? styles.stampDimmed : ''}`}>
        <img src={stampImg} alt="Original stamp" />
      </div>
    </div>
  );
}
