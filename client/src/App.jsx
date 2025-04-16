import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Lazy load pages for better performance
import { lazy, Suspense } from 'react';
const Home = lazy(() => import('./pages/Home'));
const Calculator = lazy(() => import('./pages/Calculator'));
const Comparables = lazy(() => import('./pages/Comparables'));
const MarketAnalysis = lazy(() => import('./pages/MarketAnalysis'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }>
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/comparables" element={<Comparables />} />
              <Route path="/market-analysis" element={<MarketAnalysis />} />
            </Routes>
          </main>
        </Suspense>
      </div>
    </Router>
  );
}

export default App; 