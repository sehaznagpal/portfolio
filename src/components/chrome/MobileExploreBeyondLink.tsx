import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { usePageTransition } from '../../lib/usePageTransition';
import PageTransitionOverlay from './PageTransitionOverlay';
import styles from './MobileExploreBeyondLink.module.css';

const EXPERIMENT_ZONE_HREF = '/experiment-zone';

export default function MobileExploreBeyondLink() {
  const { transitioning, navigateWithTransition } = usePageTransition();

  useEffect(() => {
    // Warms the lazy-loaded route's chunk so the grid sweep never stalls waiting on a fetch.
    import('../../pages/ExperimentZonePage');
  }, []);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    navigateWithTransition(EXPERIMENT_ZONE_HREF);
  }

  return (
    <>
      <Link className={styles.link} to={EXPERIMENT_ZONE_HREF} onClick={handleClick}>
        <span className={styles.label}>Explore Beyond the Case Studies</span>
        <ArrowUpRight className={styles.icon} size={17} strokeWidth={2} />
      </Link>
      <PageTransitionOverlay active={transitioning} />
    </>
  );
}
