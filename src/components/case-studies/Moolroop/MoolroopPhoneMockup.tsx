import { AnimatePresence, motion } from 'framer-motion';
import bezelImg from '../../../assets/images/moolroop/phone-bezel.png';
import screenImg from '../../../assets/images/moolroop/product-screen.jpg';
import styles from './MoolroopPhoneMockup.module.css';

export type MockupPhase = 'idle' | 'scanning' | 'verified';

export default function MoolroopPhoneMockup({
  phase,
  onEnter,
  onLeave,
}: {
  phase: MockupPhase;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div className={styles.wrapper} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className={styles.screen}>
        <img src={screenImg} alt="Moolroop product detail screen" />

        <AnimatePresence>
          {phase === 'scanning' && (
            <motion.div
              className={styles.scanline}
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 'verified' && (
            <motion.div
              className={styles.verifiedPanel}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className={styles.verifiedHeader}>✓ VERIFIED</p>
              <hr className={styles.verifiedDivider} />
              <p className={styles.verifiedLine}>
                <span className={styles.verifiedLabel}>GI Tag:</span> KA-2024-0187
              </p>
              <p className={styles.verifiedLine}>
                <span className={styles.verifiedLabel}>Region:</span> Ladakh, J&amp;K
              </p>
              <p className={styles.verifiedLine}>
                <span className={styles.verifiedLabel}>Registered:</span> Changthangi Pashm Wool
              </p>
              <p className={styles.verifiedLine}>
                <span className={styles.verifiedLabel}>Artisan Cluster:</span> Leh Handicrafts
                Co-op
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.bezel}>
        <img src={bezelImg} alt="" />
      </div>
    </div>
  );
}
