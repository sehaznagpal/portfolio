import giSearchScreenshot from '../../../../../assets/images/moolroop/case-study/tabs/gi-search-registered-applications.png';
import styles from './ProblemPanelBody.module.css';

export default function ProblemPanelBody() {
  return (
    <>
      <div className={styles.body}>
        <p>
          Information about a craft&rsquo;s authenticity is fragmented across official databases,
          scattered community discussions, and marketplace listings that rarely mention it at
          all. The problem was never that the information didn&rsquo;t exist. It was that finding
          and interpreting it took more effort than most shoppers were ever going to spend.
        </p>
        <p>
          Hence, MoolRoop is scoped narrowly on purpose, to test that bridge, not to build a full
          marketplace. The question was{' '}
          <span className={styles.highlight}>whether verification could live inside browsing</span>?
        </p>
      </div>

      <div className={styles.screenshotFrame}>
        <img
          src={giSearchScreenshot}
          alt="GI Search Version 2.0 — Registered Applications database"
          className={styles.screenshot}
        />
      </div>
    </>
  );
}
