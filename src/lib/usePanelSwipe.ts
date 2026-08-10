import { useRef, type TouchEvent } from 'react';

const SWIPE_THRESHOLD_PX = 60;
const SWIPE_DIRECTION_RATIO = 1.5;

/* Mobile-only swipe-to-navigate for the case-study detail panels, alongside the existing
   prev/next buttons — never calls preventDefault, so it only ever *observes* a gesture and
   fires onPrev/onNext after the fact. Native vertical scroll (panelInner's overflow-y) and
   any internal horizontal scroll (e.g. Fraud's Payment Journey filmstrip, or the Results/
   Experiment Flow diagrams) keep working completely untouched, via two independent checks:
   the gesture must read as clearly more horizontal than vertical (so a vertical scroll drag
   is never mistaken for a swipe), and if the touch started inside an element that's itself
   horizontally scrollable, the whole gesture is skipped so that element keeps its own scroll
   intact instead of also changing cards. */
export function usePanelSwipe(isMobile: boolean, onPrev: () => void, onNext: () => void) {
  const startRef = useRef<{ x: number; y: number; skip: boolean } | null>(null);

  function isInsideHorizontalScroller(target: EventTarget | null, boundary: EventTarget | null): boolean {
    let node = target as HTMLElement | null;
    while (node && node !== boundary) {
      const style = getComputedStyle(node);
      if ((style.overflowX === 'auto' || style.overflowX === 'scroll') && node.scrollWidth > node.clientWidth) {
        return true;
      }
      node = node.parentElement;
    }
    return false;
  }

  function onTouchStart(event: TouchEvent<HTMLElement>) {
    if (!isMobile) return;
    const touch = event.touches[0];
    startRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      skip: isInsideHorizontalScroller(event.target, event.currentTarget),
    };
  }

  function onTouchEnd(event: TouchEvent<HTMLElement>) {
    if (!isMobile) return;
    const start = startRef.current;
    startRef.current = null;
    if (!start || start.skip) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy) * SWIPE_DIRECTION_RATIO) {
      if (dx < 0) onNext();
      else onPrev();
    }
  }

  return { onTouchStart, onTouchEnd };
}
