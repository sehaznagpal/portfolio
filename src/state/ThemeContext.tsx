import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ThemeName } from '../types';

const THEME_KEY = 'portfolio:experiment-theme';

/* Colour-matched against the Figma swatch SVGs by frame colour, not by the
   558:286 dropdown component's own text — that component mislabels the
   Seaglass (blue/mint) and Blush (rose/pink) frames as "Cool breeze" and
   "Seaglass" respectively. */
export const THEME_OPTIONS: { id: ThemeName; label: string; swatchFill: string; swatchStroke: string }[] = [
  { id: 'pina-colada', label: 'Piña Colada', swatchFill: '#F8FFD1', swatchStroke: '#C2F2E4' },
  { id: 'seaglass', label: 'Seaglass', swatchFill: '#DDECF1', swatchStroke: '#AED9C6' },
  { id: 'blush', label: 'Blush', swatchFill: '#C84F6B', swatchStroke: '#D1798E' },
  { id: 'wakanda', label: 'Wakanda', swatchFill: '#121212', swatchStroke: '#1E1E1E' },
];

function readStoredTheme(): ThemeName {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return THEME_OPTIONS.some((t) => t.id === stored) ? (stored as ThemeName) : 'default';
  } catch {
    return 'default';
  }
}

function storeTheme(theme: ThemeName): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // localStorage unavailable (e.g. private browsing) — selection just won't persist
  }
}

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/* Pure state only — no document-level side effects. Themed colour must never
   leak past whichever element the consumer explicitly attaches data-theme
   to (see ExperimentCanvas), since :root/html would cascade everywhere. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(readStoredTheme);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (next: ThemeName) => {
        setThemeState(next);
        storeTheme(next);
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
