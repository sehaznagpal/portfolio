import { useEffect, useState } from 'react';
import { MOBILE_FRAME_W, MOBILE_FRAME_H } from './mobileLayout';

export function useScaleToFitMobile() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const compute = () => {
      const s = Math.min(window.innerWidth / MOBILE_FRAME_W, window.innerHeight / MOBILE_FRAME_H);
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
