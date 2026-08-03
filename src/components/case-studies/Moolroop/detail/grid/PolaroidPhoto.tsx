import { motion } from 'framer-motion';
import styles from './PolaroidPhoto.module.css';

export interface PolaroidSpec {
  src: string;
  alt: string;
  cx: number;
  cy: number;
  width: number;
  height: number;
  rotate: number;
}

export default function PolaroidPhoto({ src, alt, cx, cy, width, height, rotate }: PolaroidSpec) {
  return (
    <motion.div
      className={styles.polaroid}
      style={{
        left: `${cx}%`,
        top: `${cy}%`,
        width: `${width}%`,
        height: `${height}%`,
        rotate,
      }}
      whileHover={{ scale: 1.08, y: -10, zIndex: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={src} alt={alt} className={styles.image} />
    </motion.div>
  );
}
