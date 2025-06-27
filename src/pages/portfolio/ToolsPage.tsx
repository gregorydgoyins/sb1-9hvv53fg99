import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Wrench, Calculator, BarChart2, TrendingUp, AlertTriangle, Info } from 'lucide-react';

export function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState('calculator');
  const [calculatorValues, setCalculatorValues] = useState({
    initialInvestment: 10000,
    additionalContribution: 1000,
    contributionFrequency: 'monthly',
    expectedReturn: 10,
    investmentPeriod: 5,
    compoundingFrequency: 'annually'
  });
  
  const handleCalculatorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCalculatorValues({
      ...calculatorValues,
      [name]: name === 'initialInvestment' || name === 'additionalContribution' || name === 'expectedReturn' || name === 'investmentPeriod' 
        ? parseFloat(value) 
        : value
    });
  };
  
  // Simple compound interest calculation
  const calculateFutureValue = () => {
    const { initialInvestment, additionalContribution, contributionFrequency, expectedReturn, investmentPeriod, compoundingFrequency } = calculatorValues;
    
    const rate = expectedReturn / 100;
    let periods = investmentPeriod;
    let periodicRate = rate;
    let contributionMultiplier = 1;
    
    // Adjust for compounding frequency
    if (compoundingFrequency === 'monthly') {
      periods = investmentPeriod * 12;
      periodicRate = rate / 12;
    } else if (compoundingFrequency === 'quarterly') {
      periods = investmentPeriod * 4;
      periodicRate = rate / 4;
    }
    
    // Adjust for contribution frequency
    if (contributionFrequency === 'monthly' && compoundingFrequency === 'annually') {
      contributionMultiplier = 12;
    } else if (contributionFrequency === 'quarterly' && compoundingFrequency === 'annually') {
      contributionMultiplier = 4;
    }
    
    // Calculate future value with compound interest
    const futureValue = initialInvestment * Math.pow(1 + periodicRate, periods) + 
                        additionalContribution * contributionMultiplier * 
                        ((Math.pow(1 + periodicRate, periods) - 1) / periodicRate);
    
    return futureValue.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Trading Tools' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Wrench className="h-8 w-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">Trading Tools</h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-start space-x-4 mb-6">
          <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300">
            These tools are designed to help you analyze your portfolio, plan your investments, and make informed trading decisions. Select a tool from the options below to get started.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setSelectedTool('calculator')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              selectedTool === 'calculator'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700/50 text-gray-300 hover:bg-indigo-600/20 hover:text-white'
            }`}
          >
            <Calculator className="h-5 w-5" />
            <span>Investment Calculator</span>
          </button>
          <button
            onClick={() => setSelectedTool('portfolio-analyzer')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              selectedTool === 'portfolio-analyzer'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700/50 text-gray-300 hover:bg-indigo-600/20 hover:text-white'
            }`}
          >
            <BarChart2 className="h-5 w-5" />
            <span>Portfolio Analyzer</span>
          </button>
          <button
            onClick={() => setSelectedTool('correlation-matrix')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              selectedTool === 'correlation-matrix'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700/50 text-gray-300 hover:bg-indigo-600/20 hover:text-white'
            }`}
          >
            <TrendingUp className="h-5 w-5" />
            <span>Correlation Matrix</span>
          </button>
        </div>
        
        {selectedTool === 'calculator' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Investment Calculator</h2>
            <p className="text-gray-300">
              Calculate the future value of your investments based on initial investment, regular contributions, and expected rate of return.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Initial Investment (CC)
                  </label>
                  <input
                    type="number"
                    name="initialInvestment"
                    value={calculatorValues.initialInvestment}
                    onChange={handleCalculatorChange}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Additional Contribution (CC)
                  </label>
                  <input
                    type="number"
                    name="additionalContribution"
                    value={calculatorValues.additionalContribution}
                    onChange={handleCalculatorChange}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Contribution Frequency
                  </label>
                  <select
                    name="contributionFrequency"
                    value={calculatorValues.contributionFrequency}
                    onChange={handleCalculatorChange}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Expected Annual Return (%)
                  </label>
                  <input
                    type="number"
                    name="expectedReturn"
                    value={calculatorValues.expectedReturn}
                    onChange={handleCalculatorChange}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Investment Period (Years)
                  </label>
                  <input
                    type="number"
                    name="investmentPeriod"
                    value={calculatorValues.investmentPeriod}
                    onChange={handleCalculatorChange}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Compounding Frequency
                  </label>
                  <select
                    name="compoundingFrequency"
                    value={calculatorValues.compoundingFrequency}
                    onChange={handleCalculatorChange}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-indigo-900/30 p-6 rounded-lg border border-indigo-700/30">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Future Value:</h3>
                <p className="text-2xl font-bold text-indigo-300">CC {calculateFutureValue()}</p>
              </div>
              <p className="text-sm text-gray-300 mt-2">
                This is the estimated future value of your investment after {calculatorValues.investmentPeriod} years, assuming an annual return of {calculatorValues.expectedReturn}%.
              </p>
            </div>
            
            <div className="mt-4 bg-yellow-900/30 p-4 rounded-lg border border-yellow-700/30">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white mb-1">Important Note</h3>
                  <p className="text-sm text-gray-300">
                    This calculator provides estimates based on constant returns and regular contributions. Actual investment performance will vary due to market fluctuations, timing of contributions, and other factors. Past performance is not indicative of future results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {selectedTool === 'portfolio-analyzer' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Portfolio Analyzer</h2>
            <p className="text-gray-300">
              Analyze your current portfolio holdings to assess diversification, risk exposure, and potential optimizations.
            </p>
            
            <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600/50 flex items-center justify-center h-64">
              <p className="text-gray-400">Portfolio analyzer visualization will appear here</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Diversification Score</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Score:</span>
                  <span className="text-xl font-bold text-green-400">72/100</span>
                </div>
                <div className="mt-2 w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  Your portfolio has good diversification across asset types, but could benefit from more exposure to different eras.
                </p>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Risk Assessment</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Risk Level:</span>
                  <span className="text-xl font-bold text-yellow-400">Medium</span>
                </div>
                <div className="mt-2 w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  Your portfolio has a moderate risk profile, with volatility slightly above the market average.
                </p>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Performance</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">YTD Return:</span>
                  <span className="text-xl font-bold text-green-400">+12.5%</span>
                </div>
                <div className="mt-2 w-full bg-slate-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  Your portfolio is outperforming the Comic Market Index by 2.3% year-to-date.
                </p>
              </div>
            </div>
            
            <div className="mt-4 bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/30">
              <h3 className="font-medium text-white mb-3">Optimization Recommendations</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Consider increasing allocation to Silver Age comics to improve diversification.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Reduce concentration in MRVL holdings to lower single-asset risk.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Add exposure to creator bonds to improve yield and reduce overall portfolio volatility.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Consider hedging strategies using options to protect against potential market corrections.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {selectedTool === 'correlation-matrix' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Correlation Matrix</h2>
            <p className="text-gray-300">
              Visualize how different assets in your portfolio move in relation to each other. Lower correlation between assets improves diversification and can reduce overall portfolio risk.
            </p>
            
            <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600/50 flex items-center justify-center h-80">
              <p className="text-gray-400">Correlation matrix visualization will appear here</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Key Correlations</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex justify-between">
                    <span>Marvel vs DC:</span>
                    <span className="text-yellow-400">0.65</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Heroes vs Villains:</span>
                    <span className="text-green-400">0.42</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Golden Age vs Modern Age:</span>
                    <span className="text-green-400">0.38</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Comics vs Creator Stocks:</span>
                    <span className="text-yellow-400">0.72</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Options vs Underlying:</span>
                    <span className="text-red-400">0.85</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-400 mt-3">
                  <strong>Legend:</strong> 
                  <span className="text-green-400 ml-2">Low (0.0-0.5)</span> | 
                  <span className="text-yellow-400 ml-2">Medium (0.5-0.8)</span> | 
                  <span className="text-red-400 ml-2">High (0.8-1.0)</span>
                </p>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-3">Diversification Opportunities</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Add Golden Age comics to balance your Modern Age holdings (correlation: 0.38).</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Consider villain stocks to complement your hero-heavy portfolio (correlation: 0.42).</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Add specialty bonds which have low correlation (0.35) with comic stocks.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Consider location assets which move independently from character assets (correlation: 0.45).</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/30">
              <h3 className="font-medium text-white mb-3">Correlation Insights</h3>
              <p className="text-sm text-gray-300">
                Assets with lower correlation tend to move independently of each other, which can help reduce overall portfolio volatility. When building a diversified portfolio, look for assets with correlations below 0.5 to maximize diversification benefits. However, remember that correlations can change over time, especially during market stress events when many assets may become more correlated.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ToolsPage;