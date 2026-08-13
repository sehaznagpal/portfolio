import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import InfographicModal from './InfographicModal';
import infographic from '../../../../../assets/images/moolroop/case-study/tabs/platform-comparison-infographic.jpg';
import styles from './ResearchPanelBody.module.css';

export default function ResearchPanelBody() {
  const [infographicOpen, setInfographicOpen] = useState(false);

  return (
    <>
      <div className={styles.body}>
        <div className={styles.qaBlock}>
          <p className={styles.qLabel}>My sources</p>
          <p className={styles.qAnswer}>
            Official GI databases, community discussions (Reddit threads where buyers ask each
            other if something is real), and existing marketplaces themselves.
          </p>
        </div>
        <div className={styles.qaBlock}>
          <p className={styles.qLabel}>What I found</p>
          <p className={styles.qAnswer}>
            Buyers frequently ask whether products are genuine, especially for high-value
            handicrafts bought online. Even Amazon Karigar, India&rsquo;s largest artisan
            programme, has been reported to fail at telling authentic craft apart from
            mass-produced imitations (
            <a
              className={styles.link}
              href="https://restofworld.org/2024/amazon-karigar-india-handicraft-makers/"
              target="_blank"
              rel="noreferrer"
            >
              Rest of World, 2024
            </a>
            ). If the platform built specifically to solve this can&rsquo;t reliably solve it,
            the gap isn&rsquo;t a niche one.
          </p>
        </div>
        <div className={styles.qaBlock}>
          <p className={styles.qLabel}>Comparative analysis</p>
          <p className={styles.qAnswer}>
            Mapped MoolRoop against five existing platforms,{' '}
            <span className={styles.highlight}>
              Amazon Karigar, GiTagged, GoSwadeshi, India Handmade, iTokri
            </span>
            , across six criteria: mobile app, GI-certified products only, showing the GI
            registration number, linking to the official registry, showing authorised seller
            info, and discovery by geographic origin.
          </p>
        </div>
      </div>

      <button type="button" className={styles.infographicButton} onClick={() => setInfographicOpen(true)}>
        See Comparative Infographic
      </button>

      <AnimatePresence>
        {infographicOpen && (
          <InfographicModal
            src={infographic}
            alt="Comparison of MoolRoop against Amazon Karigar, GiTagged, GoSwadeshi, India Handmade, and iTokri across six authenticity criteria"
            onClose={() => setInfographicOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
