import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import styles from './MobileExploreBeyondLink.module.css';

export default function MobileExploreBeyondLink() {
  return (
    <Link className={styles.link} to="/experiment-zone">
      <span className={styles.label}>Explore Beyond the Case Studies</span>
      <ArrowUpRight className={styles.icon} size={14} strokeWidth={2} />
    </Link>
  );
}
