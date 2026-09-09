import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
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
const SCROLL_ANIMATION_MS = 420;
/* Cubic ease-out — matches the feel of the native smooth-scroll this
   replaces. */
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

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
  /* Drives scrollByCard's own scroll animation (see below for why native
     smooth-scroll isn't used) — held in a ref so a new arrow click can
     cancel whichever animation is still in flight. */
  const scrollAnimationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

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
    /* Always reopens on the first card, regardless of where it was left
       last time — reapplied across several frames rather than once, since
       the track's scrollWidth isn't reliably final on the very first frame
       (images are still decoding/laying out), so a single assignment can
       get silently clamped before layout settles. Runs independently of the
       fade/scale reveal so the open animation itself stays snappy. */
    if (scrollAnimationRef.current !== null) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
    let frame: ReturnType<typeof requestAnimationFrame>;
    let attempts = 0;
    function resetScroll() {
      if (trackRef.current) trackRef.current.scrollLeft = 0;
      attempts += 1;
      if (attempts < 10) frame = requestAnimationFrame(resetScroll);
    }
    frame = requestAnimationFrame(resetScroll);
    return () => {
      cancelAnimationFrame(frame);
      if (scrollAnimationRef.current !== null) cancelAnimationFrame(scrollAnimationRef.current);
    };
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

  function scrollByCard(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;

    /* Animated by hand rather than el.scrollBy({behavior: 'smooth'}) —
       .track is overflow-x: hidden (arrows are its only means of movement;
       see .track's own comment), and Chromium silently no-ops native
       smooth-scroll on a hidden-overflow element instead of animating it,
       so scrollBy left the arrows appearing to do nothing. Direct scrollLeft
       assignment isn't subject to that, so the animation is driven that way
       instead, at the same distance and easing feel as the native version
       it replaces. */
    if (scrollAnimationRef.current !== null) cancelAnimationFrame(scrollAnimationRef.current);

    const start = el.scrollLeft;
    const delta = direction * el.clientWidth * 0.7;
    const startTime = performance.now();

    function step(now: number) {
      const t = Math.min(1, (now - startTime) / SCROLL_ANIMATION_MS);
      el!.scrollLeft = start + delta * easeOutCubic(t);
      if (t < 1) {
        scrollAnimationRef.current = requestAnimationFrame(step);
      } else {
        scrollAnimationRef.current = null;
      }
    }
    scrollAnimationRef.current = requestAnimationFrame(step);
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

        <div className={styles.track} ref={trackRef}>
          {CARDS.map((card) => (
            <div key={card.alt} className={styles.card}>
              <img src={card.src} alt={card.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
