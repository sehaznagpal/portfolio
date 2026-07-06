import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './OutboundButton.module.css';

export default function OutboundButton({
  href,
  label,
  variant = 'footer',
  background,
  color,
}: {
  href: string;
  label: string;
  variant?: 'hero' | 'footer';
  /** Solid fill color. Defaults to the current accent via currentColor if omitted. */
  background?: string;
  /** Text/icon color against the fill. Defaults to cream. */
  color?: string;
}) {
  return (
    <a
      className={`${styles.button} ${variant === 'hero' ? styles.hero : styles.footer}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={
        {
          '--btn-bg': background ?? 'currentColor',
          '--btn-fg': color ?? 'var(--bg-canvas)',
        } as CSSProperties
      }
    >
      <span className={styles.label}>{label}</span>
      <ArrowUpRight size={18} strokeWidth={2} />
    </a>
  );
}
