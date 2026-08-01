import ComparisonTable from '../ComparisonTable';
import styles from './ResearchTab.module.css';

export default function ResearchTab() {
  return (
    <div className={styles.tab}>
      <div className={styles.intro}>
        <h2 className="ms-heading">Understanding the existing experience</h2>
        <div className="ms-body">
          <p>
            Before proposing a solution, I wanted to understand how authenticity is currently
            communicated across existing marketplaces and official government resources.
          </p>
        </div>
      </div>

      <div className={styles.methods}>
        <span className={styles.pill}>Official GI databases</span>
        <span className={styles.plus}>+</span>
        <span className={styles.pill}>Community discussions (like reddit)</span>
        <span className={styles.plus}>+</span>
        <span className={styles.pill}>Existing marketplaces</span>
      </div>

      <div className={styles.section}>
        <h3 className="ms-heading">Observation</h3>
        <div className="ms-body">
          <p>
            Buyers frequently ask whether products are genuine, especially when purchasing
            high-value handicrafts online. Even{' '}
            <a
              href="https://restofworld.org/2024/amazon-karigar-india-handicraft-makers/"
              target="_blank"
              rel="noreferrer"
            >
              Amazon Karigar
            </a>
            , India&rsquo;s largest artisan programme, has been reported to fail at distinguishing
            authentic craft from mass-produced imitations. The problem was never the availability
            of information. The problem was the effort required to access and interpret it.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className="ms-heading">Competitive landscape</h3>
        <div className="ms-body">
          <p>
            Several platforms already promote Indian handicrafts. Instead of replacing them, I
            explored how the shopping experience could become more transparent by embedding
            verification directly into the purchase journey.
          </p>
        </div>
        <ComparisonTable />
      </div>
    </div>
  );
}
