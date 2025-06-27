import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { BarChart2, TrendingUp, TrendingDown, Info, AlertTriangle, DollarSign } from 'lucide-react';

export function ETFsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock ETF data
  const mockETFs = [
    {
      symbol: 'HERO',
      name: 'Superhero Index ETF',
      price: 85.75,
      change: 1.25,
      percentChange: 1.48,
      volume: 125000,
      aum: 450000000,
      expense: 0.45,
      category: 'index',
      ytdReturn: 12.5
    },
    {
      symbol: 'VILL',
      name: 'Supervillain Index ETF',
      price: 72.40,
      change: -1.35,
      percentChange: -1.83,
      volume: 95000,
      aum: 320000000,
      expense: 0.48,
      category: 'index',
      ytdReturn: 8.2
    },
    {
      symbol: 'MRVL',
      name: 'Marvel Universe ETF',
      price: 92.60,
      change: 2.15,
      percentChange: 2.38,
      volume: 150000,
      aum: 580000000,
      expense: 0.50,
      category: 'publisher',
      ytdReturn: 15.8
    },
    {
      symbol: 'DCUN',
      name: 'DC Universe ETF',
      price: 88.25,
      change: -0.95,
      percentChange: -1.07,
      volume: 135000,
      aum: 520000000,
      expense: 0.50,
      category: 'publisher',
      ytdReturn: 10.2
    },
    {
      symbol: 'GOLD',
      name: 'Golden Age Comics ETF',
      price: 125.80,
      change: 0.85,
      percentChange: 0.68,
      volume: 85000,
      aum: 380000000,
      expense: 0.55,
      category: 'era',
      ytdReturn: 7.5
    },
    {
      symbol: 'SLVR',
      name: 'Silver Age Comics ETF',
      price: 110.45,
      change: 1.65,
      percentChange: 1.52,
      volume: 95000,
      aum: 420000000,
      expense: 0.52,
      category: 'era',
      ytdReturn: 9.8
    },
    {
      symbol: 'CRTV',
      name: 'Top Creators ETF',
      price: 78.90,
      change: 1.10,
      percentChange: 1.41,
      volume: 110000,
      aum: 350000000,
      expense: 0.58,
      category: 'creator',
      ytdReturn: 14.2
    },
    {
      symbol: 'TECH',
      name: 'Superhero Tech & Gadgets ETF',
      price: 65.30,
      change: -0.75,
      percentChange: -1.14,
      volume: 75000,
      aum: 280000000,
      expense: 0.60,
      category: 'specialty',
      ytdReturn: 11.5
    }
  ];

  // Filter ETFs based on selected category and search query
  const filteredETFs = mockETFs.filter(etf => {
    const matchesCategory = selectedCategory === 'all' || etf.category === selectedCategory;
    const matchesSearch = etf.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         etf.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Trading', path: '/trading' },
        { name: 'ETFs' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BarChart2 className="h-8 w-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">Exchange-Traded Funds</h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-start space-x-4 mb-6">
          <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300">
            Exchange-Traded Funds (ETFs) provide diversified exposure to specific segments of the comic book market. These funds track indices, publishers, eras, or themes, allowing investors to gain broad market exposure with a single investment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Search ETFs
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or symbol..."
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
            >
              <option value="all">All Categories</option>
              <option value="index">Index ETFs</option>
              <option value="publisher">Publisher ETFs</option>
              <option value="era">Era ETFs</option>
              <option value="creator">Creator ETFs</option>
              <option value="specialty">Specialty ETFs</option>
            </select>
          </div>
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
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">AUM</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Expense Ratio</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">YTD Return</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredETFs.map((etf, index) => (
                <tr key={index} className="hover:bg-slate-700/30">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-medium text-white">{etf.symbol}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-300">{etf.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-white">CC {etf.price.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end">
                      {etf.change > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                      )}
                      <span className={etf.change > 0 ? 'text-green-400' : 'text-red-400'}>
                        {etf.change > 0 ? '+' : ''}{etf.percentChange}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">{etf.volume.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">CC {(etf.aum / 1000000).toFixed(1)}M</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">{etf.expense}%</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <span className={etf.ytdReturn > 0 ? 'text-green-400' : 'text-red-400'}>
                      {etf.ytdReturn > 0 ? '+' : ''}{etf.ytdReturn}%
                    </span>
                  </td>
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
            <h3 className="font-medium text-white mb-3">ETF Advantages</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Diversification across multiple assets in a single investment, reducing individual asset risk.</span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Lower costs compared to buying individual assets or actively managed funds.</span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Liquidity and ease of trading throughout market hours at transparent prices.</span>
              </li>
              <li className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Access to specific market segments, themes, or strategies through targeted ETFs.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="font-medium text-white mb-3">ETF Considerations</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>ETFs still carry market risk, and their value will fluctuate with their underlying assets.</span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>Expense ratios reduce returns over time, though they're typically lower than mutual funds.</span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>Some specialized ETFs may have lower trading volume, potentially affecting liquidity.</span>
              </li>
              <li className="flex items-start space-x-2">
                <DollarSign className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>Consider the tracking error, which measures how closely the ETF follows its underlying index.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ETFsPage;