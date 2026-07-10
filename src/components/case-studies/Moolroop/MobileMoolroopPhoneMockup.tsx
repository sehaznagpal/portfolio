import { AnimatePresence, motion } from 'framer-motion';
import bezelImg from '../../../assets/images/moolroop/phone-bezel.png';
import screenImg from '../../../assets/images/moolroop/product-screen.jpg';
import styles from './MobileMoolroopPhoneMockup.module.css';

export type MockupPhase = 'idle' | 'scanning' | 'verified';

/* Mobile counterpart to MoolroopPhoneMockup — same scan/verify sequence, triggered by
   tap instead of hover (there's no hover on touch), same visual states. */
export default function MobileMoolroopPhoneMockup({
  phase,
  onTap,
}: {
  phase: MockupPhase;
  onTap: () => void;
}) {
  return (
    <div className={styles.wrapper} onClick={onTap}>
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
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
