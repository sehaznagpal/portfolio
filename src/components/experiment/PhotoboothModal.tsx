import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import styles from './PhotoboothModal.module.css';
import curtainLeftImg from '../../assets/images/experiment/photobooth-curtain-left.svg';
import curtainRightImg from '../../assets/images/experiment/photobooth-curtain-right.svg';
import sparkle1Img from '../../assets/images/experiment/photobooth-sparkle-1.svg';
import sparkle2Img from '../../assets/images/experiment/photobooth-sparkle-2.svg';

const EXIT_MS = 200;
const SHOT_COUNT = 4;
const CURTAIN_MS = 380;
/* The 4 top photo frames aren't evenly spaced (each is a hand-placed Figma
   rect, off by a px or two from a clean grid) and use different rects on the
   mobile layout, so each gets its own CSS class (see PhotoboothModal.module.css)
   rather than a shared inline-style formula — that also keeps the rects
   overridable per breakpoint, which an inline style couldn't be. */
const PHOTO_FRAME_CLASSES = ['photoFrame0', 'photoFrame1', 'photoFrame2', 'photoFrame3'];

type Frame = HTMLCanvasElement;

/* Camera/capture mechanism (getUserMedia, countdown, mirrored capture,
   flash, strip compositing) ported as-is from the reference photobooth
   (riya/booth.html) — only the surrounding UI is new. */
function captureFrame(video: HTMLVideoElement): Frame {
  const c = document.createElement('canvas');
  c.width = video.videoWidth || 640;
  c.height = video.videoHeight || 480;
  const ctx = c.getContext('2d')!;
  ctx.translate(c.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0);
  return c;
}

