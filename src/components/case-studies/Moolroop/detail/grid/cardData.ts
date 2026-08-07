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
    panelHeading: 'Redesigning the path to trust',
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
   expressed as pure percentages of the 1280x832 reference frame (the original
   calc(% + px) nudges baked in as %) so positions reflow proportionally at any
   section size instead of drifting from a fixed-px offset tuned to one screen. */
export const CARD_POSITIONS = [
  { left: '4.688%', top: '34.976%' },
  { left: '27.891%', top: '7.212%' },
  { left: '38.984%', top: '49.639%' },
  { left: '62.109%', top: '12.861%' },
  { left: '75.703%', top: '54.207%' },
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
