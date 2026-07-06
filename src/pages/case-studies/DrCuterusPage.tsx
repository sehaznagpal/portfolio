import { useMemo } from 'react';
import CaseStudyLayout from '../../components/case-study/CaseStudyLayout';
import CaseStudyHero from '../../components/case-study/CaseStudyHero';
import SectionRail from '../../components/case-study/SectionRail';
import VisualSection from '../../components/case-study/VisualSection';
import ScreenGroup from '../../components/case-study/ScreenGroup';
import ScreenshotFrame from '../../components/case-study/ScreenshotFrame';
import OutboundButton from '../../components/case-study/OutboundButton';
import TextSection from '../../components/case-study/TextSection';
import { parseCaseStudyMarkdown } from '../../lib/parseCaseStudyMarkdown';
import raw from '../../content/case-studies/dr-cuterus.md?raw';
import layoutStyles from '../../components/case-study/CaseStudyLayout.module.css';
import pageStyles from './DrCuterusPage.module.css';

import heroImg from '../../assets/images/case-studies/dr-cuterus/hero-desktop.jpg';
import heroMobileImg from '../../assets/images/case-studies/dr-cuterus/hero-mobile.jpg';
import bookImg from '../../assets/images/case-studies/dr-cuterus/book-desktop.jpg';
import ctaImg from '../../assets/images/case-studies/dr-cuterus/cta-desktop.jpg';
import contentHubImg from '../../assets/images/case-studies/dr-cuterus/content-hub-desktop.jpg';
import fursatImg from '../../assets/images/case-studies/dr-cuterus/fursat-desktop.jpg';
import appointmentsImg from '../../assets/images/case-studies/dr-cuterus/appointments-desktop.jpg';
import appointmentsMobileImg from '../../assets/images/case-studies/dr-cuterus/appointments-mobile.jpg';
import blogImg from '../../assets/images/case-studies/dr-cuterus/blog-desktop.jpg';
import blogMobileImg from '../../assets/images/case-studies/dr-cuterus/blog-mobile.jpg';
import corporateImg from '../../assets/images/case-studies/dr-cuterus/corporate-desktop.jpg';

const ACCENT = '#683C92';
const LIVE_URL = 'https://drcuterus.com';

const RAIL = [
  { id: 'overview', label: 'Overview' },
  { id: 'the-brief', label: 'The Brief' },
  { id: 'brand-system', label: 'Brand System' },
  { id: 'voice-illustration', label: 'Voice & Illustration' },
  { id: 'booking-a-consult', label: 'Booking a Consult' },
  { id: 'the-blog', label: 'The Blog' },
  { id: 'corporate-workshops', label: 'Corporate Workshops' },
  { id: 'responsive-proof', label: 'Responsive Proof' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'reflection', label: 'Reflection' },
];

function ResponsivePair({
  label,
  mobile,
  desktop,
}: {
  label: string;
  mobile: string;
  desktop: string;
}) {
  return (
    <div style={{ marginBottom: 56 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        <div style={{ width: '20%', flexShrink: 0 }}>
          <ScreenshotFrame src={mobile} />
        </div>
        <div style={{ flex: 1 }}>
          <ScreenshotFrame src={desktop} />
        </div>
      </div>
      <p
        style={{
          marginTop: 16,
          fontFamily: "'Author Variable', sans-serif",
          fontStyle: 'italic',
          fontSize: 13,
          textAlign: 'center',
          opacity: 0.6,
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function DrCuterusPage() {
  const parsed = useMemo(() => parseCaseStudyMarkdown(raw), []);

  const outcome = parsed.chapters.find((c) => c.heading === 'What actually happened');
  const leftToFind = parsed.chapters.find((c) => c.heading === "What's left to find out");
  const taughtMe = parsed.chapters.find((c) => c.heading === 'What this taught me');
  const reflectionBody = [leftToFind?.body, taughtMe?.body].filter(Boolean).join('\n\n');

  return (
    <CaseStudyLayout pageTitle="Dr Cuterus" accentColor={ACCENT} tone="light">
      <CaseStudyHero
        roleTag="Website for Dr Cuterus · Design lead, two-person collaborative team · Astro, live"
        title={parsed.title}
        inShort={parsed.inShort}
        outboundHref={LIVE_URL}
        outboundLabel="Visit Live Website"
        background="var(--drcuterus-purple)"
        textColor="var(--bg-canvas)"
        media={
          <div style={{ height: '100%', borderRadius: 12, overflow: 'hidden' }}>
            <img src={heroImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        }
      />

      <SectionRail sections={RAIL} />

      <VisualSection
        id="the-brief"
        label="The Brief"
        media={
          <div style={{ aspectRatio: '7 / 1', overflow: 'hidden', borderRadius: 8 }}>
            <img
              src={heroImg}
              alt="Press and feature wall"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom' }}
            />
          </div>
        }
        caption="Patient trust, brand credibility, and question triage: one site built to do all three jobs at once, for two audiences who would never otherwise meet on the same page."
      />

      <VisualSection
        id="brand-system"
        label="Brand System"
        media={
          <div className={pageStyles.brandGrid}>
            <ScreenshotFrame src={bookImg} caption="Book section" />
            <div className={pageStyles.brandCrop}>
              <img src={ctaImg} alt="Purple and yellow balance close-up" />
            </div>
          </div>
        }
        caption="No gendered colors. Purple and yellow, balanced deliberately so neither fights the other for attention."
      />

      <VisualSection
        id="voice-illustration"
        label="Voice & Illustration"
        media={
          <ScreenGroup
            layout="grid"
            items={[
              { src: contentHubImg, caption: 'Content hub: Instagram, YouTube, podcast' },
              { src: fursatImg, caption: 'Fursat product section' },
            ]}
          />
        }
        caption="The doodles scattered through the site were built for this project, not borrowed from her existing brand assets."
      />

      <VisualSection
        id="booking-a-consult"
        label="Booking a Consult"
        media={<ScreenshotFrame src={appointmentsImg} />}
        caption="Her patients already live on WhatsApp, so the booking flow meets them exactly there instead of competing with a calendar tool nobody would use."
      />

      <VisualSection
        id="the-blog"
        label="The Blog"
        media={<ScreenshotFrame src={blogImg} />}
        caption="A place to point questions toward instead of answering the same one over and over. Still filling in."
      />

      <VisualSection
        id="corporate-workshops"
        label="Corporate Workshops"
        media={<ScreenshotFrame src={corporateImg} />}
        caption="Kept separate from the patient-facing site, since a company evaluating her for a booking shouldn't scroll past patient content to find proof she's done this before."
      />

      <VisualSection
        id="responsive-proof"
        label="Responsive Proof"
        media={
          <div>
            <ResponsivePair label="Hero" mobile={heroMobileImg} desktop={heroImg} />
            <ResponsivePair label="Appointments" mobile={appointmentsMobileImg} desktop={appointmentsImg} />
            <ResponsivePair label="Blog" mobile={blogMobileImg} desktop={blogImg} />
          </div>
        }
      />

      {outcome && <TextSection id="outcome" heading="Outcome" body={outcome.body} />}
      {reflectionBody && <TextSection id="reflection" heading="Reflection" body={reflectionBody} />}

      <div className={layoutStyles.footer}>
        <OutboundButton
          href={LIVE_URL}
          label="Visit Live Website"
          background={ACCENT}
          color="var(--bg-canvas)"
        />
      </div>
    </CaseStudyLayout>
  );
}
