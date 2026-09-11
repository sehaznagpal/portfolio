import styles from './ArticleCardsToggle.module.css';

export type CaseStudySecondView = 'article' | 'cards';

interface ArticleCardsToggleProps {
  active: CaseStudySecondView;
  onChange: (view: CaseStudySecondView) => void;
}

export default function ArticleCardsToggle({ active, onChange }: ArticleCardsToggleProps) {
  return (
    <div className={styles.toggle}>
      <button
        type="button"
        className={`${styles.option} ${active === 'article' ? styles.active : styles.inactive}`}
        onClick={() => onChange('article')}
        aria-pressed={active === 'article'}
      >
        Article
      </button>
      <span className={styles.dot} aria-hidden="true" />
      <button
        type="button"
        className={`${styles.option} ${active === 'cards' ? styles.active : styles.inactive}`}
        onClick={() => onChange('cards')}
        aria-pressed={active === 'cards'}
      >
        Cards
      </button>
    </div>
  );
}
