import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { CaseStudyChapter } from '../../lib/parseCaseStudyMarkdown';
import styles from './CaseStudyLayout.module.css';

export interface Supplement {
  afterHeading: string;
  node: ReactNode;
}

/* Same placement convention across all 3 detail pages: prose chapters render verbatim
   from the parsed markdown, and a project's Sitemap/screenshot supplement is inserted
   immediately after whichever chapter first describes flow/structure in that
   project's own words — different heading text per project, same rule. */
export default function CaseStudyProse({
  chapters,
  supplements = [],
}: {
  chapters: CaseStudyChapter[];
  supplements?: Supplement[];
}) {
  return (
    <>
      {chapters.map((chapter) => (
        <div key={chapter.heading}>
          <h2 className={styles.chapterHeading}>{chapter.heading}</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{chapter.body}</ReactMarkdown>
          {supplements
            .filter((s) => s.afterHeading === chapter.heading)
            .map((s, i) => (
              <div key={i}>{s.node}</div>
            ))}
        </div>
      ))}
    </>
  );
}
