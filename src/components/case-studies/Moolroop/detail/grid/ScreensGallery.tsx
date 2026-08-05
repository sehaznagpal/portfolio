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

/* Ordered to follow the sitemap's left-to-right flow (Moolroop App/moolroop-sitemap.mermaid):
   Welcome Carousel -> Home -> Search -> Categories -> States -> Product Type -> Product ->
   How It's Made -> Provenance Trail -> Bag -> Wishlist -> Menu. */
const SCREENS = [
  { src: loader1, alt: 'Welcome carousel, slide 1 of 3' },
  { src: loader2, alt: 'Welcome carousel, slide 2 of 3' },
  { src: loader3, alt: 'Welcome carousel, slide 3 of 3' },
  { src: home, alt: 'Home — explore products' },
  { src: searchBar, alt: 'Search' },
  { src: handicrafts, alt: 'Category page — Handicrafts' },
  { src: rajasthan, alt: 'State page — Rajasthan' },
  { src: pashminaList, alt: 'Product type page — Pashmina' },
  { src: pashminaProduct, alt: 'Product page — Pashmina Kurta' },
  { src: pashminaProduct1, alt: 'How it’s made' },
  { src: pashminaProvenance1, alt: 'Verification summary' },
  { src: pashminaProvenance2, alt: 'Provenance trail, full detail' },
  { src: bag, alt: 'Bag' },
  { src: wishlist, alt: 'Wishlist' },
  { src: menu, alt: 'Menu' },
];

export default function ScreensGallery({ onBack }: { onBack: () => void }) {
  return (
    <>
      <h3 className={styles.heading}>Phone Screens</h3>
      <button type="button" className={styles.goBack} onClick={onBack}>
        &larr;Go Back
      </button>

      <div className={styles.scrollArea}>
        <div className={styles.grid}>
          {SCREENS.map((screen) => (
            <PhoneMockup key={screen.alt} src={screen.src} alt={screen.alt} />
          ))}
        </div>
      </div>
    </>
  );
}
