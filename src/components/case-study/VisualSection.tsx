import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './VisualSection.module.css';

export default function VisualSection({
  id,
  label,
  media,
  caption,
  mediaMaxWidth,
  className = '',
}: {
  id: string;
  label?: string;
  media: ReactNode;
  caption?: ReactNode;
  /** Caps the media width, e.g. for portrait phone screens that shouldn't stretch to full stage width. */
  mediaMaxWidth?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`${styles.section} ${className}`}>
      {label && <h2 className={styles.label}>{label}</h2>}
      <motion.div
        className={styles.media}
        style={mediaMaxWidth ? { maxWidth: mediaMaxWidth, margin: '0 auto' } : undefined}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {media}
      </motion.div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </section>
  );
}
