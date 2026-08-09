import { useLayoutEffect, useState, type RefObject } from 'react';

/* The five-card grid is authored at a fixed 1280x832 reference (see
   cardData.ts's CARD_POSITIONS, dx/dy offsets from center in that reference).
   A single uniform scale (min(w/1280, h/832)) works well at typical desktop
   aspect ratios, but breaks down on "wide but short" windows — a common real
   windowed-browser shape (e.g. ~1440x700-800 once browser chrome is
   subtracted) — where height is the binding factor and the whole cluster,
   text included, shrinks to fit height while the extra width sits unused.

   So sizing is split into three independent factors instead of one:
   - contentScale: card size and text, floored at a readable minimum and
     capped so it never balloons on very wide-short screens.
   - yScale: vertical spacing between rows, always tied 1:1 to contentScale
     — there's rarely extra height to spend on spacing, and tying it to
     content size guarantees rows never overlap regardless of flooring.
   - xScale: horizontal spacing between cards. Matches contentScale (i.e.
     identical to the old single-scale behavior) UNLESS content size had to
     be floored above the raw height-bound fit, in which case it spends the
     leftover width spreading the cards out instead of leaving it empty. */
const GRID_FRAME_W = 1280;
const GRID_FRAME_H = 832;

const MIN_CONTENT_SCALE = 0.8;
const MAX_CONTENT_SCALE = 1.15;
const MAX_SPACING_SCALE = 1.6;

export interface CaseStudyGridScale {
  contentScale: number;
  xScale: number;
  yScale: number;
}

function computeScale(width: number, height: number): CaseStudyGridScale {
  const widthRatio = width / GRID_FRAME_W;
  const heightRatio = height / GRID_FRAME_H;
  const rawScale = Math.min(widthRatio, heightRatio);
  const contentScale = Math.min(MAX_CONTENT_SCALE, Math.max(MIN_CONTENT_SCALE, rawScale));

  const yScale = contentScale;

  const wasFlooredOnWidth = widthRatio > rawScale && contentScale > rawScale;
  const xScale = wasFlooredOnWidth
    ? Math.min(MAX_SPACING_SCALE, Math.max(contentScale, widthRatio))
    : contentScale;

  return { contentScale, xScale, yScale };
}

const IDLE_SCALE: CaseStudyGridScale = { contentScale: 1, xScale: 1, yScale: 1 };

export function useCaseStudyGridScale(sectionRef: RefObject<HTMLElement | null>): CaseStudyGridScale {
  const [scale, setScale] = useState<CaseStudyGridScale>(IDLE_SCALE);

  /* useLayoutEffect (not useEffect) so the real scale is measured and
     committed before the browser paints. With useEffect, the first paint
     briefly showed cards at IDLE_SCALE (1:1, i.e. the raw 1280x832
     reference position) before snapping to the computed scale a frame
     later — and because the cards are Framer Motion layout="position"
     elements, that snap registered as a layout change to FLIP-animate
     rather than a first-paint value, leaving each card permanently offset
     by dx/dy * (1 - scale) once the animation settled. Measuring
     synchronously pre-paint means there's only ever one committed
     position, so Framer never sees a "from" position to correct away
     from. */
  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    function compute() {
      if (!el) return;
      setScale(computeScale(el.clientWidth, el.clientHeight));
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
