import { useMemo } from 'react';
import CaseStudyLayout from '../../components/case-study/CaseStudyLayout';
import CaseStudyProse from '../../components/case-study/CaseStudyProse';
import CaseStudySupplement from '../../components/case-study/CaseStudySupplement';
import ScreenshotFrame from '../../components/case-study/ScreenshotFrame';
import { parseCaseStudyMarkdown } from '../../lib/parseCaseStudyMarkdown';
import { dissertationSitemap } from '../../components/case-study/sitemap-data';
import raw from '../../content/case-studies/dissertation.md?raw';
import layoutStyles from '../../components/case-study/CaseStudyLayout.module.css';

import instructionsImg from '../../assets/images/case-studies/dissertation/instructions.jpg';
import moneyTransferImg from '../../assets/images/case-studies/dissertation/money-transfer.jpg';
import selectBankImg from '../../assets/images/case-studies/dissertation/select-bank-account.jpg';
import pinImg from '../../assets/images/case-studies/dissertation/pin.jpg';
import pinWarningImg from '../../assets/images/case-studies/dissertation/pin-warning.jpg';
import selectBankCtaImg from '../../assets/images/case-studies/dissertation/select-bank-account-cta.jpg';
import transferringImg from '../../assets/images/case-studies/dissertation/transferring.jpg';
import successImg from '../../assets/images/case-studies/dissertation/success.jpg';

import fig1 from '../../assets/images/case-studies/dissertation/fig1-treatment-cancellation.png';
import fig2 from '../../assets/images/case-studies/dissertation/fig2-treatment-bias.png';
import fig3 from '../../assets/images/case-studies/dissertation/fig3-predicted-probs.png';
import fig4 from '../../assets/images/case-studies/dissertation/fig4-response-time.png';
import fig5 from '../../assets/images/case-studies/dissertation/fig5-confidence.png';
import fig6 from '../../assets/images/case-studies/dissertation/fig6-online-offline.png';

const ACCENT = '#CF0B0B';

export default function DissertationPage() {
  const parsed = useMemo(() => parseCaseStudyMarkdown(raw), []);

  const title = parsed.subtitle ? (
    <>
      {parsed.title}
      <br />
      <span style={{ fontSize: '0.5em', opacity: 0.7 }}>{parsed.subtitle}</span>
    </>
  ) : (
    parsed.title
  );

  return (
    <CaseStudyLayout
      eyebrow="Designing Against Fraud · Solo, 116-participant experiment · Presented at 3 conferences"
      title={title}
      pageTitle="Designing Against Fraud"
      inShort={parsed.inShort}
      accentColor={ACCENT}
    >
      <CaseStudyProse
        chapters={parsed.chapters}
        supplements={[
          {
            afterHeading: 'What the screens actually had to do',
            node: (
              <CaseStudySupplement
                sitemapData={dissertationSitemap}
                accentColor={ACCENT}
                screenshots={[
                  { src: instructionsImg, caption: 'Instructions + consent' },
                  { src: moneyTransferImg, caption: 'Money transfer' },
                  { src: selectBankImg, caption: 'Select bank account' },
                  { src: pinImg, caption: 'PIN entry: control' },
                  { src: pinWarningImg, caption: 'PIN entry: warning banner' },
                  { src: selectBankCtaImg, caption: 'CTA: cancel / continue' },
                  { src: transferringImg, caption: 'Transferring' },
                  { src: successImg, caption: 'Success' },
                ]}
              />
            ),
          },
          {
            afterHeading: 'What actually happened',
            node: (
              <div className={layoutStyles.sitemapSection}>
                <h3>Results</h3>
                <div className={layoutStyles.gallery}>
                  <ScreenshotFrame src={fig1} caption="Cancellation rate by treatment" />
                  <ScreenshotFrame src={fig2} caption="Treatment effect by fraud type" />
                  <ScreenshotFrame src={fig3} caption="Predicted probabilities" />
                  <ScreenshotFrame src={fig4} caption="Response time by condition" />
                  <ScreenshotFrame src={fig5} caption="Self-rated confidence vs. performance" />
                  <ScreenshotFrame src={fig6} caption="Online vs. offline fraud exposure" />
                </div>
              </div>
            ),
          },
        ]}
      />
    </CaseStudyLayout>
  );
}
