import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-blue-600 font-semibold hover:scale-105 transition-transform">
            <HomeIcon className="h-6 w-6" />
            <span>MoveFlow</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`relative py-2 text-gray-600 hover:text-blue-600 transition-colors ${
                location.pathname === '/' ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/comparables"
              className={`relative py-2 text-gray-600 hover:text-blue-600 transition-colors ${
                location.pathname === '/comparables' ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600' : ''
              }`}
            >
              Comparables
            </Link>
            <Link
              to="/calculator"
              className={`relative py-2 text-gray-600 hover:text-blue-600 transition-colors ${
                location.pathname === '/calculator' ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600' : ''
              }`}
            >
              Calculator
            </Link>
            <Link
              to="/market-analysis"
              className={`relative py-2 text-gray-600 hover:text-blue-600 transition-colors ${
                location.pathname === '/market-analysis' ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600' : ''
              }`}
            >
              Market Analysis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 