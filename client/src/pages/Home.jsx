import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="gradient-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="hero-content text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl mb-6">
              Real Estate Investment Tools
            </h1>
            <p className="mt-6 text-xl text-white max-w-3xl mx-auto mb-8">
              Make smarter investment decisions with our suite of professional real estate tools. Analyze properties, calculate ROI, and understand market dynamics with ease.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/market-analysis"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i className="fas fa-chart-line mr-2"></i>
                Analyze Market
              </Link>
              <Link
                to="/comparables"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <i className="fas fa-search-dollar mr-2"></i>
                Find Comparables
              </Link>
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <i className="fas fa-calculator mr-2"></i>
                Calculate ROI
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Market Analysis */}
          <div className="feature-card bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <i className="fas fa-chart-line text-blue-600 text-2xl"></i>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Market Analysis</h3>
              </div>
              <p className="mt-4 text-gray-600">
                Get detailed neighborhood insights including demographics, income levels, education, and more to evaluate market potential.
              </p>
              <div className="mt-6">
                <Link
                  to="/market-analysis"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Analyze Market
                  <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Comparables */}
          <div className="feature-card bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <i className="fas fa-search-dollar text-green-600 text-2xl"></i>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Property Comparables</h3>
              </div>
              <p className="mt-4 text-gray-600">
                Find similar properties in your target area to determine accurate market values and make informed investment decisions.
              </p>
              <div className="mt-6">
                <Link
                  to="/comparables"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Find Comparables
                  <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="feature-card bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <i className="fas fa-calculator text-purple-600 text-2xl"></i>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">ROI Calculator</h3>
              </div>
              <p className="mt-4 text-gray-600">
                Calculate potential returns on your investment with our comprehensive fix & flip calculator. Determine optimal purchase prices and wholesale offers.
              </p>
              <div className="mt-6">
                <Link
                  to="/calculator"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Calculate ROI
                  <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900">How It Works</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-4">
                  <i className="fas fa-map-marker-alt text-blue-600 text-2xl"></i>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">1. Choose Your Area</h3>
              <p className="mt-2 text-gray-600">
                Select the neighborhood or property location you're interested in analyzing.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex-shrink-0 bg-green-100 rounded-full p-4">
                  <i className="fas fa-cogs text-green-600 text-2xl"></i>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">2. Run Analysis</h3>
              <p className="mt-2 text-gray-600">
                Use our tools to analyze comparable properties, calculate ROI, and understand market dynamics.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-full p-4">
                  <i className="fas fa-chart-pie text-purple-600 text-2xl"></i>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">3. Make Decisions</h3>
              <p className="mt-2 text-gray-600">
                Use the insights to make informed investment decisions and maximize your returns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 