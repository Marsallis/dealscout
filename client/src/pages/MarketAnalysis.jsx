import { useState } from 'react';
import axios from 'axios';

const MarketAnalysis = () => {
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    radius_miles: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [showFullData, setShowFullData] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await axios.post(
        'https://dealscout-backend.railway.app/api/market-analysis',
        {
          latitude: formData.latitude,
          longitude: formData.longitude,
          radius_miles: formData.radius_miles
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching market insights');
      console.error('Error fetching market insights:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Market Analysis</h1>
          <p className="mt-2 text-lg text-gray-600">Get detailed neighborhood insights for any location</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700">Latitude</label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 29.4252"
                  required
                />
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700">Longitude</label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="e.g., -98.4946"
                  required
                />
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700">Radius (miles)</label>
                <input
                  type="number"
                  step="0.1"
                  name="radius_miles"
                  value={formData.radius_miles}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="e.g., 0.5"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Get Market Insights'}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {results && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Population & Households</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Total Population</p>
                    <p className="text-2xl font-bold">{results.total_population?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Households</p>
                    <p className="text-2xl font-bold">{results.total_households?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Average Household Size</p>
                    <p className="text-2xl font-bold">{results.household?.average_size?.toFixed(1)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Income</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Average Income</p>
                    <p className="text-2xl font-bold">${results.household?.average_income?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Median Income</p>
                    <p className="text-2xl font-bold">${results.household?.median_income?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Households with Children</p>
                    <p className="text-2xl font-bold">{results.household?.percentage_with_children?.toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Education</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">College Educated</p>
                    <p className="text-2xl font-bold">{results.education?.college_educated_percentage?.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">High School or Higher</p>
                    <p className="text-2xl font-bold">{results.education?.high_school_percentage?.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Less Than High School</p>
                    <p className="text-2xl font-bold">{results.education?.less_than_high_school?.toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Transportation</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Average Cars per Household</p>
                    <p className="text-2xl font-bold">{results.transportation?.avg_cars_per_household?.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">No Car</p>
                    <p className="text-2xl font-bold">{results.transportation?.no_car_percentage?.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Average Commute Time</p>
                    <p className="text-2xl font-bold">{results.transportation?.commute_time?.average_minutes?.toFixed(0)} minutes</p>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Language</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">English</p>
                    <p className="text-2xl font-bold">{results.language?.distribution?.English?.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Spanish</p>
                    <p className="text-2xl font-bold">{results.language?.distribution?.Spanish?.toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Work</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Average Weekly Hours</p>
                    <p className="text-2xl font-bold">{results.work?.avg_weekly_working_hours?.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">MoveFlow Score</h2>
              <div className="text-center">
                <p className="text-4xl font-bold">{results.moveflow_score?.score}</p>
                <p className="text-lg text-gray-600 mt-2">{results.moveflow_score?.rating}</p>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-600">Economic</p>
                    <p className="text-xl font-bold">{results.moveflow_score?.components?.economic}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Education</p>
                    <p className="text-xl font-bold">{results.moveflow_score?.components?.education}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Lifestyle</p>
                    <p className="text-xl font-bold">{results.moveflow_score?.components?.lifestyle}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Mobility</p>
                    <p className="text-xl font-bold">{results.moveflow_score?.components?.mobility}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowFullData(!showFullData)}
                className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {showFullData ? 'Hide Full Data' : 'View Full Data'}
              </button>
            </div>

            {showFullData && (
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Full Data</h2>
                <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketAnalysis; 