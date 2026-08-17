import { type RefObject, useEffect, useRef, useState } from 'react';

export const SECTION_COUNT = 6; // 0 Hero, 1 Context, 2 Research, 3 Solution, 4 Screens, 5 CTA/loop

const STEP_MS = 650;
const WHEEL_THRESHOLD = 4;
const SWIPE_THRESHOLD_PX = 60;
const SWIPE_DIRECTION_RATIO = 1.5;

/* Discrete, one-section-per-gesture scroll state machine. Forward steps loop
   from the CTA state (index 5) back to Hero (index 0); backward steps clamp
   at Hero — the loop is a single explicit exception, not a ring. Every step
   sets a lock for STEP_MS (matching the section track's own CSS transition
   duration) during which further wheel/key/touch input is dropped outright,
   which is what makes a fast or aggressive scroll gesture unable to skip the
   CTA state on its way into the loop: each step is its own full lock cycle.
   `isPaused` (true while a DetailOverlay is open) fully gates every handler
   so the overlay's own internal scroll never fights this one. */
export function useSectionScroll(containerRef: RefObject<HTMLElement | null>, isPaused: boolean) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const indexRef = useRef(0);
  const transitioningRef = useRef(false);
  const isPausedRef = useRef(isPaused);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    indexRef.current = activeIndex;
  }, [activeIndex]);

  function step(delta: 1 | -1) {
    if (transitioningRef.current || isPausedRef.current) return;
    const current = indexRef.current;
    let next = current + delta;
    if (delta > 0) {
      if (current >= SECTION_COUNT - 1) next = 0;
    } else if (next < 0) {
      return;
    }
    transitioningRef.current = true;
    setDirection(delta);
    setActiveIndex(next);
    window.setTimeout(() => {
      transitioningRef.current = false;
    }, STEP_MS);
  }

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    /* React's synthetic onWheel is passive by default and can't reliably
       preventDefault, so the listener is attached natively here instead —
       same pattern as ExperimentCanvas.tsx. */
    function handleWheel(event: WheelEvent) {
      if (isPausedRef.current) return;
      event.preventDefault();
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
      step(event.deltaY > 0 ? 1 : -1);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (isPausedRef.current) return;
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        step(-1);
      }
    }

    function handleTouchStart(event: TouchEvent) {
      if (isPausedRef.current) {
        touchStartRef.current = null;
        return;
      }
      const touch = event.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }

    function handleTouchEnd(event: TouchEvent) {
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (!start || isPausedRef.current) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.abs(dy) > SWIPE_THRESHOLD_PX && Math.abs(dy) > Math.abs(dx) * SWIPE_DIRECTION_RATIO) {
        step(dy < 0 ? 1 : -1);
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [containerRef]);

  return { activeIndex, direction };
}
