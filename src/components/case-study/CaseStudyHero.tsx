import type { CSSProperties, ReactNode } from 'react';
import OutboundButton from './OutboundButton';
import styles from './CaseStudyHero.module.css';

export default function CaseStudyHero({
  roleTag,
  title,
  inShort,
  outboundHref,
  outboundLabel,
  background,
  textColor,
  media,
}: {
  roleTag: string;
  title: ReactNode;
  inShort: string;
  outboundHref: string;
  outboundLabel: string;
  background: string;
  textColor: string;
  media?: ReactNode;
}) {
  return (
    <section
      id="case-hero"
      className={`${styles.hero} ${media ? styles.split : ''}`}
      style={{ background, color: textColor } as CSSProperties}
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{roleTag}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.inShort}>{inShort}</p>
        <OutboundButton
          href={outboundHref}
          label={outboundLabel}
          variant="hero"
          background="var(--bg-canvas)"
          color="var(--chrome-bg)"
        />
      </div>
      {media && <div className={styles.media}>{media}</div>}
    </section>
  );
}
