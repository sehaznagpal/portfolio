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
    tag: '(includes screens & live site link)',
  },
];

/* Card positions — percentages of the 1280x832 reference frame (see
   useCaseStudyGridScale), matching the MoolRoop reference (890:13907):
   cards 1/3/5 form the top row, cards 2/4 the bottom row. Card 1's left and
   card 5's right edge are snapped to the shared 60px gutter (--case-study-gutter
   at the 1280px reference width) so the card cluster's outer edges line up
   exactly with the hero/CTA row. */
export const CARD_POSITIONS = [
  { left: '4.688%', top: '8.774%' },
  { left: '19.770%', top: '47.480%' },
  { left: '42.035%', top: '18.988%' },
  { left: '63.904%', top: '53.846%' },
  { left: '75.625%', top: '10.697%' },
];
