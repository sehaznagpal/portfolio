import { useEffect, useState } from 'react';

/* Reference size of the card-grid section at its natural (unscaled) size — width
   1280 to match the cards' own Figma-derived coordinates, height = 40px top margin +
   832px section + 48px bottom margin. Both must match MoolroopCardGrid.module.css. */
export const CARD_GRID_REFERENCE_WIDTH = 1280;
export const CARD_GRID_REFERENCE_HEIGHT = 920;

/* Mirrors the index page's useScaleToFit (src/lib/useScaleToFit.ts): scales the whole
   fixed-size frame as one rigid unit so every card/button stays in the exact same
   relative position at any viewport size. Height is the primary driver (the section
   is meant to be exactly one viewport tall), but scale is still capped by width too —
   without that cap, unusually narrow-for-their-height viewports (e.g. 1024x768) would
   compute a frame wider than the viewport and silently clip cards off the edge, which
   is worse than the section falling a little short of 100vh in that one edge case. */
export function useCardGridScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const compute = () => {
      const heightScale = window.innerHeight / CARD_GRID_REFERENCE_HEIGHT;
      const widthScale = window.innerWidth / CARD_GRID_REFERENCE_WIDTH;
      setScale(Math.min(heightScale, widthScale));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return scale;
}
