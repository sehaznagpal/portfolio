import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import styles from './ExploreBeyondLink.module.css';

export default function ExploreBeyondLink() {
  return (
    <Link className={styles.link} to="/experiment-zone">
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>Explore Beyond the Case Studies</span>
      <ArrowUpRight className={styles.icon} size={18} strokeWidth={2} />
    </Link>
  );
}
