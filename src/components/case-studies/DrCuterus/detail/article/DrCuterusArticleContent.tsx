import { useLayoutEffect, useRef, useState } from 'react';
import homeScreen from '../../../../../assets/images/dr-cuterus/about-home-screen.jpg';
import plushToys from '../../../../../assets/images/dr-cuterus/plush-toys.png';
import blogScreen from '../../../../../assets/images/dr-cuterus/decisions-laptop-screen.jpg';
import homepageDesktopScreen from '../../../../../assets/images/dr-cuterus/outcome-laptop-screen.jpg';
import footerScreen from '../../../../../assets/images/dr-cuterus/outcome-phone-screen.jpg';
import styles from './DrCuterusArticleContent.module.css';

const WORDS_PER_MINUTE = 210;

function Divider({ variant }: { variant?: 'header' | 'tags' }) {
  const variantClass = variant === 'header' ? styles.dividerHeader : variant === 'tags' ? styles.dividerTags : '';
  return <hr className={`${styles.divider} ${variantClass}`} />;
}

/* A portrait phone screenshot, framed with a plain bordered box (object-fit:
   contain) rather than Dr Cuterus's own bezel-overlay technique used in the
   Cards panels — that technique is hand-tuned percentage positioning against
   each panel's own fixed 1020x663 box (and uses object-fit: cover, cropping
   slightly to fit the bezel cutout), which doesn't translate to this fluid,
   full-width layout without re-deriving new numbers, and would reintroduce
   cropping. Same source images, a fresh frame matching the sibling Article
   views' own treatment instead. */
function ScreenFigure({ src, alt, label, ratio }: { src: string; alt: string; label?: string; ratio: number }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.figureFrame} style={{ aspectRatio: ratio }}>
        <img src={src} alt={alt} />
      </div>
      {label && <figcaption className={styles.figureLabel}>{label}</figcaption>}
    </figure>
  );
}

/* A landscape reference image (laptop screenshot or photo). */
function ImageFigure({
  src,
  alt,
  label,
  ratio,
  maxWidth,
}: {
  src: string;
  alt: string;
  label?: string;
  ratio: number;
  maxWidth: number;
}) {
  return (
    <figure className={styles.figure}>
      <div className={styles.imageFrame} style={{ aspectRatio: ratio, maxWidth }}>
        <img src={src} alt={alt} />
      </div>
      {label && <figcaption className={styles.figureLabel}>{label}</figcaption>}
    </figure>
  );
}

