import { useLayoutEffect, useRef, useState } from 'react';
import payingScreen from '../../../../../assets/images/fraud/case-study/screens/paying-screen.jpg';
import pinWarningScreen from '../../../../../assets/images/fraud/case-study/screens/pin-warning-screen.jpg';
import confirmationScreen from '../../../../../assets/images/fraud/case-study/screens/confirmation-screen.jpg';
import fig1 from '../../../../../assets/images/fraud/case-study/results/fig1-treatment-cancellation.png';
import fig2 from '../../../../../assets/images/fraud/case-study/results/fig2-treatment-bias.png';
import fig3 from '../../../../../assets/images/fraud/case-study/results/fig3-predicted-probs.png';
import fig4 from '../../../../../assets/images/fraud/case-study/results/fig4-response-time.png';
import fig5 from '../../../../../assets/images/fraud/case-study/results/fig5-confidence.png';
import fig6 from '../../../../../assets/images/fraud/case-study/results/fig6-online-offline.png';
import moneyTransferScreen from '../../../../../assets/images/fraud/case-study/payment-journey/money-transfer.jpg';
import selectAccountScreen from '../../../../../assets/images/fraud/case-study/payment-journey/select-account.jpg';
import selectAccountCtaScreen from '../../../../../assets/images/fraud/case-study/payment-journey/select-account-cta.jpg';
import pinScreen from '../../../../../assets/images/fraud/case-study/payment-journey/pin.jpg';
import pinWarningJourneyScreen from '../../../../../assets/images/fraud/case-study/payment-journey/pin-warning.jpg';
import transferringScreen from '../../../../../assets/images/fraud/case-study/payment-journey/transferring.jpg';
import successScreen from '../../../../../assets/images/fraud/case-study/payment-journey/success.jpg';
import phoneBezel from '../../../../../assets/images/fraud/case-study/payment-journey/phone-bezel.png';
import connectorTop from '../../../../../assets/images/fraud/case-study/payment-journey/connector-top.svg';
import connectorBottom from '../../../../../assets/images/fraud/case-study/payment-journey/connector-bottom.svg';
import ExperimentFlowView from '../grid/ExperimentFlowView';
import styles from './FraudArticleContent.module.css';

const WORDS_PER_MINUTE = 210;

const DIMENSIONS = ['Literacy Access', 'Typological Fit', 'Authority Dynamics', 'Linguistic Reach'];

const CASES = [
  "UK's APP fraud experiments",
  "Alipay's warning redesign",
  'Five-country PMT study',
  'Nigerian anti-fraud trial',
  "Singapore's Scamshield",
  "Australia's Scamwatch",
];

/* Interpretation copy reused verbatim from ResultsGraphsView.tsx (the Cards
   variant's own reading of these same six figures). */
const FIGURES = [
  {
    src: fig1,
    title: 'Figure 1: Cancellation rate by treatment group',
    interpretation:
      'People who saw the cancel button (CTA) stopped the fraudulent payment far more often than people who got a warning or nothing at all. The warning barely did better than doing nothing.',
  },
  {
    src: fig2,
    title: 'Figure 2: Cancellation rate by treatment and bias type',
    interpretation:
      'The cancel button worked really well against authority and urgency scams, nearly doubling how often people stopped the payment. But against social proof scams, like fake reviews and countdown offers, it barely helped.',
  },
  {
    src: fig3,
    title: 'Figure 3: Predicted probabilities',
    interpretation:
      'This confirms the same pattern using a statistical model instead of raw numbers. Both the warning and the cancel button dip sharply for social proof scams, showing this gap is real and not just noise in the data.',
  },
  {
    src: fig4,
    title: 'Figure 4: Response time',
    interpretation:
      'People did not take longer to decide just because they saw a warning or a cancel button. This means the cancel button worked by making the safe choice easier, not by making people stop and think harder.',
  },
  {
    src: fig5,
    title: 'Figure 5: Self-rated confidence',
    interpretation:
      "People who saw the cancel button felt almost equally confident whether they made the safe choice or the risky one. This suggests some people who still paid weren't confused, they made that choice knowingly.",
  },
  {
    src: fig6,
    title: 'Figure 6: Online vs offline recruitment',
    interpretation:
      'Whether someone took the experiment online or in person barely changed the results. The cancel button worked about the same either way, so the findings hold up across both settings.',
  },
];

