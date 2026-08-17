import { Link } from 'react-router-dom';
import styles from './CaseStudySwitcher.module.css';

const OTHER_CASE_STUDIES = [
  { label: 'Dr Cuterus', href: '/case-study/dr-cuterus' },
  { label: 'Dissertation', href: '/case-study/designing-against-fraud' },
];

export default function CaseStudySwitcher() {
  return (
    <div className={styles.switcher}>
      <p className={styles.current}>MoolRoop</p>
      {OTHER_CASE_STUDIES.map((study) => (
        <Link key={study.href} to={study.href} className={styles.item} aria-label={study.label}>
          <span className={styles.line} aria-hidden="true" />
          <span className={styles.label} aria-hidden="true">
            {study.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
