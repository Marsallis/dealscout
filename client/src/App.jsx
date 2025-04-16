import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MarketAnalysis from './pages/MarketAnalysis';
import Comparables from './pages/Comparables';
import Calculator from './pages/Calculator';

function App() {
  return (
    <Router basename="/dealscout">
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market-analysis" element={<MarketAnalysis />} />
          <Route path="/comparables" element={<Comparables />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 