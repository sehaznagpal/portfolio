import { useMemo } from 'react';
import CaseStudyLayout from '../../components/case-study/CaseStudyLayout';
import CaseStudyProse from '../../components/case-study/CaseStudyProse';
import CaseStudySupplement from '../../components/case-study/CaseStudySupplement';
import { parseCaseStudyMarkdown } from '../../lib/parseCaseStudyMarkdown';
import { moolroopSitemap } from '../../components/case-study/sitemap-data';
import raw from '../../content/case-studies/moolroop.md?raw';

import homeImg from '../../assets/images/case-studies/moolroop/Home.jpg';
import rajasthanImg from '../../assets/images/case-studies/moolroop/Rajasthan.jpg';
import productImg from '../../assets/images/case-studies/moolroop/Pashmina-Product.jpg';
import provenanceImg from '../../assets/images/case-studies/moolroop/Pashmina-Product-provence.jpg';
import locationImg from '../../assets/images/case-studies/moolroop/Pashmina-Product-location.jpg';
import wishlistImg from '../../assets/images/case-studies/moolroop/wishlist.jpg';

const ACCENT = '#BF383C';

export default function MoolroopPage() {
  const parsed = useMemo(() => parseCaseStudyMarkdown(raw), []);

  return (
    <CaseStudyLayout
      eyebrow="Moolroop App · Buyer-side mobile app · Solo project · Figma"
      title={parsed.title}
      pageTitle="Moolroop App"
      inShort={parsed.inShort}
      accentColor={ACCENT}
    >
      <CaseStudyProse
        chapters={parsed.chapters}
        supplements={[
          {
            afterHeading: 'Walking through it',
            node: (
              <CaseStudySupplement
                sitemapData={moolroopSitemap}
                accentColor={ACCENT}
                screenshots={[
                  { src: homeImg, caption: 'Home' },
                  { src: rajasthanImg, caption: 'State page: Rajasthan' },
                  { src: productImg, caption: 'Product page' },
                  { src: locationImg, caption: "How It's Made" },
                  { src: provenanceImg, caption: 'Provenance Trail' },
                  { src: wishlistImg, caption: 'Wishlist' },
                ]}
              />
            ),
          },
        ]}
      />
    </CaseStudyLayout>
  );
}
