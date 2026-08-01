import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StickyNote from '../StickyNote';
import giTag from '../../../../../assets/images/moolroop/case-study/gi-tag.png';
import styles from './PremiseScopeTab.module.css';

export default function PremiseScopeTab() {
  const [giHovered, setGiHovered] = useState(false);

  return (
    <div className={styles.tab}>
      <div className={styles.intro}>
        <h2 className="ms-heading">Making authenticity as easy to verify as price</h2>
        <div className="ms-body">
          <p>
            India has over 400 Geographical Indication (GI) certified crafts. A{' '}
            <span
              className={styles.giTag}
              onMouseEnter={() => setGiHovered(true)}
              onMouseLeave={() => setGiHovered(false)}
            >
              GI tag
              <AnimatePresence>
                {giHovered && (
                  <motion.span
                    className={styles.giPopover}
                    initial={{ opacity: 0, scale: 0.94, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -6 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  >
                    <img src={giTag} alt="Invaluable Treasures of Incredible India — GI emblem" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>{' '}
            is a government-issued legal certification that ties a product to a specific place, a
            specific process, and a specific community of makers. Yet most shoppers never use them
            because the <span className={styles.deemphasisItalic}>information is fragmented</span>,{' '}
            <span className={styles.deemphasis}>difficult to access</span> and{' '}
            <span className={styles.deemphasis}>disconnected</span> from the buying journey.
          </p>
          <p>
            MoolRoop explores how this verification process could become part of shopping itself
            by summarising official records, providing one-tap access to the original registry,
            and helping buyers make more informed purchasing decisions.
          </p>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.scope}>
          <h3 className="ms-heading">Scope of this project</h3>
          <div className="ms-body">
            <p>
              MoolRoop is scoped as a buyer-side experience. Deliberately out of scope for this
              version:
            </p>
            <ol className="ms-list">
              <li>No login or accounts.</li>
              <li>
                No checkout. (The product demonstrates the discovery-to-verification journey, not
                a full commerce stack.)
              </li>
              <li>No seller-side flows.</li>
            </ol>
          </div>
        </div>

        <StickyNote variant="red" rotate={-2} className={styles.goalNote}>
          <p className={styles.goalTitle}>
            Design
            <br />
            goal
          </p>
          <p className={styles.goalBody}>
            Reduce the effort required to verify authenticity without replacing the official
            source.
          </p>
        </StickyNote>
      </div>
    </div>
  );
}
