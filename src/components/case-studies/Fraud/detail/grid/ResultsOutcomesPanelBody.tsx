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
      <h2 className={styles.heading}>What I concluded</h2>
      <div className={styles.content}>
        <h3 className={styles.subheading}>What the case analysis found</h3>
        <p className={styles.paragraph}>
          Across all six international cases, the same pattern held: every intervention embeds
          assumptions about its users that break down somewhere in India. The UK&apos;s CTA
          design assumes text literacy and weak deference to authority, both of which fail for
          large parts of India&apos;s UPI base. The clearest gap across all six: none were built
          against social proof fraud, peer-validated scams through social commerce, because it
          isn&apos;t the dominant typology anywhere they were tested.
        </p>

        <h3 className={styles.subheading}>What the experiment found</h3>
        <ul className={styles.list}>
          <li>
            The CTA worked, decisively: cancellation rates rose from{' '}
            <span className={styles.highlight}>36.4% in control to 68.5%</span> under the CTA,
            against <span className={styles.highlight}>only 47.2%</span> for the warning, not
            statistically different from doing nothing at all
          </li>
          <li>
            The effect wasn&apos;t uniform: split by bias type, the CTA nearly doubled
            cancellation for <span className={styles.highlight}>authority</span> (40.9% → 77.8%)
            and <span className={styles.highlight}>urgency</span> (31.8% → 75.0%), but only
            inched up <span className={styles.highlight}>social proof</span> (36.4% → 52.8%), the
            exact gap the case analysis had already flagged
          </li>
          <li>
            Self-rated confidence in spotting fraud had no correlation with whether people
            actually cancelled the payment (r = -0.035), feeling prepared and being prepared
            turned out to be almost unrelated
          </li>
        </ul>
      </div>

      <button type="button" className={styles.button} onClick={() => setView('graphs')}>
        Explore Results →
      </button>
    </>
  );
}
