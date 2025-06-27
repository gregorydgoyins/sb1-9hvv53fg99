import React, { useState } from 'react';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';
import { TrendingUp, TrendingDown, Info, AlertTriangle } from 'lucide-react';

export function BullBearStraddlesPage() {
  const [selectedSymbol, setSelectedSymbol] = useState('ASM300');
  const [selectedExpiry, setSelectedExpiry] = useState('2024-09-20');
  const [selectedStrategy, setSelectedStrategy] = useState('bull');
  
  // Mock bull/bear straddle data
  const mockStrategies = {
    bull: [
      {
        lowerStrike: 2400,
        upperStrike: 2500,
        callPremium: 180,
        putPremium: 130,
        totalPremium: 310,
        maxProfit: 'Unlimited',
        maxLoss: 210,
        breakEven: 2710,
        probability: 45,
        volume: 65
      },
      {
        lowerStrike: 2425,
        upperStrike: 2525,
        callPremium: 165,
        putPremium: 140,
        totalPremium: 305,
        maxProfit: 'Unlimited',
        maxLoss: 205,
        breakEven: 2730,
        probability: 42,
        volume: 55
      }
    ],
    bear: [
      {
        lowerStrike: 2400,
        upperStrike: 2500,
        callPremium: 180,
        putPremium: 130,
        totalPremium: 310,
        maxProfit: 'Unlimited',
        maxLoss: 210,
        breakEven: 2190,
        probability: 40,
        volume: 60
      },
      {
        lowerStrike: 2375,
        upperStrike: 2475,
        callPremium: 195,
        putPremium: 120,
        totalPremium: 315,
        maxProfit: 'Unlimited',
        maxLoss: 215,
        breakEven: 2160,
        probability: 38,
        volume: 50
      }
    ]
  };

  // Filter strategies based on selected type
  const filteredStrategies = mockStrategies[selectedStrategy as keyof typeof mockStrategies];

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
        { name: 'Bull & Bear Straddles' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {selectedStrategy === 'bull' ? (
            <TrendingUp className="h-8 w-8 text-green-400" />
          ) : (
            <TrendingDown className="h-8 w-8 text-red-400" />
          )}
          <h1 className="text-3xl font-bold text-white">
            {selectedStrategy === 'bull' ? 'Bull' : 'Bear'} Straddles
          </h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-start space-x-4 mb-6">
          <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300">
            {selectedStrategy === 'bull' 
              ? 'A bull straddle is a modified straddle strategy that uses different strike prices to create a bullish bias. It involves buying a call at a higher strike price and a put at a lower strike price, both with the same expiration date.'
              : 'A bear straddle is a modified straddle strategy that uses different strike prices to create a bearish bias. It involves buying a call at a higher strike price and a put at a lower strike price, both with the same expiration date.'}
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
              Strategy Type
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedStrategy('bull')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  selectedStrategy === 'bull'
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-green-600/20 hover:text-white'
                }`}
              >
                Bull
              </button>
              <button
                onClick={() => setSelectedStrategy('bear')}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  selectedStrategy === 'bear'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-red-600/20 hover:text-white'
                }`}
              >
                Bear
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
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Call Premium</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Put Premium</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Total Cost</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Max Profit</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Max Loss</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Break-Even</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredStrategies.map((strategy, index) => (
                <tr key={index} className="hover:bg-slate-700/30">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-medium text-white">{strategy.lowerStrike} / {strategy.upperStrike}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-green-400">CC {strategy.callPremium.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-red-400">CC {strategy.putPremium.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-white">CC {strategy.totalPremium.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-green-400">{strategy.maxProfit}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-red-400">CC {strategy.maxLoss.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">
                    {selectedStrategy === 'bull' ? '>' : '<'} {strategy.breakEven.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <button className={`px-3 py-1 ${
                      selectedStrategy === 'bull' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                    } text-white rounded-lg transition-colors`}>
                      Trade {selectedStrategy === 'bull' ? 'Bull' : 'Bear'} Straddle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="font-medium text-white mb-3">
              {selectedStrategy === 'bull' ? 'Bull Straddle Strategy' : 'Bear Straddle Strategy'}
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>
                  {selectedStrategy === 'bull'
                    ? 'A bull straddle involves buying a call at a higher strike price and a put at a lower strike price, creating a range where the strategy can be profitable.'
                    : 'A bear straddle involves buying a call at a higher strike price and a put at a lower strike price, with a bias toward profiting from downward price movement.'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  {selectedStrategy === 'bull'
                    ? 'Maximum profit potential is unlimited on the upside if the price rises significantly above the upper strike.'
                    : 'Maximum profit potential is limited to the difference between the lower strike price and zero (minus the premium paid) if the price falls significantly.'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingDown className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>
                  {selectedStrategy === 'bull'
                    ? 'Maximum loss occurs when the price settles between the two strike prices at expiration.'
                    : 'Maximum loss occurs when the price settles between the two strike prices at expiration.'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>
                  {selectedStrategy === 'bull'
                    ? 'Ideal for situations where you expect significant upward movement but want some downside protection.'
                    : 'Ideal for situations where you expect significant downward movement but want some upside protection.'}
                </span>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="font-medium text-white mb-3">Risk/Reward Profile</h3>
            <p className="text-sm text-gray-300 mb-3">
              {selectedStrategy === 'bull'
                ? 'Bull straddles have a bullish bias but still provide profit potential in both directions, with greater upside potential.'
                : 'Bear straddles have a bearish bias but still provide profit potential in both directions, with greater downside potential.'}
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex justify-between">
                <span className="text-indigo-400">Maximum Profit (Upside):</span>
                <span>{selectedStrategy === 'bull' ? 'Unlimited' : 'Limited'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-indigo-400">Maximum Profit (Downside):</span>
                <span>{selectedStrategy === 'bull' ? 'Limited' : 'Substantial'}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-indigo-400">Maximum Loss:</span>
                <span>Net premium paid</span>
              </li>
              <li className="flex justify-between">
                <span className="text-indigo-400">Break-Even Point:</span>
                <span>
                  {selectedStrategy === 'bull'
                    ? 'Upper strike + Net premium'
                    : 'Lower strike - Net premium'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BullBearStraddlesPage;