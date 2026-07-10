import { useEffect, useRef, useState } from 'react';
import styles from './MobileLoader.module.css';

interface Phase {
  text: string;
  charDelay: number;
  holdAfter: number;
}

/* Mobile counterpart to Loader — identical phase sequence/timing (same "..." ->
   "(hey.)" -> "..." -> "(welcome to my portfolio.)" logic), just the larger 32px
   type size Figma's mobile frame (539:187) calls for. Kept as a separate component
   so the desktop Loader is never touched. */
const PHASES: Phase[] = [
  { text: '...', charDelay: 70, holdAfter: 250 },
  { text: '(hey.)', charDelay: 50, holdAfter: 400 },
  { text: '...', charDelay: 70, holdAfter: 250 },
  { text: '(welcome to my portfolio.)', charDelay: 38, holdAfter: 700 },
];

export default function MobileLoader({ onDone }: { onDone: () => void }) {
  const [display, setDisplay] = useState('');
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timeouts.push(setTimeout(resolve, ms));
      });

    async function run() {
      for (const phase of PHASES) {
        if (cancelled) return;
        setDisplay('');
        for (let i = 1; i <= phase.text.length; i++) {
          await wait(phase.charDelay);
          if (cancelled) return;
          setDisplay(phase.text.slice(0, i));
        }
        await wait(phase.holdAfter);
        if (cancelled) return;
      }
      if (!cancelled) doneRef.current();
    }

    run();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={styles.loader}>
      <p className={styles.text}>{display}</p>
    </div>
  );
}
