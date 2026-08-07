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
   (MoolroopCardGrid/cardData.ts), reused unchanged so the mechanism is pixel-identical.
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
