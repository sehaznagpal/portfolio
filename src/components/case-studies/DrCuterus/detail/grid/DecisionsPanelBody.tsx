import laptopScreen from '../../../../../assets/images/dr-cuterus/decisions-laptop-screen.jpg';
import laptopBezel from '../../../../../assets/images/dr-cuterus/laptop-bezel.png';
import styles from './DecisionsPanelBody.module.css';

export default function DecisionsPanelBody() {
  return (
    <>
      <h2 className={styles.heading}>Cutting what wasn&apos;t working</h2>
      <div className={styles.intro}>
        <p>
          The flow was built so the most important things sit at the top and nothing forces a
          visitor to dig for what they came for. Four pages ended up covering her four audiences
          cleanly: Home, Appointments, Blog, and Corporate Workshops. The blog exists because the
          same handful of questions kept resurfacing across her DMs and comments. Instead of
          answering them one at a time forever, there&apos;s now a standing place for them, live,
          and still growing.
        </p>
        <p>
          Not every idea survived contact with her actual needs. An early version had a full page
          cataloguing her achievements and press mentions, newsletter-style. She looked at it and
          pointed out it wasn&apos;t doing anything a visitor actually needed. It got replaced
          with the corporate workshops page instead, more useful, more relevant to the people
          actually landing on the site. Press mentions still show up, just as a compact logo strip
          instead of a page of their own.
        </p>
      </div>

      <div className={styles.laptop}>
        <img className={styles.laptopBezel} src={laptopBezel} alt="" />
        <div className={styles.laptopScreen}>
          <img src={laptopScreen} alt="Dr Cuterus blog page — Have Questions?" />
        </div>
      </div>
    </>
  );
}
