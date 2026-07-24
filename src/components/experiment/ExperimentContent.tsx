import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import styles from './ExperimentContent.module.css';
import SipStudioModal from './SipStudioModal';
import ExtrasModal from './ExtrasModal';
import MotionDemoModal from './MotionDemoModal';
import PhotoboothModal from './PhotoboothModal';

import chessCircle from '../../assets/images/experiment/chess-circle.svg';
import chessPieces from '../../assets/images/experiment/chess-pieces.svg';
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

const CHESS_URL = 'https://chess-portfolio-lime.vercel.app';
const REWIRED_URL = 'https://www.re-wired.tech';
const LINKEDIN_URL = 'https://www.linkedin.com/in/sehaznagpal';

const CONTACT_SUBJECT = 'Re-directed from your portfolio';
const CONTACT_BODY =
  "Hi Sehaz,\n\nI came across your portfolio and wanted to reach out, we'd love to connect.\n\nBest,\n";
/* Gmail's web compose URL, not a mailto: link — mailto: hands off to whatever
   mail client is registered on the OS (often an empty native Mail app), while
   this always opens the pre-filled draft in Gmail on the web. */
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=sehaznagpal@gmail.com&su=${encodeURIComponent(CONTACT_SUBJECT)}&body=${encodeURIComponent(CONTACT_BODY)}`;
const WHATSAPP_URL = `https://wa.me/919971159640?text=${encodeURIComponent(CONTACT_BODY)}`;

/* Chess and the re-wired star are div-based (not <a>) so their existing hover
   choreography keeps working untouched; click/keyboard just navigates on top
   of that same element. */
function openInNewTab(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function handleLinkKeyDown(event: ReactKeyboardEvent, url: string) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openInNewTab(url);
  }
}

/* Every offset below is the element's centre-from-page-centre. Originally
   read off the Figma frame (2560x1664), then pulled in toward the center
   card and re-spread horizontally to fill the 1.65x canvas without any
   two elements overlapping (the "say hello" card and photo cluster are the
   one deliberate exception — their gap matches the original design exactly).
   No element's own size changes here, only its position. Positioning items
   this way means panning/zooming just scales the whole tree together, with
   no per-element recalculation needed. */
