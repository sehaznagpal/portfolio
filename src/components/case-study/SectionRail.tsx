import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './SectionRail.module.css';

export interface RailSection {
  id: string;
  label: string;
}

export default function SectionRail({ sections }: { sections: RailSection[] }) {
  const [pastHero, setPastHero] = useState(false);
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    const hero = document.getElementById('case-hero');
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), {
      threshold: 0,
      rootMargin: '-80px 0px 0px 0px',
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <AnimatePresence>
      {pastHero && (
        <motion.nav
          className={styles.rail}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          aria-label="Section navigation"
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`${styles.link} ${activeId === s.id ? styles.active : ''}`}
              onClick={(e) => handleClick(e, s.id)}
            >
              {s.label}
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
