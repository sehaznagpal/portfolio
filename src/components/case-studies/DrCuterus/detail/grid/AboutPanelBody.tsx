import homeScreen from '../../../../../assets/images/dr-cuterus/about-home-screen.jpg';
import phoneBezel from '../../../../../assets/images/dr-cuterus/mockup-phone-bezel.png';
import styles from './AboutPanelBody.module.css';

export default function AboutPanelBody() {
  return (
    <>
      <h2 className={styles.heading}>India&apos;s favourite sexpert</h2>
      <div className={styles.intro}>
        <p>
          <span className={styles.highlight}>Dr. Tanaya Narendra,</span> known online as Dr
          Cuterus, is an Oxford-trained doctor, author, and sex educator with 1.9 million
          followers on Instagram and 834K on YouTube. She&apos;s been featured in Vogue, The
          Economist, CNN, and Forbes India, writes a nationally syndicated sex advice column, and
          has published a book on sexual health. Her whole brand runs on one line: 100% science,
          0% sharam.
        </p>
        <p>
          She came to me needing a personal website that could hold all of that, patients booking
          appointments, followers looking for her content, brands wanting to collaborate,
          organisations booking her for workshops, in one place that felt as credible as it did
          like her. Not a generic doctor&apos;s site, and not just a link-in-bio either.
        </p>
      </div>

      <div className={styles.phone}>
        <div className={styles.phoneScreen}>
          <img src={homeScreen} alt="Dr Cuterus homepage — India's Favourite Sex Educator" />
        </div>
        <img className={styles.bezel} src={phoneBezel} alt="" />
      </div>
    </>
  );
}
