import ScreenshotFrame from './ScreenshotFrame';
import PlaceholderFrame from './PlaceholderFrame';
import styles from './ScreenGroup.module.css';

export interface ScreenGroupItem {
  src?: string;
  caption?: string;
  placeholder?: boolean;
}

export default function ScreenGroup({
  items,
  layout,
}: {
  items: ScreenGroupItem[];
  layout: 'grid' | 'filmstrip';
}) {
  return (
    <div className={layout === 'grid' ? styles.grid : styles.filmstrip}>
      {items.map((item, i) =>
        item.placeholder || !item.src ? (
          <PlaceholderFrame key={i} label={item.caption ?? 'Not designed'} />
        ) : (
          <ScreenshotFrame key={i} src={item.src} caption={item.caption} />
        ),
      )}
    </div>
  );
}
