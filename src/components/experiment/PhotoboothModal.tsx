import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import styles from './PhotoboothModal.module.css';

const EXIT_MS = 200;
const SHOT_COUNT = 4;
const CURTAIN_MS = 500;

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

function buildStrip(frames: Frame[]): HTMLCanvasElement {
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

  ctx.fillStyle = '#121212';
  ctx.font = `bold ${Math.round(fw * 0.038)}px serif`;
  ctx.textAlign = 'center';
  ctx.fillText('Smile Please!', strip.width / 2, strip.height - 16);

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
  const [statusMsg, setStatusMsg] = useState('Smile! 4 shots will be taken.');

  function resetPhotoboothState() {
    framesRef.current = [];
    stripRef.current = null;
    setCurtainOpen(false);
    setShooting(false);
    setDone(false);
    setCountdown(null);
    setFlash(false);
    setThumbs([null, null, null, null]);
    setStatusMsg('Smile! 4 shots will be taken.');
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
      setStatusMsg('Smile! 4 shots will be taken.');
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
      requestCamera();
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

    stripRef.current = buildStrip(framesRef.current);
    setStatusMsg('All done! Download your strip below ✦');
    setShooting(false);
    setDone(true);
  }

  async function handleClickToBegin() {
    if (curtainOpen || shooting) return;
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

        <p className={styles.permissionNote}>*ensure you have given camera permission</p>

        <div className={styles.mainRow}>
          <div className={styles.cameraCol}>
            <div className={styles.cameraArea}>
              <video ref={videoRef} className={styles.video} autoPlay playsInline muted />
              {countdown !== null && <div className={styles.countdownOverlay}>{countdown}</div>}
              <div className={`${styles.flashOverlay} ${flash ? styles.flashActive : ''}`} />

              <div className={`${styles.curtainLeft} ${curtainOpen ? styles.curtainLeftOpen : ''}`} />
              <div className={`${styles.curtainRight} ${curtainOpen ? styles.curtainRightOpen : ''}`} />

              {!curtainOpen && (
                <button
                  type="button"
                  className={styles.clickToBegin}
                  onClick={handleClickToBegin}
                  aria-label="Click to begin — take 4 photos"
                >
                  Click to Begin
                </button>
              )}
            </div>

            <div className={styles.heading}>
              <p className={styles.headingTitle}>
                <span className={styles.headingItalic}>Smile</span> Please!
              </p>
              <p className={styles.headingSubtitle}>Capture yourself authentically.</p>
            </div>
          </div>

          <div className={styles.sideCol}>
            <div className={styles.thumbs}>
              {thumbs.map((src, i) => (
                <div className={styles.thumb} key={i}>
                  {src && <img src={src} alt={`Shot ${i + 1}`} />}
                </div>
              ))}
            </div>

            <button
              type="button"
              className={styles.downloadButton}
              onClick={handleDownload}
              disabled={!done}
            >
              Download
            </button>
            <button
              type="button"
              className={`${styles.tryAgainButton} ${done ? styles.tryAgainVisible : ''}`}
              onClick={handleTryAgain}
            >
              Try Again
            </button>

            <p className={styles.statusMsg}>{statusMsg}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
