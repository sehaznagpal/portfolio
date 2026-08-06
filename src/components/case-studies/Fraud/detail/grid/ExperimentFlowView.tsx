import styles from './ExperimentFlowView.module.css';

export default function ExperimentFlowView({ onBack }: { onBack: () => void }) {
  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.goBack} onClick={onBack}>
        ←Go Back
      </button>

      <h2 className={styles.title}>Experiment Flow</h2>

      <div className={styles.flow}>
        <div className={styles.node}>Participant Lands on Study Link</div>
        <div className={styles.connector} />
        <div className={styles.node}>Instructions + Consent Page</div>
        <div className={styles.connector} />
        <div className={`${styles.node} ${styles.nodeAccent}`}>
          Random Group Assignment
          <br />
          (backend JS randomisation, undisclosed to participant)
        </div>

        <div className={styles.branchWrap}>
          <div className={styles.branchStub} style={{ left: '16.667%' }} />
          <div className={styles.branchStub} style={{ left: '50%' }} />
          <div className={styles.branchStub} style={{ left: '83.333%' }} />
          <div className={`${styles.groupNode} ${styles.groupControl}`}>Control Group</div>
          <div className={`${styles.groupNode} ${styles.groupWarning}`}>Warning Group</div>
          <div className={`${styles.groupNode} ${styles.groupCta}`}>CTA Group</div>
        </div>

        <div className={styles.mergeWrap}>
          <div className={styles.mergeStubUp} style={{ left: '16.667%' }} />
          <div className={styles.mergeStubUp} style={{ left: '50%' }} />
          <div className={styles.mergeStubUp} style={{ left: '83.333%' }} />
        </div>
        <div className={styles.connector} />

        <div className={styles.loopRegion}>
          <div className={styles.subgraph}>
            <p className={styles.subgraphLabel}>Scenario Sequence (order randomised per participant)</p>
            <div className={styles.scenarioRow}>
              <div className={styles.scenarioNode}>
                Scenario: Authority Bias
                <br />
                Fake &quot;Delhi Traffic Police&quot; SMS demanding immediate fine
              </div>
              <div className={styles.scenarioNode}>
                Scenario: Urgency Bias
                <br />
                Unknown number requesting urgent transfer
              </div>
              <div className={styles.scenarioNode}>
                Scenario: Social Proof Bias
                <br />
                Instagram listing with glowing comments + countdown
              </div>
            </div>
          </div>

          <div className={styles.connector} />
          <div className={`${styles.node} ${styles.nodeAccent}`}>
            Payment Decision per Scenario
            <br />
            (Cancel / Proceed)
          </div>

          <div className={styles.connector} />
          <div className={`${styles.node} ${styles.nodeAccent}`}>
            Post-Scenario Confidence Rating
            <br />
            (1–5 Likert scale)
          </div>

          <div className={styles.connector} />
          <div className={styles.diamond}>
            <span className={styles.diamondText}>All 3 scenarios completed?</span>
          </div>

          <div className={styles.loopLine} />
          <div className={styles.loopStubTop} />
          <div className={styles.loopStubBottom} />
          <p className={styles.loopLabel}>No, next scenario — loops back to the scenario sequence</p>
        </div>

        <p className={styles.yesLabel}>Yes ↓</p>
        <div className={styles.connector} />

        <div className={styles.node}>Post-Experiment Survey (UPI usage habits)</div>
        <div className={styles.connector} />
        <div className={styles.node}>Data Logged to Google Sheets via Apps Script Backend</div>
        <div className={styles.connector} />
        <div className={styles.node}>
          Session Validity Check
          <br />
          (exclude &lt;30s completions, incomplete sessions, duplicate entries)
        </div>
        <div className={styles.connector} />
        <div className={`${styles.node} ${styles.nodeFinal}`}>
          Final Dataset
          <br />
          N = 116 participants, 348 scenario-level observations
        </div>
      </div>
    </div>
  );
}
