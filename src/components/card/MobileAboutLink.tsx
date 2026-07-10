import { useViewState } from '../../state/ViewStateContext';
import styles from './MobileAboutLink.module.css';

export default function MobileAboutLink() {
  const { goToHero } = useViewState();
  return (
    <button className={styles.link} onClick={goToHero}>
      about
    </button>
  );
}
