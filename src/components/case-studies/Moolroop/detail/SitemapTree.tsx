import { useMemo } from 'react';
import styles from './SitemapTree.module.css';

export interface SitemapNode {
  label: string;
  children?: SitemapNode[];
}

const NODE_HEIGHT = 34;
const ROW_HEIGHT = NODE_HEIGHT + 18;
const COL_GAP = 56;
const PAD_X = 12;
const MIN_WIDTH = 72;
const MARGIN = 4;
const FONT = "13px 'Author Variable', sans-serif";

let measureCtx: CanvasRenderingContext2D | null | undefined;

function measureWidth(text: string): number {
  if (measureCtx === undefined) {
    const canvas = document.createElement('canvas');
    measureCtx = canvas.getContext('2d');
    if (measureCtx) measureCtx.font = FONT;
  }
  const textWidth = measureCtx ? measureCtx.measureText(text).width : text.length * 6.6;
  return Math.max(MIN_WIDTH, Math.ceil(textWidth) + PAD_X * 2);
}

interface LaidOutNode {
  label: string;
  depth: number;
  slot: number;
  width: number;
  children: LaidOutNode[];
}

function layout(node: SitemapNode, depth: number, counter: { n: number }): LaidOutNode {
  const width = measureWidth(node.label);
  if (!node.children || node.children.length === 0) {
    const slot = counter.n;
    counter.n += 1;
    return { label: node.label, depth, slot, width, children: [] };
  }
  const children = node.children.map((child) => layout(child, depth + 1, counter));
  const slot = (children[0].slot + children[children.length - 1].slot) / 2;
  return { label: node.label, depth, slot, width, children };
}

function flatten(node: LaidOutNode, acc: LaidOutNode[] = []): LaidOutNode[] {
  acc.push(node);
  node.children.forEach((child) => flatten(child, acc));
  return acc;
}

interface PositionedNode {
  key: string;
  label: string;
  x: number;
  yCenter: number;
  width: number;
}

interface Edge {
  key: string;
  d: string;
}

function buildLayout(root: SitemapNode) {
  const laidOut = layout(root, 0, { n: 0 });
  const all = flatten(laidOut);
  const maxDepth = all.reduce((m, n) => Math.max(m, n.depth), 0);

  const colWidth: number[] = new Array(maxDepth + 1).fill(0);
  all.forEach((n) => {
    colWidth[n.depth] = Math.max(colWidth[n.depth], n.width);
  });

  const colX: number[] = [MARGIN];
  for (let d = 1; d <= maxDepth; d++) {
    colX[d] = colX[d - 1] + colWidth[d - 1] + COL_GAP;
  }

  const nodes: PositionedNode[] = [];
  const edges: Edge[] = [];

  function visit(n: LaidOutNode, path: string) {
    const x = colX[n.depth];
    const yCenter = n.slot * ROW_HEIGHT + ROW_HEIGHT / 2 + MARGIN;
    nodes.push({ key: path, label: n.label, x, yCenter, width: n.width });

    n.children.forEach((child, i) => {
      const childX = colX[child.depth];
      const childY = child.slot * ROW_HEIGHT + ROW_HEIGHT / 2 + MARGIN;
      const parentRight = x + n.width;
      const cp = COL_GAP * 0.6;
      edges.push({
        key: `${path}-${i}`,
        d: `M ${parentRight},${yCenter} C ${parentRight + cp},${yCenter} ${childX - cp},${childY} ${childX},${childY}`,
      });
      visit(child, `${path}-${i}`);
    });
  }
  visit(laidOut, 'n0');

  const totalWidth = colX[maxDepth] + colWidth[maxDepth] + MARGIN;
  const leafCount = all.filter((n) => n.children.length === 0).length;
  const totalHeight = leafCount * ROW_HEIGHT + MARGIN * 2;

  return { nodes, edges, totalWidth, totalHeight };
}

export default function SitemapTree({ root }: { root: SitemapNode }) {
  const { nodes, edges, totalWidth, totalHeight } = useMemo(() => buildLayout(root), [root]);

  return (
    <div className={styles.canvas} style={{ width: totalWidth, height: totalHeight }}>
      <svg className={styles.svg} width={totalWidth} height={totalHeight}>
        {edges.map((e) => (
          <path key={e.key} d={e.d} className={styles.edge} />
        ))}
      </svg>
      {nodes.map((n) => (
        <div
          key={n.key}
          className={styles.node}
          style={{ left: n.x, top: n.yCenter - NODE_HEIGHT / 2, width: n.width, height: NODE_HEIGHT }}
        >
          {n.label}
        </div>
      ))}
    </div>
  );
}
