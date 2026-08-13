import styles from './TopicPanelBody.module.css';

export default function TopicPanelBody() {
  return (
    <>
      <h2 className={styles.heading}>A security problem that isn&apos;t really about security</h2>
      <div className={styles.content}>
        <h3 className={styles.subheading}>The numbers</h3>
        <ul className={styles.list}>
          <li>
            Digital fraud losses in India nearly tripled between{' '}
            <span className={styles.highlight}>2023 and 2025, from ₹7,488 crore to ₹22,495 crore</span>
          </li>
          <li>An estimated fifth of victims never even report it</li>
          <li>
            The mechanism is rarely a technical break-in: phishing, fake QR codes, &quot;digital
            arrest&quot; calls
          </li>
          <li>
            The victim authorises the payment themselves, so once that happens,{' '}
            <span className={styles.highlight}>no security architecture can step in</span>
          </li>
        </ul>

        <h3 className={styles.subheading}>Motivation</h3>
        <p className={styles.paragraph}>
          Fraud, at that point, isn&apos;t a technical problem, it&apos;s a behavioural one.
          That&apos;s where the econ side of me got interested, and the product side followed
          close behind. Behavioural economics studies how the structure of a choice shapes what
          people do, product design does the same thing every day without calling it that. A
          warning label, a button colour, a default option, these are{' '}
          <span className={styles.highlight}>choice architecture</span> whether or not anyone on
          the team uses that phrase.
        </p>

        <h3 className={styles.subheading}>Research question</h3>
        <p className={styles.paragraph}>
          I got a year, as part of my college&apos;s research track, to sit with one question: do
          the fraud-prevention interventions that work abroad, redesigned confirmation screens,
          prominent cancel buttons, actually work in India, or do they just look like they should?
        </p>
      </div>
    </>
  );
}
