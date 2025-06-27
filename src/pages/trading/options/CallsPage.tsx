import React, { useState } from 'react';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';
import { TrendingUp, Info, AlertTriangle, Calendar, DollarSign } from 'lucide-react';

export function CallsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('ASM300');
  const [selectedExpiry, setSelectedExpiry] = useState('2024-09-20');
  
  // Mock call options data
  const mockCallOptions = [
    {
      strike: 2600,
      premium: 150,
      volume: 325,
      openInterest: 1200,
      impliedVolatility: 0.35,
      delta: 0.45,
      gamma: 0.15,
      theta: -0.25,
      vega: 0.30,
      expiry: '2024-09-20',
      inTheMoney: false
    },
    {
      strike: 2700,
      premium: 100,
      volume: 250,
      openInterest: 850,
      impliedVolatility: 0.38,
      delta: 0.35,
      gamma: 0.18,
      theta: -0.28,
      vega: 0.32,
      expiry: '2024-09-20',
      inTheMoney: false
    },
    {
      strike: 2400,
      premium: 210,
      volume: 380,
      openInterest: 1350,
      impliedVolatility: 0.32,
      delta: 0.60,
      gamma: 0.12,
      theta: -0.22,
      vega: 0.28,
      expiry: '2024-09-20',
      inTheMoney: true
    },
    {
      strike: 2300,
      premium: 280,
      volume: 420,
      openInterest: 1500,
      impliedVolatility: 0.30,
      delta: 0.75,
      gamma: 0.10,
      theta: -0.20,
      vega: 0.25,
      expiry: '2024-09-20',
      inTheMoney: true
    }
  ];

  // Mock symbols and expiry dates
  const symbols = ['ASM300', 'BATM', 'SPDR', 'TMFS', 'JLES'];
  const expiryDates = ['2024-07-19', '2024-09-20', '2024-12-20', '2025-01-17'];
  
  // Current price of the underlying asset
  const currentPrice = 2450;

  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Trading', path: '/trading' },
        { name: 'Option Chains', path: '/trading/options' },
        { name: 'Calls' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-8 w-8 text-green-400" />
          <h1 className="text-3xl font-bold text-white">Call Options</h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-start space-x-4 mb-6">
          <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300">
            Call options give the holder the right, but not the obligation, to buy the underlying asset at a specified price (strike price) before a certain date (expiration date). Calls are often used to profit from price increases or to lock in a purchase price.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
              Expiration Date
            </label>
            <select
              value={selectedExpiry}
              onChange={(e) => setSelectedExpiry(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
            >
              {expiryDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </option>
              ))}
            </select>
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
              {mockCallOptions.map((option, index) => (
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
            <h3 className="font-medium text-white mb-3">Call Option Basics</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <DollarSign className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Call buyers profit when the price of the underlying asset rises above the strike price plus the premium paid.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Calendar className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>Options lose value as they approach expiration (time decay).</span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>Call sellers (writers) have the obligation to sell the underlying asset if the option is exercised.</span>
              </li>
              <li className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>In-the-money calls have strike prices below the current market price.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="font-medium text-white mb-3">Greeks Explained</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex justify-between">
                <span className="text-indigo-400">Delta:</span>
                <span>Rate of change in option price per $1 change in underlying</span>
              </li>
              <li className="flex justify-between">
                <span className="text-indigo-400">Gamma:</span>
                <span>Rate of change in Delta per $1 change in underlying</span>
              </li>
              <li className="flex justify-between">
                <span className="text-indigo-400">Theta:</span>
                <span>Rate of time decay (option value lost per day)</span>
              </li>
              <li className="flex justify-between">
                <span className="text-indigo-400">Vega:</span>
                <span>Option's sensitivity to changes in volatility</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallsPage;