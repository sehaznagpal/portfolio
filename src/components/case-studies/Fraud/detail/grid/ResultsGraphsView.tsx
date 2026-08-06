import fig1 from '../../../../../assets/images/fraud/case-study/results/fig1-treatment-cancellation.png';
import fig2 from '../../../../../assets/images/fraud/case-study/results/fig2-treatment-bias.png';
import fig3 from '../../../../../assets/images/fraud/case-study/results/fig3-predicted-probs.png';
import fig4 from '../../../../../assets/images/fraud/case-study/results/fig4-response-time.png';
import fig5 from '../../../../../assets/images/fraud/case-study/results/fig5-confidence.png';
import fig6 from '../../../../../assets/images/fraud/case-study/results/fig6-online-offline.png';
import styles from './ResultsGraphsView.module.css';

const FIGURES = [
  { src: fig1, width: 560, alt: 'Figure 1: Cancellation rate by treatment group' },
  { src: fig2, width: 720, alt: 'Figure 2: Cancellation rate by treatment group and bias type' },
  { src: fig3, width: 640, alt: 'Figure 3: Predicted probabilities' },
  { src: fig4, width: 560, alt: 'Figure 4: Response time' },
  { src: fig5, width: 640, alt: 'Figure 5: Self-rated confidence' },
  { src: fig6, width: 560, alt: 'Figure 6: Online vs offline recruitment' },
];

export default function ResultsGraphsView({ onBack }: { onBack: () => void }) {
  return (
    <>
      <button type="button" className={styles.goBack} onClick={onBack}>
        ←Go Back
      </button>

      <h2 className={styles.heading}>Speaking graphically</h2>

      <div className={styles.pictures}>
        {FIGURES.map((fig) => (
          <div className={styles.picture} key={fig.alt} style={{ width: fig.width }}>
            <img src={fig.src} alt={fig.alt} />
          </div>
        ))}
      </div>
    </>
  );
}
