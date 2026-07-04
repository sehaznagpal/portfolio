import { useViewState } from '../../state/ViewStateContext';
import styles from './AboutLink.module.css';

export default function AboutLink() {
  const { goToHero } = useViewState();
  return (
    <button className={styles.link} onClick={goToHero}>
      about
    </button>
  );
}
