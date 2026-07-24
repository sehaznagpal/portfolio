import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type WheelEvent as ReactWheelEvent } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ExtrasModal.module.css';

import extrasCardImg from '../../assets/images/experiment/extras-modal/extras-card.png';
import illustrationsTitle from '../../assets/images/experiment/extras-modal/illustrations-title.png';
import mario from '../../assets/images/experiment/extras-modal/mario.png';
import girlMs from '../../assets/images/experiment/extras-modal/girl-ms.png';
import perry from '../../assets/images/experiment/extras-modal/perry.png';
import monkeys from '../../assets/images/experiment/extras-modal/monkeys.png';
import kids from '../../assets/images/experiment/extras-modal/kids.png';
import cars from '../../assets/images/experiment/extras-modal/cars.png';
import building from '../../assets/images/experiment/extras-modal/building.png';
import reaper from '../../assets/images/experiment/extras-modal/reaper.png';
import pixelHeart from '../../assets/images/experiment/extras-modal/pixel-heart.png';
import wineGlass from '../../assets/images/experiment/extras-modal/wine-glass.png';
import bedScene from '../../assets/images/experiment/extras-modal/bed-scene.png';

const EXIT_MS = 200;

const CARDS = [
  { src: extrasCardImg, alt: 'Extras' },
  { src: illustrationsTitle, alt: 'Illustrations — made from scratch with nothing but tools and time' },
  { src: mario, alt: 'Mario-inspired platformer illustration' },
  { src: girlMs, alt: 'Girl drawing on a computer illustration' },
  { src: perry, alt: 'Perry the Platypus illustration' },
  { src: monkeys, alt: 'Four little monkey characters illustration' },
  { src: kids, alt: 'Family under one cloak illustration' },
  { src: cars, alt: 'Two cars illustration' },
  { src: building, alt: 'Building with a balcony illustration' },
  { src: reaper, alt: 'Grim reaper illustration' },
  { src: pixelHeart, alt: 'Pixel art heart and car illustration' },
  { src: wineGlass, alt: 'Wine glass illustration' },
  { src: bedScene, alt: 'Reading in bed illustration' },
];

export default function ExtrasModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  /* Remembers where the carousel was scrolled to across closes/reopens —
     the track's own DOM node (and its scrollLeft) is torn down each time
     the modal unmounts, so the position has to live outside it. */
  const scrollPosRef = useRef(0);

  useEffect(() => {
    if (open) {
      setRendered(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      return () => cancelAnimationFrame(raf);
    }
    if (rendered) {
      setVisible(false);
      const timeout = setTimeout(() => setRendered(false), EXIT_MS);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!rendered) return;
    /* Re-applied across several frames rather than once — the track's
       scrollWidth isn't reliably final on the very first frame (images are
       still decoding/laying out), so a single assignment can get silently
       clamped back to 0 before the real width is known. Runs independently
       of the fade/scale reveal so the open animation itself stays snappy. */
    let frame: ReturnType<typeof requestAnimationFrame>;
    let attempts = 0;
    function restoreScroll() {
      if (trackRef.current) trackRef.current.scrollLeft = scrollPosRef.current;
      attempts += 1;
      if (attempts < 10) frame = requestAnimationFrame(restoreScroll);
    }
    frame = requestAnimationFrame(restoreScroll);
    return () => cancelAnimationFrame(frame);
  }, [rendered]);

  useEffect(() => {
    if (!rendered) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rendered, onClose]);

  if (!rendered) return null;

  function handleWheel(event: ReactWheelEvent<HTMLDivElement>) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft += Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
  }

  function handleScroll() {
    if (trackRef.current) scrollPosRef.current = trackRef.current.scrollLeft;
  }

  function scrollByCard(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: 'smooth' });
  }

  return createPortal(
    <div
      className={`${styles.overlay} ${visible ? styles.overlayVisible : ''}`}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`${styles.frame} ${visible ? styles.frameVisible : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Extras — a few small illustrations"
        onClick={(event) => event.stopPropagation()}
      >
        <button className={styles.closeButton} aria-label="Close" onClick={onClose}>
          <X size={20} strokeWidth={1.75} />
        </button>

        <button
          className={`${styles.navButton} ${styles.navLeft}`}
          aria-label="Scroll left"
          onClick={() => scrollByCard(-1)}
        >
          <ChevronLeft size={20} strokeWidth={1.75} />
        </button>
        <button
          className={`${styles.navButton} ${styles.navRight}`}
          aria-label="Scroll right"
          onClick={() => scrollByCard(1)}
        >
          <ChevronRight size={20} strokeWidth={1.75} />
        </button>

        <div className={styles.track} ref={trackRef} onWheel={handleWheel} onScroll={handleScroll}>
          {CARDS.map((card) => (
            <div key={card.alt} className={styles.card}>
              <img src={card.src} alt={card.alt} />
            </div>
          ))}
        </div>

        <p className={styles.scrollHint}>Scroll to explore →</p>
      </div>
    </div>,
    document.body,
  );
}
