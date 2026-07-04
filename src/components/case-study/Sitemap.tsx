import type { SitemapData } from './sitemap-data';
import styles from './Sitemap.module.css';

const NODE_MARGIN = 90;

export default function Sitemap({
  data,
  accentColor,
}: {
  data: SitemapData;
  accentColor?: string;
}) {
  const xs = data.nodes.map((n) => n.x);
  const ys = data.nodes.map((n) => n.y);
  const minX = Math.min(...xs) - NODE_MARGIN;
  const minY = Math.min(...ys) - NODE_MARGIN;
  const maxX = Math.max(...xs) + NODE_MARGIN;
  const maxY = Math.max(...ys) + NODE_MARGIN;
  const width = maxX - minX;
  const height = maxY - minY;

  const nodeById = Object.fromEntries(data.nodes.map((n) => [n.id, n]));

  return (
    <div
      className={styles.container}
      style={accentColor ? ({ '--sitemap-accent': accentColor } as React.CSSProperties) : undefined}
    >
      <div className={styles.canvas} style={{ width, height }}>
        <svg className={styles.edges} width={width} height={height}>
          {data.edges.map((edge, i) => {
            const from = nodeById[edge.from];
            const to = nodeById[edge.to];
            if (!from || !to) return null;
            const x1 = from.x - minX;
            const y1 = from.y - minY;
            const x2 = to.x - minX;
            const y2 = to.y - minY;
            const midX = (x1 + x2) / 2;
            return (
              <path
                key={i}
                className={styles.edge}
                d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
              />
            );
          })}
        </svg>
        {data.nodes.map((node) => (
          <div
            key={node.id}
            className={`${styles.node} ${node.variant === 'accent' ? styles.nodeAccent : ''}`}
            style={{ left: node.x - minX, top: node.y - minY }}
          >
            {node.label}
          </div>
        ))}
      </div>
    </div>
  );
}
