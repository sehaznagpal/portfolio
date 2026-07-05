import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';

const MoolroopPage = lazy(() => import('./pages/case-studies/MoolroopPage'));
const DrCuterusPage = lazy(() => import('./pages/case-studies/DrCuterusPage'));
const DissertationPage = lazy(() => import('./pages/case-studies/DissertationPage'));
const ExperimentZonePage = lazy(() => import('./pages/ExperimentZonePage'));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/case-study/moolroop" element={<MoolroopPage />} />
        <Route path="/case-study/dr-cuterus" element={<DrCuterusPage />} />
        <Route path="/case-study/designing-against-fraud" element={<DissertationPage />} />
        <Route path="/experiment-zone" element={<ExperimentZonePage />} />
      </Routes>
    </Suspense>
  );
}
