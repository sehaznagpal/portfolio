import styles from './MethodologyPanelBody.module.css';

const LENS_ITEMS = [
  {
    title: 'Literacy Access',
    description: '(can the user actually process this intervention, in the time they have, at the moment they need to?)',
  },
  {
    title: 'Typological Fit',
    description: "(does the fraud type the intervention was built for resemble what's actually common in India?)",
  },
  {
    title: 'Authority Dynamics',
    description: "(does the user feel psychologically free to defy the fraudster's authority, or does cultural deference override the fix?)",
  },
  {
    title: 'Linguistic Reach',
    description: '(can the intervention actually reach a population speaking this many languages?)',
  },
];

export default function MethodologyPanelBody() {
  return (
    <>
      <h2 className={styles.heading}>Why not just run an experiment and call it done</h2>
      <p className={styles.intro}>
        A sample of 116 people can&apos;t represent India&apos;s fraud landscape on its own. So
        the dissertation runs on <span className={styles.highlight}>two components:</span> a
        structured case study analysis of six international behavioural anti-fraud interventions
        (selected on four dimensions), and a supplementary experiment testing one dimension of
        that analysis empirically. The case analysis carries the paper&apos;s main argument, the
        experiment gives it a controlled, if narrower, piece of evidence.
      </p>

      <h3 className={`${styles.columnHeading} ${styles.lensHeading}`}>The four-dimension lens</h3>
      <h3 className={`${styles.columnHeading} ${styles.casesHeading}`}>Choosing the six cases</h3>

      <div className={styles.lensList}>
        {LENS_ITEMS.map((item) => (
          <p key={item.title} className={styles.lensItem}>
            <span className={styles.lensTitle}>
              <span>{item.title}</span>
            </span>
            <span className={styles.lensDescription}>{item.description}</span>
          </p>
        ))}
      </div>

      <div className={styles.casesBox}>
        <p className={styles.casesText}>
          Cases were picked to vary across intervention type, economic context, and fraud
          category, with at least one drawn from a lower-middle-income country, since most
          existing literature is built entirely on Western evidence. The six: the{' '}
          <span className={styles.highlight}>
            UK&apos;s APP fraud experiments, Alipay&apos;s warning redesign, a five-country PMT
            study, a Nigerian anti-fraud trial, Singapore&apos;s Scamshield architecture, and
            Australia&apos;s Scamwatch campaigns.
          </span>
        </p>
      </div>
    </>
  );
}