function Positioned({ dx, dy, children }: { dx: number; dy: number; children: ReactNode }) {
  const style: CSSProperties = { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))` };
  return (
    <div className={styles.positioned} style={style}>
      {children}
    </div>
  );
}

/* Gated on an actual scroll/pan gesture, not just passive visibility — the
   canvas can easily load with this element already inside the viewport, and
   without the scroll gate the reveal would fire immediately on mount instead
   of when the user actually scrolls it into view. */
function useInViewOnce<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let hasScrolled = false;
    let isIntersecting = false;

    function reveal() {
      if (hasScrolled && isIntersecting) {
        setInView(true);
        cleanup();
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        reveal();
      },
      { threshold },
    );
    observer.observe(el);

    function handleScroll() {
      hasScrolled = true;
      reveal();
    }
    window.addEventListener('wheel', handleScroll, { passive: true });

    function cleanup() {
      observer.disconnect();
      window.removeEventListener('wheel', handleScroll);
    }
    return cleanup;
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

/* Sizes are 85% of their previous scale (a 15% reduction); x/y are shifted by
   half the size delta so each item's centre — and therefore the ring they
   form around the photo — stays exactly where it was before the shrink. */
const THINGS: Thing[] = [
  { src: meThing1, x: 48.93, y: 247.23, w: 135.15, h: 138.55, delay: 0 },
  { src: meThing2, x: 74.4, y: 377.05, w: 163.2, h: 113.9, delay: 40 },
  { src: meThing3, x: 173.1, y: 434.3, w: 105.4, h: 105.4, rot: 10.78, delay: 80 },
  { src: meThing4, x: 263.75, y: 371.9, w: 178.5, h: 180.2, delay: 20 },
  { src: meThing5, x: 409.88, y: 296.88, w: 157.25, h: 157.25, rot: -21.55, delay: 60 },
  { src: meThing6, x: 88.65, y: 121.85, w: 154.7, h: 168.3, rot: -32.32, delay: 100 },
  { src: meThing7, x: 189.78, y: 48.65, w: 133.45, h: 120.7, delay: 30 },
];

function MeAndContact() {
  return (
    <>
      <Positioned dx={-245} dy={437.6}>
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

      <Positioned dx={7.03} dy={335.36}>
        <div className={styles.contactCard}>
          <p className={styles.contactHeading}>Say hello!</p>
          <p className={styles.contactName}>Sehaz Nagpal</p>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={styles.contactIcon}
            style={{ left: 219 }}
          >
            <img src={linkedinIcon} alt="" />
          </a>
          <a
            href={GMAIL_COMPOSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            className={styles.contactIcon}
            style={{ left: 252 }}
          >
            <img src={mailIcon} alt="" />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={styles.contactIcon}
            style={{ left: 285 }}
          >
            <img src={phoneIcon} alt="" />
          </a>
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

function ExtrasCard({ onOpen }: { onOpen: () => void }) {
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
      role="button"
      aria-haspopup="dialog"
      aria-label="Extras — a few small illustrations"
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
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
  const [sipModalOpen, setSipModalOpen] = useState(false);
  const [extrasModalOpen, setExtrasModalOpen] = useState(false);
  const [motionModalOpen, setMotionModalOpen] = useState(false);
  const [photoboothModalOpen, setPhotoboothModalOpen] = useState(false);

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
              keep making small things just to keep evoling, learning and growing.
            </p>
            <p>This page is where a few of those attempts live of how I tried to learn.</p>
          </div>
        </div>
      </Positioned>

      <Positioned dx={800} dy={-76.41}>
        <div
          className={styles.chess}
          tabIndex={0}
          role="link"
          aria-label="Chess — view project"
          onClick={() => openInNewTab(CHESS_URL)}
          onKeyDown={(event) => handleLinkKeyDown(event, CHESS_URL)}
        >
          <div className={styles.chessMask}>
            <img src={chessCircle} alt="" className={styles.chessCircle} />
          </div>
          <img src={chessPieces} alt="" className={styles.chessPieces} />
          <p className={styles.chessLabel}>Chess</p>
          <p className={styles.chessBody}>Vibe-Coded Project to understand how server and client</p>
        </div>
      </Positioned>

      <Positioned dx={-744} dy={-136.81}>
        <div
          className={styles.photobooth}
          tabIndex={0}
          role="button"
          aria-haspopup="dialog"
          aria-label="Photobooth — open camera"
          onClick={() => setPhotoboothModalOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setPhotoboothModalOpen(true);
            }
          }}
        >
          <img src={photoboothPhoto} alt="Photobooth" className={styles.photoboothImg} />
        </div>
      </Positioned>

      <Positioned dx={-750} dy={270.69}>
        <div
          className={styles.sipStudio}
          tabIndex={0}
          role="button"
          aria-haspopup="dialog"
          aria-label="SiP Studio — a branding project"
          onClick={() => setSipModalOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setSipModalOpen(true);
            }
          }}
        >
          <div className={styles.sipCloud}>
            <img src={sipCloud} alt="" />
          </div>
          <p className={styles.sipLabel}>a branding project</p>
          <div className={styles.sipBadge}>
            <img src={sipBadge} alt="SiP Studio" />
          </div>
        </div>
      </Positioned>

      <SipStudioModal open={sipModalOpen} onClose={() => setSipModalOpen(false)} />
      <ExtrasModal open={extrasModalOpen} onClose={() => setExtrasModalOpen(false)} />
      <MotionDemoModal open={motionModalOpen} onClose={() => setMotionModalOpen(false)} />
      <PhotoboothModal open={photoboothModalOpen} onClose={() => setPhotoboothModalOpen(false)} />

      <MeAndContact />

      <Positioned dx={128.8} dy={-365.79}>
        <div
          className={styles.website}
          tabIndex={0}
          role="link"
          aria-label="Re-wired website — view project"
          onClick={() => openInNewTab(REWIRED_URL)}
          onKeyDown={(event) => handleLinkKeyDown(event, REWIRED_URL)}
        >
          <div className={styles.websiteFlip}>
            <div className={`${styles.cardFace} ${styles.cardFront}`}>
              <img src={starCard} alt="" className={styles.starImg} />
              <p className={styles.websiteLabel}>
                re-wired
                <br />
                website
              </p>
            </div>
            <div className={`${styles.cardFace} ${styles.cardBack}`}>
              <img src={starCard} alt="" className={styles.starImg} />
              <p className={styles.websiteBackLabel}>
                web design
                <br />
                project for an
                <br />
                agency
              </p>
            </div>
          </div>
        </div>
      </Positioned>

      <Positioned dx={-333.2} dy={-439.5}>
        <div
          className={styles.motionDemo}
          tabIndex={0}
          role="button"
          aria-haspopup="dialog"
          aria-label="Motion Graphic Demo — watch video"
          onClick={() => setMotionModalOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setMotionModalOpen(true);
            }
          }}
        >
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

      <Positioned dx={710.8} dy={369.21}>
        <Letter />
      </Positioned>

      <Positioned dx={530} dy={-413.43}>
        <ExtrasCard onOpen={() => setExtrasModalOpen(true)} />
      </Positioned>
    </>
  );
}
