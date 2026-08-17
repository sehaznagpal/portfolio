import { type ReactNode, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './DetailOverlay.module.css';

const TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

export default function DetailOverlay({
  open,
  variant,
  onClose,
  children,
}: {
  open: boolean;
  variant: 'panel' | 'content';
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={`${styles.modal} ${variant === 'panel' ? styles.panel : styles.content}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={TRANSITION}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
              X
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
