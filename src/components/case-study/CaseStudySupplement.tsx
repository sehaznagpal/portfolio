import Sitemap from './Sitemap';
import ScreenshotFrame from './ScreenshotFrame';
import type { SitemapData } from './sitemap-data';
import styles from './CaseStudyLayout.module.css';

export interface ScreenshotSpec {
  src: string;
  caption: string;
}

export default function CaseStudySupplement({
  sitemapData,
  accentColor,
  screenshots,
}: {
  sitemapData: SitemapData;
  accentColor: string;
  screenshots: ScreenshotSpec[];
}) {
  return (
    <div className={styles.sitemapSection}>
      <h3>Sitemap</h3>
      <Sitemap data={sitemapData} accentColor={accentColor} />
      <div className={styles.gallery}>
        {screenshots.map((s) => (
          <ScreenshotFrame key={s.src} src={s.src} caption={s.caption} />
        ))}
      </div>
    </div>
  );
}
