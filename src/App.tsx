import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';

const CaseStudyMoolroopPage = lazy(() => import('./pages/CaseStudyMoolroopPage'));
const CaseStudyDrCuterusPage = lazy(() => import('./pages/CaseStudyDrCuterusPage'));
const CaseStudyFraudPage = lazy(() => import('./pages/CaseStudyFraudPage'));
const ExperimentZonePage = lazy(() => import('./pages/ExperimentZonePage'));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/case-study/moolroop" element={<CaseStudyMoolroopPage />} />
        <Route path="/case-study/dr-cuterus" element={<CaseStudyDrCuterusPage />} />
        <Route path="/case-study/designing-against-fraud" element={<CaseStudyFraudPage />} />
        <Route path="/experiment-zone" element={<ExperimentZonePage />} />
      </Routes>
    </Suspense>
  );
}
