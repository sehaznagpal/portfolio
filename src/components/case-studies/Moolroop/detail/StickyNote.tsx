import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import paperclip from '../../../../assets/images/moolroop/case-study/paperclip.png';
import styles from './StickyNote.module.css';

export default function StickyNote({
  variant,
  rotate = -2,
  className,
  children,
}: {
  variant: 'red' | 'white';
  rotate?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={`${styles.note} ${variant === 'red' ? styles.red : styles.white} ${className ?? ''}`}
      style={{ rotate }}
      whileHover={{ rotate: rotate + (rotate < 0 ? -2.5 : 2.5), y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <img className={styles.clip} src={paperclip} alt="" aria-hidden="true" />
      {children}
    </motion.div>
  );
}
