import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* Fully self-contained within the triggering component's own lifetime — no
   state update happens after navigate() fires, so there's nothing left to
   go wrong when this component (and the route it lives on) unmounts as
   part of that same navigation. The destination page handles its own
   fade-in-on-mount separately (see ExperimentZonePage), so the two halves
   of the crossfade never need to coordinate lifetimes across the route
   change. */
const FADE_MS = 180;

export function usePageTransition() {
  const navigate = useNavigate();
  const [transitioning, setTransitioning] = useState(false);

  function navigateWithTransition(to: string) {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => navigate(to), FADE_MS);
  }

  return { transitioning, navigateWithTransition };
}
