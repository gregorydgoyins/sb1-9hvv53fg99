import React, { useState, useEffect } from 'react';
import { 
  Wallet, TrendingUp, TrendingDown, PieChart, BarChart3, 
  Target, Award, Calendar, Filter, Search, Eye, EyeOff 
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Link } from 'react-router-dom';

interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  type: 'comic' | 'creator' | 'publisher' | 'option';
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  unrealizedPnL: number;
  pnlPercentage: number;
  dayChange: number;
  dayChangePercent: number;
  allocation: number;
  grade?: string;
  era?: string;
}

interface PortfolioMetrics {
  totalValue: number;
  totalCost: number;
  totalPnL: number;
  totalPnLPercent: number;
  dayChange: number;
  dayChangePercent: number;
  cashBalance: number;
  investedAmount: number;
  diversificationScore: number;
  riskScore: number;
}

const mockPortfolioData: PortfolioItem[] = [
  {
    id: '1',
    symbol: 'ASM300',
    name: 'Amazing Spider-Man #300',
    type: 'comic',
    quantity: 2,
    averagePrice: 2400,
    currentPrice: 2500,
    totalValue: 5000,
    unrealizedPnL: 200,
    pnlPercentage: 4.17,
    dayChange: 50,
    dayChangePercent: 2.04,
    allocation: 12.5,
    grade: 'CGC 9.8',
    era: 'Copper Age'
  },
  {
    id: '2',
    symbol: 'TMFS',
    name: 'Todd McFarlane',
    type: 'creator',
    quantity: 50,
    averagePrice: 1800,
    currentPrice: 1850,
    totalValue: 92500,
    unrealizedPnL: 2500,
    pnlPercentage: 2.78,
    dayChange: 1250,
    dayChangePercent: 1.37,
    allocation: 23.1
  },
  {
    id: '3',
    symbol: 'DCCP',
    name: 'DC Comics',
    type: 'publisher',
    quantity: 25,
    averagePrice: 3400,
    currentPrice: 3500,
    totalValue: 87500,
    unrealizedPnL: 2500,
    pnlPercentage: 2.94,
    dayChange: -875,
    dayChangePercent: -0.99,
    allocation: 21.9
  },
  {
    id: '4',
    symbol: 'BAT457',
    name: 'Batman #457',
    type: 'comic',
    quantity: 3,
    averagePrice: 1750,
    currentPrice: 1800,
    totalValue: 5400,
    unrealizedPnL: 150,
    pnlPercentage: 2.86,
    dayChange: 54,
    dayChangePercent: 1.01,
    allocation: 13.5,
    grade: 'CGC 9.6',
    era: 'Copper Age'
  },
  {
    id: '5',
    symbol: 'ASM300C2600',
    name: 'ASM #300 2600 Call',
    type: 'option',
    quantity: 10,
    averagePrice: 140,
    currentPrice: 150,
    totalValue: 1500,
    unrealizedPnL: 100,
    pnlPercentage: 7.14,
    dayChange: 30,
    dayChangePercent: 2.04,
    allocation: 3.8
  }
];

const mockMetrics: PortfolioMetrics = {
  totalValue: 400000,
  totalCost: 380000,
  totalPnL: 20000,
  totalPnLPercent: 5.26,
  dayChange: 2500,
  dayChangePercent: 0.63,
  cashBalance: 208100,
  investedAmount: 191900,
  diversificationScore: 85,
  riskScore: 65
};

const performanceData = [
  { date: '2024-01', value: 350000 },
  { date: '2024-02', value: 365000 },
  { date: '2024-03', value: 380000 },
  { date: '2024-04', value: 390000 },
  { date: '2024-05', value: 400000 }
];

const allocationData = [
  { name: 'Comics', value: 35, color: '#818cf8' },
  { name: 'Creators', value: 30, color: '#22c55e' },
  { name: 'Publishers', value: 25, color: '#eab308' },
  { name: 'Options', value: 10, color: '#ec4899' }
];

