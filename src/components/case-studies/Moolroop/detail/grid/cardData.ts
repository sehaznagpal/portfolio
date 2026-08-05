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
  },
  {
    id: 'ideation',
    number: 4,
    titleLines: ['Ideation &', 'Decisions'],
    subtitle: 'What goes where?',
    panelHeading: 'Ideation & Decisions',
  },
  {
    id: 'solution',
    number: 5,
    titleLines: ['Solution'],
    subtitle: 'Screens & output.',
    panelHeading: 'Solution',
  },
];

/* Card positions — exact calc() formulas from the Figma reference (813:120),
   expressed relative to the 1280x832 reference frame. */
export const CARD_POSITIONS = [
  { left: '60px', top: 'calc(33.33% + 13.67px)' },
  { left: 'calc(25% + 37px)', top: '60px' },
  { left: 'calc(33.33% + 72.33px)', top: 'calc(50% - 3px)' },
  { left: 'calc(58.33% + 48.33px)', top: 'calc(8.33% + 37.67px)' },
  { left: 'calc(75% + 9px)', top: 'calc(50% + 35px)' },
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
