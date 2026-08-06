import styles from './ResearchDesignPanelBody.module.css';

export default function ResearchDesignPanelBody() {
  return (
    <>
      <h2 className={styles.heading}>Getting from question to data</h2>
      <p className={styles.intro}>
        Once the design was locked, building the simulated interface and wiring it to a Google
        Sheets backend came first, followed by a small pilot to catch anything confusing before it
        reached real participants. Recruitment happened across two modes,{' '}
        <span className={styles.highlight}>56 offline,</span> supervised in person, and{' '}
        <span className={styles.highlight}>60 online,</span> to check whether a supervised setting
        changed behaviour. It didn&apos;t; cancellation rates held within a few points across
        both. Data cleaning excluded incomplete sessions and anything completed in under 30
        seconds, since that&apos;s not enough time to have actually read the screen.
      </p>

      <h2 className={styles.subheading}>Collecting everything</h2>
      <div className={styles.body}>
        <p>
          The case analysis and the experimental write-up were drafted in parallel, since the
          case analysis kept reshaping what the experiment&apos;s results actually meant. The
          full manuscript ran to roughly 15,000 words.
        </p>
        <p>
          The dissertation was presented at{' '}
          <span className={styles.highlight}>three external research conferences:</span> IIM
          Bodh Gaya, Shyam Lal College, and Lady Shri Ram College, each a chance to defend the
          argument outside the room it was written in.
        </p>
      </div>

      <div className={styles.noteBox}>
        <div className={styles.noteText}>
          <p className={styles.noteTitle}>Limitations &amp; What could be next?</p>
          <p className={styles.noteBody}>
            This sample, digitally fluent, English-medium university students, is close to the
            best case for these interventions to work. If the CTA still couldn&apos;t fully solve
            social proof fraud even here, it&apos;s unlikely to hold up better across India&apos;s
            full, more literacy- and language-diverse user base. That&apos;s the field experiment
            worth running next.
          </p>
        </div>
      </div>
    </>
  );
}
