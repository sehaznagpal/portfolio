import { Link } from 'react-router-dom';
import styles from './MobileViewProjectButton.module.css';

/* Mobile counterpart to ViewProjectButton. Unlike desktop (one fixed position for all
   three cards), Figma's mobile frames place this button at a slightly different `top`
   per card to sit right below that card's own body copy, so `top` is passed in by
   MobileCaseStudyShell per active tab instead of being hardcoded here. */
export default function MobileViewProjectButton({ to, top }: { to: string; top: number }) {
  return (
    <Link className={styles.button} to={to} style={{ top }}>
      <span className={styles.label}>VIEW PROJECT →</span>
    </Link>
  );
}
