import React, { useState } from 'react';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';
import { Calendar, Info, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

export function LEAPsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('ASM300');
  const [selectedType, setSelectedType] = useState('calls');
  
  // Mock LEAP options data
  const mockLeapOptions = {
    calls: [
      {
        strike: 2600,
        premium: 350,
        volume: 125,
        openInterest: 450,
        impliedVolatility: 0.40,
        delta: 0.55,
        gamma: 0.10,
        theta: -0.15,
        vega: 0.45,
        expiry: '2026-01-16',
        inTheMoney: false
      },
      {
        strike: 2400,
        premium: 480,
        volume: 180,
        openInterest: 620,
        impliedVolatility: 0.38,
        delta: 0.65,
        gamma: 0.08,
        theta: -0.12,
        vega: 0.42,
        expiry: '2026-01-16',
        inTheMoney: true
      },
      {
        strike: 2800,
        premium: 250,
        volume: 95,
        openInterest: 320,
        impliedVolatility: 0.42,
        delta: 0.45,
        gamma: 0.12,
        theta: -0.18,
        vega: 0.48,
        expiry: '2026-01-16',
        inTheMoney: false
      }
    ],
    puts: [
      {
        strike: 2400,
        premium: 320,
        volume: 110,
        openInterest: 380,
        impliedVolatility: 0.41,
        delta: -0.45,
        gamma: 0.11,
        theta: -0.16,
        vega: 0.46,
        expiry: '2026-01-16',
        inTheMoney: false
      },
      {
        strike: 2200,
        premium: 220,
        volume: 85,
        openInterest: 290,
        impliedVolatility: 0.43,
        delta: -0.35,
        gamma: 0.13,
        theta: -0.19,
        vega: 0.49,
        expiry: '2026-01-16',
        inTheMoney: false
      },
      {
        strike: 2600,
        premium: 450,
        volume: 150,
        openInterest: 520,
        impliedVolatility: 0.39,
        delta: -0.55,
        gamma: 0.09,
        theta: -0.14,
        vega: 0.44,
        expiry: '2026-01-16',
        inTheMoney: true
      }
    ]
  };

  // Mock symbols
  const symbols = ['ASM300', 'BATM', 'SPDR', 'TMFS', 'JLES'];
  
  // Current price of the underlying asset
  const currentPrice = 2450;

  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Trading', path: '/trading' },
        { name: 'Option Chains', path: '/trading/options' },
        { name: 'LEAPs' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calendar className="h-8 w-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">LEAP Options</h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-start space-x-4 mb-6">
          <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300">
            LEAP (Long-term Equity Anticipation Securities) options are options contracts with expiration dates that are more than a year away. They allow investors to gain long-term exposure with less capital than buying the underlying asset outright.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Symbol
            </label>
            <select
              value={selectedSymbol}
              onChange={(e) => setSelectedSymbol(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
            >
              {symbols.map(symbol => (
                <option key={symbol} value={symbol}>{symbol}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Option Type
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedType('calls')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  selectedType === 'calls'
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-green-600/20 hover:text-white'
                }`}
              >
                Calls
              </button>
              <button
                onClick={() => setSelectedType('puts')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  selectedType === 'puts'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-red-600/20 hover:text-white'
                }`}
              >
                Puts
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Expiration Date
            </label>
            <div className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white">
              January 16, 2026
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Current Price
            </label>
            <div className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white">
              CC {currentPrice.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700/50">
            <thead>
              <tr className="bg-slate-700/30">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Strike</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Premium</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">IV</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Delta</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Volume</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Open Int</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {mockLeapOptions[selectedType].map((option, index) => (
                <tr key={index} className={`${option.inTheMoney ? 'bg-green-900/10' : ''} hover:bg-slate-700/30`}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${option.inTheMoney ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                      <span className="font-medium text-white">CC {option.strike.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-white">CC {option.premium.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-white">{(option.impliedVolatility * 100).toFixed(1)}%</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-white">{option.delta.toFixed(2)}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">{option.volume.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">{option.openInterest.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
                      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        Buy
                      </button>
                      <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                        Sell
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="font-medium text-white mb-3">LEAP Option Advantages</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Longer time horizon reduces the impact of short-term market fluctuations.</span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Lower time decay (theta) in the early stages of the contract.</span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Leverage allows for greater exposure with less capital than buying the underlying asset.</span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Can be used for long-term hedging strategies or to capitalize on anticipated long-term trends.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="font-medium text-white mb-3">LEAP Option Risks</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <TrendingDown className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Higher premiums compared to shorter-term options due to longer time value.</span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingDown className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Capital is tied up for a longer period.</span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingDown className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Less liquidity compared to shorter-term options, potentially leading to wider bid-ask spreads.</span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingDown className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Still subject to complete loss if the underlying asset doesn't move as anticipated by expiration.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LEAPsPage;