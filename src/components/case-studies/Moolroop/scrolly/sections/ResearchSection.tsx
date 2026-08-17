import SectionHeader from '../SectionHeader';
import InfoBox from '../InfoBox';
import styles from './ResearchSection.module.css';

const COMPARISON_CRITERIA = [
  'mobile app',
  'GI-certified products only',
  'showing the GI registration number',
  'linking to the official registry',
  'showing authorised seller info',
  'discovery by geographic origin',
];

export default function ResearchSection({ onOpenComparison }: { onOpenComparison: () => void }) {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <SectionHeader
          number="02"
          title="Research"
          action={
            <button type="button" className={styles.actionButton} onClick={onOpenComparison}>
              See Comparative Graph →
            </button>
          }
        />

        <InfoBox variant="white" heading="My sources">
          <ul className={styles.sourceList}>
            <li>Official GI databases</li>
            <li>Community discussions (Reddit threads where buyers ask each other if something is real)</li>
            <li>Existing marketplaces themselves</li>
          </ul>
        </InfoBox>

        <InfoBox variant="yellow" heading="Comparative analysis">
          <p>
            Mapped MoolRoop against five existing platforms, <strong>Amazon Karigar, GiTagged,
            GoSwadeshi, India Handmade, iTokri</strong>, across six criteria:
          </p>
          <ul className={styles.sourceList}>
            {COMPARISON_CRITERIA.map((criterion) => (
              <li key={criterion}>{criterion}</li>
            ))}
          </ul>
        </InfoBox>

        <InfoBox variant="white" heading="What I found?">
          <p>
            Buyers frequently ask whether products are genuine, especially for high-value
            handicrafts bought online. Even Amazon Karigar, India&rsquo;s largest artisan
            programme, has been reported to fail at telling authentic craft apart from
            mass-produced imitations (
            <a
              href="https://restofworld.org/2024/amazon-karigar-india-handicraft-makers/"
              target="_blank"
              rel="noreferrer"
            >
              Rest of World, 2024
            </a>
            ). If the platform built specifically to solve this can&rsquo;t reliably solve it, the
            gap isn&rsquo;t a niche one.
          </p>
        </InfoBox>
      </div>
    </div>
  );
}
