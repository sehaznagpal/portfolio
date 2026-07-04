import { useEffect, useState } from 'react';
import { FRAME_W, FRAME_H } from './layout';

export function useScaleToFit() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const compute = () => {
      const s = Math.min(window.innerWidth / FRAME_W, window.innerHeight / FRAME_H);
      setScale(s);
    };
    compute();
    window.addEventListener('resize', compute);
    const ro = new ResizeObserver(compute);
    ro.observe(document.documentElement);
    return () => {
      window.removeEventListener('resize', compute);
      ro.disconnect();
    };
  }, []);

  return scale;
}
