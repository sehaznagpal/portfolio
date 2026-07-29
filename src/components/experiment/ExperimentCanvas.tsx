import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { useTheme } from '../../state/ThemeContext';
import { useIsMobile } from '../../lib/useIsMobile';
import TopRight from '../chrome/TopRight';
import ExperimentTopLeft from './ExperimentTopLeft';
import ExperimentToolbar from './ExperimentToolbar';
import ExperimentContent from './ExperimentContent';
import styles from './ExperimentCanvas.module.css';

type Mode = 'normal' | 'map';

/* The whole content tree (every card/icon/text in ExperimentContent) is
   authored in fixed px sizes and positions tuned to look right at this
   viewport — a typical Mac-size window. Normal view's baseline zoom is
   scaled from that reference on every resize (see updateWorld below), so the
   entire canvas grows or shrinks like one flat image instead of the canvas
   area expanding while the content stays pinned at its native pixel size
   (which is what made larger screens look increasingly sparse). */
const REFERENCE_WIDTH = 1440;
const REFERENCE_HEIGHT = 900;
/* World is sized relative to the viewport so there's room to pan around in
   Normal view. Kept modest (rather than a flat 2x) so Normal view doesn't
   read as mostly empty grid — but never smaller than the content's own
   footprint, or the far corners (chess, sip studio) would become unreachable
   by panning. */
const WORLD_MULTIPLIER = 1.65;
const CONTENT_WIDTH = 1950;
const CONTENT_HEIGHT = 1380;
/* Mobile's raw fit-to-viewport scale renders everything much smaller than
   the Figma mobile reference, which shows cards/icons at a deliberately
   larger, more zoomed-in size than an exact 1440x900 fit gives. This boosts
   mobile's baseline past that fit — desktop is untouched since it's only
   ever applied when isMobile. */
const MOBILE_ZOOM_BOOST = 1.9;
/* Mobile's grid renders in its own fixed, unscaled layer (.mobileGridLayer)
   rather than inside .zoomLayer like desktop's, so this is a plain screen-px
   value — no compensation against the live zoom needed. */
const MOBILE_GRID_SPACING_PX = 40;
/* Map view's zoom is derived from the world size on every resize (see
   updateWorld below) rather than a flat constant, so "zoom out" always frames
   the full world with a consistent margin instead of sometimes leaving it
   mostly empty and sometimes clipping it, depending on viewport size. */
