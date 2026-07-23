import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import styles from './ExperimentContent.module.css';

import chessIcon from '../../assets/images/experiment/chess-icon.svg';
import photoboothPhoto from '../../assets/images/experiment/photobooth-photo.png';
import sipBadge from '../../assets/images/experiment/sip-badge-hover.svg';
import sipCloud from '../../assets/images/experiment/sip-bg-hover.svg';
import sezPhoto from '../../assets/images/experiment/sez-photo.jpg';
import meThing1 from '../../assets/images/experiment/me-thing-1.png';
import meThing2 from '../../assets/images/experiment/me-thing-2.png';
import meThing3 from '../../assets/images/experiment/me-thing-3.png';
import meThing4 from '../../assets/images/experiment/me-thing-4.png';
import meThing5 from '../../assets/images/experiment/me-thing-5.png';
import meThing6 from '../../assets/images/experiment/me-thing-6.png';
import meThing7 from '../../assets/images/experiment/me-thing-7.png';
import linkedinIcon from '../../assets/images/experiment/linkedin-icon.svg';
import phoneIcon from '../../assets/images/experiment/phone-icon.svg';
import mailIcon from '../../assets/images/experiment/mail-icon.svg';
import starCard from '../../assets/images/experiment/star-card.svg';
import discImg from '../../assets/images/experiment/disc.png';
import extrasHeart from '../../assets/images/experiment/extras-heart.svg';
import extrasALetter from '../../assets/images/experiment/extras-a-letter.svg';
import extrasCornerTlIcon from '../../assets/images/experiment/extras-corner-tl.svg';
import extrasCornerBrIcon from '../../assets/images/experiment/extras-corner-br.svg';
import extrasLettersNone from '../../assets/images/experiment/extras-letters-default.svg';
import extrasLettersTl from '../../assets/images/experiment/extras-letters-tl.svg';
import extrasLettersTr from '../../assets/images/experiment/extras-letters-tr.svg';
import extrasLettersBl from '../../assets/images/experiment/extras-letters-bl.svg';
import extrasLettersBr from '../../assets/images/experiment/extras-letters-br.svg';

/* Every offset below is the element's centre, read directly off the Figma
   frame (2560x1664) as (centre - frame-centre). Positioning items this way
   means the layout matches the reference pixel-for-pixel regardless of the
   canvas's own pan/zoom, since the whole tree scales together. */
function Positioned({ dx, dy, children }: { dx: number; dy: number; children: ReactNode }) {
  const style: CSSProperties = { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))` };
  return (
    <div className={styles.positioned} style={style}>
      {children}
    </div>
  );
}

function useInViewOnce<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const LETTER_TEXT = `Hey,
I want to be a product designer who actually gets user experience right. I'm still early in this, and every project I take on is partly about the work and partly about learning something new.

I don't have a design or technical degree behind me. What I do have is curiosity, dedication and ideas which help me make up the difference by my work.

