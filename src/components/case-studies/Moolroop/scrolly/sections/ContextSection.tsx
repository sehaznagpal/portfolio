import SectionHeader from '../SectionHeader';
import InfoBox from '../InfoBox';
import styles from './ContextSection.module.css';

export default function ContextSection() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <SectionHeader number="01" title="Context" />

        <InfoBox variant="white" heading="Why the need?">
          <p>
            Buyers have no easy way to verify a craft is genuine without leaving the product page
            to dig through a separate database.
          </p>
        </InfoBox>

        <InfoBox variant="yellow" heading="What is a GI tag?">
          <p>
            A <strong>government-issued</strong> legal certification that ties a product to a
            specific place, process, and community of makers, a Kashmiri Pashmina, a Sanganeri
            block print, a piece of Moradabad metalware. India has over 400 GI-certified crafts.
          </p>
        </InfoBox>

        <InfoBox variant="white" heading="What Problem does this Project Solve?">
          <p>
            Information about a craft&rsquo;s authenticity is fragmented across official
            databases, scattered community discussions, and marketplace listings that rarely
            mention it at all. The problem was never that the information didn&rsquo;t exist. It
            was that finding and interpreting it took more effort than most shoppers were ever
            going to spend.
          </p>
          <p>
            Hence, MoolRoop is scoped narrowly on purpose, to test that bridge, not to build a
            full marketplace. The question was{' '}
            <strong>whether verification could live inside browsing</strong>?
          </p>
        </InfoBox>
      </div>
    </div>
  );
}
