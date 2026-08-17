import { useEffect, useState } from 'react';
import PhoneMockup from './PhoneMockup';
import loader1 from '../../../../../assets/images/moolroop/case-study/screens/loader-1.jpg';
import loader2 from '../../../../../assets/images/moolroop/case-study/screens/loader-2.jpg';
import loader3 from '../../../../../assets/images/moolroop/case-study/screens/loader-3.jpg';
import home from '../../../../../assets/images/moolroop/case-study/screens/home.jpg';
import searchBar from '../../../../../assets/images/moolroop/case-study/screens/search-bar.jpg';
import handicrafts from '../../../../../assets/images/moolroop/case-study/screens/handicrafts.jpg';
import rajasthan from '../../../../../assets/images/moolroop/case-study/screens/rajasthan.jpg';
import pashminaList from '../../../../../assets/images/moolroop/case-study/screens/pashmina-list.jpg';
import pashminaProduct from '../../../../../assets/images/moolroop/case-study/screens/pashmina-product.jpg';
import pashminaProduct1 from '../../../../../assets/images/moolroop/case-study/screens/pashmina-product-1.jpg';
import pashminaProvenance1 from '../../../../../assets/images/moolroop/case-study/screens/pashmina-provenance-1.jpg';
import pashminaProvenance2 from '../../../../../assets/images/moolroop/case-study/screens/pashmina-provenance-2.jpg';
import bag from '../../../../../assets/images/moolroop/case-study/screens/bag.jpg';
import wishlist from '../../../../../assets/images/moolroop/case-study/screens/wishlist.jpg';
import menu from '../../../../../assets/images/moolroop/case-study/screens/menu.jpg';
import styles from './ScreensGallery.module.css';

const AUTO_ADVANCE_MS = 5000;

/* Grouped to follow the sitemap's flow (Moolroop App/moolroop-sitemap.mermaid), covering
   all 15 real screens across the app's 4 natural stages. */
const GROUPS = [
  {
    label: 'Welcome Carousel',
    screens: [
      { src: loader1, alt: 'Welcome carousel, slide 1 of 3' },
      { src: loader2, alt: 'Welcome carousel, slide 2 of 3' },
      { src: loader3, alt: 'Welcome carousel, slide 3 of 3' },
    ],
  },
  {
    label: 'Exploring Products',
    screens: [
      { src: home, alt: 'Home — explore products' },
      { src: rajasthan, alt: 'State page — Rajasthan' },
      { src: handicrafts, alt: 'Category page — Handicrafts' },
      { src: pashminaList, alt: 'Product type page — Pashmina' },
    ],
  },
  {
    label: 'Product Screens',
    screens: [
      { src: pashminaProduct, alt: 'Product page — Pashmina Kurta' },
      { src: pashminaProduct1, alt: 'How it’s made' },
      { src: pashminaProvenance1, alt: 'Verification summary' },
      { src: pashminaProvenance2, alt: 'Provenance trail, full detail' },
    ],
  },
  {
    label: 'Supporting Screens',
    screens: [
      { src: searchBar, alt: 'Search' },
      { src: menu, alt: 'Menu' },
      { src: wishlist, alt: 'Wishlist' },
      { src: bag, alt: 'Bag' },
    ],
  },
];

export default function ScreensGallery({
  onBack,
  showBackButton = true,
}: {
  onBack: () => void;
  showBackButton?: boolean;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => setActive((i) => (i + 1) % GROUPS.length), AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [active]);

  const group = GROUPS[active];
  const goPrev = () => setActive((i) => (i - 1 + GROUPS.length) % GROUPS.length);
  const goNext = () => setActive((i) => (i + 1) % GROUPS.length);

  return (
    <>
      <h3 className={styles.heading}>{group.label}</h3>
      {showBackButton && (
        <button type="button" className={styles.goBack} onClick={onBack}>
          &larr;Go Back
        </button>
      )}

      <div className={styles.dots}>
        {GROUPS.map((g, i) => (
          <button
            key={g.label}
            type="button"
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            aria-label={`Show ${g.label}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      <button type="button" className={styles.edgeZone + ' ' + styles.edgeLeft} aria-label="Previous group" onClick={goPrev} />
      <button type="button" className={styles.edgeZone + ' ' + styles.edgeRight} aria-label="Next group" onClick={goNext} />

      <div className={styles.row}>
        {group.screens.map((screen) => (
          <PhoneMockup key={screen.alt} src={screen.src} alt={screen.alt} className={styles.mockup} />
        ))}
      </div>
    </>
  );
}
