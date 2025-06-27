import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { LineChart, TrendingUp, TrendingDown, Info, AlertTriangle, Calendar } from 'lucide-react';

export function DerivativesFuturesPage() {
  const [selectedCategory, setSelectedCategory] = useState('futures');
  const [selectedSymbol, setSelectedSymbol] = useState('CMI');
  
  // Mock futures contracts data
  const mockFutures = [
    {
      symbol: 'CMI-SEP24',
      baseSymbol: 'CMI',
      name: 'Comic Market Index September 2024',
      price: 14250,
      change: 125,
      percentChange: 0.88,
      volume: 1250,
      openInterest: 4500,
      expiryDate: '2024-09-20',
      category: 'index'
    },
    {
      symbol: 'CMI-DEC24',
      baseSymbol: 'CMI',
      name: 'Comic Market Index December 2024',
      price: 14350,
      change: 150,
      percentChange: 1.06,
      volume: 950,
      openInterest: 3200,
      expiryDate: '2024-12-20',
      category: 'index'
    },
    {
      symbol: 'MRVL-SEP24',
      baseSymbol: 'MRVL',
      name: 'Marvel Entertainment September 2024',
      price: 4350,
      change: -65,
      percentChange: -1.47,
      volume: 850,
      openInterest: 2800,
      expiryDate: '2024-09-20',
      category: 'publisher'
    },
    {
      symbol: 'DCCP-SEP24',
      baseSymbol: 'DCCP',
      name: 'DC Comics September 2024',
      price: 3650,
      change: 45,
      percentChange: 1.25,
      volume: 750,
      openInterest: 2500,
      expiryDate: '2024-09-20',
      category: 'publisher'
    }
  ];

  // Mock derivatives data
  const mockDerivatives = [
    {
      symbol: 'CMI-2X-BULL',
      baseSymbol: 'CMI',
      name: '2x Long Comic Market Index',
      price: 285,
      change: 5.7,
      percentChange: 2.04,
      volume: 3500,
      leverage: 2,
      category: 'leveraged',
      direction: 'long'
    },
    {
      symbol: 'CMI-2X-BEAR',
      baseSymbol: 'CMI',
      name: '2x Short Comic Market Index',
      price: 142,
      change: -5.6,
      percentChange: -3.79,
      volume: 2800,
      leverage: 2,
      category: 'leveraged',
      direction: 'short'
    },
    {
      symbol: 'HERO-VIX',
      baseSymbol: 'HERO',
      name: 'Superhero Volatility Index',
      price: 18.5,
      change: -0.8,
      percentChange: -4.15,
      volume: 4200,
      category: 'volatility'
    },
    {
      symbol: 'VILLAIN-VIX',
      baseSymbol: 'VILL',
      name: 'Supervillain Volatility Index',
      price: 22.4,
      change: 1.2,
      percentChange: 5.66,
      volume: 3800,
      category: 'volatility'
    }
  ];

  // Filter data based on selected category
  const displayData = selectedCategory === 'futures' ? mockFutures : mockDerivatives;

  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Trading', path: '/trading' },
        { name: 'Derivatives & Futures' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <LineChart className="h-8 w-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">Derivatives & Futures</h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-start space-x-4 mb-6">
          <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300">
            Derivatives and futures contracts allow traders to gain exposure to comic market indices, publishers, and other assets with leverage, hedging capabilities, and defined expiration dates. These instruments are designed for experienced traders and involve higher risk than direct asset ownership.
          </p>
        </div>
        
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setSelectedCategory('futures')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'futures'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700/50 text-gray-300 hover:bg-indigo-600/20 hover:text-white'
            }`}
          >
            Futures Contracts
          </button>
          <button
            onClick={() => setSelectedCategory('derivatives')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'derivatives'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700/50 text-gray-300 hover:bg-indigo-600/20 hover:text-white'
            }`}
          >
            Derivative Products
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700/50">
            <thead>
              <tr className="bg-slate-700/30">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Change</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Volume</th>
                {selectedCategory === 'futures' && (
                  <>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Open Int.</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Expiry</th>
                  </>
                )}
                {selectedCategory === 'derivatives' && (
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {selectedCategory === 'derivatives' ? 'Type' : 'Category'}
                  </th>
                )}
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {displayData.map((item, index) => (
                <tr key={index} className="hover:bg-slate-700/30">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-medium text-white">{item.symbol}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-300">{item.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-white">CC {item.price.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end">
                      {item.change > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                      )}
                      <span className={item.change > 0 ? 'text-green-400' : 'text-red-400'}>
                        {item.change > 0 ? '+' : ''}{item.percentChange}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">{item.volume.toLocaleString()}</td>
                  {selectedCategory === 'futures' && (
                    <>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">{(item as any).openInterest.toLocaleString()}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">
                        {new Date((item as any).expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </>
                  )}
                  {selectedCategory === 'derivatives' && (
                    <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">
                      {(item as any).category === 'leveraged' 
                        ? `${(item as any).leverage}x ${(item as any).direction}` 
                        : (item as any).category.charAt(0).toUpperCase() + (item as any).category.slice(1)}
                    </td>
                  )}
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
            <h3 className="font-medium text-white mb-3">
              {selectedCategory === 'futures' ? 'Futures Contracts' : 'Derivative Products'} Explained
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>
                  {selectedCategory === 'futures'
                    ? 'Futures contracts are agreements to buy or sell an asset at a predetermined price at a specified time in the future.'
                    : 'Derivative products derive their value from an underlying asset and include leveraged ETPs, volatility indices, and other structured products.'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  {selectedCategory === 'futures'
                    ? 'Futures allow traders to lock in prices, hedge against price movements, or speculate on future price direction.'
                    : 'Leveraged products amplify the returns (and losses) of the underlying asset, while volatility products track market uncertainty.'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <Calendar className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>
                  {selectedCategory === 'futures'
                    ? 'Futures contracts have specific expiration dates when the contract must be settled or rolled over.'
                    : 'Many derivative products are designed for short-term trading rather than long-term holding due to decay effects.'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>
                  {selectedCategory === 'futures'
                    ? 'Futures trading involves leverage, which can amplify both gains and losses.'
                    : 'Leveraged and inverse products can experience significant value decay over time due to compounding effects.'}
                </span>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="font-medium text-white mb-3">Risk Considerations</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>
                  {selectedCategory === 'futures'
                    ? 'Futures contracts use margin, meaning you only need to put up a fraction of the contract value, creating significant leverage.'
                    : 'Leveraged products can lose value quickly in volatile or sideways markets due to daily rebalancing and volatility decay.'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>
                  {selectedCategory === 'futures'
                    ? 'Potential for margin calls if the market moves against your position and your account falls below maintenance margin requirements.'
                    : 'The performance of leveraged products over time may significantly differ from the simple multiple of the underlying asset\'s return.'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>
                  {selectedCategory === 'futures'
                    ? 'Futures positions require active management and monitoring, especially as expiration approaches.'
                    : 'Volatility products can behave unpredictably during market stress events, sometimes moving opposite to expectations.'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>
                  {selectedCategory === 'futures'
                    ? 'Liquidity can vary significantly between different futures contracts and expiration months.'
                    : 'These products are designed for sophisticated investors who understand their complex mechanics and risks.'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DerivativesFuturesPage;