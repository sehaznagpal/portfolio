import { useState } from 'react';
import PhoneMockup from './PhoneMockup';
import ScreensGallery from './ScreensGallery';
import SitemapView from './SitemapView';
import styles from './SolutionPanelBody.module.css';

type View = 'solution' | 'screens' | 'sitemap';

export default function SolutionPanelBody() {
  const [view, setView] = useState<View>('solution');

  if (view === 'screens') return <ScreensGallery onBack={() => setView('solution')} />;
  if (view === 'sitemap') return <SitemapView onBack={() => setView('solution')} />;

  return (
    <>
      <div className={styles.mockupWrap}>
        <div className={styles.mockup}>
          <PhoneMockup screenColor="var(--moolroop-accent)" />
        </div>

        <div className={styles.optionButtons}>
          <button type="button" className={styles.optionButton} onClick={() => setView('sitemap')}>
            See Sitemap &rarr;
          </button>
          <button type="button" className={styles.optionButton} onClick={() => setView('screens')}>
            Explore Screens &rarr;
          </button>
        </div>
      </div>

      <h3 className={styles.solutionHeading}>Solution</h3>
      <div className={styles.solutionText}>
        <p>
          <span className={styles.qLabel}>Discovering authentic crafts</span> &mdash; GI-certified
          crafts sit inside a familiar shopping layout, not a detour into paperwork.
        </p>
        <p>
          <span className={styles.qLabel}>Two stories per product</span> &mdash; the item for sale
          and where it comes from, side by side.
        </p>
        <p>
          <span className={styles.qLabel}>Verification without overwhelm</span> &mdash; a quick
          glance at specs, or the full provenance trail, buyer&apos;s choice.
        </p>
        <p>
          <span className={styles.qLabel}>Plain supporting screens</span> &mdash; menu, wishlist,
          and cart stay simple so verification is what stands out.
        </p>
      </div>

      <h3 className={styles.reflectionHeading}>Reflection</h3>
      <div className={styles.reflectionText}>
        <p>
          MoolRoop started as a question about trust and became an exercise in making public
          information usable. It doesn&rsquo;t solve counterfeiting, it makes fraud harder to pull
          off and gives honest sellers a clear way to show proof. The open question is whether
          buyers would actually use the verification trail, or just trust that it&rsquo;s there,
          something only a live version could answer.
        </p>
        <p>
          <span className={styles.highlight}>Next steps:</span> live registry sync, QR
          verification, artisan profiles, a seller dashboard, regional stories, and consumer
          education on GI protection.
        </p>
      </div>
    </>
  );
}
