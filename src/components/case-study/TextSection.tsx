import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import layoutStyles from './CaseStudyLayout.module.css';

export default function TextSection({
  id,
  heading,
  body,
}: {
  id: string;
  heading: string;
  body: string;
}) {
  return (
    <section id={id} className={layoutStyles.textSection}>
      <h2 className={layoutStyles.chapterHeading}>{heading}</h2>
      <div className={layoutStyles.prose}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    </section>
  );
}
