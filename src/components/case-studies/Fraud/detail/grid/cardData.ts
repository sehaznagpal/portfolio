export interface CardDef {
  id: string;
  number: number;
  titleLines: string[];
  subtitle: string;
  panelHeading: string;
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
  },
];

/* Card positions — same scattered-layout formulas as the MoolRoop/Dr Cuterus reference
   (…/grid/cardData.ts), reused unchanged so the mechanism is pixel-identical.
   Expressed as pure percentages of the 1280x832 reference frame (the original
   calc(% + px) nudges baked in as %) so positions reflow proportionally at any
   section size instead of drifting from a fixed-px offset tuned to one screen. */
export const CARD_POSITIONS = [
  { left: '4.688%', top: '34.976%' },
  { left: '27.891%', top: '7.212%' },
  { left: '38.984%', top: '49.639%' },
  { left: '62.109%', top: '12.861%' },
  { left: '75.703%', top: '54.207%' },
];
