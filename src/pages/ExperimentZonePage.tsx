import { useEffect } from 'react';
import { ThemeProvider } from '../state/ThemeContext';
import { usePageMeta } from '../lib/usePageMeta';
import sezPhotoImage from '../assets/images/experiment/sez-photo.jpg';
import ExperimentCanvas from '../components/experiment/ExperimentCanvas';
import PageRevealOverlay from '../components/chrome/PageRevealOverlay';

export default function ExperimentZonePage() {
  usePageMeta({
    title: 'Experiment Zone | Sehaz Nagpal',
    description:
      'A playful, pannable corner of Sehaz Nagpal’s portfolio. Extra experiments, a photobooth, and side projects to poke around in.',
    image: sezPhotoImage,
  });

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  return (
    <ThemeProvider>
      <ExperimentCanvas />
      <PageRevealOverlay />
    </ThemeProvider>
  );
}