function Divider({ variant }: { variant?: 'header' | 'tags' }) {
  const variantClass = variant === 'header' ? styles.dividerHeader : variant === 'tags' ? styles.dividerTags : '';
  return <hr className={`${styles.divider} ${variantClass}`} />;
}

function Figure({
  src,
  alt,
  label,
  interpretation,
}: {
  src: string;
  alt: string;
  label?: string;
  interpretation?: string;
}) {
  return (
    <figure className={styles.figure}>
      <div className={styles.figureFrame}>
        <img src={src} alt={alt} />
      </div>
      {label && <figcaption className={styles.figureLabel}>{label}</figcaption>}
      {interpretation && <p className={styles.figureInterpretation}>{interpretation}</p>}
    </figure>
  );
}

/* The "Explore Payment Decision Journey" replay, rebuilt locally for the
   Article rather than reusing PaymentJourneyView.tsx directly: that
   component is shared with the Cards variant (ProcessProgressPanelBody), and
   this visual needs a different header, explicit group-picker pills instead
   of auto-advancing dots, and no "Go Back" affordance — changing any of that
   in the shared file would change Cards' own behaviour too. Same underlying
   assets and phone-filmstrip layout, just a different control surface. */
const GROUPS = ['Control', 'Warning', 'CTA'] as const;
const GROUP_BUTTON_ORDER = [0, 2, 1] as const; // Control, CTA, Warning

const PHONE_LEFT = ['3.922%', '22.444%', '40.966%', '59.488%', '78.011%'];

const CONNECTORS: { left: string; variant: 'top' | 'bottom' }[] = [
  { left: '13.116%', variant: 'top' },
  { left: '32.165%', variant: 'bottom' },
  { left: '50.665%', variant: 'top' },
  { left: '70.204%', variant: 'bottom' },
];

function screensForGroup(group: number) {
  return [
    moneyTransferScreen,
    group === 2 ? selectAccountCtaScreen : selectAccountScreen,
    group === 1 ? pinWarningJourneyScreen : pinScreen,
    transferringScreen,
    successScreen,
  ];
}

