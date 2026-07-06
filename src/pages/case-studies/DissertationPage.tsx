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
import Sitemap from '../../components/case-study/Sitemap';
import { dissertationSitemap, dissertationBranchingSitemap } from '../../components/case-study/sitemap-data';
import { parseCaseStudyMarkdown } from '../../lib/parseCaseStudyMarkdown';
import raw from '../../content/case-studies/dissertation.md?raw';
import visualStyles from '../../components/case-study/VisualSection.module.css';
import layoutStyles from '../../components/case-study/CaseStudyLayout.module.css';

import moneyTransferImg from '../../assets/images/case-studies/dissertation/money-transfer.jpg';
import selectBankImg from '../../assets/images/case-studies/dissertation/select-bank-account.jpg';
import pinImg from '../../assets/images/case-studies/dissertation/pin.jpg';
import pinWarningImg from '../../assets/images/case-studies/dissertation/pin-warning.jpg';
import selectBankCtaImg from '../../assets/images/case-studies/dissertation/select-bank-account-cta.jpg';
import transferringImg from '../../assets/images/case-studies/dissertation/transferring.jpg';
import successImg from '../../assets/images/case-studies/dissertation/success.jpg';
import fig1 from '../../assets/images/case-studies/dissertation/fig1-treatment-cancellation.png';
import fig2 from '../../assets/images/case-studies/dissertation/fig2-treatment-bias.png';

const ACCENT = '#CF0B0B';
const DRIVE_URL = 'https://drive.google.com/file/d/1D8gnEofN4sp29NxSCHbM-e_iPvJtrti-/view?usp=sharing';

const RAIL = [
  { id: 'overview', label: 'Overview' },
  { id: 'the-stakes', label: 'The Stakes' },
  { id: 'what-i-tested', label: 'What I Tested' },
  { id: 'experiment-flow', label: 'Experiment Flow' },
  { id: 'base-interface', label: 'The Base Interface' },
  { id: 'interventions', label: 'The Interventions' },
  { id: 'results', label: 'Results' },
  { id: 'whats-next', label: "What's Next" },
  { id: 'reflection', label: 'Reflection' },
];

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

  const whatsNext = parsed.chapters.find((c) => c.heading === "What I'd want to test next");
  const reflection = parsed.chapters.find((c) => c.heading === 'What surprised me, looking back');

  return (
    <CaseStudyLayout pageTitle="Designing Against Fraud" accentColor={ACCENT} tone="dark">
      <CaseStudyHero
        roleTag="Behavioural research + interface design · Solo, 116-participant experiment · Presented at 3 conferences"
        title={title}
        inShort={parsed.inShort}
        outboundHref={DRIVE_URL}
        outboundLabel="Read the Full Dissertation"
        background="var(--chrome-bg)"
        textColor="var(--bg-canvas)"
        media={
          <div style={{ position: 'relative', height: '100%', overflow: 'hidden', borderRadius: 12 }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                gap: 16,
                opacity: 0.5,
                filter: 'grayscale(0.5)',
              }}
            >
              <img src={pinWarningImg} alt="" style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
              <img src={selectBankCtaImg} alt="" style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to right, var(--chrome-bg) 0%, transparent 18%, transparent 82%, var(--chrome-bg) 100%), linear-gradient(to bottom, var(--chrome-bg) 0%, transparent 20%, transparent 75%, var(--chrome-bg) 100%)',
              }}
            />
          </div>
        }
      />

      <SectionRail sections={RAIL} />

      <VisualSection
        id="the-stakes"
        label="The Stakes"
        media={
          <StatComparison
            from={{ value: '₹7,488 cr', label: 'lost to digital fraud in India, 2023' }}
            to={{ value: '₹22,495 cr', label: 'lost to digital fraud in India, 2025' }}
          />
        }
        caption="Digital fraud losses in India, nearly tripling in two years, before accounting for the roughly one in five victims who never report it at all."
      />

      <VisualSection
        id="what-i-tested"
        label="What I Tested"
        media={<Sitemap data={dissertationSitemap} accentColor={ACCENT} />}
        caption="The full experiment path: consent, random assignment into one of three intervention groups, three fraud scenarios per participant, then a simulated payment flow measuring what they actually did."
      />

      <VisualSection
        id="experiment-flow"
        label="Experiment Flow"
        media={<Sitemap data={dissertationBranchingSitemap} accentColor={ACCENT} />}
        caption="Every participant, regardless of intervention group, faced all three fraud scenarios in randomised order, a mixed factorial design chosen so scenario order and individual variation wouldn't inflate the results."
      />

      <VisualSection
        id="base-interface"
        label="The Base Interface"
        media={
          <ScreenGroup
            layout="filmstrip"
            items={[
              { src: moneyTransferImg, caption: 'Money transfer' },
              { src: selectBankImg, caption: 'Select bank account' },
              { src: pinImg, caption: 'Enter PIN' },
              { src: transferringImg, caption: 'Transferring' },
              { src: successImg, caption: 'Success' },
            ]}
          />
        }
        caption="Money transfer, select bank account, enter PIN, transfer, success, exactly the rhythm anyone using a UPI app already knows by muscle memory. Control ran straight through this with no interruption."
      />

      <VisualSection
        id="interventions"
        label="The Interventions"
        mediaMaxWidth="640px"
        media={
          <ScreenGroup
            layout="grid"
            items={[
              { src: pinWarningImg, caption: 'Warning: caution banner' },
              { src: selectBankCtaImg, caption: 'CTA: Cancel Payment / Continue anyway' },
            ]}
          />
        }
        caption="The safer action had to be the visually louder one: a red Cancel Payment button weighted to win against a lighter Continue anyway, not just a warning asking people to read carefully under pressure."
      />

      <section id="results" className={visualStyles.section}>
        <h2 className={visualStyles.label}>Results</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
          <div>
            <ScreenshotFrame src={fig1} />
            <p className={visualStyles.caption}>
              68.5% cancelled with the CTA redesign, against 36.4% for control, a difference far too
              large to attribute to chance. The warning condition moved the number up only modestly.
            </p>
          </div>
          <div>
            <ScreenshotFrame src={fig2} />
            <p className={visualStyles.caption}>
              The CTA roughly doubled cancellation against authority and urgency fraud. Against social
              proof, its effect shrank to a fraction of that, the most important finding in the project.
            </p>
          </div>
        </div>
      </section>

      {whatsNext && <TextSection id="whats-next" heading="What's Next" body={whatsNext.body} />}
      {reflection && <TextSection id="reflection" heading="Reflection" body={reflection.body} />}

      <div className={layoutStyles.footer}>
        <OutboundButton
          href={DRIVE_URL}
          label="Read the Full Dissertation"
          background={ACCENT}
          color="var(--bg-canvas)"
        />
      </div>
    </CaseStudyLayout>
  );
}
