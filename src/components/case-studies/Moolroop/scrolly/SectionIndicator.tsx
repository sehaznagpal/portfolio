import { useEffect, useRef } from 'react';
import { useAnimate } from 'framer-motion';
import styles from './SectionIndicator.module.css';

export const DOT_COUNT = 5;
const DOT_SIZE = 12;
const DOT_GAP = 4;
const PITCH = DOT_SIZE + DOT_GAP;
const TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

/* One traveling marker (not five independently-toggled dots): it slides from
   its current dot to the next, spinning and passing through a circle
   mid-flight before settling back into a square — matching the brief's
   "rotates and moves... transitions circle-to-square or square-to-circle"
   rather than an instant swap between two static states. Only re-animates
   when the active dot actually changes (via useAnimate + an effect keyed on
   dotIndex), not on every render, so unrelated parent re-renders don't
   replay the morph. */
export default function SectionIndicator({
  activeIndex,
  direction,
}: {
  activeIndex: number;
  direction: 1 | -1;
}) {
  const dotIndex = Math.min(activeIndex, DOT_COUNT - 1);
  const [scope, animate] = useAnimate();
  const rotationRef = useRef(0);
  const prevDotRef = useRef(dotIndex);

  useEffect(() => {
    if (dotIndex === prevDotRef.current) return;
    rotationRef.current += direction * 180;
    prevDotRef.current = dotIndex;
    animate(
      scope.current,
      {
        x: dotIndex * PITCH,
        rotate: rotationRef.current,
        borderRadius: ['0%', '50%', '0%'],
      },
      TRANSITION,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dotIndex, direction]);

  return (
    <div className={styles.track}>
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <span key={i} className={styles.ghost} />
      ))}
      <div
        ref={scope}
        className={styles.marker}
        style={{ transform: 'translateX(0px) rotate(0deg)', borderRadius: '0%' }}
      />
    </div>
  );
}