Yours,
Sehaz (pronounced Suh-HAHJ)`;

function Letter() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const [shown, setShown] = useState(0);
  const done = shown >= LETTER_TEXT.length;

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setShown((prev) => {
        if (prev >= LETTER_TEXT.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 2;
      });
    }, 14);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} className={styles.letter}>
      <p className={styles.letterText}>
        {LETTER_TEXT.slice(0, shown)}
        {!done && inView && <span className={styles.caret}>&nbsp;</span>}
      </p>
    </div>
  );
}

type Thing = { src: string; x: number; y: number; w: number; h: number; rot?: number; delay?: number };

const THINGS: Thing[] = [
  { src: meThing1, x: 37, y: 235, w: 159, h: 163, delay: 0 },
  { src: meThing2, x: 60, y: 367, w: 192, h: 134, delay: 40 },
  { src: meThing3, x: 163.8, y: 425, w: 124, h: 124, rot: 10.78, delay: 80 },
  { src: meThing4, x: 248, y: 356, w: 210, h: 212, delay: 20 },
  { src: meThing5, x: 396, y: 283, w: 185, h: 185, rot: -21.55, delay: 60 },
  { src: meThing6, x: 75, y: 107, w: 182, h: 198, rot: -32.32, delay: 100 },
  { src: meThing7, x: 178, y: 38, w: 157, h: 142, delay: 30 },
];

function MeAndContact() {
  return (
    <>
      <Positioned dx={-398.03} dy={530.42}>
        <div className={styles.meWrap}>
          {THINGS.map((thing, i) => (
            <div
              key={i}
              className={styles.thing}
              style={
                {
                  '--w': `${thing.w}px`,
                  '--h': `${thing.h}px`,
                  '--tx': `${thing.x}px`,
                  '--ty': `${thing.y}px`,
                  '--rot': `${thing.rot ?? 0}deg`,
                  '--delay': `${thing.delay ?? 0}ms`,
                } as CSSProperties
              }
            >
              <img src={thing.src} alt="" />
            </div>
          ))}
          <div className={styles.sez}>
            <img src={sezPhoto} alt="Sehaz Nagpal" />
          </div>
        </div>
      </Positioned>

      <Positioned dx={-146} dy={406.5}>
        <div className={styles.contactCard}>
          <p className={styles.contactHeading}>Say hello!</p>
          <p className={styles.contactName}>Sehaz Nagpal</p>
          <img src={linkedinIcon} alt="LinkedIn" className={styles.contactIcon} style={{ left: 219 }} />
          <img src={mailIcon} alt="Email" className={styles.contactIcon} style={{ left: 252 }} />
          <img src={phoneIcon} alt="Phone" className={styles.contactIcon} style={{ left: 285 }} />
        </div>
      </Positioned>
    </>
  );
}

type Quadrant = 'none' | 'tl' | 'tr' | 'bl' | 'br';

const EXTRAS_LETTERS: Record<Quadrant, { src: string; className: string }> = {
  none: { src: extrasLettersNone, className: styles.extrasLettersNone },
  tl: { src: extrasLettersTl, className: styles.extrasLettersTl },
  tr: { src: extrasLettersTr, className: styles.extrasLettersTr },
  bl: { src: extrasLettersBl, className: styles.extrasLettersBl },
  br: { src: extrasLettersBr, className: styles.extrasLettersBr },
};

function ExtrasCard() {
  const [quadrant, setQuadrant] = useState<Quadrant>('none');
  const letters = EXTRAS_LETTERS[quadrant];

  function handleMove(event: ReactMouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;
    setQuadrant(relX < 0.5 ? (relY < 0.5 ? 'tl' : 'bl') : relY < 0.5 ? 'tr' : 'br');
  }

  return (
    <div
      className={styles.extrasCard}
      onMouseMove={handleMove}
      onMouseLeave={() => setQuadrant('none')}
      tabIndex={0}
    >
      <div className={styles.extrasBg} />
      <img src={extrasALetter} alt="" className={styles.extrasCornerTL} />
      <img src={extrasCornerTlIcon} alt="" className={styles.extrasIconTL} />
      <img src={extrasALetter} alt="" className={styles.extrasCornerBR} />
      <img src={extrasCornerBrIcon} alt="" className={styles.extrasIconBR} />
      <img src={extrasHeart} alt="" className={styles.extrasHeart} />
      <img src={letters.src} alt="Extras" className={`${styles.extrasLetters} ${letters.className}`} />
    </div>
  );
}

export default function ExperimentContent() {
  return (
    <>
      <Positioned dx={0} dy={0}>
        <div className={styles.centerCard}>
          <span className={`${styles.corner} ${styles.cornerTL}`} />
          <span className={`${styles.corner} ${styles.cornerTR}`} />
          <span className={`${styles.corner} ${styles.cornerBL}`} />
          <span className={`${styles.corner} ${styles.cornerBR}`} />
          <p className={styles.centerHeading}>
            <span className={styles.centerHeadingItalic}>More from my</span>{' '}
            <span className={styles.centerHeadingBold}>Drafts</span>
          </p>
          <div className={styles.centerBody}>
            <p>
              Product feels like an interesting place to be right now. Technology keeps getting easier to build with,
              and somehow that makes it harder to build well, because the people using it are changing just as fast
              as the tools are. I don't think you can fully understand any of that from the outside. So I like to
              keep making small things just to see how they hold up when someone actually uses them.
            </p>
            <p>This page is where a few of those attempts live of how I tried to learn.</p>
          </div>
        </div>
      </Positioned>

      <Positioned dx={859} dy={-140}>
        <div className={styles.chess}>
          <img src={chessIcon} alt="Chess" />
        </div>
      </Positioned>

      <Positioned dx={-644.61} dy={-142.21}>
        <div className={styles.photobooth}>
          <img src={photoboothPhoto} alt="Photobooth" className={styles.photoboothImg} />
        </div>
      </Positioned>

      <Positioned dx={-826.12} dy={195.41}>
        <div className={styles.sipStudio} tabIndex={0}>
          <div className={styles.sipCloud}>
            <img src={sipCloud} alt="" />
          </div>
          <p className={styles.sipLabel}>a branding project</p>
          <div className={styles.sipBadge}>
            <img src={sipBadge} alt="SiP Studio" />
          </div>
        </div>
      </Positioned>

      <MeAndContact />

      <Positioned dx={106.16} dy={-388.84}>
        <div className={styles.website} tabIndex={0}>
          <div className={styles.websiteFlip}>
            <img src={starCard} alt="" className={styles.starImg} />
            <p className={styles.websiteLabel}>
              re-wired
              <br />
              website
            </p>
          </div>
        </div>
      </Positioned>

      <Positioned dx={-319.5} dy={-500}>
        <div className={styles.motionDemo} tabIndex={0}>
          <div className={styles.disc}>
            <img src={discImg} alt="" />
          </div>
          <div className={styles.motionBox}>
            <p className={styles.motionText}>
              Motion
              <br />
              Graphic
              <br />
              Demo
            </p>
          </div>
        </div>
      </Positioned>

      <Positioned dx={658.36} dy={447.53}>
        <Letter />
      </Positioned>

      <Positioned dx={566.37} dy={-494.02}>
        <ExtrasCard />
      </Positioned>
    </>
  );
}
