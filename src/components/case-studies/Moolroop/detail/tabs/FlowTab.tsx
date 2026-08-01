import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SitemapTree, { type SitemapNode } from '../SitemapTree';
import styles from './FlowTab.module.css';

const SITEMAP: SitemapNode = {
  label: 'Welcome Carousel',
  children: [
    {
      label: 'Explore / Home',
      children: [
        { label: 'Search' },
        {
          label: 'Categories',
          children: [
            {
              label: 'Category Page',
              children: [
                {
                  label: 'Product Type Page',
                  children: [
                    {
                      label: 'Product Page',
                      children: [
                        { label: "How It's Made" },
                        { label: 'Provenance Trail' },
                        { label: 'Bag', children: [{ label: 'Checkout (future scope)' }] },
                        { label: 'Wishlist' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Explore by State',
          children: [
            {
              label: 'State Page',
              children: [{ label: '(same flow as Categories)' }],
            },
          ],
        },
        { label: 'Most Popular' },
        { label: 'Recommended' },
        { label: 'Wishlist' },
        { label: 'Bag', children: [{ label: 'Checkout (future scope)' }] },
        {
          label: 'Menu',
          children: [{ label: 'About' }, { label: 'Help & Support' }, { label: 'Language (future)' }],
        },
      ],
    },
  ],
};

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

              <div className={styles.treeScroll}>
                <SitemapTree root={SITEMAP} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
