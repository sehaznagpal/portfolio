import { useRef, useState } from 'react';
import CardTag from '../../card/CardTag';
import MoolroopPhoneMockup, { type MockupPhase } from './MoolroopPhoneMockup';
import stampImg from '../../../assets/images/moolroop/original-stamp.png';
import styles from './MoolroopCard.module.css';

export default function MoolroopCard() {
  const [phase, setPhase] = useState<MockupPhase>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    setPhase('scanning');
    timeoutRef.current = setTimeout(() => setPhase('verified'), 400);
  }

  function handleLeave() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPhase('idle');
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>
        <span className={styles.titleItalic}>Moolroop</span>
        <span className={styles.titleBold}>App</span>
      </p>

      <div className={styles.tagWrapper}>
        <CardTag>Buyer-side mobile app · Self-Initiated project · Figma Prototype</CardTag>
      </div>

      <p className={styles.body}>
        Is a stamp that says &ldquo;original&rdquo; enough for us to trust that a product is
        actually genuine? What if verification used the{' '}
        <span className={styles.bodyBold}>government-allotted identification</span> these products
        already have, built directly into the shopping process, instead of sitting in a database
        several clicks away?
      </p>

      <MoolroopPhoneMockup phase={phase} onEnter={handleEnter} onLeave={handleLeave} />

      <p className={styles.vs}>Vs</p>

      <div className={`${styles.stamp} ${phase === 'verified' ? styles.stampDimmed : ''}`}>
        <img src={stampImg} alt="Original stamp" />
      </div>
    </div>
  );
}
