import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { usePageTransition } from '../../lib/usePageTransition';
import PageTransitionOverlay from './PageTransitionOverlay';
import styles from './ExploreBeyondLink.module.css';

const EXPERIMENT_ZONE_HREF = '/experiment-zone';

export default function ExploreBeyondLink() {
  const { transitioning, navigateWithTransition } = usePageTransition();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    // Let modified clicks (open in new tab, etc.) behave like a normal link.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    navigateWithTransition(EXPERIMENT_ZONE_HREF);
  }

  return (
    <>
      <Link className={styles.link} to={EXPERIMENT_ZONE_HREF} onClick={handleClick}>
        <span className={styles.fill} aria-hidden="true" />
        <span className={styles.label}>Explore Beyond the Case Studies</span>
        <ArrowUpRight className={styles.icon} size={18} strokeWidth={2} />
      </Link>
      <PageTransitionOverlay active={transitioning} />
    </>
  );
}
