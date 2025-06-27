import React, { useState } from 'react';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';
import { Router as Butterfly, Info, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

export function ButterflysPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('ASM300');
  const [selectedExpiry, setSelectedExpiry] = useState('2024-09-20');
  const [selectedType, setSelectedType] = useState('call');
  
  // Mock butterfly spreads data
  const mockButterflySpreads = [
    {
      lowerStrike: 2300,
      middleStrike: 2450,
      upperStrike: 2600,
      totalPremium: 65,
      maxProfit: 85,
      maxLoss: 65,
      breakEvenLow: 2365,
      breakEvenHigh: 2535,
      probability: 35,
      volume: 45,
      type: 'call'
    },
    {
      lowerStrike: 2350,
      middleStrike: 2450,
      upperStrike: 2550,
      totalPremium: 45,
      maxProfit: 55,
      maxLoss: 45,
      breakEvenLow: 2395,
      breakEvenHigh: 2505,
      probability: 40,
      volume: 60,
      type: 'call'
    },
    {
      lowerStrike: 2300,
      middleStrike: 2450,
      upperStrike: 2600,
      totalPremium: 70,
      maxProfit: 80,
      maxLoss: 70,
      breakEvenLow: 2370,
      breakEvenHigh: 2530,
      probability: 32,
      volume: 40,
      type: 'put'
    },
    {
      lowerStrike: 2350,
      middleStrike: 2450,
      upperStrike: 2550,
      totalPremium: 50,
      maxProfit: 50,
      maxLoss: 50,
      breakEvenLow: 2400,
      breakEvenHigh: 2500,
      probability: 38,
      volume: 55,
      type: 'put'
    }
  ];

  // Filter spreads based on selected type
  const filteredSpreads = mockButterflySpreads.filter(spread => spread.type === selectedType);

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
        { name: 'Butterflys' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Butterfly className="h-8 w-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">Butterfly Spreads</h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-start space-x-4 mb-6">
          <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300">
            A butterfly spread is an options strategy that combines bull and bear spreads, using three strike prices. It's designed to profit from low volatility in the underlying asset, with maximum profit occurring when the asset closes exactly at the middle strike price at expiration.
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
              Butterfly Type
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedType('call')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  selectedType === 'call'
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-green-600/20 hover:text-white'
                }`}
              >
                Call Butterfly
              </button>
              <button
                onClick={() => setSelectedType('put')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  selectedType === 'put'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-red-600/20 hover:text-white'
                }`}
              >
                Put Butterfly
              </button>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Strikes</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Net Premium</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Max Profit</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Max Loss</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Break-Even Range</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Probability</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredSpreads.map((spread, index) => (
                <tr key={index} className={`${spread.middleStrike === currentPrice ? 'bg-indigo-900/10' : ''} hover:bg-slate-700/30`}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${spread.middleStrike === currentPrice ? 'bg-indigo-500' : 'bg-gray-500'}`}></span>
                      <span className="font-medium text-white">{spread.lowerStrike} / {spread.middleStrike} / {spread.upperStrike}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-white">CC {spread.totalPremium.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-green-400">CC {spread.maxProfit.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-red-400">CC {spread.maxLoss.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">
                    {spread.breakEvenLow.toLocaleString()} - {spread.breakEvenHigh.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-white">{spread.probability}%</td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                      Trade Butterfly
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="font-medium text-white mb-3">Butterfly Strategy</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>A butterfly spread involves buying one option at a lower strike, selling two options at a middle strike, and buying one option at a higher strike.</span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Maximum profit occurs when the underlying asset closes exactly at the middle strike price at expiration.</span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingDown className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Maximum loss is limited to the net premium paid and occurs when the asset closes below the lowest strike or above the highest strike.</span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>Ideal for low volatility environments when you expect the underlying asset to remain relatively stable.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="font-medium text-white mb-3">Risk/Reward Profile</h3>
            <p className="text-sm text-gray-300 mb-3">
              Butterfly spreads offer a defined risk/reward profile with limited risk and limited profit potential.
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex justify-between">
                <span className="text-indigo-400">Maximum Profit:</span>
                <span>Distance between strikes - Net premium</span>
              </li>
              <li className="flex justify-between">
                <span className="text-indigo-400">Maximum Loss:</span>
                <span>Net premium paid</span>
              </li>
              <li className="flex justify-between">
                <span className="text-indigo-400">Upper Break-Even:</span>
                <span>Middle strike + Max profit</span>
              </li>
              <li className="flex justify-between">
                <span className="text-indigo-400">Lower Break-Even:</span>
                <span>Middle strike - Max profit</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButterflysPage;