import type { CSSProperties, ReactNode } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CaseStudyLayout.module.css';

export default function CaseStudyLayout({
  pageTitle,
  accentColor,
  tone = 'light',
  children,
}: {
  pageTitle: string;
  accentColor?: string;
  tone?: 'light' | 'dark';
  children: ReactNode;
}) {
  /* Detail pages are long-form scroll pages and must scroll normally — the opposite of
     the index experience's fixed-viewport, never-scroll constraint. */
  useEffect(() => {
    document.body.classList.remove('no-scroll');
    const previousTitle = document.title;
    document.title = `${pageTitle} · Sehaz Nagpal`;
    return () => {
      document.title = previousTitle;
    };
  }, [pageTitle]);

  return (
    <div
      className={`${styles.page} ${tone === 'dark' ? `${styles.dark} case-study-dark` : ''}`}
      style={accentColor ? ({ '--case-accent': accentColor } as CSSProperties) : undefined}
    >
      <Link className={styles.backLink} to="/">
        ← back to portfolio
      </Link>
      {children}
    </div>
  );
}
