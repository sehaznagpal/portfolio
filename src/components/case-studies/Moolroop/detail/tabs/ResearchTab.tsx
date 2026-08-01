import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ComparisonTable from '../ComparisonTable';
import styles from './ResearchTab.module.css';

export default function ResearchTab() {
  const [showInfographic, setShowInfographic] = useState(false);

  return (
    <div
      className={styles.tab}
      onMouseLeave={() => setShowInfographic(false)}
    >
      <div className={styles.intro}>
        <h2 className="ms-heading">Understanding the existing experience</h2>
        <div className="ms-body">
          <p>
            Before proposing a solution, I wanted to understand how authenticity is currently
            communicated across existing marketplaces and official government resources.
          </p>
        </div>
      </div>

      <div className={styles.methods}>
        <span className={styles.pill}>Official GI databases</span>
        <span className={styles.plus}>+</span>
        <span className={styles.pill}>Community discussions (like reddit)</span>
        <span className={styles.plus}>+</span>
        <span className={styles.pill}>Existing marketplaces</span>
      </div>

      <div className={styles.section}>
        <h3 className="ms-heading">Observation</h3>
        <div className="ms-body">
          <p>
            Buyers frequently ask whether products are genuine, especially when purchasing
            high-value handicrafts online. Even{' '}
            <a
              href="https://restofworld.org/2024/amazon-karigar-india-handicraft-makers/"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Karigar
            </a>
            , India&rsquo;s largest artisan programme, has been reported to fail at distinguishing
            authentic craft from mass-produced imitations. The problem was never the availability
            of information. The problem was the effort required to access and interpret it.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.landscapeRow}>
          <h3 className="ms-heading">Competitive landscape</h3>
          <button
            type="button"
            className={styles.infographicButton}
            onMouseEnter={() => setShowInfographic(true)}
            onClick={() => setShowInfographic((v) => !v)}
          >
            Infographic
          </button>
        </div>
        <div className="ms-body">
          <p>
            Several platforms already promote Indian handicrafts. Instead of replacing them, I
            explored how the shopping experience could become more transparent by embedding
            verification directly into the purchase journey.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showInfographic && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            <ComparisonTable />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
