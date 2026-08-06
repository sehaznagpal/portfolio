import styles from './TopicPanelBody.module.css';

export default function TopicPanelBody() {
  return (
    <>
      <h2 className={styles.heading}>A security problem that isn&apos;t really about security</h2>
      <div className={styles.body}>
        <p>
          Digital fraud losses in India nearly tripled between{' '}
          <span className={styles.highlight}>2023 and 2025, from ₹7,488 crore to ₹22,495</span>{' '}
          crore, and an estimated fifth of victims never even report it. What struck me
          wasn&apos;t the number itself, it was the mechanism behind almost every case: phishing,
          fake QR codes, &quot;digital arrest&quot; calls, the fraudster never breaks into
          anything. The victim authorises the payment themselves. Once that happens, no security
          architecture can step in. Fraud, at that point, isn&apos;t a technical problem,
          it&apos;s a behavioural one.
        </p>
        <p>
          That&apos;s where the econ side of me got interested, and the product side followed
          close behind. Behavioural economics has spent decades studying how the structure of a
          choice, not just the information in front of someone, shapes what they do. Product
          design does the same thing every day, just without calling it that. A warning label, a
          button colour, a default option, these are choice architecture whether or not anyone on
          the team uses that phrase.
        </p>
        <p>
          I got a year, as part of my college&apos;s research track, to actually sit with one
          question instead of skimming past it:{' '}
          <span className={styles.highlight}>
            do the fraud-prevention interventions that work abroad, redesigned confirmation
            screens, prominent cancel buttons, actually work in India, or do they just look like
            they should?
          </span>
        </p>
      </div>
    </>
  );
}
