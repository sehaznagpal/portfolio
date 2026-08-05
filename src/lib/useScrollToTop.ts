import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* React Router doesn't reset scroll position on navigation (unlike a full page
   load) — without this, clicking from one case study into another preserves
   whatever scroll offset the previous page was at, so the new page can open
   mid-way through its card grid instead of at its hero. useLayoutEffect (not
   useEffect) so the jump happens before paint, avoiding a visible flash of the
   new page at the old scroll position. */
export function useScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
