import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './FlowTab.module.css';

const TODAY_STEPS = [
  'Browse Product',
  'Notice GI Tag',
  'Search Government Website',
  'Find Registration',
  'Compare Seller Details',
  'Trust (?) and Decide',
];

const MOOLROOP_STEPS = ['Browse Product', 'Tap Verify', 'Verification Summaries and Records', 'Decide'];

export default function FlowTab() {
  const [sitemapOpen, setSitemapOpen] = useState(false);

  return (
    <div className={styles.tab}>
      <h2 className="ms-heading" style={{ textAlign: 'center' }}>
        The opportunity
      </h2>

      <div className={styles.columns}>
        <div className={styles.column}>
          <p className={styles.columnLabelToday}>TODAY</p>
          <div className={styles.steps}>
            {TODAY_STEPS.map((step, i) => (
              <div key={step} className={styles.stepGroup}>
                <span className={styles.stepToday}>{step}</span>
                {i < TODAY_STEPS.length - 1 && <span className={styles.arrowToday}>↓</span>}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <p className={styles.columnLabelMoolroop}>MOOLROOP</p>
          <div className={styles.steps}>
            {MOOLROOP_STEPS.map((step, i) => (
              <div key={step} className={styles.stepGroup}>
                <span className={styles.stepMoolroop}>{step}</span>
                {i < MOOLROOP_STEPS.length - 1 && <span className={styles.arrowMoolroop}>↓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button type="button" className={styles.sitemapButton} onClick={() => setSitemapOpen(true)}>
        FULL APP SITEMAP
      </button>

      <AnimatePresence>
        {sitemapOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSitemapOpen(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <p className={styles.modalTitle}>Full app sitemap</p>
                <button type="button" className={styles.closeButton} onClick={() => setSitemapOpen(false)}>
                  ✕
                </button>
              </div>

              <div className={styles.sitemapTree}>
                <ul>
                  <li>
                    Welcome Carousel
                    <ul>
                      <li>
                        Explore / Home
                        <ul>
                          <li>Search</li>
                          <li>Categories → Category Page → Product Type Page → Product Page</li>
                          <li>Explore by State → State Page → Category Page</li>
                          <li>Most Popular Products</li>
                          <li>Recommended</li>
                          <li>Wishlist</li>
                          <li>Bag → Checkout (future scope)</li>
                          <li>
                            Menu
                            <ul>
                              <li>About</li>
                              <li>Help &amp; Support</li>
                              <li>Language (future)</li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Product Page
                    <ul>
                      <li>How It&rsquo;s Made</li>
                      <li>Provenance Trail</li>
                      <li>Bag</li>
                      <li>Wishlist</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
