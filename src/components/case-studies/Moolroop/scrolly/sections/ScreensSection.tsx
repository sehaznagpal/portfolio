import ScreensGallery from '../../detail/grid/ScreensGallery';
import SectionHeader from '../SectionHeader';
import styles from './ScreensSection.module.css';

export default function ScreensSection() {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <SectionHeader number="04" title="Screens" />
      </div>
      <div className={styles.galleryFrame}>
        <ScreensGallery onBack={() => {}} showBackButton={false} />
      </div>
    </div>
  );
}
