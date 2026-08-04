export interface CardDef {
  id: string;
  number: number;
  titleLines: string[];
  subtitle: string;
  panelHeading: string;
}

export const CARDS: CardDef[] = [
  {
    id: 'about',
    number: 1,
    titleLines: ['About', 'Dr Cuterus'],
    subtitle: 'The Client.',
    panelHeading: 'About Dr Cuterus',
  },
  {
    id: 'constraints',
    number: 2,
    titleLines: ['Constraints', 'Faced'],
    subtitle: 'What I was working within?',
    panelHeading: 'Constraints Faced',
  },
  {
    id: 'research',
    number: 3,
    titleLines: ['Research', '& Ideation'],
    subtitle: 'What all screams “her”?',
    panelHeading: 'Research & Ideation',
  },
  {
    id: 'decisions',
    number: 4,
    titleLines: ['Decisions &', 'Iterations'],
    subtitle: 'Adapting to what she needs.',
    panelHeading: 'Decisions & Iterations',
  },
  {
    id: 'outcome',
    number: 5,
    titleLines: ['Outcome'],
    subtitle: 'Screens & output.',
    panelHeading: 'Outcome',
  },
];

/* Card positions — same scattered-layout formulas as the MoolRoop reference
   (MoolroopCardGrid/cardData.ts), reused unchanged so the mechanism is pixel-identical. */
export const CARD_POSITIONS = [
  { left: '60px', top: 'calc(33.33% + 13.67px)' },
  { left: 'calc(25% + 37px)', top: '60px' },
  { left: 'calc(33.33% + 72.33px)', top: 'calc(50% - 3px)' },
  { left: 'calc(58.33% + 48.33px)', top: 'calc(8.33% + 37.67px)' },
  { left: 'calc(75% + 9px)', top: 'calc(50% + 35px)' },
];
