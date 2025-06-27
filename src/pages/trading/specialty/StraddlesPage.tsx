import React, { useState } from 'react';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';
import { Shuffle, Info, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

export function StraddlesPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('ASM300');
  const [selectedExpiry, setSelectedExpiry] = useState('2024-09-20');
  
  // Mock straddle data
  const mockStraddles = [
    {
      strike: 2400,
      callPremium: 210,
      putPremium: 160,
      totalPremium: 370,
      breakEvenLow: 2030,
      breakEvenHigh: 2770,
      impliedVolatility: 0.38,
      volume: 85,
      openInterest: 320
    },
    {
      strike: 2450,
      callPremium: 180,
      putPremium: 180,
      totalPremium: 360,
      breakEvenLow: 2090,
      breakEvenHigh: 2810,
      impliedVolatility: 0.37,
      volume: 120,
      openInterest: 450
    },
    {
      strike: 2500,
      callPremium: 150,
      putPremium: 200,
      totalPremium: 350,
      breakEvenLow: 2150,
      breakEvenHigh: 2850,
      impliedVolatility: 0.36,
      volume: 95,
      openInterest: 380
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
        { name: 'Specialty Trades', path: '/trading/specialty' },
        { name: 'Straddles' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shuffle className="h-8 w-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">Straddle Options</h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-start space-x-4 mb-6">
          <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300">
            A straddle is an options strategy involving the purchase of both a call and put option for the same underlying asset, strike price, and expiration date. Straddles are used when a trader believes the underlying asset will experience significant price movement but is uncertain about the direction.
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
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Call Premium</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Put Premium</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Total Cost</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Break-Even Range</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">IV</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {mockStraddles.map((straddle, index) => (
                <tr key={index} className={`${straddle.strike === currentPrice ? 'bg-indigo-900/10' : ''} hover:bg-slate-700/30`}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${straddle.strike === currentPrice ? 'bg-indigo-500' : 'bg-gray-500'}`}></span>
                      <span className="font-medium text-white">CC {straddle.strike.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-green-400">CC {straddle.callPremium.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-red-400">CC {straddle.putPremium.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-white">CC {straddle.totalPremium.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">
                    {straddle.breakEvenLow.toLocaleString()} - {straddle.breakEvenHigh.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-white">{(straddle.impliedVolatility * 100).toFixed(1)}%</td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                      Trade Straddle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="font-medium text-white mb-3">Straddle Strategy</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>A long straddle involves buying both a call and a put with the same strike price and expiration date.</span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Profits when the underlying asset moves significantly in either direction.</span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingDown className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Maximum loss is limited to the total premium paid if the asset price remains at the strike price.</span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>Ideal for events with uncertain outcomes, earnings announcements, or anticipated high volatility.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="font-medium text-white mb-3">Break-Even Analysis</h3>
            <p className="text-sm text-gray-300 mb-3">
              For a straddle to be profitable, the underlying asset must move enough in either direction to cover the cost of both options.
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex justify-between">
                <span className="text-indigo-400">Upper Break-Even:</span>
                <span>Strike Price + Total Premium</span>
              </li>
              <li className="flex justify-between">
                <span className="text-indigo-400">Lower Break-Even:</span>
                <span>Strike Price - Total Premium</span>
              </li>
              <li className="flex justify-between">
                <span className="text-indigo-400">Maximum Loss:</span>
                <span>Total Premium Paid</span>
              </li>
              <li className="flex justify-between">
                <span className="text-indigo-400">Maximum Profit:</span>
                <span>Unlimited (theoretically)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StraddlesPage;