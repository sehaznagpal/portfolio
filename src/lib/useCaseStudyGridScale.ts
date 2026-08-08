import { useEffect, useState, type RefObject } from 'react';

/* The five-card grid is authored at a fixed 1280x832 reference (see
   cardData.ts's CARD_POSITIONS, which are percentages of this same box) and
   scaled uniformly to fit whatever space .section actually has — never
   stretched non-uniformly, and unlike the homepage's useCardScale, never
   clamped to a min/max, since this section should genuinely shrink on short
   screens (avoiding overlap) and grow on large ones (avoiding dead space).
   Scaling against .section's own rendered box (not window.innerWidth/Height)
   matters because .section is inset from the viewport by its own top/bottom
   padding. */
const GRID_FRAME_W = 1280;
const GRID_FRAME_H = 832;

export function useCaseStudyGridScale(sectionRef: RefObject<HTMLElement | null>) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    function compute() {
      if (!el) return;
      setScale(Math.min(el.clientWidth / GRID_FRAME_W, el.clientHeight / GRID_FRAME_H));
    }
    compute();

    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener('resize', compute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, [sectionRef]);

  return scale;
}
