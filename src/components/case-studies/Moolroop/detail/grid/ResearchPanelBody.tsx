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
        <p>
          Before designing anything, I looked at how authenticity is currently communicated,
          combining three sources: official GI databases, community discussions (Reddit threads
          where buyers ask each other if something is real), and existing marketplaces themselves.
        </p>
        <p>
          The pattern held everywhere. Buyers frequently ask whether products are genuine,
          especially for high-value handicrafts bought online. Even Amazon Karigar, India&rsquo;s
          largest artisan programme, has been reported to fail at telling authentic craft apart
          from mass-produced imitations (
          <a
            className={styles.link}
            href="https://restofworld.org/2024/amazon-karigar-india-handicraft-makers/"
            target="_blank"
            rel="noreferrer"
          >
            Rest of World, 2024
          </a>
          ). If the platform built specifically to solve this can&rsquo;t reliably solve it, the
          gap isn&rsquo;t a niche one.
        </p>
        <p>
          I then mapped MoolRoop against five existing platforms (Amazon Karigar, GiTagged,
          GoSwadeshi, India Handmade, iTokri) across{' '}
          <span className={styles.highlight}>six criteria</span>: mobile app, GI-certified
          products only, showing the GI registration number, linking to the official registry,
          showing authorised seller info, and discovery by geographic origin.
        </p>
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
