import styles from './ResearchDesignPanelBody.module.css';

export default function ResearchDesignPanelBody() {
  return (
    <>
      <h2 className={styles.heading}>Getting from question to data</h2>
      <div className={styles.content}>
        <p className={styles.paragraph}>
          Once the design was locked, building the simulated interface and wiring it to a Google
          Sheets backend came first, followed by a small pilot to catch anything confusing before
          it reached real participants. Recruitment happened across two modes,{' '}
          <span className={styles.highlight}>56 offline,</span> supervised in person, and{' '}
          <span className={styles.highlight}>60 online,</span> to check whether a supervised
          setting changed behaviour. It didn&apos;t; cancellation rates held within a few points
          across both. Data cleaning excluded incomplete sessions and anything completed in under
          30 seconds, since that&apos;s not enough time to have actually read the screen.
        </p>

        <h3 className={styles.subheading}>Collecting everything</h3>
        <ul className={styles.list}>
          <li>
            The case analysis and experimental write-up were drafted in parallel, since the case
            analysis kept reshaping what the experiment&apos;s results actually meant, the full
            manuscript ran to roughly 15,000 words
          </li>
          <li>
            Presented at{' '}
            <span className={styles.highlight}>three external research conferences</span>: IIM
            Bodh Gaya, Shyam Lal College, and Lady Shri Ram College, each a chance to defend the
            argument outside the room it was written in
          </li>
        </ul>

        <h3 className={styles.subheading}>Limitations &amp; What could be next?</h3>
        <p className={styles.paragraph}>
          This sample, digitally fluent, English-medium university students, is close to the best
          case for these interventions to work. If the CTA still couldn&apos;t fully solve social
          proof fraud even here, it&apos;s unlikely to hold up better across India&apos;s full,
          more literacy- and language-diverse user base. That&apos;s the field experiment worth
          running next.
        </p>
      </div>
    </>
  );
}