export default function DrCuterusArticleContent() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [readMinutes, setReadMinutes] = useState<number | null>(null);

  /* Real word count of the rendered body (headings, paragraphs, figure
     labels — not the header/tags above it, which live outside bodyRef),
     read back from the DOM after mount rather than a hand-counted constant,
     so it never drifts from the actual copy above. */
  useLayoutEffect(() => {
    const text = bodyRef.current?.textContent ?? '';
    const words = text.trim().split(/\s+/).filter(Boolean);
    setReadMinutes(Math.max(1, Math.round(words.length / WORDS_PER_MINUTE)));
  }, []);

  return (
    <div className={styles.panel}>
      <div className={styles.scroll}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleLight}>Dr Cuterus </span>
            <span className={styles.titleAccent}>Website Design</span>
          </h2>
          <p className={styles.readTime} aria-hidden={readMinutes === null}>
            {readMinutes !== null && (
              <>
                <span className={styles.readTimeLight}>Read </span>
                <span className={styles.readTimeMedium}>{readMinutes} Min</span>
              </>
            )}
          </p>
        </div>

        <Divider variant="header" />

        <div className={styles.tags}>
          <div className={styles.tagProse}>
            <span className={styles.tagPill}>Role</span>
            <p className={styles.tagText}>
              <span className={styles.tagStrong}>Led design end to end,</span> alongside a
              developer collaborator; built roughly 40% of the live site, full component styling,
              and at least one page coded solo.
            </p>
          </div>

          <div className={styles.tagProse}>
            <span className={styles.tagPill}>In brief</span>
            <p className={styles.tagText}>
              One site built to carry{' '}
              <span className={styles.tagStrong}>patient trust, corporate credibility, and her
              voice</span>, in English and Hinglish, for a sex educator with millions of followers.
            </p>
          </div>

          <div className={styles.tagFacts}>
            <div className={styles.factRow}>
              <span className={styles.tagPillSmall}>Year</span>
              <span className={styles.factValue}>2026</span>
            </div>
            <div className={styles.factRow}>
              <span className={styles.tagPillSmall}>Affiliation</span>
              <span className={styles.factValue}>Independent client project</span>
            </div>
          </div>
        </div>

        <Divider variant="tags" />

        <div className={styles.body} ref={bodyRef}>
          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>India&apos;s favourite sexpert</h3>
            <p className={styles.paragraph}>
              Dr. Tanaya Narendra, known online as Dr Cuterus, is an Oxford-trained doctor, author,
              and sex educator with 1.9 million followers on Instagram and 834K on YouTube.
              She&apos;s been featured in Vogue, The Economist, CNN, and Forbes India, writes a
              nationally syndicated sex advice column, and has published a book on sexual health.
              Her whole brand runs on one line: 100% science, 0% sharam.
            </p>
            <p className={styles.paragraph}>
              She came to me needing a personal website that could hold all of that, patients
              booking appointments, followers looking for her content, brands wanting to
              collaborate, organisations booking her for workshops, in one place that felt as
              credible as it did like her. Not a generic doctor&apos;s site, and not just a
              link-in-bio either.
            </p>

            <ScreenFigure
              src={homeScreen}
              alt="Dr Cuterus homepage: India's Favourite Sex Educator"
              label="Homepage, phone view: India's Favourite Sex Educator"
              ratio={674 / 1432}
            />
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Four audiences, one voice, no pink</h3>
            <p className={styles.paragraph}>
              Patients, followers, brands, and organisations each needed a clear path in, without
              the site turning into five disconnected pages pretending to be one.
            </p>
            <p className={styles.paragraph}>
              She was firm on one thing early: no default &quot;women&apos;s health&quot; pink.
              She wanted purple and yellow, bright, not muted, which meant building a palette that
              felt playful without tipping into looking unserious for a practising doctor.
              She&apos;s quirky and disarming online, but she&apos;s also treating actual patients,
              and the site had to hold both without either one undercutting the other. On top of
              that, most of her content runs in Hinglish, but a chunk of her audience is fully
              global or from parts of India where Hindi isn&apos;t the default, so the site needed
              to speak both without feeling like a translation of itself.
            </p>

            <ImageFigure
              src={plushToys}
              alt="Uterus and organ-shaped plush toys"
              label="Uterus and organ-shaped plush toys: playful, gender-neutral brand accessory"
              ratio={620 / 387}
              maxWidth={440}
            />
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Building the voice before the screens</h3>
            <p className={styles.paragraph}>
              Before designing anything, I went through her Instagram, YouTube, and podcast to
              actually absorb her voice, not guess at it. She simplifies without dumbing down,
              she&apos;s cute and quirky but never loses the science, and Hinglish is native to how
              she talks, not a stylistic add-on.
            </p>
            <p className={styles.paragraph}>
              Colour came straight from her existing content. Purple showed up far more often than
              yellow across her posts, so purple became the base, yellow stayed reserved for
              accents and highlights, loud where it counts, not everywhere, with a neutral sitting
              between them so the two brights never fought on the same screen. Language got a
              toggle, English and Hinglish, sitting right at the top, so neither audience felt like
              an afterthought. Photos were chosen deliberately across the site to show her in
              different modes, on stage, at the clinic, mid-shoot, casual, and small hand-drawn
              doodles show up throughout, since they&apos;re a running motif in her own content and
              she genuinely loves them. Every call to action was designed around intent too, each
              section pointing toward whatever made sense there: booking an appointment,
              collaborating, sending an enquiry, or buying her book.
            </p>
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Cutting what wasn&apos;t working</h3>
            <p className={styles.paragraph}>
              The flow was built so the most important things sit at the top and nothing forces a
              visitor to dig for what they came for. Four pages ended up covering her four
              audiences cleanly: Home, Appointments, Blog, and Corporate Workshops. The blog exists
              because the same handful of questions kept resurfacing across her DMs and comments,
              so instead of answering them one at a time forever, there&apos;s now a standing place
              for them, live, and still growing.
            </p>
            <p className={styles.paragraph}>
              Not every idea survived contact with her actual needs. An early version had a full
              page cataloguing her achievements and press mentions, newsletter-style. She looked at
              it and pointed out it wasn&apos;t doing anything a visitor actually needed. It got
              replaced with the corporate workshops page instead, more useful, more relevant to the
              people actually landing on the site. Press mentions still show up, just as a compact
              logo strip instead of a page of their own.
            </p>

            <ImageFigure
              src={blogScreen}
              alt="Dr Cuterus blog page: Have Questions?"
              label="Blog page, desktop: Have Questions?"
              ratio={2146 / 1424}
              maxWidth={700}
            />
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>The outcome</h3>
            <p className={styles.paragraph}>
              The site is live at drcuterus.com, built in Astro. It runs clean across mobile,
              tablet, and desktop, holds her tone in both English and Hinglish, and still does the
              job it was built for: patients can book appointments, followers land on content that
              actually looks like her, and brands or organisations have a clear page to reach out
              from. The blog is live and growing, one question at a time.
            </p>

            <ImageFigure
              src={homepageDesktopScreen}
              alt="Dr Cuterus homepage on desktop: Your Next Door Sexpert"
              label="Homepage, desktop: Your Next Door Sexpert"
              ratio={2146 / 1426}
              maxWidth={700}
            />

            <ScreenFigure
              src={footerScreen}
              alt="Dr Cuterus site footer: Found something you liked? Let's talk."
              label="Site footer, phone view: Found something you liked? Let's talk."
              ratio={676 / 1424}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
