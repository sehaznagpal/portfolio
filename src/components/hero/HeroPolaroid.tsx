import { motion } from 'framer-motion';
import photo from '../../assets/images/hero/polaroid-photo.jpg';
import styles from './HeroPolaroid.module.css';

/* Figma's literal hover-state position overlaps "Nagpal" and the paragraph's earlier
   lines — the brief explicitly authorizes tightening this rather than replicating the
   overlap, so this is deliberately smaller and anchored lower/righter than the Figma
   frame, in the card's empty margin beside the paragraph's centered text column. */
export default function HeroPolaroid() {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: -3 }}
      exit={{ opacity: 0, scale: 0.95, rotate: 0 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className={styles.polaroid}>
        <img className={styles.photo} src={photo} alt="" />
      </div>
    </motion.div>
  );
}
