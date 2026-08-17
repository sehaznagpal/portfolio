import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { THEME_OPTIONS } from '../../state/ThemeContext';
import type { ThemeName } from '../../types';
import styles from './ThemeTransitionCurtain.module.css';

const CURTAIN_TRANSITION = { duration: 1.552, ease: [0.32, 1, 0.46, 1] as const };

function colorFor(theme: ThemeName): string {
  const option = THEME_OPTIONS.find((candidate) => candidate.id === theme);
  // 'default' has no swatch of its own — it's whatever the page's own
  // background variable currently resolves to.
  return option?.swatchFill ?? 'var(--bg-canvas)';
}

/* The canvas background itself (the whole ExperimentCanvas.viewport fill,
   not any one small UI element) swaps instantly whenever `theme` changes,
   since it's just a CSS custom-property override keyed off data-theme. To
   turn that into "the new color slides in from the left, pushing the
   outgoing one out to the right" instead, this renders a single-shot,
   full-viewport curtain in the *old* color the instant a change is
   detected, sitting on top of the (already-updated-underneath) real
   background, then animates that curtain off to the right — revealing the
   new color as it goes — and unmounts itself once the slide finishes, so it
   never lingers and never blocks the grid pattern the rest of the time. */
export default function ThemeTransitionCurtain({ theme }: { theme: ThemeName }) {
  const prevThemeRef = useRef(theme);
  const [outgoing, setOutgoing] = useState<{ id: number; color: string } | null>(null);

  useEffect(() => {
    if (prevThemeRef.current === theme) return;
    setOutgoing({ id: Date.now(), color: colorFor(prevThemeRef.current) });
    prevThemeRef.current = theme;
  }, [theme]);

  if (!outgoing) return null;

  return (
    <motion.div
      key={outgoing.id}
      className={styles.curtain}
      style={{ background: outgoing.color }}
      initial={{ x: 0 }}
      animate={{ x: '100%' }}
      transition={CURTAIN_TRANSITION}
      onAnimationComplete={() => setOutgoing(null)}
    />
  );
}
