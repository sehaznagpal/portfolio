import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import styles from './SipStudioModal.module.css';

import sublogo from '../../assets/images/experiment/sip-modal/sublogo.svg';
import flower from '../../assets/images/experiment/sip-modal/flower.svg';
import mug from '../../assets/images/experiment/sip-modal/mug.svg';
import stickerPlain from '../../assets/images/experiment/sip-modal/sticker-black-1.svg';
import stickerLeft from '../../assets/images/experiment/sip-modal/sticker-black-2.svg';
import stickerRight from '../../assets/images/experiment/sip-modal/sticker-black-3.svg';
import introPhoto from '../../assets/images/experiment/sip-modal/intro-photo.jpg';
import mockupPottery from '../../assets/images/experiment/sip-modal/mockup-pottery.jpg';
import mockupSign from '../../assets/images/experiment/sip-modal/mockup-cup1.jpg';
import mockupBag from '../../assets/images/experiment/sip-modal/mockup-frame.jpg';
import mockupTote from '../../assets/images/experiment/sip-modal/mockup-tote.jpg';
import mockupBox from '../../assets/images/experiment/sip-modal/mockup-box.jpg';
import mockupCup2 from '../../assets/images/experiment/sip-modal/mockup-cup2.jpg';

const EXIT_MS = 200;

const SWATCHES = [
  { hex: '#A3A380', name: 'sage', onLight: false },
  { hex: '#F3F1ED', name: 'cream', onLight: true },
  { hex: '#AE7373', name: 'dusty pink', onLight: false },
  { hex: '#445569', name: 'navy', onLight: false },
  { hex: '#D98E73', name: 'terracotta', onLight: false },
  { hex: '#2E2E2E', name: 'ink', onLight: false },
];

export default function SipStudioModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setRendered(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      return () => cancelAnimationFrame(raf);
    }
    if (rendered) {
      setVisible(false);
      const timeout = setTimeout(() => setRendered(false), EXIT_MS);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!rendered) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rendered, onClose]);

  if (!rendered) return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${visible ? styles.overlayVisible : ''}`}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`${styles.frame} ${visible ? styles.frameVisible : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="SiP Studio — brand concept case study"
        onClick={(event) => event.stopPropagation()}
      >
        <button className={styles.closeButton} aria-label="Close" onClick={onClose}>
          <X size={20} strokeWidth={1.75} />
        </button>

        <div className={styles.scroll}>
          <section className={styles.hero}>
            <p className={styles.heroLabel}>Brand Concept</p>
            <div className={styles.heroLogoRow}>
              <div>
                <h2 className={styles.heroTitle}>SiP Studio</h2>
                <p className={styles.heroSubtitle}>clay, coffee and calm</p>
              </div>
              <img src={sublogo} alt="" className={styles.heroSublogo} />
            </div>
            <p className={styles.heroScrollHint}>Scroll to explore more</p>
          </section>

          <section className={styles.intro}>
            <h3 className={styles.sectionHeading}>Introduction &amp; Briefing</h3>
            <p className={styles.introBody}>
              Sip Studio is a calm cafe-meets-creative-space where you sip coffee while shaping clay. The branding is
              designed to feel peaceful, handmade, and deeply human; mirroring the imperfect charm of pottery itself.
              I focused on evoking a sense of warmth, play, and minimalism, with visual elements that invite people to
              pause and engage.
            </p>
            <div className={styles.introPhotoRow}>
              <img src={introPhoto} alt="Shelves of handmade ceramic pottery" className={styles.introPhoto} />
              <img src={stickerPlain} alt="" className={styles.introSticker} />
            </div>
          </section>

          <section className={styles.typography}>
            <div className={styles.typeCols}>
              <div className={styles.typeCol}>
                <span className={styles.typeNumber}>01</span>
                <p className={styles.typeName}>Canela</p>
                <p className={styles.typeCaption}>brings warmth and elegance</p>
              </div>
              <div className={styles.typeCol}>
                <span className={styles.typeNumber}>02</span>
                <p className={styles.typeName}>Source Code Pro</p>
                <p className={styles.typeCaption}>adds modern contrast and structure</p>
              </div>
            </div>
            <p className={styles.typeBalance}>Together, they balance handcrafted charm with digital clarity.</p>
            <p className={styles.typeWordmark}>SiP Studio</p>
          </section>

          <section className={styles.palette}>
            <div className={styles.swatchRow}>
              {SWATCHES.map((swatch) => (
                <div
                  key={swatch.hex}
                  className={styles.swatch}
                  style={{
                    background: swatch.hex,
                    color: swatch.onLight ? '#2e2e2e' : '#f3f1ed',
                    borderColor: swatch.onLight || swatch.hex === '#D98E73' || swatch.hex === '#AE7373' || swatch.hex === '#A3A380' ? '#2e2e2e' : 'transparent',
                  }}
                >
                  {swatch.hex}
                </div>
              ))}
            </div>
            <p className={styles.paletteCaption}>
              A fresh, non-cliché palette was chosen to reflect both the earthiness of clay and the creativity of
              calm spaces.
            </p>
          </section>

          <section className={styles.logoConcept}>
            <div className={styles.logoRow}>
              <img src={flower} alt="" className={styles.logoIcon} />
              <p className={styles.logoText}>
                The flower represents both calm and creativity, and its form is inspired by the kind of flower people
                instinctively doodle. Here, it also doubles as a vase, hinting at the pottery experience.
              </p>
            </div>
            <div className={styles.logoRow}>
              <img src={mug} alt="" className={styles.logoIcon} />
              <p className={styles.logoText}>
                The mug is for coffee, but its shape isn&rsquo;t perfectly symmetrical: reflecting the kind of ceramic
                piece a first-timer might shape during a session.
              </p>
            </div>
          </section>

          <section className={styles.gallery}>
            <div className={styles.galleryCell}>
              <img src={mockupPottery} alt="SiP Studio branded espresso cup" />
            </div>
            <div className={styles.galleryCell}>
              <img src={mockupSign} alt="SiP Studio framed wall sign" />
              <div className={styles.gallerySticker}>
                <img src={stickerLeft} alt="" />
                <span className={styles.stickerLabel}>
                  SiP
                  <br />
                  Studio
                </span>
              </div>
            </div>
            <div className={styles.galleryCell}>
              <img src={mockupBag} alt="SiP Studio coffee bean bag" />
            </div>
            <div className={styles.galleryCell}>
              <img src={mockupTote} alt="SiP Studio tote bag" />
            </div>
            <div className={styles.galleryCell}>
              <img src={mockupBox} alt="SiP Studio takeaway box" />
              <div className={styles.gallerySticker}>
                <img src={stickerRight} alt="" />
                <span className={styles.stickerLabel}>
                  SiP
                  <br />
                  Studio
                </span>
              </div>
            </div>
            <div className={styles.galleryCell}>
              <img src={mockupCup2} alt="SiP Studio patterned cup" />
            </div>
          </section>

          <p className={styles.footerNote}>
            Note: These are mockups created to showcase the feel and personality of the Sip Studio brand
            (hypothetical).
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
