import { useMemo } from 'react';
import CaseStudyLayout from '../../components/case-study/CaseStudyLayout';
import CaseStudyHero from '../../components/case-study/CaseStudyHero';
import SectionRail from '../../components/case-study/SectionRail';
import VisualSection from '../../components/case-study/VisualSection';
import ScreenGroup from '../../components/case-study/ScreenGroup';
import ScreenshotFrame from '../../components/case-study/ScreenshotFrame';
import { StatComparison } from '../../components/case-study/StatDisplay';
import OutboundButton from '../../components/case-study/OutboundButton';
import TextSection from '../../components/case-study/TextSection';
import { parseCaseStudyMarkdown } from '../../lib/parseCaseStudyMarkdown';
import raw from '../../content/case-studies/moolroop.md?raw';
import visualStyles from '../../components/case-study/VisualSection.module.css';
import layoutStyles from '../../components/case-study/CaseStudyLayout.module.css';

import homeImg from '../../assets/images/case-studies/moolroop/Home.jpg';
import rajasthanImg from '../../assets/images/case-studies/moolroop/Rajasthan.jpg';
import productImg from '../../assets/images/case-studies/moolroop/Pashmina-Product.jpg';
import locationImg from '../../assets/images/case-studies/moolroop/Pashmina-Product-location.jpg';
import provenanceImg from '../../assets/images/case-studies/moolroop/Pashmina-Product-provence.jpg';
import wishlistImg from '../../assets/images/case-studies/moolroop/wishlist.jpg';
import handicraftsImg from '../../assets/images/case-studies/moolroop/handicrafts.jpg';
import pashminaTypeImg from '../../assets/images/case-studies/moolroop/pashmina-type.jpg';
import bagImg from '../../assets/images/case-studies/moolroop/bag.jpg';
import menuImg from '../../assets/images/case-studies/moolroop/menu.jpg';

const ACCENT = '#BF383C';
const FIGMA_URL =
  'https://www.figma.com/proto/Qhn5KgX74Dhos4SskfjdCT/Moolroop-App?node-id=1-639&t=Z3fajgIc4RFSOg8n-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A452&starting-point-node-id=1%3A625';

const RAIL = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'The Problem' },
  { id: 'who-its-for', label: "Who It's For" },
  { id: 'how-its-made', label: "How It's Made" },
  { id: 'provenance-trail', label: 'Provenance Trail' },
  { id: 'full-flow', label: 'The Full Flow' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'whats-next', label: "What's Next" },
  { id: 'reflection', label: 'Reflection' },
];

export default function MoolroopPage() {
  const parsed = useMemo(() => parseCaseStudyMarkdown(raw), []);

  const whatsNext = parsed.chapters.find((c) => c.heading === "What I didn't get to");
  const reflection = parsed.chapters.find((c) => c.heading === "What I'd do differently");

  return (
    <CaseStudyLayout pageTitle="Moolroop App" accentColor={ACCENT} tone="light">
      <CaseStudyHero
        roleTag="Moolroop App · Buyer-side mobile app · Solo project · Figma"
        title={parsed.title}
        inShort={parsed.inShort}
        outboundHref={FIGMA_URL}
        outboundLabel="Open Prototype"
        background="var(--moolroop-accent)"
        textColor="var(--bg-canvas)"
      />

      <SectionRail sections={RAIL} />

      <VisualSection
        id="problem"
        label="The Problem"
        mediaMaxWidth="460px"
        media={<ScreenshotFrame src={homeImg} />}
        caption="A real product and a copy can sit on the same page, described in nearly the same words. Nothing at the point of sale tells a buyer which is which."
      />

      <VisualSection
        id="who-its-for"
        label="Who It's For"
        mediaMaxWidth="460px"
        media={<ScreenshotFrame src={productImg} />}
        caption="One interaction, two audiences: the same tap that shows a skeptic a certificate shows a gift buyer a maker's story."
      />

      <VisualSection
        id="how-its-made"
        label="How It's Made"
        mediaMaxWidth="600px"
        media={<ScreenshotFrame src={locationImg} />}
        caption="An illustrated regional map grounding the product somewhere specific. It's about people and craftsmanship, not geography for its own sake."
      />

      <VisualSection
        id="provenance-trail"
        label="Provenance Trail"
        mediaMaxWidth="600px"
        media={<ScreenshotFrame src={provenanceImg} />}
        caption="Real registry data, a certificate number, a registered proprietor, replacing a badge with something a buyer can actually check."
      />

      <VisualSection
        id="full-flow"
        label="The Full Flow"
        media={
          <ScreenGroup
            layout="grid"
            items={[
              { placeholder: true, caption: 'Welcome Carousel' },
              { src: rajasthanImg, caption: 'State page' },
              { src: handicraftsImg, caption: 'Category page' },
              { src: pashminaTypeImg, caption: 'Product type page' },
              { src: wishlistImg, caption: 'Wishlist' },
              { src: bagImg, caption: 'Bag' },
              { src: menuImg, caption: 'Menu' },
            ]}
          />
        }
        caption="Built for the buyer's decision only. No seller dashboard, no artisan onboarding, deliberately kept out of scope."
      />

      <section id="outcome" className={visualStyles.section}>
        <h2 className={visualStyles.label}>Outcome</h2>
        <div className={visualStyles.media} style={{ maxWidth: 600, margin: '0 auto' }}>
          <ScreenshotFrame src={provenanceImg} />
        </div>
        <div style={{ marginTop: 56 }}>
          <StatComparison
            from={{ value: '4 steps', label: 'manual registry lookup' }}
            to={{ value: '1 tap', label: 'from the product page' }}
          />
        </div>
        <p className={visualStyles.caption}>
          A four-step manual lookup almost no buyer would do on their own, now one tap away from the
          product they are already looking at.
        </p>
      </section>

      {whatsNext && <TextSection id="whats-next" heading="What's Next" body={whatsNext.body} />}
      {reflection && <TextSection id="reflection" heading="Reflection" body={reflection.body} />}

      <div className={layoutStyles.footer}>
        <OutboundButton
          href={FIGMA_URL}
          label="Open Prototype"
          background={ACCENT}
          color="var(--bg-canvas)"
        />
      </div>
    </CaseStudyLayout>
  );
}
