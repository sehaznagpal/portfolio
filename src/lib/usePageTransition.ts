import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* Fully self-contained within the triggering component's own lifetime — no
   state update happens after navigate() fires, so there's nothing left to
   go wrong when this component (and the route it lives on) unmounts as
   part of that same navigation. The destination page handles its own
   sweep-out-on-mount separately (see ExperimentZonePage), so the two
   halves of the grid sweep never need to coordinate lifetimes across the
   route change.

   Matches .overlay's sweep-in animation duration in
   PageTransitionOverlay.module.css — the route only swaps once the grid
   has fully covered the screen, so the swap itself is never visible. */
const SWEEP_COVER_MS = 240;

export function usePageTransition() {
  const navigate = useNavigate();
  const [transitioning, setTransitioning] = useState(false);

  function navigateWithTransition(to: string) {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => navigate(to), SWEEP_COVER_MS);
  }

  return { transitioning, navigateWithTransition };
}
