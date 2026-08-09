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

/* Card positions — px offsets of each card's center from the 1280x832
   reference frame's own center (640, 416), matching the MoolRoop reference
   (890:13907): cards 1/3/5 form the top row, cards 2/4 the bottom row.
   Card 1 and card 5 are snapped so the cluster's outer edges land exactly on
   the shared 60px gutter (--case-study-gutter at the 1280px reference width),
   matching the hero/CTA row.

   Expressed as offsets (not percentages) so useCaseStudyGridScale can scale
   horizontal and vertical spacing independently — dx by xScale, dy by
   yScale — instead of both axes being tied to one uniform scale. */
export const CARD_POSITIONS = [
  { dx: -454, dy: -213 },
  { dx: -260.944, dy: 109.0336 },
  { dx: 24.048, dy: -128.02 },
  { dx: 303.9712, dy: 162 },
  { dx: 454, dy: -197 },
];
