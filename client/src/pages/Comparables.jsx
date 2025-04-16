import { useState } from 'react';
import axios from 'axios';

const Comparables = () => {
  const [zillowLink, setZillowLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comparablesLink, setComparablesLink] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setComparablesLink(null);

    try {
      const response = await axios.post('/api/zillow', { link: zillowLink });
      
      if (response.data.success) {
        if (response.data.processing) {
          // Handle processing state
          setError('Request is being processed. Please check back later.');
        } else {
          setComparablesLink(response.data.link);
        }
      } else {
        setError(response.data.error || 'Failed to fetch comparable properties');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while fetching comparable properties');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Property Comparables</h1>
          <p className="mt-2 text-gray-600">Get comparable properties from Zillow</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <label htmlFor="zillowLink" className="block text-sm font-medium text-gray-700">
              Zillow Property URL
            </label>
            <input
              type="url"
              name="zillowLink"
              id="zillowLink"
              className="input-field"
              placeholder="https://www.zillow.com/homedetails/..."
              required
              value={zillowLink}
              onChange={(e) => setZillowLink(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn-primary px-6 py-3 text-lg"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Comparables'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {comparablesLink && (
          <div className="mt-6">
            <a
              href={comparablesLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-center"
            >
              View Comparable Properties on Zillow
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comparables; 