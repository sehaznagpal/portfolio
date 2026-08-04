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
   (…/grid/cardData.ts), reused unchanged so the mechanism is pixel-identical. */
export const CARD_POSITIONS = [
  { left: '60px', top: 'calc(33.33% + 13.67px)' },
  { left: 'calc(25% + 37px)', top: '60px' },
  { left: 'calc(33.33% + 72.33px)', top: 'calc(50% - 3px)' },
  { left: 'calc(58.33% + 48.33px)', top: 'calc(8.33% + 37.67px)' },
  { left: 'calc(75% + 9px)', top: 'calc(50% + 35px)' },
];