function PaymentFlowExplorer() {
  const [group, setGroup] = useState(0);
  const screens = screensForGroup(group);

  return (
    <div className={styles.pjWrap}>
      <p className={styles.pjHeading}>Explore payment flows as a participant of:</p>

      <div className={styles.pjButtons}>
        {GROUP_BUTTON_ORDER.map((i) => (
          <button
            key={GROUPS[i]}
            type="button"
            className={`${styles.pjButton} ${i === group ? styles.pjButtonActive : ''}`}
            onClick={() => setGroup(i)}
            aria-pressed={i === group}
          >
            {GROUPS[i]}
          </button>
        ))}
      </div>

      <div className={styles.pjPhones}>
        {screens.map((src, i) => (
          <div className={styles.pjPhone} key={i} style={{ left: PHONE_LEFT[i] }}>
            <div className={styles.pjPhoneScreen}>
              <img src={src} alt={`Step ${i + 1} of the ${GROUPS[group]} group payment flow`} />
            </div>
            <img className={styles.pjBezel} src={phoneBezel} alt="" />
          </div>
        ))}

        {CONNECTORS.map((c, i) => (
          <div
            key={i}
            className={`${styles.pjConnector} ${c.variant === 'top' ? styles.pjConnectorTop : styles.pjConnectorBottom}`}
            style={{ left: c.left }}
          >
            <img src={c.variant === 'top' ? connectorTop : connectorBottom} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FraudArticleContent() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [readMinutes, setReadMinutes] = useState<number | null>(null);

  /* Real word count of the rendered body (headings, paragraphs, lists,
     figure captions — not the header/tags above it, which live outside
     bodyRef), read back from the DOM after mount rather than a hand-counted
     constant, so it never drifts from the actual copy above. */
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
            <span className={styles.titleLight}>Designing Against </span>
            <span className={styles.titleAccent}>Fraud</span>
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
            <span className={styles.tagPill}>My role</span>
            <p className={styles.tagText}>
              <span className={styles.tagStrong}>Solo researcher and designer.</span> I picked the
              question, designed the study, built the simulated payment interface, ran the
              experiment on 116 people, analysed the results, and wrote the paper.
            </p>
          </div>

          <div className={styles.tagProse}>
            <span className={styles.tagPill}>In brief</span>
            <p className={styles.tagText}>
              A behavioural economics <span className={styles.tagStrong}>dissertation</span> and a
              randomised controlled trial, testing whether the fraud-prevention patterns that work
              in the UK, China, and Singapore actually work here, or just look like they should.
            </p>
          </div>

          <div className={styles.tagFacts}>
            <div className={styles.factRow}>
              <span className={styles.tagPillSmall}>Year</span>
              <span className={styles.factValue}>2026</span>
            </div>
            <div className={styles.factRow}>
              <span className={styles.tagPillSmall}>Duration</span>
              <span className={styles.factValue}>1 Year</span>
            </div>
            <div className={styles.factRow}>
              <span className={styles.tagPillSmall}>Affiliation</span>
              <span className={styles.factValue}>Hansraj College, Department of Economics</span>
            </div>
          </div>
        </div>

        <Divider variant="tags" />

        <div className={styles.body} ref={bodyRef}>
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>
              A security problem that isn&apos;t really about security
            </h3>
            <p className={styles.paragraph}>
              Digital fraud losses in India nearly tripled between 2023 and 2025, from ₹7,488
              crore to ₹22,495 crore. An estimated fifth of victims never even report it.
            </p>
            <p className={styles.paragraph}>
              The mechanism is rarely a technical break-in. It&apos;s phishing, fake QR codes,
              &quot;digital arrest&quot; calls. The victim authorises the payment themselves. Once
              that happens, no security architecture can step in.
            </p>

            <div className={styles.figureRow}>
              <Figure
                src={payingScreen}
                alt="Paying Delhi Traffic Police: payment screen"
                label='"Paying Delhi Traffic Police": the payment flow used throughout the experiment'
              />
              <Figure
                src={pinWarningScreen}
                alt="Enter PIN screen with fraud warning banner"
                label="Enter PIN screen with fraud warning banner"
              />
              <Figure src={confirmationScreen} alt="Payment confirmed screen" label="Payment confirmed" />
            </div>

            <p className={styles.paragraph}>
              So this isn&apos;t really a security problem. It&apos;s a behavioural one.
              That&apos;s where the econ side of me got interested, and the product side followed
              close behind.
            </p>
            <p className={styles.paragraph}>
              Behavioural economics studies how the structure of a choice shapes what people do.
              Product design does the same thing every day without calling it that. A warning
              label, a button colour, a default option: these are choice architecture, whether or
              not anyone on the team uses that phrase.
            </p>
            <p className={styles.paragraph}>
              I got a year, as part of my college&apos;s research track, to sit with one question:{' '}
              <span className={styles.tagStrong}>
                do the fraud-prevention interventions that work abroad, redesigned confirmation
                screens, prominent cancel buttons, actually work in India, or do they just look
                like they should?
              </span>
            </p>
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Why not just run an experiment and call it done</h3>
            <p className={styles.paragraph}>
              A sample of 116 people can&apos;t represent India&apos;s fraud landscape on its own.
              So the dissertation runs on two components: a structured case study analysis of six
              international behavioural anti-fraud interventions, and a supplementary experiment
              testing one dimension of that analysis empirically. The case analysis carries the
              paper&apos;s main argument. The experiment gives it a controlled, if narrower, piece
              of evidence.
            </p>

            <p className={styles.paragraph}>
              <span className={styles.tagStrong}>The four-dimension lens</span> I used to judge
              whether an intervention would transfer:
            </p>
            <ul className={styles.list}>
              {[
                ['Literacy Access', 'can the user actually process this intervention, in the time they have, at the moment they need to?'],
                ['Typological Fit', "does the fraud type the intervention was built for resemble what's actually common in India?"],
                ['Authority Dynamics', "does the user feel psychologically free to defy the fraudster's authority, or does cultural deference override the fix?"],
                ['Linguistic Reach', 'can the intervention actually reach a population speaking this many languages?'],
              ].map(([title, description]) => (
                <li key={title}>
                  <span className={styles.tagStrong}>{title}</span> — {description}
                </li>
              ))}
            </ul>

            <p className={styles.paragraph}>
              <span className={styles.tagStrong}>Choosing the six cases:</span> picked to vary
              across intervention type, economic context, and fraud category, with at least one
              from a lower-middle-income country, since most existing literature is built entirely
              on Western evidence. The six: the UK&apos;s APP fraud experiments, Alipay&apos;s
              warning redesign, a five-country PMT study, a Nigerian anti-fraud trial,
              Singapore&apos;s Scamshield architecture, and Australia&apos;s Scamwatch campaigns.
            </p>

            <div className={styles.diagram}>
              <p className={styles.diagramLabel}>The four-dimension lens</p>
              <div className={styles.diagramRow}>
                {DIMENSIONS.map((d) => (
                  <span key={d} className={styles.diagramChip}>
                    {d}
                  </span>
                ))}
              </div>
              <p className={styles.diagramConnector} aria-hidden="true">
                measured against ↓
              </p>
              <p className={styles.diagramLabel}>The six cases</p>
              <div className={styles.diagramRow}>
                {CASES.map((c) => (
                  <span key={c} className={`${styles.diagramChip} ${styles.diagramChipCase}`}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Building a fraud you can safely fall for</h3>
            <p className={styles.paragraph}>
              I built a simulated UPI-style payment interface in HTML, CSS, and vanilla
              JavaScript, with a Google Apps Script backend logging decisions in real time. Light
              mode, mobile-only, an exit icon exactly where a real payment app puts one.
            </p>

            <p className={styles.paragraph}>
              <span className={styles.tagStrong}>The design: 3 groups, 3 scenarios, 116 people.</span>{' '}
              The experiment ran as a 3×3 mixed factorial. Between subjects: control, warning, or
              CTA (a redesigned &quot;cancel payment&quot; button made visually prominent),
              assigned at random on landing. Within subjects: three fraud scenarios, each targeting
              a different bias.
            </p>
            <ul className={styles.list}>
              <li>
                <span className={styles.tagStrong}>Authority</span> — a fake &quot;Delhi Traffic
                Police&quot; SMS demanding an immediate fine
              </li>
              <li>
                <span className={styles.tagStrong}>Urgency</span> — an unknown number, later
                revealed as a friend who lost their phone, asking for an urgent transfer
              </li>
              <li>
                <span className={styles.tagStrong}>Social proof</span> — an Instagram listing with
                glowing comments and a countdown offer
              </li>
            </ul>
            <p className={styles.paragraph}>
              Every participant moved through all three scenarios, saw one intervention type
              throughout, and rated their confidence after each decision. Since the live
              experiment collects real data and can&apos;t be replayed, I rebuilt one full
              scenario, across all three groups, as a standalone prototype, so anyone reading this
              can click through what each group actually saw.
            </p>

            <div className={styles.componentFrame}>
              <PaymentFlowExplorer />
            </div>
            <p className={styles.figureLabel}>Interactive: explore what each group actually saw</p>

            <div className={`${styles.componentFrame} ${styles.componentFrameTall}`}>
              <ExperimentFlowView />
            </div>
            <p className={styles.figureLabel}>
              Diagram: the full experiment flow, from landing to final dataset
            </p>
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Getting from question to data</h3>
            <p className={styles.paragraph}>
              Once the design was locked, building the simulated interface and wiring it to a
              Google Sheets backend came first, followed by a small pilot to catch anything
              confusing before it reached real participants.
            </p>
            <p className={styles.paragraph}>
              Recruitment happened across two modes: 56 offline, supervised in person, and 60
              online, to check whether a supervised setting changed behaviour. It didn&apos;t;
              cancellation rates held within a few points across both.
            </p>
            <p className={styles.paragraph}>
              Data cleaning excluded incomplete sessions and anything completed in under 30
              seconds, since that&apos;s not enough time to have actually read the screen.
            </p>
            <p className={styles.paragraph}>
              The case analysis and experimental write-up were drafted in parallel, since the case
              analysis kept reshaping what the experiment&apos;s results actually meant. The full
              manuscript ran to roughly 15,000 words, presented at three external research
              conferences: IIM Bodh Gaya, Shyam Lal College, and Lady Shri Ram College, each a
              chance to defend the argument outside the room it was written in.
            </p>
            <p className={styles.paragraph}>
              <span className={styles.tagStrong}>A limitation worth naming up front:</span> this
              sample, digitally fluent, English-medium university students, is close to the best
              case for these interventions to work. If the CTA still couldn&apos;t fully solve
              social proof fraud even here, it&apos;s unlikely to hold up better across
              India&apos;s full, more literacy- and language-diverse user base. That&apos;s the
              field experiment worth running next.
            </p>
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>What I concluded</h3>
            <p className={styles.paragraph}>
              <span className={styles.tagStrong}>From the case analysis:</span> across all six
              international cases, the same pattern held. Every intervention embeds assumptions
              about its users that break down somewhere in India. The UK&apos;s CTA design assumes
              text literacy and weak deference to authority, both of which fail for large parts of
              India&apos;s UPI base. The clearest gap across all six: none were built against
              social proof fraud, peer-validated scams through social commerce, because it
              isn&apos;t the dominant typology anywhere they were tested.
            </p>

            <p className={styles.paragraph}>
              <span className={styles.tagStrong}>From the experiment:</span>
            </p>
            <ul className={styles.list}>
              <li>
                The CTA worked, decisively. Cancellation rates rose from{' '}
                <span className={styles.tagStrong}>36.4% in control to 68.5%</span> under the CTA,
                against only <span className={styles.tagStrong}>47.2%</span> for the warning,
                which wasn&apos;t statistically different from doing nothing at all.
              </li>
              <li>
                The effect wasn&apos;t uniform. Split by bias type, the CTA nearly doubled
                cancellation for <span className={styles.tagStrong}>authority</span> (40.9% →
                77.8%) and <span className={styles.tagStrong}>urgency</span> (31.8% → 75.0%), but
                only inched up <span className={styles.tagStrong}>social proof</span> (36.4% →
                52.8%), the exact gap the case analysis had already flagged.
              </li>
              <li>
                Self-rated confidence in spotting fraud had no correlation with whether people
                actually cancelled the payment (r = -0.035). Feeling prepared and being prepared
                turned out to be almost unrelated.
              </li>
            </ul>

            <div className={styles.figureGrid}>
              {FIGURES.map((fig) => (
                <Figure
                  key={fig.title}
                  src={fig.src}
                  alt={fig.title}
                  label={fig.title}
                  interpretation={fig.interpretation}
                />
              ))}
            </div>

            <p className={styles.paragraph}>
              So: choice architecture works in India. It just doesn&apos;t work evenly. The gap is
              fraud type, not literacy or geography, which is a more specific and more useful
              finding than &quot;context matters.&quot;
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
