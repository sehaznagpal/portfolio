import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StickyNote from '../StickyNote';
import styles from './DecisionsTab.module.css';

const PRINCIPLES = [
  {
    number: '01',
    title: 'Trust should be immediate.',
    body: 'Most shoppers should understand whether a product is authentic within seconds rather than reading official documents.',
  },
  {
    number: '02',
    title: 'Verification should remain transparent.',
    body: 'The app summarises official records but never replaces them. Every summary links directly to the original government source.',
  },
  {
    number: '03',
    title: 'Provenance should become part of discovery.',
    body: 'Authenticity is not only about certificates. Understanding where a craft comes from and how it is made helps buyers appreciate its value.',
  },
];

const SWATCHES = ['#D9CE6A', '#BF393C', '#2B4C5F', '#F3B5C0', '#24211F'];

const STRUCTURE_DECISIONS = [
  {
    title: 'Multiple SKUs per product',
    body: 'A single craft, like a Pashmina, can be sold as a shawl, a kurta, or a saree, and each variant may come from a different seller. Rather than treating "Pashmina" as one listing, each product has its own page that lists every SKU under it. This keeps verification tied to the craft itself while still letting sellers and formats vary underneath it.',
  },
  {
    title: 'Easy filtering',
    body: 'Filtering needed two independent axes: geography (state) and use-case (type, e.g. gifting, souvenirs, personal wear). A shopper exploring "what\'s made in Rajasthan" and a shopper looking for "a gift" are doing genuinely different searches, and most existing marketplaces only support one of these well.',
  },
  {
    title: 'Persistent search',
    body: 'A search bar is present across browsing screens rather than tucked behind a separate search state. Given that verification is meant to reduce friction, requiring an extra tap to search would work against the app\'s own design goal.',
  },
];

export default function DecisionsTab() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.tab}>
      <div className={styles.intro}>
        <h2 className="ms-heading">How it was designed</h2>
        <div className="ms-body">
          <p>
            Understanding the problem was the easy part. The harder work was deciding what
            MoolRoop should actually look like, what to prioritise first, and where to draw the
            line on scope.
          </p>
        </div>
      </div>

      <div className={styles.principles}>
        {PRINCIPLES.map((p, i) => (
          <div key={p.number} className={styles.principleCard} data-intensity={i}>
            <p className={styles.principleNumber}>{p.number}</p>
            <p className={styles.principleTitle}>{p.title}</p>
            <p className={styles.principleBody}>{p.body}</p>
          </div>
        ))}
      </div>

      <div className={styles.bottomRow}>
        <StickyNote variant="white" rotate={1.5} className={styles.visualNote}>
          <p className={styles.visualTitle}>
            Visual
            <br />
            language
          </p>
          <p className={styles.visualFonts}>Fonts: Fletcha M &amp; Open Sans</p>
          <p className={styles.visualColoursLabel}>Colours:</p>
          <div className={styles.swatchRow}>
            {SWATCHES.map((hex) => (
              <span key={hex} className={styles.swatch} style={{ background: hex }} />
            ))}
          </div>
        </StickyNote>

        <div className={styles.structure}>
          <h3 className="ms-heading">Product structure decisions</h3>
          <div className={styles.structureList}>
            {STRUCTURE_DECISIONS.map((item, i) => (
              <div key={item.title} className={styles.structureItem}>
                <button
                  type="button"
                  className={styles.structureButton}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  {i + 1}. {item.title}
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      className={styles.tooltip}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <p>{item.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
