import { useEffect, useState } from 'react';
import styles from './PageRevealOverlay.module.css';

/* Paired with PageTransitionOverlay (rendered on the page the user is
   leaving) to form a full crossfade — this half starts fully opaque and
   fades itself out right after mount, independent of how the page was
   reached (a direct load looks identical to arriving via a transitioned
   link, which is the simpler and more robust choice over trying to thread
   "did we arrive via the animated link" state across the route change). */
export default function PageRevealOverlay() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setRevealed(true)));
    return () => cancelAnimationFrame(raf);
  }, []);

  return <div className={`${styles.overlay} ${revealed ? styles.revealed : ''}`} aria-hidden="true" />;
}
