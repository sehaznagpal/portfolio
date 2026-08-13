import { useState } from 'react';
import ExperimentFlowView from './ExperimentFlowView';
import PaymentJourneyView from './PaymentJourneyView';
import styles from './ProcessProgressPanelBody.module.css';

type View = 'default' | 'flow' | 'journey';

export default function ProcessProgressPanelBody() {
  const [view, setView] = useState<View>('default');

  if (view === 'flow') {
    return <ExperimentFlowView onBack={() => setView('default')} />;
  }

  if (view === 'journey') {
    return <PaymentJourneyView onBack={() => setView('default')} />;
  }

  return (
    <>
      <h2 className={styles.heading}>Building a fraud you can safely fall for</h2>
      <div className={styles.content}>
        <p className={styles.intro}>
          I built a simulated UPI-style payment interface, in{' '}
          <span className={styles.highlight}>HTML, CSS, and vanilla JavaScript</span>, with a{' '}
          <span className={styles.highlight}>Google Apps Script backend</span> logging decisions
          in real time. Light mode, mobile-only, an exit icon exactly where a real payment app
          puts one.
        </p>

        <h2 className={styles.subheading}>The design: 3 groups, 3 scenarios, 116 people</h2>
        <p className={styles.methodIntro}>
          The experiment ran as a 3×3 mixed factorial. Between subjects: control, warning, or CTA
          (a redesigned &quot;cancel payment&quot; button made visually prominent), assigned at
          random on landing. Within subjects: three fraud scenarios, each targeting a different
          bias.
        </p>

        <ul className={styles.list}>
          <li>
            <span className={styles.highlight}>Authority</span> — a fake &quot;Delhi Traffic
            Police&quot; SMS demanding an immediate fine
          </li>
          <li>
            <span className={styles.highlight}>Urgency</span> — an unknown number, later revealed
            as a friend who lost their phone, asking for an urgent transfer
          </li>
          <li>
            <span className={styles.highlight}>Social proof</span> — an Instagram listing with
            glowing comments and a countdown offer
          </li>
        </ul>

        <p className={styles.methodOutro}>
          Every participant moved through all three scenarios, saw one intervention type
          throughout, and rated their confidence after each decision. Since the live experiment
          collects real data and can&apos;t be replayed, I rebuilt one full scenario, across all
          three groups, as a standalone prototype so anyone reading this can click through what
          each group actually saw.
        </p>
      </div>

      <div className={styles.buttons}>
        <button type="button" className={styles.button} onClick={() => setView('flow')}>
          See Experiment Flow →
        </button>
        <button type="button" className={styles.button} onClick={() => setView('journey')}>
          Explore Payment Decision Journey →
        </button>
      </div>
    </>
  );
}