const MAP_FIT_MARGIN = 0.92;
const ANIMATION_MS = 400;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ExperimentCanvas() {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('normal');
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [animating, setAnimating] = useState(false);
  const [mapZoom, setMapZoom] = useState(0.4);
  const [baseScale, setBaseScale] = useState(1);

  /* Refs mirror the latest state for the native wheel/touch listeners below,
     which are attached once and would otherwise close over stale values. */
  const modeRef = useRef(mode);
  const panRef = useRef(pan);
  const worldRef = useRef({ w: 0, h: 0 });
  const mapZoomRef = useRef(mapZoom);
  const baseScaleRef = useRef(baseScale);
  const isMobileRef = useRef(isMobile);
  const animationTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    panRef.current = pan;
  }, [pan]);

  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  useEffect(() => {
    function updateWorld() {
      const fitScale = Math.min(window.innerWidth / REFERENCE_WIDTH, window.innerHeight / REFERENCE_HEIGHT);
      const scale = isMobileRef.current ? fitScale * MOBILE_ZOOM_BOOST : fitScale;
      baseScaleRef.current = scale;
      setBaseScale(scale);

      const w = Math.max(window.innerWidth * WORLD_MULTIPLIER, CONTENT_WIDTH);
      const h = Math.max(window.innerHeight * WORLD_MULTIPLIER, CONTENT_HEIGHT);
      worldRef.current = { w, h };

      const fitZoom = Math.min(window.innerWidth / w, window.innerHeight / h) * MAP_FIT_MARGIN;
      mapZoomRef.current = fitZoom;
      setMapZoom(fitZoom);
    }
    updateWorld();
    window.addEventListener('resize', updateWorld);
    return () => window.removeEventListener('resize', updateWorld);
  }, []);

  function clampPan(next: { x: number; y: number }, zoom: number) {
    const { w, h } = worldRef.current;
    const maxX = Math.max(0, (w * zoom - window.innerWidth) / 2);
    const maxY = Math.max(0, (h * zoom - window.innerHeight) / 2);
    return { x: clamp(next.x, -maxX, maxX), y: clamp(next.y, -maxY, maxY) };
  }

  function triggerAnimation() {
    setAnimating(true);
    if (animationTimeout.current) clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => setAnimating(false), ANIMATION_MS);
  }

  /* Converts a viewport-space point (e.g. cursor or click position) into
     world-space, using whichever mode/pan/zoom is currently active. */
  function focalWorldPoint(clientX: number, clientY: number) {
    const zoom = modeRef.current === 'map' ? mapZoomRef.current : baseScaleRef.current;
    const screenX = clientX - window.innerWidth / 2;
    const screenY = clientY - window.innerHeight / 2;
    return {
      x: (screenX - panRef.current.x) / zoom,
      y: (screenY - panRef.current.y) / zoom,
    };
  }

  function enterMapView() {
    if (modeRef.current === 'map') return;
    setMode('map');
    setPan({ x: 0, y: 0 });
    triggerAnimation();
  }

  function returnToNormal(focal: { x: number; y: number }) {
    if (modeRef.current === 'normal') return;
    const next = clampPan(
      { x: -focal.x * baseScaleRef.current, y: -focal.y * baseScaleRef.current },
      baseScaleRef.current,
    );
    setMode('normal');
    setPan(next);
    triggerAnimation();
  }

  useEffect(() => {
    const el = surfaceRef.current;
    if (!el) return;

    /* React's synthetic onWheel is passive by default and can't reliably
       preventDefault, so the listener is attached natively here instead.
       Trackpad pinch and an explicit Ctrl/Cmd+scroll are indistinguishable
       at the DOM level — both arrive as wheel events with ctrlKey/metaKey
       set — so both are handled by the same branch. */
    function handleWheel(event: WheelEvent) {
      event.preventDefault();

      /* Zoom (map view) is a desktop-only affordance — on mobile only plain
         panning is available, so a pinch/ctrl-scroll gesture is ignored
         outright rather than ever entering map mode. */
      const isZoomGesture = (event.ctrlKey || event.metaKey) && !isMobileRef.current;
      if (isZoomGesture) {
        if (event.deltaY > 0) {
          enterMapView();
        } else if (event.deltaY < 0) {
          returnToNormal(focalWorldPoint(event.clientX, event.clientY));
        }
        return;
      }

      // Plain scroll pans, and only does anything in Normal view.
      if (modeRef.current !== 'normal') return;
      const lineFactor = event.deltaMode === 1 ? 16 : 1;
      setPan((prev) =>
        clampPan(
          { x: prev.x - event.deltaX * lineFactor, y: prev.y - event.deltaY * lineFactor },
          baseScaleRef.current,
        ),
      );
    }

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  /* Touch panning — a direct drag-to-pan gesture (content follows the
     finger), the touch equivalent of the plain-scroll branch above. Only
     ever single-finger: a second touch joining mid-gesture is ignored
     rather than translated into any pinch/zoom behavior, since map view is
     intentionally unreachable on mobile (see handleWheel). */
  useEffect(() => {
    const el = surfaceRef.current;
    if (!el) return;

    let touchId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    function handleTouchStart(event: TouchEvent) {
      if (modeRef.current !== 'normal' || touchId !== null || event.touches.length !== 1) return;
      const touch = event.touches[0];
      touchId = touch.identifier;
      lastX = touch.clientX;
      lastY = touch.clientY;
    }

    function handleTouchMove(event: TouchEvent) {
      if (touchId === null) return;
      const touch = Array.from(event.changedTouches).find((t) => t.identifier === touchId);
      if (!touch) return;
      event.preventDefault();
      const dx = touch.clientX - lastX;
      const dy = touch.clientY - lastY;
      lastX = touch.clientX;
      lastY = touch.clientY;
      setPan((prev) => clampPan({ x: prev.x + dx, y: prev.y + dy }, baseScaleRef.current));
    }

    function handleTouchEnd(event: TouchEvent) {
      if (touchId !== null && !Array.from(event.touches).some((t) => t.identifier === touchId)) {
        touchId = null;
      }
    }

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    el.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  function handleClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (modeRef.current !== 'map') return;
    returnToNormal(focalWorldPoint(event.clientX, event.clientY));
  }

  const zoom = mode === 'map' ? mapZoom : baseScale;
  const layerClass = animating ? `${styles.animated}` : '';

  return (
    <div className={styles.viewport} data-theme={theme === 'default' ? undefined : theme}>
      {/* Wheel/click handlers live on this surface only — not on .viewport
          itself — so interaction with the chrome pills below (siblings, not
          descendants of this element) is never intercepted. */}
      {isMobile && (
        <div
          className={`${styles.mobileGridLayer} grid-background`}
          style={{ ['--grid-line-spacing' as string]: `${MOBILE_GRID_SPACING_PX}px` }}
        />
      )}
      <div
        ref={surfaceRef}
        className={styles.interactionSurface}
        onClick={handleClick}
        style={{ cursor: mode === 'map' ? 'zoom-in' : 'default' }}
      >
        <div className={`${styles.panLayer} ${layerClass}`} style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}>
          <div className={`${styles.zoomLayer} ${layerClass}`} style={{ transform: `scale(${zoom})` }}>
            {!isMobile && (
              <div
                className={`${styles.gridLayer} grid-background`}
                style={{
                  /* Sized in world-space so the rendered (post-scale) grid
                     always covers a constant 300vw/300vh of actual screen. */
                  width: `calc(300vw / ${zoom})`,
                  height: `calc(300vh / ${zoom})`,
                  left: `calc(-100vw / ${zoom})`,
                  top: `calc(-100vh / ${zoom})`,
                }}
              />
            )}
            <div className={styles.anchor}>
              <ExperimentContent />
            </div>
          </div>
        </div>
      </div>

      <ExperimentTopLeft />
      <TopRight />
      <ExperimentToolbar />
    </div>
  );
}
