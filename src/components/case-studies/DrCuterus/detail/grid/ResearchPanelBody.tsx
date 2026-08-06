import styles from './ResearchPanelBody.module.css';

export default function ResearchPanelBody() {
  return (
    <>
      <h2 className={styles.heading}>Understanding her existing voice</h2>
      <div className={styles.body}>
        <p>
          Before designing anything, I went through her Instagram, YouTube, and podcast to
          actually absorb her voice, not guess at it. She simplifies without dumbing down,
          she&apos;s cute and quirky but never loses the science, and Hinglish is native to how
          she talks, not a stylistic add-on.
        </p>
        <p>
          <span className={styles.highlight}>Colour came straight from her existing content.</span>{' '}
          Purple showed up far more often than yellow across her posts, so purple became the
          base, yellow stayed reserved for accents and highlights, loud where it counts, not
          everywhere. I picked a neutral to sit between them so the two brights never fought each
          other on the same screen.
        </p>
        <p>
          <span className={styles.highlight}>Language got a toggle,</span> English and Hinglish,
          sitting right at the top, so neither audience felt like an afterthought to the other.
        </p>
        <p>
          <span className={styles.highlight}>Photos were chosen deliberately</span> across the
          site to show her in different modes, on stage, at the clinic, mid-shoot, casual, so no
          single visitor&apos;s idea of &quot;who she is&quot; stayed incomplete.
        </p>
        <p>
          <span className={styles.highlight}>Doodles show up throughout</span> too, small,
          hand-drawn touches scattered across sections, because they&apos;re a running motif in
          her own content and she genuinely loves them.
        </p>
        <p>
          <span className={styles.highlight}>Calls to action were designed around intent.</span>{' '}
          Each section encouraged the action that made the most sense in context, booking an
          appointment, collaborating, sending an enquiry, or buying her book.
        </p>
      </div>
    </>
  );
}
