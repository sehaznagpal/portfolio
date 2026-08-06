import { useState } from 'react';
import ResultsGraphsView from './ResultsGraphsView';
import styles from './ResultsOutcomesPanelBody.module.css';

type View = 'default' | 'graphs';

export default function ResultsOutcomesPanelBody() {
  const [view, setView] = useState<View>('default');

  if (view === 'graphs') {
    return <ResultsGraphsView onBack={() => setView('default')} />;
  }

  return (
    <>
      <h2 className={styles.heading}>What the case analysis found</h2>
      <p className={styles.intro}>
        Across all six international cases, the same pattern held: every intervention embeds
        assumptions about its users that break down somewhere in India. The UK&apos;s CTA design
        assumes text literacy and weak deference to authority, both of which fail for large parts
        of India&apos;s UPI base. The clearest gap across all six: none were built against social
        proof fraud, peer-validated scams through social commerce, because it isn&apos;t the
        dominant typology anywhere they were tested.
      </p>

      <h2 className={styles.subheading}>What the experiment found</h2>
      <div className={styles.body}>
        <p>
          The CTA worked, decisively. Cancellation rates rose from{' '}
          <span className={styles.highlight}>36.4% in control to 68.5%</span> under the CTA,
          against <span className={styles.highlight}>only 47.2%</span> for the warning, not
          statistically different from doing nothing at all.
        </p>
        <p>
          But the effect wasn&apos;t uniform. Split by bias type, the CTA nearly doubled
          cancellation for <span className={styles.highlight}>authority</span> (40.9% → 77.8%)
          and <span className={styles.highlight}>urgency</span> (31.8% → 75.0%), but only inched
          up <span className={styles.highlight}>social proof</span> (36.4% → 52.8%), the exact gap
          the case analysis had already flagged.
        </p>
        <p>
          One more finding worth sitting with: self-rated confidence in spotting fraud had no
          correlation with whether people actually cancelled the payment (r = -0.035). Feeling
          prepared and being prepared turned out to be almost unrelated.
        </p>
      </div>

      <button type="button" className={styles.button} onClick={() => setView('graphs')}>
        Explore Results →
      </button>
    </>
  );
}
