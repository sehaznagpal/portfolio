import styles from './ScreenshotFrame.module.css';

export default function ScreenshotFrame({ src, caption }: { src: string; caption?: string }) {
  return (
    <figure className={styles.frame}>
      <img src={src} alt={caption ?? ''} />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
