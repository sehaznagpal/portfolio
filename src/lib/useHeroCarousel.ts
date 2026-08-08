import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type RefObject } from 'react';

/* Drives the mobile case-study hero's "peek" carousel: a wide content strip
   clipped to the viewport, auto-panning through evenly-spaced stops
   (left/middle/right/.../left/... a bounce, not a hard cut) every STEP_MS,
   with a manual swipe override that pauses autoplay during the drag and for
   a short cooldown afterward. Stop positions are derived from the strip and
   viewport's own measured widths (not a fixed reference size), so this scales
   correctly across any phone width. */
const STEP_MS = 3000;
const RESUME_DELAY_MS = 2500;

export function useHeroCarousel(stopCount = 3) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const maxShiftRef = useRef(0);
  const stopIndexRef = useRef(0);
  const directionRef = useRef(1);
  const offsetRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  function stopPosition(i: number) {
    return -(maxShiftRef.current * i) / (stopCount - 1);
  }

  function setOffsetValue(value: number) {
    offsetRef.current = value;
    setOffset(value);
  }

  function goTo(i: number) {
    stopIndexRef.current = i;
    setOffsetValue(stopPosition(i));
  }

  function stopAutoplay() {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  function startAutoplay() {
    stopAutoplay();
    intervalRef.current = setInterval(() => {
      let next = stopIndexRef.current + directionRef.current;
      if (next >= stopCount - 1) {
        next = stopCount - 1;
        directionRef.current = -1;
      } else if (next <= 0) {
        next = 0;
        directionRef.current = 1;
      }
      goTo(next);
    }, STEP_MS);
  }

  useEffect(() => {
    function measure() {
      const vp = viewportRef.current;
      const strip = stripRef.current;
      if (!vp || !strip) return;
      maxShiftRef.current = Math.max(0, strip.scrollWidth - vp.clientWidth);
      setOffsetValue(stopPosition(stopIndexRef.current));
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (stripRef.current) ro.observe(stripRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    stopAutoplay();
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const delta = event.clientX - dragStartXRef.current;
    const next = Math.min(0, Math.max(-maxShiftRef.current, dragStartOffsetRef.current + delta));
    setOffsetValue(next);
  }

  function handlePointerUp() {
    setIsDragging(false);
    let nearest = 0;
    let nearestDist = Infinity;
    for (let i = 0; i < stopCount; i++) {
      const d = Math.abs(stopPosition(i) - offsetRef.current);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = i;
      }
    }
    if (nearest >= stopCount - 1) directionRef.current = -1;
    else if (nearest <= 0) directionRef.current = 1;
    goTo(nearest);
    resumeTimeoutRef.current = setTimeout(startAutoplay, RESUME_DELAY_MS);
  }

  return {
    viewportRef,
    stripRef,
    offset,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}

export type UseHeroCarousel = ReturnType<typeof useHeroCarousel>;
export type HeroCarouselViewportRef = RefObject<HTMLDivElement | null>;