async function buildStrip(frames: Frame[]): Promise<HTMLCanvasElement> {
  const fw = frames[0].width;
  const fh = frames[0].height;
  const pad = 24;
  const gap = 14;
  const labelH = 52;
  const strip = document.createElement('canvas');
  strip.width = fw + pad * 2;
  strip.height = fh * frames.length + gap * (frames.length - 1) + pad * 2 + labelH;
  const ctx = strip.getContext('2d')!;

  ctx.fillStyle = '#fefefe';
  ctx.fillRect(0, 0, strip.width, strip.height);
  frames.forEach((frame, i) => {
    ctx.drawImage(frame, pad, pad + i * (fh + gap), fw, fh);
  });

  const font = `${Math.round(fw * 0.032)}px "Gambetta Variable"`;
  // Canvas text silently falls back to the platform default if the webfont
  // isn't loaded yet — load() (idempotent, no-op once cached) guarantees
  // it's actually ready before fillText reads the current ctx.font.
  await document.fonts.load(font);
  ctx.fillStyle = '#121212';
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.fillText("From Sehaz's Portfolio <3", strip.width / 2, strip.height - 16);

  return strip;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function PhotoboothModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [rendered, setRendered] = useState(open);
  const [visible, setVisible] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const framesRef = useRef<Frame[]>([]);
  const stripRef = useRef<HTMLCanvasElement | null>(null);

  const [curtainOpen, setCurtainOpen] = useState(false);
  const [shooting, setShooting] = useState(false);
  const [done, setDone] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [thumbs, setThumbs] = useState<(string | null)[]>([null, null, null, null]);
  const [statusMsg, setStatusMsg] = useState('Capture yourself authentically.');

  function resetPhotoboothState() {
    framesRef.current = [];
    stripRef.current = null;
    setCurtainOpen(false);
    setShooting(false);
    setDone(false);
    setCountdown(null);
    setFlash(false);
    setThumbs([null, null, null, null]);
    setStatusMsg('Capture yourself authentically.');
  }

  function stopStream() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  async function requestCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStatusMsg('Capture yourself authentically.');
      return true;
    } catch {
      setStatusMsg('Allow camera access to use the booth!');
      return false;
    }
  }

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
    if (!open) {
      stopStream();
      resetPhotoboothState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* Requesting the camera from a `rendered`-gated effect (rather than
     inline in the `open` effect above) guarantees the <video> element has
     actually committed to the DOM first — otherwise a fast-resolving
     getUserMedia call can beat React's render commit and find
     videoRef.current still null. */
  useEffect(() => {
    if (rendered) requestCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendered]);

  useEffect(() => {
    if (!rendered) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rendered, onClose]);

  useEffect(() => stopStream, []);

  if (!rendered) return null;

  function runCountdown(seconds: number) {
    return new Promise<void>((resolve) => {
      let t = seconds;
      setCountdown(t);
      const interval = setInterval(() => {
        t -= 1;
        if (t <= 0) {
          clearInterval(interval);
          setCountdown(null);
          resolve();
        } else {
          setCountdown(t);
        }
      }, 1000);
    });
  }

  function doFlash() {
    setFlash(false);
    requestAnimationFrame(() => setFlash(true));
    setTimeout(() => setFlash(false), 350);
  }

  async function runShootSequence() {
    setShooting(true);
    framesRef.current = [];
    setThumbs([null, null, null, null]);

    for (let i = 0; i < SHOT_COUNT; i += 1) {
      await runCountdown(i === 0 ? 3 : 2);
      const video = videoRef.current;
      if (!video) break;
      const frame = captureFrame(video);
      framesRef.current.push(frame);
      setThumbs((prev) => {
        const next = [...prev];
        next[i] = frame.toDataURL();
        return next;
      });
      doFlash();
      setStatusMsg(`${i + 1} / ${SHOT_COUNT} taken!`);
      await sleep(500);
    }

    stripRef.current = await buildStrip(framesRef.current);
    setStatusMsg('All done! Download your strip below ✦');

    // Let the last flash settle, then close the curtain again — the booth's
    // "show's over" beat — before revealing the download/try-again actions.
    // `shooting` stays true through this whole beat (rather than clearing it
    // immediately) purely so the Take Photos button — gated on !shooting —
    // can't flash back into view while the curtain is mid-close.
    await sleep(500);
    setCurtainOpen(false);
    await sleep(CURTAIN_MS);
    setShooting(false);
    setDone(true);
  }

  async function handleTakePhotos() {
    // The curtain itself is clickable too (see the curtain divs below), so
    // this guard also has to rule out re-triggering from a stray click while
    // the done screen (curtain closed again, showing Download/Try Again) is
    // up — that flow restarts only through the explicit Try Again button.
    if (curtainOpen || shooting || done) return;
    let stream = streamRef.current;
    if (!stream) {
      const ok = await requestCamera();
      if (!ok) return;
    }
    setCurtainOpen(true);
    await sleep(CURTAIN_MS);
    runShootSequence();
  }

  function handleDownload() {
    if (!stripRef.current) return;
    const a = document.createElement('a');
    a.download = 'photobooth-strip.png';
    a.href = stripRef.current.toDataURL('image/png');
    a.click();
  }

  function handleTryAgain() {
    resetPhotoboothState();
  }

  // The curtain is a single click target throughout the flow: before a shoot
  // it starts one, and once the strip is done (curtain closed again) it
  // restarts the booth — same as the Try Again button.
  function handleCurtainClick() {
    if (done) {
      handleTryAgain();
    } else {
      handleTakePhotos();
    }
  }

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
        aria-label="Photobooth"
        onClick={(event) => event.stopPropagation()}
      >
        <button className={styles.closeButton} aria-label="Close" onClick={onClose}>
          <X size={20} strokeWidth={1.75} />
        </button>

        <div className={styles.stage}>
          <div className={styles.ground} />

          <p className={styles.label}>a photobooth</p>
          <img src={sparkle1Img} alt="" className={styles.sparkle1} />
          <img src={sparkle2Img} alt="" className={styles.sparkle2} />

          {thumbs.map((src, i) => (
            <div className={`${styles.photoFrame} ${styles[PHOTO_FRAME_CLASSES[i]]}`} key={i}>
              {src && <img src={src} alt={`Shot ${i + 1}`} />}
            </div>
          ))}

          <div className={styles.boothTrim} />
          <div className={styles.cameraArea}>
            <video ref={videoRef} className={styles.video} autoPlay playsInline muted />
            {countdown !== null && <div className={styles.countdownOverlay}>{countdown}</div>}
            <div className={`${styles.flashOverlay} ${flash ? styles.flashActive : ''}`} />
          </div>
          <div
            className={`${styles.curtainLeft} ${curtainOpen ? styles.curtainLeftOpen : ''}`}
            onClick={handleCurtainClick}
            role="button"
            tabIndex={0}
            aria-label={done ? 'Try again' : 'Take photos'}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleCurtainClick();
              }
            }}
          >
            <img src={curtainLeftImg} alt="" />
          </div>
          <div
            className={`${styles.curtainRight} ${curtainOpen ? styles.curtainRightOpen : ''}`}
            onClick={handleCurtainClick}
            role="button"
            tabIndex={0}
            aria-label={done ? 'Try again' : 'Take photos'}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleCurtainClick();
              }
            }}
          >
            <img src={curtainRightImg} alt="" />
          </div>

          <div className={styles.headingTitle}>
            <p>SMILE</p>
            <p>PLEASE</p>
          </div>
          <p className={styles.subtitle}>{statusMsg}</p>

          <div className={styles.actions}>
            {!curtainOpen && !shooting && !done && (
              <button type="button" className={styles.takePhotosButton} onClick={handleTakePhotos}>
                Take Photos
              </button>
            )}
            {done && (
              <>
                <button type="button" className={styles.downloadButton} onClick={handleDownload}>
                  Download
                </button>
                <button type="button" className={styles.tryAgainButton} onClick={handleTryAgain}>
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
