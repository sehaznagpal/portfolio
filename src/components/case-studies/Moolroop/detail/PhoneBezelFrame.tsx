import { AnimatePresence, motion } from 'framer-motion';
import bezel from '../../../../assets/images/moolroop/case-study/phone-silver-bezel.png';
import styles from './PhoneBezelFrame.module.css';

export default function PhoneBezelFrame({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick?: () => void;
}) {
  return (
    <div className={styles.frame} onClick={onClick}>
      <div className={styles.screenClip}>
        <AnimatePresence initial={false}>
          <motion.img
            key={src}
            className={styles.screenImg}
            src={src}
            alt={alt}
            initial={{ x: 48, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -48, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          />
        </AnimatePresence>
      </div>
      <img className={styles.bezel} src={bezel} alt="" aria-hidden="true" />
    </div>
  );
}
