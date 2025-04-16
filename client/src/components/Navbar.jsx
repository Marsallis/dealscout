import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="nav-container">
          <div className="flex items-center justify-between w-full">
            <Link to="/" className="logo">
              <i className="fas fa-home logo-icon"></i>
              <span>DealScout</span>
            </Link>
            <div className="nav-links">
              <Link
                to="/"
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link
                to="/market-analysis"
                className={`nav-link ${location.pathname === '/market-analysis' ? 'active' : ''}`}
              >
                Market Analysis
              </Link>
              <Link
                to="/comparables"
                className={`nav-link ${location.pathname === '/comparables' ? 'active' : ''}`}
              >
                Comparables
              </Link>
              <Link
                to="/calculator"
                className={`nav-link ${location.pathname === '/calculator' ? 'active' : ''}`}
              >
                Calculator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 