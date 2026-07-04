import { Star, Pencil, Download, Mail } from 'lucide-react';
import styles from './Toolbar.module.css';

export default function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <button className={styles.iconButton} aria-label="Star">
        <Star size={18} strokeWidth={1.75} />
      </button>
      <button className={styles.iconButton} aria-label="Edit">
        <Pencil size={18} strokeWidth={1.75} />
      </button>
      <button className={styles.iconButton} aria-label="Download resume">
        <Download size={18} strokeWidth={1.75} />
      </button>
      <a className={styles.iconButton} aria-label="Email" href="mailto:sehazwritescopy@gmail.com">
        <Mail size={18} strokeWidth={1.75} />
      </a>
    </div>
  );
}
