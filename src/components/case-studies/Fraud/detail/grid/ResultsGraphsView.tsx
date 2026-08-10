import { useEffect, useState } from 'react';
import fig1 from '../../../../../assets/images/fraud/case-study/results/fig1-treatment-cancellation.png';
import fig2 from '../../../../../assets/images/fraud/case-study/results/fig2-treatment-bias.png';
import fig3 from '../../../../../assets/images/fraud/case-study/results/fig3-predicted-probs.png';
import fig4 from '../../../../../assets/images/fraud/case-study/results/fig4-response-time.png';
import fig5 from '../../../../../assets/images/fraud/case-study/results/fig5-confidence.png';
import fig6 from '../../../../../assets/images/fraud/case-study/results/fig6-online-offline.png';
import { useIsMobile } from '../../../../../lib/useIsMobile';
import styles from './ResultsGraphsView.module.css';

const FIGURES = [
  {
    src: fig1,
    width: 560,
    alt: 'Figure 1: Cancellation rate by treatment group',
    interpretation:
      'People who saw the cancel button (CTA) stopped the fraudulent payment far more often than people who got a warning or nothing at all. The warning barely did better than doing nothing.',
  },
  {
    src: fig2,
    width: 720,
    alt: 'Figure 2: Cancellation rate by treatment group and bias type',
    interpretation:
      'The cancel button worked really well against authority and urgency scams, nearly doubling how often people stopped the payment. But against social proof scams, like fake reviews and countdown offers, it barely helped.',
  },
  {
    src: fig3,
    width: 640,
    alt: 'Figure 3: Predicted probabilities',
    interpretation:
      'This confirms the same pattern using a statistical model instead of raw numbers. Both the warning and the cancel button dip sharply for social proof scams, showing this gap is real and not just noise in the data.',
  },
  {
    src: fig4,
    width: 560,
    alt: 'Figure 4: Response time',
    interpretation:
      'People did not take longer to decide just because they saw a warning or a cancel button. This means the cancel button worked by making the safe choice easier, not by making people stop and think harder.',
  },
  {
    src: fig5,
    width: 640,
    alt: 'Figure 5: Self-rated confidence',
    interpretation:
      "People who saw the cancel button felt almost equally confident whether they made the safe choice or the risky one. This suggests some people who still paid weren't confused, they made that choice knowingly.",
  },
  {
    src: fig6,
    width: 560,
    alt: 'Figure 6: Online vs offline recruitment',
    interpretation:
      'Whether someone took the experiment online or in person barely changed the results. The cancel button worked about the same either way, so the findings hold up across both settings.',
  },
];

export default function ResultsGraphsView({ onBack }: { onBack: () => void }) {
  const isMobile = useIsMobile();
  const [revealed, setRevealed] = useState<number | null>(null);

  useEffect(() => {
    if (!isMobile || revealed === null) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-figure-index]')) {
        setRevealed(null);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isMobile, revealed]);

  return (
    <>
      <button type="button" className={styles.goBack} onClick={onBack}>
        ←Go Back
      </button>

      <h2 className={styles.heading}>Speaking graphically</h2>

      <div className={styles.pictures}>
        {FIGURES.map((fig, i) => (
          <div
            className={`${styles.picture} ${isMobile && revealed === i ? styles.revealed : ''}`}
            key={fig.alt}
            style={{ width: isMobile ? undefined : fig.width }}
            data-figure-index={i}
            onClick={() => {
              if (!isMobile) return;
              setRevealed((current) => (current === i ? null : i));
            }}
          >
            <img src={fig.src} alt={fig.alt} />
            <div className={styles.overlay}>
              <p className={styles.overlayHeading}>Interpretation:</p>
              <p className={styles.overlayText}>{fig.interpretation}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
