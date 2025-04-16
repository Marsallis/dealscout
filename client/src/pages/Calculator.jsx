import { useState } from 'react';

const Calculator = () => {
  const [formData, setFormData] = useState({
    askingPrice: '',
    arv: '',
    rehabCosts: '',
    closingCosts: '',
    desiredROI: '',
    roiVariance: '',
    assignmentFee: ''
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateROI = (e) => {
    e.preventDefault();
    
    const {
      askingPrice,
      arv,
      rehabCosts,
      closingCosts,
      desiredROI,
      roiVariance,
      assignmentFee
    } = formData;

    const purchasePrice = parseFloat(askingPrice);
    const afterRepairValue = parseFloat(arv);
    const rehabAndHolding = parseFloat(rehabCosts);
    const closingCostsPercent = parseFloat(closingCosts) / 100;
    const desiredROIPercent = parseFloat(desiredROI) / 100;
    const roiVariancePercent = parseFloat(roiVariance) / 100;
    const assignmentFeeAmount = parseFloat(assignmentFee);

    const totalInvestment = purchasePrice + rehabAndHolding + (purchasePrice * closingCostsPercent);
    const potentialProfit = afterRepairValue - totalInvestment;
    const actualROI = (potentialProfit / totalInvestment) * 100;
    const roiDifference = Math.abs(actualROI - desiredROIPercent * 100);
    const meetsROI = roiDifference <= roiVariancePercent * 100;
    const maxOffer = afterRepairValue - (rehabAndHolding + assignmentFeeAmount + (afterRepairValue * closingCostsPercent));

    setResults({
      totalInvestment,
      potentialProfit,
      actualROI,
      roiDifference,
      meetsROI,
      maxOffer
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ROI Calculator</h1>
          <p className="mt-2 text-gray-600">Calculate your potential return on investment</p>
        </div>

        <form onSubmit={calculateROI} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="bg-blue-50 p-4 rounded-lg">
              <label htmlFor="askingPrice" className="block text-sm font-medium text-gray-700">
                Seller's Asking Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="askingPrice"
                  id="askingPrice"
                  className="input-field pl-7"
                  placeholder="0.00"
                  step="10000"
                  required
                  value={formData.askingPrice}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <label htmlFor="arv" className="block text-sm font-medium text-gray-700">
                After Repair Value (ARV)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="arv"
                  id="arv"
                  className="input-field pl-7"
                  placeholder="0.00"
                  step="10000"
                  required
                  value={formData.arv}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <label htmlFor="rehabCosts" className="block text-sm font-medium text-gray-700">
                Rehab + Holding Costs
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="rehabCosts"
                  id="rehabCosts"
                  className="input-field pl-7"
                  placeholder="0.00"
                  step="2500"
                  required
                  value={formData.rehabCosts}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <label htmlFor="closingCosts" className="block text-sm font-medium text-gray-700">
                Closing Costs Percentage
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="closingCosts"
                  id="closingCosts"
                  className="input-field"
                  placeholder="0.00"
                  step="0.5"
                  required
                  value={formData.closingCosts}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>

            <div className="bg-pink-50 p-4 rounded-lg">
              <label htmlFor="desiredROI" className="block text-sm font-medium text-gray-700">
                Desired ROI Percentage
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="desiredROI"
                  id="desiredROI"
                  className="input-field"
                  placeholder="0.00"
                  step="1"
                  required
                  value={formData.desiredROI}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <label htmlFor="roiVariance" className="block text-sm font-medium text-gray-700">
                ROI Variance Percentage
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="roiVariance"
                  id="roiVariance"
                  className="input-field"
                  placeholder="0.00"
                  step="0.5"
                  required
                  value={formData.roiVariance}
                  onChange={handleInputChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 p-4 rounded-lg">
              <label htmlFor="assignmentFee" className="block text-sm font-medium text-gray-700">
                Desired Assignment Fee
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="assignmentFee"
                  id="assignmentFee"
                  className="input-field pl-7"
                  placeholder="0.00"
                  step="1000"
                  required
                  value={formData.assignmentFee}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn-primary px-6 py-3 text-lg"
            >
              Calculate ROI
            </button>
          </div>
        </form>

        {results && (
          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Total Investment</p>
                <p className="text-2xl font-semibold text-gray-900">${results.totalInvestment.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Potential Profit</p>
                <p className="text-2xl font-semibold text-gray-900">${results.potentialProfit.toLocaleString()}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Actual ROI</p>
                <p className="text-2xl font-semibold text-gray-900">{results.actualROI.toFixed(2)}%</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">ROI Difference</p>
                <p className="text-2xl font-semibold text-gray-900">{results.roiDifference.toFixed(2)}%</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Meets ROI Target</p>
                <p className={`text-2xl font-semibold ${results.meetsROI ? 'text-green-600' : 'text-red-600'}`}>
                  {results.meetsROI ? 'Yes' : 'No'}
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Maximum Offer</p>
                <p className="text-2xl font-semibold text-gray-900">${results.maxOffer.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator; 