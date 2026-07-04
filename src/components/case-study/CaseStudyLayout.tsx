import type { CSSProperties, ReactNode } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CaseStudyLayout.module.css';

export default function CaseStudyLayout({
  eyebrow,
  title,
  pageTitle,
  inShort,
  accentColor,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  pageTitle: string;
  inShort: string;
  accentColor?: string;
  children: ReactNode;
}) {
  /* Detail pages are long-form essay pages and must scroll normally — the opposite of
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
      className={styles.page}
      style={accentColor ? ({ '--case-accent': accentColor } as CSSProperties) : undefined}
    >
      <Link className={styles.backLink} to="/">
        ← back to portfolio
      </Link>

      <div className={styles.column}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.inShort}>{inShort}</p>

        <div className={styles.prose}>{children}</div>

        <div className={styles.footer}>
          <Link className={styles.footerLink} to="/">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
