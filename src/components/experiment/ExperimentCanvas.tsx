import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { useTheme } from '../../state/ThemeContext';
import TopRight from '../chrome/TopRight';
import ExperimentTopLeft from './ExperimentTopLeft';
import ExperimentToolbar from './ExperimentToolbar';
import ExperimentContent from './ExperimentContent';
import styles from './ExperimentCanvas.module.css';

type Mode = 'normal' | 'map';

const NORMAL_ZOOM = 1;
/* World is sized relative to the viewport so there's room to pan around in
   Normal view. Kept modest (rather than a flat 2x) so Normal view doesn't
   read as mostly empty grid — but never smaller than the content's own
   footprint, or the far corners (chess, sip studio) would become unreachable
   by panning. */
const WORLD_MULTIPLIER = 1.65;
const CONTENT_WIDTH = 1950;
const CONTENT_HEIGHT = 1380;
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
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('normal');
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [animating, setAnimating] = useState(false);
  const [mapZoom, setMapZoom] = useState(0.4);

  /* Refs mirror the latest state for the native wheel listener below, which
     is attached once and would otherwise close over stale values. */
  const modeRef = useRef(mode);
  const panRef = useRef(pan);
  const worldRef = useRef({ w: 0, h: 0 });
  const mapZoomRef = useRef(mapZoom);
  const animationTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    panRef.current = pan;
  }, [pan]);

  useEffect(() => {
    function updateWorld() {
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
    const zoom = modeRef.current === 'map' ? mapZoomRef.current : NORMAL_ZOOM;
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
    const next = clampPan({ x: -focal.x * NORMAL_ZOOM, y: -focal.y * NORMAL_ZOOM }, NORMAL_ZOOM);
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

      const isZoomGesture = event.ctrlKey || event.metaKey;
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
        clampPan({ x: prev.x - event.deltaX * lineFactor, y: prev.y - event.deltaY * lineFactor }, NORMAL_ZOOM),
      );
    }

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  function handleClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (modeRef.current !== 'map') return;
    returnToNormal(focalWorldPoint(event.clientX, event.clientY));
  }

  const zoom = mode === 'map' ? mapZoom : NORMAL_ZOOM;
  const layerClass = animating ? `${styles.animated}` : '';

  return (
    <div className={styles.viewport} data-theme={theme === 'default' ? undefined : theme}>
      {/* Wheel/click handlers live on this surface only — not on .viewport
          itself — so interaction with the chrome pills below (siblings, not
          descendants of this element) is never intercepted. */}
      <div
        ref={surfaceRef}
        className={styles.interactionSurface}
        onClick={handleClick}
        style={{ cursor: mode === 'map' ? 'zoom-in' : 'default' }}
      >
        <div className={`${styles.panLayer} ${layerClass}`} style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}>
          <div className={`${styles.zoomLayer} ${layerClass}`} style={{ transform: `scale(${zoom})` }}>
            <div className={`${styles.gridLayer} grid-background`} />
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
