import { Link } from 'react-router-dom';
import ExploreBeyondLink from '../../../chrome/ExploreBeyondLink';
import CaseStudySwitcher from './CaseStudySwitcher';
import SectionIndicator from './SectionIndicator';
import PersistentCTAs from './PersistentCTAs';
import styles from './PersistentFrame.module.css';

export default function PersistentFrame({
  activeIndex,
  direction,
}: {
  activeIndex: number;
  direction: 1 | -1;
}) {
  return (
    <>
      <Link to="/" className={styles.portfolio}>
        Portfolio
      </Link>
      <div className={styles.exploreBeyondShim}>
        <ExploreBeyondLink />
      </div>
      <CaseStudySwitcher />
      <SectionIndicator activeIndex={activeIndex} direction={direction} />
      <PersistentCTAs />
    </>
  );
}
