import kachipuramSilk from '../../../../../assets/images/moolroop/case-study/photos/kachipuram-silk.jpg';
import brassware from '../../../../../assets/images/moolroop/case-study/photos/brassware.jpg';
import khurjaPottery from '../../../../../assets/images/moolroop/case-study/photos/khurja-pottery.jpg';
import pashmina from '../../../../../assets/images/moolroop/case-study/photos/pashmina.jpg';
import type { PolaroidSpec } from './PolaroidPhoto';

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
    id: 'motivation',
    number: 1,
    titleLines: ['Why this', 'Project?'],
    subtitle: 'Motivation.',
    panelHeading: 'Making authenticity as easy to verify as price',
  },
  {
    id: 'problem',
    number: 2,
    titleLines: ['Problem', 'Statement'],
    subtitle: 'What this project solves?',
    panelHeading: 'What Problem Does this Project Solves',
  },
  {
    id: 'research',
    number: 3,
    titleLines: ['Research', '& Insights'],
    subtitle: 'What is already there?',
    panelHeading: 'Research and insights',
    tag: '(includes comparative table)',
  },
  {
    id: 'ideation',
    number: 4,
    titleLines: ['Ideation &', 'Decisions'],
    subtitle: 'What goes where?',
    panelHeading: 'Redesigning the path to trust',
  },
  {
    id: 'solution',
    number: 5,
    titleLines: ['Solution'],
    subtitle: 'Screens & output.',
    panelHeading: 'Solution',
    tag: '(includes sitemap & screens)',
  },
];

/* Card positions — percentages of the 1280x832 reference frame (see
   useCaseStudyGridScale), derived from the Figma reference (890:13907):
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

/* Positions from Figma reference (813:156) — photos sit low enough that their
   centers fall below the panel's bottom edge, so only the top portion peeks up
   before .panel's overflow:hidden crops the rest. */
export const MOTIVATION_PHOTOS: PolaroidSpec[] = [
  { src: kachipuramSilk, alt: 'Kanchipuram silk saree', cx: 16.59, cy: 100.51, width: 22.0, height: 39.93, rotate: 8.45 },
  { src: brassware, alt: 'Engraved brassware tankard', cx: 37.82, cy: 102.11, width: 20.94, height: 36.2, rotate: -2.5 },
  { src: pashmina, alt: 'Hand-embroidered Pashmina', cx: 60.22, cy: 104.24, width: 21.23, height: 47.39, rotate: 2.38 },
  { src: khurjaPottery, alt: 'Khurja blue pottery', cx: 83.64, cy: 100.68, width: 22.39, height: 43.89, rotate: -5.05 },
];
