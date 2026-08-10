export interface CardDef {
  id: string;
  number: number;
  titleLines: string[];
  subtitle: string;
  panelHeading: string;
  /* Small highlighted label shown on the card face when its panel contains
     screens, tables, figures, or its own internal redirect/explore button. */
  tag?: string;
}

export const CARDS: CardDef[] = [
  {
    id: 'topic',
    number: 1,
    titleLines: ['Topic', 'Selection'],
    subtitle: 'Mixing econ and product.',
    panelHeading: 'Topic Selection',
  },
  {
    id: 'methodology',
    number: 2,
    titleLines: ['Method-', 'ology'],
    subtitle: 'Selection of the tools.',
    panelHeading: 'Methodology',
  },
  {
    id: 'process',
    number: 3,
    titleLines: ['Process &', 'Progress'],
    subtitle: 'Plan that was followed.',
    panelHeading: 'Process & Progress',
    tag: '(includes flow & journey diagrams)',
  },
  {
    id: 'design',
    number: 4,
    titleLines: ['Research', 'Design.'],
    subtitle: 'How the experiment looked?',
    panelHeading: 'Research Design.',
  },
  {
    id: 'results',
    number: 5,
    titleLines: ['Results &', 'Outcomes'],
    subtitle: 'Findings and proceedings.',
    panelHeading: 'Results & Outcomes',
    tag: '(includes result graphs)',
  },
];

/* Reference canvas the positions/sizes below are authored against — see
   .canvas in FraudCardGrid.module.css, which stays locked to this exact
   1280:832 ratio at every viewport size, so re-expressing these as % of it
   (FraudCardFace.tsx) is a straight unit conversion with no drift. */
export const GRID_FRAME_W = 1280;
export const GRID_FRAME_H = 832;

/* Card positions — px offsets of each card's center from the 1280x832
   reference frame's own center (640, 416), matching the MoolRoop reference
   (890:13907): cards 1/3/5 form the top row, cards 2/4 the bottom row.
   Card 1 and card 5 are snapped so the cluster's outer edges land exactly on
   the shared 60px gutter (--case-study-gutter at the 1280px reference width),
   matching the hero/CTA row. Converted to a % of GRID_FRAME_W/H in
   FraudCardFace.tsx. */
export const CARD_POSITIONS = [
  { dx: -454, dy: -213 },
  { dx: -260.944, dy: 109.0336 },
  { dx: 24.048, dy: -128.02 },
  { dx: 303.9712, dy: 162 },
  { dx: 454, dy: -197 },
];
