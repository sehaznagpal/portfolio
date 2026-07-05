import { useViewState } from '../../state/ViewStateContext';
import styles from './AboutLink.module.css';

export default function AboutLink({ inline = false }: { inline?: boolean }) {
  const { goToHero } = useViewState();
  return (
    <button className={`${styles.link} ${inline ? styles.inline : ''}`} onClick={goToHero}>
      about
    </button>
  );
}
