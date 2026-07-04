import { useMemo } from 'react';
import CaseStudyLayout from '../../components/case-study/CaseStudyLayout';
import CaseStudyProse from '../../components/case-study/CaseStudyProse';
import CaseStudySupplement from '../../components/case-study/CaseStudySupplement';
import { parseCaseStudyMarkdown } from '../../lib/parseCaseStudyMarkdown';
import { drCuterusSitemap } from '../../components/case-study/sitemap-data';
import raw from '../../content/case-studies/dr-cuterus.md?raw';

import heroImg from '../../assets/images/case-studies/dr-cuterus/hero-desktop.jpg';
import appointmentsImg from '../../assets/images/case-studies/dr-cuterus/appointments-desktop.jpg';
import blogImg from '../../assets/images/case-studies/dr-cuterus/blog-desktop.jpg';
import corporateImg from '../../assets/images/case-studies/dr-cuterus/corporate-desktop.jpg';

const ACCENT = '#683C92';

export default function DrCuterusPage() {
  const parsed = useMemo(() => parseCaseStudyMarkdown(raw), []);

  return (
    <CaseStudyLayout
      eyebrow="Website for Dr Cuterus · Design lead, two-person collaborative team · Astro, live"
      title={parsed.title}
      pageTitle="Dr Cuterus"
      inShort={parsed.inShort}
      accentColor={ACCENT}
    >
      <CaseStudyProse
        chapters={parsed.chapters}
        supplements={[
          {
            afterHeading: 'Walking through the site',
            node: (
              <CaseStudySupplement
                sitemapData={drCuterusSitemap}
                accentColor={ACCENT}
                screenshots={[
                  { src: heroImg, caption: 'Landing page hero' },
                  { src: appointmentsImg, caption: 'Appointments' },
                  { src: blogImg, caption: 'Blog' },
                  { src: corporateImg, caption: 'Corporate Workshops' },
                ]}
              />
            ),
          },
        ]}
      />
    </CaseStudyLayout>
  );
}