export function PortfolioShowcase() {
  const [selectedView, setSelectedView] = useState<'overview' | 'holdings' | 'performance' | 'analysis'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('allocation');
  const [showValues, setShowValues] = useState(true);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const filteredHoldings = mockPortfolioData
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || item.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'allocation':
          return b.allocation - a.allocation;
        case 'value':
          return b.totalValue - a.totalValue;
        case 'pnl':
          return b.pnlPercentage - a.pnlPercentage;
        case 'dayChange':
          return b.dayChangePercent - a.dayChangePercent;
        default:
          return 0;
      }
    });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'comic': return 'text-indigo-400';
      case 'creator': return 'text-green-400';
      case 'publisher': return 'text-yellow-400';
      case 'option': return 'text-pink-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'comic': return '📚';
      case 'creator': return '👨‍🎨';
      case 'publisher': return '🏢';
      case 'option': return '📊';
      default: return '❓';
    }
  };

  const views = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'holdings', label: 'Holdings', icon: Wallet },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Wallet className="h-8 w-8 text-indigo-400" />
          <h1 className="heading-responsive text-white">Portfolio Showcase</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowValues(!showValues)}
            className="flex items-center space-x-2 px-3 py-2 bg-slate-700/50 rounded-lg text-gray-300 hover:text-white transition-colors touch-target"
          >
            {showValues ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            <span className="text-sm">{showValues ? 'Hide' : 'Show'} Values</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl">
          <p className="text-sm text-gray-400">Total Value</p>
          <p className="text-xl font-bold text-white">
            {showValues ? `CC ${mockMetrics.totalValue.toLocaleString()}` : '••••••'}
          </p>
          <div className="flex items-center mt-1">
            <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-sm text-green-400">
              +{mockMetrics.totalPnLPercent.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl">
          <p className="text-sm text-gray-400">Day Change</p>
          <p className={`text-xl font-bold ${mockMetrics.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {showValues ? `${mockMetrics.dayChange >= 0 ? '+' : ''}CC ${mockMetrics.dayChange.toLocaleString()}` : '••••••'}
          </p>
          <div className="flex items-center mt-1">
            {mockMetrics.dayChangePercent >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
            )}
            <span className={`text-sm ${mockMetrics.dayChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {mockMetrics.dayChangePercent >= 0 ? '+' : ''}{mockMetrics.dayChangePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl">
          <p className="text-sm text-gray-400">Cash Balance</p>
          <p className="text-xl font-bold text-white">
            {showValues ? `CC ${mockMetrics.cashBalance.toLocaleString()}` : '••••••'}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {((mockMetrics.cashBalance / mockMetrics.totalValue) * 100).toFixed(1)}% allocation
          </p>
        </div>

        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl">
          <p className="text-sm text-gray-400">Diversification</p>
          <p className="text-xl font-bold text-white">{mockMetrics.diversificationScore}/100</p>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
            <div 
              className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${mockMetrics.diversificationScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl shadow-xl">
        <div className="flex space-x-1 p-1">
          {views.map(view => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors flex-1 justify-center touch-target ${
                selectedView === view.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <view.icon className="h-4 w-4" />
              <span className="text-responsive">{view.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl">
        {selectedView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Allocation Chart */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Asset Allocation</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Holdings */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Top Holdings</h3>
              <div className="space-y-3">
                {mockPortfolioData.slice(0, 5).map((holding) => (
                  <div key={holding.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getTypeIcon(holding.type)}</span>
                      <div>
                        <p className="font-medium text-white">{holding.name}</p>
                        <p className="text-sm text-gray-400">{holding.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">
                        {showValues ? `CC ${holding.totalValue.toLocaleString()}` : '••••••'}
                      </p>
                      <p className={`text-sm ${holding.pnlPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {holding.pnlPercentage >= 0 ? '+' : ''}{holding.pnlPercentage.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'holdings' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search holdings..."
                  className="pl-10 pr-4 py-2 w-full bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 touch-target"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-slate-700/50 text-white text-sm border-slate-600/50 rounded-lg px-3 py-2 w-full touch-target"
                >
                  <option value="all">All Types</option>
                  <option value="comic">Comics</option>
                  <option value="creator">Creators</option>
                  <option value="publisher">Publishers</option>
                  <option value="option">Options</option>
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-700/50 text-white text-sm border-slate-600/50 rounded-lg px-3 py-2 touch-target"
              >
                <option value="allocation">Allocation</option>
                <option value="value">Value</option>
                <option value="pnl">P&L %</option>
                <option value="dayChange">Day Change</option>
              </select>

              <div className="text-sm text-gray-400 flex items-center">
                {filteredHoldings.length} holdings
              </div>
            </div>

            {/* Holdings Table */}
            <div className="overflow-x-auto table-responsive">
              <table className="min-w-full divide-y divide-slate-700/50">
                <thead>
                  <tr className="bg-slate-800/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Asset</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Avg Price</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Current</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Value</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">P&L</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Day Change</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredHoldings.map((holding) => (
                    <tr 
                      key={holding.id}
                      onClick={() => setSelectedCard(selectedCard === holding.id ? null : holding.id)}
                      className={`hover:bg-slate-700/30 transition-all cursor-pointer touch-target
                        ${selectedCard === holding.id ? 'bg-slate-700/50 shadow-[0_0_15px_rgba(255,255,0,0.3)]' : ''}`}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{getTypeIcon(holding.type)}</span>
                          <div>
                            <p className="font-medium text-white">{holding.name}</p>
                            <p className="text-sm text-gray-400">{holding.symbol}</p>
                            {holding.grade && (
                              <p className="text-xs text-indigo-400">{holding.grade}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">
                        {holding.quantity}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">
                        {showValues ? `CC ${holding.averagePrice.toLocaleString()}` : '••••••'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-white">
                        {showValues ? `CC ${holding.currentPrice.toLocaleString()}` : '••••••'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-white">
                        {showValues ? `CC ${holding.totalValue.toLocaleString()}` : '••••••'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className={holding.unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}>
                          <div className="flex items-center justify-end">
                            {holding.unrealizedPnL >= 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            <span>
                              {showValues ? `${holding.unrealizedPnL >= 0 ? '+' : ''}CC ${holding.unrealizedPnL.toLocaleString()}` : '••••••'}
                            </span>
                          </div>
                          <span className="text-xs">
                            ({holding.unrealizedPnL >= 0 ? '+' : ''}{holding.pnlPercentage.toFixed(2)}%)
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className={holding.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}>
                          <span>
                            {showValues ? `${holding.dayChange >= 0 ? '+' : ''}CC ${holding.dayChange.toLocaleString()}` : '••••••'}
                          </span>
                          <div className="text-xs">
                            ({holding.dayChange >= 0 ? '+' : ''}{holding.dayChangePercent.toFixed(2)}%)
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/trading/${holding.symbol}`}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors touch-target"
                          >
                            Trade
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedView === 'performance' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Portfolio Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" tickFormatter={(value) => `CC ${(value / 1000).toFixed(0)}K`} />
                    <Tooltip
                      formatter={(value: number) => [`CC ${value.toLocaleString()}`, 'Portfolio Value']}
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '0.5rem'
                      }}
                      itemStyle={{ color: '#e2e8f0' }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#818cf8" 
                      strokeWidth={2}
                      dot={{ fill: '#818cf8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Total Return</p>
                <p className="text-xl font-bold text-green-400">+{mockMetrics.totalPnLPercent.toFixed(2)}%</p>
                <p className="text-sm text-gray-300">CC {mockMetrics.totalPnL.toLocaleString()}</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Best Performer</p>
                <p className="text-xl font-bold text-white">ASM300C2600</p>
                <p className="text-sm text-green-400">+7.14%</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Risk Score</p>
                <p className="text-xl font-bold text-white">{mockMetrics.riskScore}/100</p>
                <p className="text-sm text-yellow-400">Moderate Risk</p>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'analysis' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h4 className="font-medium text-white mb-3">Portfolio Health</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Diversification</span>
                    <span className="text-green-400">{mockMetrics.diversificationScore}/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Risk Level</span>
                    <span className="text-yellow-400">Moderate</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Cash Allocation</span>
                    <span className="text-white">{((mockMetrics.cashBalance / mockMetrics.totalValue) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h4 className="font-medium text-white mb-3">Recommendations</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-indigo-400" />
                    <span className="text-sm text-gray-300">Consider rebalancing comic allocation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-300">Strong creator diversification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">Review options expiration dates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}