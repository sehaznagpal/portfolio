import { motion } from 'framer-motion';
import photo from '../../assets/images/hero/hero-polaroid.svg';
import styles from './MobileHeroPolaroid.module.css';

/* Mobile counterpart to HeroPolaroid — same asset, resized/repositioned per the
   Figma mobile "hero photo" frame (539:260) instead of desktop's coordinates. */
export default function MobileHeroPolaroid() {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: -2 }}
      exit={{ opacity: 0, scale: 0.95, rotate: 0 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
    >
      <img className={styles.photo} src={photo} alt="" />
    </motion.div>
  );
}
