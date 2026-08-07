import { useEffect, useState } from 'react';
import { FRAME_W, FRAME_H } from './layout';

/* The flip card (Hero/CaseStudyShell) is authored at a fixed 1280x832 reference
   size. Rather than scaling the whole page to fit that box (which letterboxes
   every other aspect ratio — see git history), only the card itself is scaled
   uniformly, so it never stretches/distorts. Bounds keep it from shrinking too
   small on the smallest supported desktop widths or ballooning on ultrawide
   monitors. */
const MIN_SCALE = 0.72;
const MAX_SCALE = 1.4;

function computeScale() {
  const raw = Math.min(window.innerWidth / FRAME_W, window.innerHeight / FRAME_H);
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, raw));
}

export function useCardScale() {
  const [scale, setScale] = useState(computeScale);

  useEffect(() => {
    const compute = () => setScale(computeScale());
    compute();
    window.addEventListener('resize', compute);
    const ro = new ResizeObserver(compute);
    ro.observe(document.documentElement);
    return () => {
      window.removeEventListener('resize', compute);
      ro.disconnect();
    };
  }, []);

  return scale;
}
