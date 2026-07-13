import { useEffect } from 'react';
import { ThemeProvider } from '../state/ThemeContext';
import ExperimentCanvas from '../components/experiment/ExperimentCanvas';

export default function ExperimentZonePage() {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  return (
    <ThemeProvider>
      <ExperimentCanvas />
    </ThemeProvider>
  );
}
