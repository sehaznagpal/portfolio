import { useLayoutEffect, useRef, useState } from 'react';
import styles from './SitemapView.module.css';

interface SitemapNode {
  id: string;
  label: string;
  root?: boolean;
}

interface SitemapEdge {
  from: string;
  to: string;
}

/* Transcribed directly from Moolroop App/moolroop-sitemap.mermaid (flowchart LR),
   grouped into columns by each node's longest path from the root — the same
   ranking a "flowchart LR" layout uses, just computed by hand. */
const COLUMNS: SitemapNode[][] = [
  [{ id: 'W', label: 'Welcome Carousel', root: true }],
  [{ id: 'H', label: 'Explore / Home' }],
  [
    { id: 'H1', label: 'Search' },
    { id: 'H2', label: 'Categories' },
    { id: 'H3', label: 'States' },
    { id: 'H4', label: 'Popular Products' },
    { id: 'H5', label: 'Recommended' },
    { id: 'WL2', label: 'Wishlist' },
    { id: 'B2', label: 'Bag' },
    { id: 'M', label: 'Menu' },
  ],
  [
    { id: 'ST', label: 'State Page' },
    { id: 'CO', label: 'Checkout (future scope)' },
    { id: 'M1', label: 'About' },
    { id: 'M2', label: 'Help & Support' },
    { id: 'M3', label: 'Language (future)' },
  ],
  [{ id: 'CAT', label: 'Category Page' }],
  [{ id: 'PT', label: 'Product Type Page' }],
  [{ id: 'P', label: 'Product Page' }],
  [
    { id: 'HM', label: 'How It’s Made' },
    { id: 'PV', label: 'Provenance Trail' },
    { id: 'B', label: 'Bag' },
    { id: 'WL', label: 'Wishlist' },
  ],
];

const EDGES: SitemapEdge[] = [
  { from: 'W', to: 'H' },
  { from: 'H', to: 'H1' },
  { from: 'H', to: 'H2' },
  { from: 'H', to: 'H3' },
  { from: 'H', to: 'H4' },
  { from: 'H', to: 'H5' },
  { from: 'H2', to: 'CAT' },
  { from: 'H3', to: 'ST' },
  { from: 'ST', to: 'CAT' },
  { from: 'CAT', to: 'PT' },
  { from: 'PT', to: 'P' },
  { from: 'P', to: 'HM' },
  { from: 'P', to: 'PV' },
  { from: 'P', to: 'B' },
  { from: 'P', to: 'WL' },
  { from: 'H', to: 'WL2' },
  { from: 'H', to: 'B2' },
  { from: 'H', to: 'M' },
  { from: 'B2', to: 'CO' },
  { from: 'M', to: 'M1' },
  { from: 'M', to: 'M2' },
  { from: 'M', to: 'M3' },
];

export default function SitemapView({ onBack }: { onBack: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLDivElement>());
  const [paths, setPaths] = useState<{ key: string; d: string }[]>([]);

  useLayoutEffect(() => {
    function computePaths() {
      const content = contentRef.current;
      if (!content) return;
      const contentRect = content.getBoundingClientRect();
      const next: { key: string; d: string }[] = [];
      for (const edge of EDGES) {
        const fromEl = nodeRefs.current.get(edge.from);
        const toEl = nodeRefs.current.get(edge.to);
        if (!fromEl || !toEl) continue;
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        const x1 = fromRect.right - contentRect.left;
        const y1 = fromRect.top + fromRect.height / 2 - contentRect.top;
        const x2 = toRect.left - contentRect.left;
        const y2 = toRect.top + toRect.height / 2 - contentRect.top;
        const midX = (x1 + x2) / 2;
        next.push({ key: `${edge.from}-${edge.to}`, d: `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}` });
      }
      setPaths(next);
    }
    computePaths();
    window.addEventListener('resize', computePaths);
    return () => window.removeEventListener('resize', computePaths);
  }, []);

  return (
    <>
      <h3 className={styles.heading}>Sitemap</h3>
      <button type="button" className={styles.goBack} onClick={onBack}>
        &larr;Go Back
      </button>

      <div className={styles.scrollArea} ref={scrollRef}>
        <div className={styles.content} ref={contentRef}>
          <svg className={styles.lines} aria-hidden="true">
            {paths.map((p) => (
              <path key={p.key} d={p.d} />
            ))}
          </svg>
          <div className={styles.columns}>
            {COLUMNS.map((column, i) => (
              <div className={styles.column} key={i}>
                {column.map((node) => (
                  <div
                    key={node.id}
                    ref={(el) => {
                      if (el) nodeRefs.current.set(node.id, el);
                      else nodeRefs.current.delete(node.id);
                    }}
                    className={`${styles.node} ${node.root ? styles.nodeRoot : ''}`}
                  >
                    {node.label}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
