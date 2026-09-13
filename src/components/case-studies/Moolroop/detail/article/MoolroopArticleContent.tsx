import { useLayoutEffect, useRef, useState } from 'react';
import loader1 from '../../../../../assets/images/moolroop/case-study/screens/loader-1.jpg';
import loader2 from '../../../../../assets/images/moolroop/case-study/screens/loader-2.jpg';
import loader3 from '../../../../../assets/images/moolroop/case-study/screens/loader-3.jpg';
import handicrafts from '../../../../../assets/images/moolroop/case-study/screens/handicrafts.jpg';
import pashminaList from '../../../../../assets/images/moolroop/case-study/screens/pashmina-list.jpg';
import pashminaProduct1 from '../../../../../assets/images/moolroop/case-study/screens/pashmina-product-1.jpg';
import pashminaProvenance1 from '../../../../../assets/images/moolroop/case-study/screens/pashmina-provenance-1.jpg';
import pashminaProvenance2 from '../../../../../assets/images/moolroop/case-study/screens/pashmina-provenance-2.jpg';
import searchBar from '../../../../../assets/images/moolroop/case-study/screens/search-bar.jpg';
import menu from '../../../../../assets/images/moolroop/case-study/screens/menu.jpg';
import wishlist from '../../../../../assets/images/moolroop/case-study/screens/wishlist.jpg';
import bag from '../../../../../assets/images/moolroop/case-study/screens/bag.jpg';
import giSearchScreenshot from '../../../../../assets/images/moolroop/case-study/tabs/gi-search-registered-applications.png';
import infographic from '../../../../../assets/images/moolroop/case-study/tabs/platform-comparison-infographic.jpg';
import PhoneMockup from '../grid/PhoneMockup';
import SitemapView from '../grid/SitemapView';
import styles from './MoolroopArticleContent.module.css';

const WORDS_PER_MINUTE = 210;

function Divider({ variant }: { variant?: 'header' | 'tags' }) {
  const variantClass = variant === 'header' ? styles.dividerHeader : variant === 'tags' ? styles.dividerTags : '';
  return <hr className={`${styles.divider} ${variantClass}`} />;
}

/* A single app screen, framed in the same silver phone bezel already used by
   MoolRoop's Cards variant (PhoneMockup) rather than a bare bordered image —
   this is the established framing device for this case study's screens. */
function ScreenFigure({ src, alt, label }: { src: string; alt: string; label?: string }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.screenFrame}>
        <PhoneMockup src={src} alt={alt} />
      </div>
      {label && <figcaption className={styles.figureLabel}>{label}</figcaption>}
    </figure>
  );
}

/* A landscape reference image (infographic, screenshot) — framed with a
   plain border/shadow, object-fit: contain so nothing is cropped. */
function ImageFigure({ src, alt, label, ratio }: { src: string; alt: string; label?: string; ratio: number }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.imageFrame} style={{ aspectRatio: ratio }}>
        <img src={src} alt={alt} />
      </div>
      {label && <figcaption className={styles.figureLabel}>{label}</figcaption>}
    </figure>
  );
}

