import { motion } from 'framer-motion';
import { useIsMobile } from '../../../../../lib/useIsMobile';
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

/* Scale/lift derived from the Figma reference (813:156 rest vs 831:911 hover):
   comparing the brassware photo's rest vs. hover coordinates in the 1020x663 panel
   frame gives scale 1.19 and a ~120px rise — enough for the hovered photo to clear
   its neighbors and sit just below the body text, not a subtle nudge.

   zIndex is excluded from the eased transition on both variants — it's a discrete
   value with nothing meaningful to interpolate, and animating it "smoothly" just
   risks it flipping mid-motion. It jumps instantly on hover-in (so the photo is
   already frontmost before it starts growing, never briefly clipped under a
   neighbor) and instantly on hover-out (paired with an otherwise-instant "rest"
   transition so the whole return is a single unanimated snap, per spec — stable
   even when the pointer moves rapidly between overlapping photos). */
const HOVER_TRANSITION = { duration: 0.16, ease: [0.22, 1, 0.36, 1] as const };

const PHOTO_VARIANTS = {
  rest: { scale: 1, y: 0, zIndex: 0, transition: { duration: 0 } },
  hover: {
    scale: 1.19,
    y: -120,
    zIndex: 1,
    transition: { default: HOVER_TRANSITION, zIndex: { duration: 0 } },
  },
};

export default function PolaroidPhoto({ src, alt, cx, cy, width, height, rotate }: PolaroidSpec) {
  const isMobile = useIsMobile();

  /* cx/cy/width/height/rotate are percentages of the desktop panel's fixed
     1020x663 box (see cardData.ts) — art-directed scatter positions that
     don't mean anything against mobile's flow layout. Below the mobile
     breakpoint this component skips them entirely and falls back to the
     plain-flow sizing in PolaroidPhoto.module.css's mobile rule instead of
     translating the percentages into some other coordinate space. */
  return (
    <motion.div
      className={styles.polaroid}
      style={
        isMobile
          ? undefined
          : {
              left: `${cx}%`,
              top: `${cy}%`,
              width: `${width}%`,
              height: `${height}%`,
              rotate,
            }
      }
      variants={PHOTO_VARIANTS}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <img src={src} alt={alt} className={styles.image} />
    </motion.div>
  );
}
