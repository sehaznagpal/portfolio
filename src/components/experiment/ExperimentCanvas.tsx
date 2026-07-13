import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { useTheme } from '../../state/ThemeContext';
import TopRight from '../chrome/TopRight';
import ExperimentTopLeft from './ExperimentTopLeft';
import ExperimentToolbar from './ExperimentToolbar';
import styles from './ExperimentCanvas.module.css';

const MIN_ZOOM = 1;
const MAX_ZOOM = 2;
const ZOOM_SENSITIVITY = 0.0015;

export default function ExperimentCanvas() {
  const { theme } = useTheme();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [isDragging, setIsDragging] = useState(false);
  const dragOrigin = useRef({ pointerX: 0, pointerY: 0, panX: 0, panY: 0 });

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    /* React's synthetic onWheel is passive by default and can't reliably
       preventDefault, so the listener is attached natively here instead. */
    function handleWheel(event: WheelEvent) {
      event.preventDefault();
      setZoom((z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z - event.deltaY * ZOOM_SENSITIVITY)));
    }

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    dragOrigin.current = { pointerX: event.clientX, pointerY: event.clientY, panX: pan.x, panY: pan.y };
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    const dx = event.clientX - dragOrigin.current.pointerX;
    const dy = event.clientY - dragOrigin.current.pointerY;
    setPan({ x: dragOrigin.current.panX + dx, y: dragOrigin.current.panY + dy });
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDragging(false);
  }

  return (
    <div
      ref={viewportRef}
      className={styles.viewport}
      data-theme={theme === 'default' ? undefined : theme}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div className={styles.panLayer} style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}>
        <div className={styles.zoomLayer} style={{ transform: `scale(${zoom})` }}>
          <div className={`${styles.gridLayer} grid-background`} />
          <div className={styles.anchor}>
            <div className={styles.card}>
              <span className={`${styles.corner} ${styles.cornerTL}`} />
              <span className={`${styles.corner} ${styles.cornerTR}`} />
              <span className={`${styles.corner} ${styles.cornerBL}`} />
              <span className={`${styles.corner} ${styles.cornerBR}`} />
              <p className={styles.cardText}>
                <span className={styles.cardTextItalic}>This is my Figma,</span>{' '}
                <span className={styles.cardTextBold}>basically.</span>
              </p>
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
