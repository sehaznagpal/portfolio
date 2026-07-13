import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { ThemeName } from '../types';

const THEME_KEY = 'portfolio:theme';

export const THEME_OPTIONS: { id: ThemeName; label: string; swatchFill: string; swatchStroke: string }[] = [
  { id: 'pina-colada', label: 'Piña colada', swatchFill: '#F8FFD1', swatchStroke: '#C2F2E4' },
  { id: 'cool-breeze', label: 'Cool breeze', swatchFill: '#DDECF1', swatchStroke: '#AED9C6' },
  { id: 'seaglass', label: 'Seaglass', swatchFill: '#C84F6B', swatchStroke: '#DDECF1' },
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

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(readStoredTheme);

  useEffect(() => {
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

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
