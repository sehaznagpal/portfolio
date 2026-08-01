import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PhoneBezelFrame from '../PhoneBezelFrame';
import styles from './ScreensTab.module.css';

import home from '../../../../../assets/images/moolroop/case-study/screens/home.jpg';
import searchBar from '../../../../../assets/images/moolroop/case-study/screens/search-bar.jpg';
import handicrafts from '../../../../../assets/images/moolroop/case-study/screens/handicrafts.jpg';
import rajasthan from '../../../../../assets/images/moolroop/case-study/screens/rajasthan.jpg';
import pashminaList from '../../../../../assets/images/moolroop/case-study/screens/pashmina-list.jpg';
import pashminaProduct from '../../../../../assets/images/moolroop/case-study/screens/pashmina-product.jpg';
import pashminaProduct1 from '../../../../../assets/images/moolroop/case-study/screens/pashmina-product-1.jpg';
import provenance1 from '../../../../../assets/images/moolroop/case-study/screens/pashmina-provenance-1.jpg';
import provenance2 from '../../../../../assets/images/moolroop/case-study/screens/pashmina-provenance-2.jpg';
import menu from '../../../../../assets/images/moolroop/case-study/screens/menu.jpg';
import wishlist from '../../../../../assets/images/moolroop/case-study/screens/wishlist.jpg';
import bag from '../../../../../assets/images/moolroop/case-study/screens/bag.jpg';
import loader1 from '../../../../../assets/images/moolroop/case-study/screens/loader-1.jpg';
import loader2 from '../../../../../assets/images/moolroop/case-study/screens/loader-2.jpg';
import loader3 from '../../../../../assets/images/moolroop/case-study/screens/loader-3.jpg';

interface Screen {
  src: string;
  alt: string;
}

interface Category {
  id: string;
  label: string;
  description: string;
  screens: Screen[];
}

const CATEGORIES: Category[] = [
  {
    id: 'discovering',
    label: 'Discovering Authentic Crafts',
    description:
      'These are the first-contact screens: home, category browsing, and product listings. GI-certified crafts sit inside the same familiar shopping layout, so discovery never feels like a detour into official paperwork.',
    screens: [
      { src: home, alt: 'Home — Welcome, Sehaz' },
      { src: searchBar, alt: 'Search for original textiles' },
      { src: handicrafts, alt: 'Browse by category' },
      { src: rajasthan, alt: 'Explore Products — Rajasthan' },
      { src: pashminaList, alt: 'Pashmina product listing' },
    ],
  },
  {
    id: 'two-stories',
    label: 'Every product tells two stories',
    description:
      'Each product page holds two layers at once: the item for sale and the place it comes from. The origin story lives right beside the price, not behind a separate link a buyer has to go looking for.',
    screens: [
      { src: pashminaProduct, alt: 'Pashmina Kurta product page' },
      { src: pashminaProduct1, alt: "Pashmina Kurta origin story — how it's made" },
    ],
  },
  {
    id: 'verification',
    label: 'Verification without overwhelming',
    description:
      'Each product has two separate information layers. The buyer decides how deep to go, a quick glance at specs, or the full provenance trail.',
    screens: [
      { src: provenance1, alt: 'Verification panel — confirm this seller is authorised' },
      { src: provenance2, alt: 'Full GI registration and seller verification details' },
    ],
  },
  {
    id: 'supporting',
    label: 'Supporting Screens',
    description:
      'Menu, wishlist, and cart: the screens that hold the rest of the app together. Kept deliberately plain so verification stays the thing that stands out, not the navigation around it.',
    screens: [
      { src: menu, alt: 'Menu' },
      { src: wishlist, alt: 'Wishlist' },
      { src: bag, alt: 'Bag' },
      { src: loader1, alt: 'Welcome loader screen, part one' },
      { src: loader2, alt: 'Welcome loader screen, part two' },
      { src: loader3, alt: 'Welcome loader screen, part three' },
    ],
  },
];

const AUTO_ADVANCE_MS = 5000;
const TRANSITION_MS = 500;
const SLOT_GAP = 24;

function ScreenStage({ screens }: { screens: Screen[] }) {
  const [index, setIndex] = useState(0);
  const [slotWidth, setSlotWidth] = useState(0);
  const [stageWidth, setStageWidth] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitioningRef = useRef(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const slotRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const stageEl = stageRef.current;
    const slotEl = slotRef.current;
    if (!stageEl || !slotEl) return;
    const measure = () => {
      setStageWidth(stageEl.getBoundingClientRect().width);
      setSlotWidth(slotEl.getBoundingClientRect().width);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stageEl);
    observer.observe(slotEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      goTo((index + 1) % screens.length);
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, screens]);

  function goTo(next: number) {
    if (transitioningRef.current || next === index) return;
    transitioningRef.current = true;
    setIndex(next);
    setTimeout(() => {
      transitioningRef.current = false;
    }, TRANSITION_MS);
  }

  const slotSize = slotWidth + SLOT_GAP;
  // A clone of the last screen is prepended and a clone of the first is appended,
  // so there's always a real neighbour to peek at on both sides, even when the
  // active screen is the first or last in the category (wraps around cleanly).
  const extended = screens.length > 1 ? [screens[screens.length - 1], ...screens, screens[0]] : screens;
  const trackIndex = screens.length > 1 ? index + 1 : index;
  const centeredX = stageWidth / 2 - slotWidth / 2 - trackIndex * slotSize;

  return (
    <div className={styles.stage} ref={stageRef}>
      <motion.div
        className={styles.track}
        animate={{ x: centeredX }}
        transition={{ duration: TRANSITION_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
      >
        {extended.map((screen, i) => {
          const realIndex = screens.length > 1 ? (i - 1 + screens.length) % screens.length : i;
          const isActive = i === trackIndex;
          return (
            <div
              key={`${screen.alt}-${i}`}
              ref={i === 0 ? slotRef : undefined}
              className={styles.slot}
              data-active={isActive}
              onClick={() => goTo(isActive ? (index + 1) % screens.length : realIndex)}
            >
              <PhoneBezelFrame src={screen.src} alt={screen.alt} />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function ScreensTab() {
  const [activeId, setActiveId] = useState(CATEGORIES[2].id);
  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];

  return (
    <div className={styles.tab}>
      <div className={styles.left}>
        <h2 className="ms-heading">Explore screens</h2>
        <div className={styles.categoryList}>
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className={styles.categoryItem}>
              <button
                type="button"
                className={`${styles.categoryButton} ${cat.id === activeId ? styles.categoryActive : ''}`}
                onClick={() => setActiveId(cat.id)}
              >
                {cat.label}
              </button>
              {cat.id === activeId && <p className={styles.description}>{cat.description}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <ScreenStage key={activeId} screens={active.screens} />
      </div>
    </div>
  );
}
