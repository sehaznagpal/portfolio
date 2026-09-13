import { useLayoutEffect, useRef, useState } from 'react';
import homepageHero from '../../../../../assets/images/dr-cuterus/homepage-hero.png';
import colours from '../../../../../assets/images/dr-cuterus/colours.png';
import typography1 from '../../../../../assets/images/dr-cuterus/typography-1.png';
import typography2 from '../../../../../assets/images/dr-cuterus/typography-2.png';
import languageToggle from '../../../../../assets/images/dr-cuterus/language-toggle.png';
import bra from '../../../../../assets/images/dr-cuterus/bra.png';
import brandsTicker from '../../../../../assets/images/dr-cuterus/brands-ticker.png';
import appointments from '../../../../../assets/images/dr-cuterus/appointments.png';
import social from '../../../../../assets/images/dr-cuterus/social.png';
import homeScreen from '../../../../../assets/images/dr-cuterus/about-home-screen.jpg';
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

/* A landscape reference image (laptop screenshot, photo, or UI detail). No
   maxWidth cap by default, so a full-bleed asset (the ticker strip) can span
   the same full width as everything else in the article. */
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
  maxWidth?: number;
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
            <h3 className={styles.sectionHeading}>100% Science. 0% Sharam.</h3>
            <p className={styles.paragraph}>
              Dr. Tanaya Narendra, known online as Dr Cuterus, is an Oxford-trained doctor, author,
              and sex educator with 1.9 million followers on Instagram and 834K on YouTube.
              She&apos;s carried forward Dr. Mahindra Watsa&apos;s legendary sex advice column in
              Mumbai Mirror, published a book on sexual health, and been featured everywhere from
              Vogue to The Economist to CNN. Her whole brand runs on one line, said in both English
              and Hinglish: 100% science, 0% sharam, plus a lot of love.
            </p>
            <p className={styles.paragraph}>
              The homepage leads with that, not a headshot and a designation. A scattered polaroid
              mosaic shows her across every mode she actually shows up in, in a saree, mid scuba
              dive, on a public health billboard, recording her podcast, in her white coat, before
              either &quot;Book an Appointment&quot; or &quot;Work with Me&quot; ever gets a click.
            </p>

            <ImageFigure
              src={homepageHero}
              alt="Homepage hero: polaroid mosaic across her different modes"
              label='Homepage hero: polaroid mosaic, paired with "100% Science. 0% Sharam."'
              ratio={2940 / 1670}
              maxWidth={700}
            />

            <p className={styles.paragraph}>
              The brief was a personal website that could hold all of that, patients booking
              appointments, followers looking for her content, brands wanting to collaborate,
              organisations booking her for workshops, in one place that felt as credible as it did
              like her. Not a generic doctor&apos;s site, and not just a link-in-bio either.
            </p>
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>What I was working within</h3>
            <p className={styles.paragraph}>
              Patients, followers, brands, and organisations each needed a clear path in, without
              the site turning into five disconnected pages pretending to be one.
            </p>
            <p className={styles.paragraph}>
              Nowhere on the site defaults to pink. She wanted purple and yellow instead, bright,
              not muted, playful without tipping into unserious for a practising doctor. And the
              bilingual requirement went deeper than a toggle switch: nearly every headline needed
              to exist as two real sentences, an English one and a Hinglish one, &quot;Hi, main
              hoon Dr Tanaya Narendra&quot; sitting next to &quot;Hey, I&apos;m Dr Tanaya
              Narendra,&quot; not one translated from the other after the fact.
            </p>
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Setting the system: colour, type, language</h3>
            <p className={styles.paragraph}>
              Purple showed up far more often than yellow across her existing content, so purple
              became the base and yellow stayed reserved for accents, loud where it counts, not
              everywhere.
            </p>

            <ImageFigure
              src={colours}
              alt="Primary colour system: purple and yellow, with accessibility ratios"
              label="Colour system: purple and yellow, with accessibility ratios"
              ratio={2310 / 952}
              maxWidth={700}
            />

            <p className={styles.paragraph}>
              Headings run in Sentient, a serif with enough personality to feel human rather than
              clinical. Body text sits in Cabinet Grotesque, a clean sans that stays readable
              across long blog answers and dense appointment details.
            </p>

            <div className={styles.figureRow}>
              <ImageFigure
                src={typography1}
                alt="Sentient display typeface specimen"
                label="Sentient: the display typeface"
                ratio={1821 / 1484}
              />
              <ImageFigure
                src={typography2}
                alt="Cabinet Grotesque text typeface specimen"
                label="Cabinet Grotesque: the text typeface"
                ratio={1877 / 1549}
              />
            </div>

            <p className={styles.paragraph}>
              A language toggle sits right in the header, switching the whole site between English
              and Hinglish, so neither audience reads as the afterthought to the other.
            </p>

            <ImageFigure
              src={languageToggle}
              alt="English / Hinglish language toggle"
              label="Language toggle: English / Hinglish"
              ratio={170 / 29}
              maxWidth={220}
            />
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>A homepage that doesn&apos;t act like a doctor&apos;s website</h3>
            <p className={styles.paragraph}>
              Her book, &quot;Everything Nobody Tells You About Your Body,&quot; sits right on the
              homepage, GoodReads-rated, available to read in English, Hindi, Punjabi, or
              Marathi, with a direct link to buy. A few sections down, a merch collaboration for a
              bra, FURSAT, sits comfortably next to her podcast, Breast Friends, nine episodes deep
              and still going. All three, book, merch, podcast, carry the same confident, slightly
              cheeky tone she uses everywhere else. Nothing here reads like a hospital website
              pretending to be fun. It reads like her feed, just organised.
            </p>

            <ImageFigure
              src={bra}
              alt='"Made a bra for you" merch section, paired with the Breast Friends podcast carousel'
              label='"Made a bra for you": merch section paired with the Breast Friends podcast'
              ratio={2940 / 1666}
              maxWidth={700}
            />
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Credibility that doesn&apos;t need its own page</h3>
            <p className={styles.paragraph}>
              An early version of the site had a full page cataloguing her achievements and press
              mentions, newsletter-style. It got cut. In its place, a continuous scrolling ticker
              runs beneath the hero, nearly thirty names deep, Forbes India, Vogue, CNN, The
              Economist, the World Health Organization, India&apos;s Ministry of Health, moving
              past rather than sitting still as a wall of text anyone would have to read top to
              bottom to feel the weight of it.
            </p>

            <ImageFigure
              src={brandsTicker}
              alt="Continuous scrolling press and partner ticker"
              label="Press and partner ticker: continuous scrolling strip"
              ratio={2940 / 122}
            />
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Meeting people where their fear actually is</h3>
            <p className={styles.paragraph}>
              Booking a sexual health appointment is rarely a simple decision, so the appointments
              page opens by naming the exact worries people usually sit with quietly: pain during
              sex, irregular periods, PCOD, discharge, not being able to orgasm. Seeing the
              question written down plainly, instead of hidden behind clinical language, does most
              of the persuading before the booking button ever needs to.
            </p>

            <ImageFigure
              src={appointments}
              alt='"Does Any of These Sound Like You?" problem callouts, leading into Book via WhatsApp'
              label='"Does Any of These Sound Like You?": leading into Book via WhatsApp'
              ratio={2940 / 1666}
              maxWidth={700}
            />
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Showing up everywhere she already does</h3>
            <p className={styles.paragraph}>
              Before designing anything, I went through her Instagram, YouTube, and Spotify to
              actually absorb her voice, not guess at it. She simplifies without dumbing down,
              stays quirky without losing the science, and Hinglish is native to how she talks,
              not a stylistic add-on. The homepage reflects that directly: 1.9 million followers
              and 900-plus posts on Instagram, 834K subscribers and 350-plus videos on YouTube, a
              podcast rated 4.8 on Spotify, all pulled into one place instead of asking visitors to
              go find it themselves.
            </p>

            <ImageFigure
              src={social}
              alt="Instagram, Spotify, and YouTube presence, shown as phone mockups"
              label="Instagram, Spotify, and YouTube presence, shown as phone mockups"
              ratio={2940 / 1664}
              maxWidth={700}
            />
          </section>

          <Divider />

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>Built for the phone first</h3>
            <p className={styles.paragraph}>
              Her own homepage copy admits it outright: &quot;How you will find me while scrolling
              on your phone.&quot; Most of her audience meets her on a screen the size of their
              palm, mid-scroll, between reels, so the site needed to hold up there just as well as
              it does on a desktop pitch deck.
            </p>

            <div className={styles.figureRow}>
              <ScreenFigure
                src={homeScreen}
                alt="Dr Cuterus homepage, mobile view"
                label="Homepage, mobile view"
                ratio={674 / 1432}
              />
              <ScreenFigure
                src={footerScreen}
                alt="Dr Cuterus site footer: Found something you liked? Let's talk."
                label="Site footer, phone view: Found something you liked? Let's talk."
                ratio={676 / 1424}
              />
            </div>
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
              Not every idea survived contact with her actual needs. That original achievements
              page didn&apos;t make the cut, she looked at it and pointed out it wasn&apos;t doing
              anything a visitor actually needed. It got replaced with the corporate workshops page
              instead, more useful, more relevant to the people actually landing on the site.
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
              from. Even the footer keeps her voice intact, her dog Samosa gets a cameo,
              &quot;found something you liked? Let&apos;s talk.&quot; The blog is live and growing,
              one question at a time.
            </p>

            <ImageFigure
              src={homepageDesktopScreen}
              alt="Dr Cuterus homepage on desktop: Your Next Door Sexpert"
              label="Homepage, desktop: Your Next Door Sexpert"
              ratio={2146 / 1426}
              maxWidth={700}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
