import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useViewState } from '../../state/ViewStateContext';
import HeroPolaroid from './HeroPolaroid';
import styles from './Hero.module.css';

export default function Hero() {
  const { goToCaseStudy } = useViewState();
  const [photoVisible, setPhotoVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  function handleExplore() {
    setClicked(true);
    setTimeout(() => {
      goToCaseStudy(1);
      setClicked(false);
    }, 150);
  }

  return (
    <div className={styles.card}>
      <p className={styles.title}>
        <span className={styles.titleItalic}>Sehaz</span>
        <span className={styles.titleBold}>Nagpal</span>
      </p>

      <p className={styles.paragraph}>
        Since I was a kid, I have always been intrigued by the question:{' '}
        <span className={styles.question}>&ldquo;Why do people do what they do?&rdquo;</span>{' '}
        This question stayed along me as I got through an economics degree, a dissertation, and,
        now, as I design.{' '}
        <span
          className={styles.highlight}
          onMouseEnter={() => setPhotoVisible(true)}
          onMouseLeave={() => setPhotoVisible(false)}
        >
          I am Sehaz
        </span>
        , a UI-UX designer.
      </p>

      <button
        className={`${styles.button} ${clicked ? styles.buttonClicked : ''}`}
        onClick={handleExplore}
      >
        <span className={`${styles.buttonLabel} ${clicked ? styles.buttonLabelClicked : ''}`}>
          Explore Work
        </span>
      </button>

      <AnimatePresence>{photoVisible && <HeroPolaroid />}</AnimatePresence>
    </div>
  );
}