export default function MoolroopArticleContent() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [readMinutes, setReadMinutes] = useState<number | null>(null);

  /* Real word count of the rendered body (headings, paragraphs, figure
     labels — not the header/tags above it, which live outside bodyRef),
     read back from the DOM after mount rather than a hand-counted constant,
     so it never drifts from the actual copy above. */
  useLayoutEffect(() => {
    const text = bodyRef.current?.textContent ?? '';
    const words = text.trim().split(/\s+/).filter(Boolean);
    setReadMinutes(Math.max(1, Math.round(words.length / WORDS_PER_MINUTE)));
  }, []);

  return (
    <div className={styles.panel}>
      <div className={styles.scroll}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleLight}>MoolRoop </span>
            <span className={styles.titleAccent}>App</span>
          </h2>
          <p className={styles.readTime} aria-hidden={readMinutes === null}>
            {readMinutes !== null && (
              <>
                <span className={styles.readTimeLight}>Read </span>
                <span className={styles.readTimeMedium}>{readMinutes} Min</span>
              </>
            )}
          </p>
        </div>

        <Divider variant="header" />

        <div className={styles.tags}>
          <div className={styles.tagProse}>
            <span className={styles.tagPill}>Role</span>
            <p className={styles.tagText}>
              <span className={styles.tagStrong}>Solo designer and researcher.</span> Conceived the
              idea, mapped the information architecture, designed every screen, and built the
              interactive prototype.
            </p>
          </div>

          <div className={styles.tagProse}>
            <span className={styles.tagPill}>In brief</span>
            <p className={styles.tagText}>
              A self-initiated buyer-side mobile app exploring whether{' '}
              <span className={styles.tagStrong}>GI-certified craft authenticity</span> can be
              verified inside the shopping flow itself, instead of a database several clicks away.
            </p>
          </div>

          <div className={styles.tagFacts}>
            <div className={styles.factRow}>
              <span className={styles.tagPillSmall}>Year</span>
              <span className={styles.factValue}>August 2026</span>
            </div>
            <div className={styles.factRow}>
              <span className={styles.tagPillSmall}>Duration</span>
              <span className={styles.factValue}>1 Month</span>
            </div>
            <div className={styles.factRow}>
              <span className={styles.tagPillSmall}>Affiliation</span>
              <span className={styles.factValue}>Self-initiated</span>
            </div>
          </div>
        </div>

        <Divider variant="tags" />

        <div className={styles.body} ref={bodyRef}>
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>The problem</h3>
            <p className={styles.paragraph}>
              A GI tag is a government-issued certification that ties a craft to a specific place
              and community of makers, a Kashmiri Pashmina, a Sanganeri block print. India has over
              400 of these. But knowing the tag exists doesn&apos;t help a buyer scrolling a
              marketplace listing, since the proof lives in a separate government database, several
              clicks away from the product itself.
            </p>

            <ImageFigure
              src={giSearchScreenshot}
              alt="GI Search Version 2.0: Registered Applications database"
              label="GI Search: the government's own registered-applications database"
              ratio={1600 / 963}
            />

            <p className={styles.paragraph}>
              I noticed the gap while freelance-writing product descriptions for craft sellers,
              pulled straight from those same government databases. MoolRoop asks a narrow
              question: can that verification live inside the shopping flow itself, instead of
              outside it?
            </p>
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Mapping it out before building it</h3>
            <p className={styles.paragraph}>
              Before designing any screen, I mapped the full structure end to end, home,
              categories, states, product pages, and where verification and provenance would sit
              inside them. Two decisions came out of this early: every product needed room for
              multiple SKUs under one craft (a Pashmina sold as a shawl, a kurta, or a saree, each
              from a different seller), and browsing needed to support filtering by state and by
              type as two independent paths, not one.
            </p>

            <div className={`${styles.componentFrame} ${styles.componentFrameTall}`}>
              <SitemapView />
            </div>
            <p className={styles.figureLabel}>
              Sitemap: the full site structure, from welcome carousel to product page
            </p>
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>First impression</h3>
            <p className={styles.paragraph}>
              The app opens with a short welcome sequence before dropping the buyer into the
              shopping experience.
            </p>

            <div className={styles.figureRow}>
              <ScreenFigure src={loader1} alt="Welcome carousel, slide 1 of 3" label="Welcome carousel: slide 1 of 3" />
              <ScreenFigure src={loader2} alt="Welcome carousel, slide 2 of 3" label="Welcome carousel: slide 2 of 3" />
              <ScreenFigure src={loader3} alt="Welcome carousel, slide 3 of 3" label="Welcome carousel: slide 3 of 3" />
            </div>
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Browsing, the way people actually search</h3>
            <p className={styles.paragraph}>
              Someone looking for &quot;what&apos;s made in Rajasthan&quot; and someone looking for
              &quot;a gift under a budget&quot; are running two different searches, and most
              platforms only serve one well. MoolRoop treats state and category as independent
              filters, so both paths stay equally short. A search bar stays visible across every
              browsing screen too, since the whole point was cutting friction, and hiding search
              behind a tap would undo that.
            </p>

            <div className={styles.figureRow}>
              <ScreenFigure src={handicrafts} alt="Category page — Handicrafts" label="Category page: Handicrafts" />
              <ScreenFigure src={pashminaList} alt="Product type page — Pashmina" label="Product type page: Pashmina" />
            </div>
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>The product page tells two stories at once</h3>
            <p className={styles.paragraph}>
              Every product page carries two threads side by side: the item for sale, and where it
              actually comes from. A quick glance gives the specs. Going further opens the full
              provenance trail, the registration, the maker, the process, buyer&apos;s choice on
              how deep to go.
            </p>
            <p className={styles.paragraph}>
              This mattered more once I checked how the rest of the market handles it. Even Amazon
              Karigar, India&apos;s largest artisan programme, has been reported to fail at telling
              authentic craft apart from mass-produced imitations (Rest of World, 2024). I mapped
              MoolRoop against five other platforms across six authenticity criteria, and most
              cleared one or two at best.
            </p>

            <ImageFigure
              src={infographic}
              alt="Comparison of MoolRoop against Amazon Karigar, GiTagged, GoSwadeshi, India Handmade, and iTokri across six authenticity criteria"
              label="Infographic: MoolRoop vs. Amazon Karigar, GiTagged, GoSwadeshi, India Handmade, iTokri"
              ratio={908 / 449}
            />

            <div className={styles.figureRow}>
              <ScreenFigure src={pashminaProduct1} alt="How it's made" label="How It's Made" />
              <ScreenFigure src={pashminaProvenance1} alt="Verification summary" label="Verification summary" />
              <ScreenFigure src={pashminaProvenance2} alt="Provenance trail, full detail" label="Full provenance trail" />
            </div>
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Keeping the rest plain, on purpose</h3>
            <p className={styles.paragraph}>
              Menu, wishlist, and cart stay deliberately simple. Verification is the one thing on
              this app that should stand out, so everything around it was designed to disappear.
            </p>

            <div className={styles.figureRow}>
              <ScreenFigure src={searchBar} alt="Search" label="Search" />
              <ScreenFigure src={menu} alt="Menu" label="Menu" />
              <ScreenFigure src={wishlist} alt="Wishlist" label="Wishlist" />
              <ScreenFigure src={bag} alt="Bag" label="Bag" />
            </div>
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Reflection</h3>
            <p className={styles.paragraph}>
              MoolRoop doesn&apos;t solve counterfeiting. It makes fraud harder to pull off and
              gives honest sellers a clear way to show proof. Whether buyers would actually open
              the provenance trail, or just trust that it&apos;s there, is something only a live
              version could answer.
            </p>
            <p className={styles.paragraph}>
              <span className={styles.tagStrong}>Next:</span> live registry sync, QR verification,
              artisan profiles, and a seller dashboard.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
