import { useState } from 'react';
import PhoneMockup from './PhoneMockup';
import ScreensGallery from './ScreensGallery';
import SitemapView from './SitemapView';
import homeScreen from '../../../../../assets/images/moolroop/case-study/screens/home.jpg';
import styles from './SolutionPanelBody.module.css';

type View = 'solution' | 'screens' | 'sitemap';

export default function SolutionPanelBody() {
  const [view, setView] = useState<View>('solution');

  if (view === 'screens') return <ScreensGallery onBack={() => setView('solution')} />;
  if (view === 'sitemap') return <SitemapView onBack={() => setView('solution')} />;

  return (
    <>
      <div className={styles.mockup}>
        <PhoneMockup src={homeScreen} alt="MoolRoop home screen" />
      </div>

      <div className={styles.optionButtons}>
        <button type="button" className={styles.optionButton} onClick={() => setView('sitemap')}>
          See Sitemap &rarr;
        </button>
        <button type="button" className={styles.optionButton} onClick={() => setView('screens')}>
          Explore Screens &rarr;
        </button>
      </div>

      <h3 className={styles.solutionHeading}>Solution</h3>
      <p className={styles.solutionText}>
        The build covers four areas, each demonstrating a different part of the idea in practice.
        Discovering authentic crafts spans home, category browsing, and product listings, where
        GI-certified crafts sit inside a familiar shopping layout instead of feeling like a detour
        into paperwork. Every product tells two stories on its own page, carrying both the item
        for sale and where it comes from, with the origin story living beside the price rather
        than behind a separate link. Verification without overwhelming means every product carries
        two information layers, letting the buyer choose how deep to go: a quick glance at specs,
        or the full provenance trail. And supporting screens like menu, wishlist, and cart are kept
        deliberately plain, so verification stays the thing that stands out, not the navigation
        around it.
      </p>

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
