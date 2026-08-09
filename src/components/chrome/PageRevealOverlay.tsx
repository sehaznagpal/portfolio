import { useEffect, useState } from 'react';
import styles from './PageRevealOverlay.module.css';

/* Paired with PageTransitionOverlay (rendered on the page the user is
   leaving) to read as one continuous grid-pattern sweep — this half
   starts already covering the viewport (matching exactly where the
   leaving page's overlay ended) and slides itself down and off-screen
   right after mount, continuing the same downward motion so the new page
   reads as arriving "through" the grid rather than just appearing.
   Independent of how the page was reached (a direct load looks identical
   to arriving via the animated link, which is the simpler and more
   robust choice over trying to thread "did we arrive via the transitioned
   link" state across the route change). */
export default function PageRevealOverlay() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setRevealed(true)));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`${styles.overlay} grid-background ${revealed ? styles.revealed : ''}`}
      aria-hidden="true"
    />
  );
}
