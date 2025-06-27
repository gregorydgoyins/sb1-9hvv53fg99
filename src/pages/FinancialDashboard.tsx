import React, { useState } from 'react';
import { 
  BarChart2, TrendingUp, TrendingDown, Search, Filter, 
  Calendar, ChevronDown, Briefcase, Users, BookOpen, 
  Building2, Award, Star, Info, Bell, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { NewsTicker } from '../components/news/NewsTicker';
import { NewsFeed } from '../components/news/NewsFeed';
import { NewsAnalysis } from '../components/NewsAnalysis';
import { ComicMarketIndexGlow } from '../components/ComicMarketIndexGlow';
import { MarketSentimentGauge } from '../components/ui/MarketSentimentGauge';
import { PortfolioSummary } from '../components/PortfolioSummary';
import { CreatorBonds } from '../components/CreatorBonds';
import { PublisherBonds } from '../components/PublisherBonds';
import { OptionsTrading } from '../components/OptionsTrading';
import { NewsNotification } from '../components/news/NewsNotification';

export function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'analysis'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Dropdown states
  const [creatorsDropdown, setCreatorsDropdown] = useState(false);
  const [superheroesDropdown, setSuperheroesDropdown] = useState(false);
  const [publishersDropdown, setPublishersDropdown] = useState(false);
  
  // Mock sentiment data
  const marketSentiment = 0.65; // 65% positive
  const marketConfidence = 0.85; // 85% confidence
  const portfolioSentiment = 0.72; // 72% positive
  const portfolioConfidence = 0.90; // 90% confidence
  
  // Mock accomplishments
  const accomplishments = [
    { id: '1', title: 'First Trade', description: 'Complete your first trade', completed: true },
    { id: '2', title: 'Diversified Portfolio', description: 'Hold assets from 3 different categories', completed: true },
    { id: '3', title: 'Options Trader', description: 'Execute your first options contract', completed: false },
    { id: '4', title: 'Market Maker', description: 'Provide liquidity to the market', completed: false }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[{ name: 'Financial Dashboard' }]} />
      
      {/* Header with search and filters */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <BarChart2 className="h-8 w-8 text-indigo-400" />
            <h1 className="heading-responsive text-white">Financial Dashboard</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assets, news, analysis..."
                className="pl-10 pr-4 py-2 w-full sm:w-64 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-700/50 text-white text-sm border-slate-600/50 rounded-lg px-3 py-2"
              >
                <option value="all">All Categories</option>
                <option value="comics">Comics</option>
                <option value="creators">Creators</option>
                <option value="publishers">Publishers</option>
                <option value="options">Options</option>
              </select>
            </div>
            
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-lg ${
                showNotifications ? 'bg-indigo-600 text-white' : 'bg-slate-700/50 text-gray-300'
              }`}
              aria-label={showNotifications ? 'Disable notifications' : 'Enable notifications'}
            >
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl shadow-xl">
        <div className="flex space-x-1 p-1">
          {[
            { id: 'overview', label: 'Market Overview', icon: BarChart2 },
            { id: 'portfolio', label: 'Portfolio Analytics', icon: Briefcase },
            { id: 'analysis', label: 'Market Analysis', icon: TrendingUp }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors flex-1 justify-center touch-target ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-responsive">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Dropdown Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Creators Dropdown */}
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl">
          <button
            onClick={() => setCreatorsDropdown(!creatorsDropdown)}
            className="w-full flex items-center justify-between p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-indigo-400" />
              <span className="font-medium text-white">Creators</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${creatorsDropdown ? 'transform rotate-180' : ''}`} />
          </button>
          
          {creatorsDropdown && (
            <div className="mt-2 space-y-1 pl-7">
              <Link to="/creator/TMFS" className="block p-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg">
                Todd McFarlane
              </Link>
              <Link to="/creator/JLES" className="block p-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg">
                Jim Lee
              </Link>
              <Link to="/creator/DCTS" className="block p-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg">
                Donny Cates
              </Link>
              <Link to="/creators" className="block p-2 text-indigo-400 hover:text-indigo-300 hover:bg-slate-700/50 rounded-lg">
                View All Creators →
              </Link>
            </div>
          )}
        </div>
        
        {/* Superheroes Dropdown */}
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl">
          <button
            onClick={() => setSuperheroesDropdown(!superheroesDropdown)}
            className="w-full flex items-center justify-between p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="font-medium text-white">Superheroes</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${superheroesDropdown ? 'transform rotate-180' : ''}`} />
          </button>
          
          {superheroesDropdown && (
            <div className="mt-2 space-y-1 pl-7">
              <Link to="/comic/ASM300" className="block p-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg">
                Spider-Man
              </Link>
              <Link to="/comic/BAT457" className="block p-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg">
                Batman
              </Link>
              <Link to="/comic/XMN141" className="block p-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg">
                X-Men
              </Link>
              <Link to="/comics" className="block p-2 text-indigo-400 hover:text-indigo-300 hover:bg-slate-700/50 rounded-lg">
                View All Comics →
              </Link>
            </div>
          )}
        </div>
        
        {/* Publishers Dropdown */}
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl">
          <button
            onClick={() => setPublishersDropdown(!publishersDropdown)}
            className="w-full flex items-center justify-between p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-green-400" />
              <span className="font-medium text-white">Publishers</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${publishersDropdown ? 'transform rotate-180' : ''}`} />
          </button>
          
          {publishersDropdown && (
            <div className="mt-2 space-y-1 pl-7">
              <Link to="/publisher/MRVL" className="block p-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg">
                Marvel Entertainment
              </Link>
              <Link to="/publisher/DCCP" className="block p-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg">
                DC Comics
              </Link>
              <Link to="/publisher/IMGC" className="block p-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg">
                Image Comics
              </Link>
              <Link to="/publishers" className="block p-2 text-indigo-400 hover:text-indigo-300 hover:bg-slate-700/50 rounded-lg">
                View All Publishers →
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Market Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ComicMarketIndexGlow />
            </div>
            
            <div className="space-y-6">
              <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">Market Sentiment</h2>
                <div className="flex flex-col items-center">
                  <MarketSentimentGauge 
                    sentiment={marketSentiment} 
                    confidence={marketConfidence}
                    label="Market Sentiment"
                    size="large"
                    animated={true}
                    showValue={true}
                    previousSentiment={marketSentiment - 0.05}
                  />
                  
                  <div className="mt-4 text-sm text-gray-300">
                    <p>Market sentiment is <span className="text-green-400 font-medium">positive</span> with high confidence.</p>
                    <p className="mt-1">Trending <span className="text-green-400">upward</span> over the past 24 hours.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">Featured News</h2>
                <NewsFeed maxItems={2} showFilters={false} showRefresh={false} compact={true} />
              </div>
            </div>
          </div>
          
          {/* Creator and Publisher Bonds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CreatorBonds />
            <PublisherBonds />
          </div>
          
          {/* Options Trading */}
          <OptionsTrading />
          
          {/* News Analysis */}
          <NewsAnalysis 
            title="Market News Impact Analysis" 
            showSourceBreakdown={true} 
            showSentimentAnalysis={true} 
            showKeywordAnalysis={true}
          />
        </div>
      )}
      
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          {/* Portfolio Summary */}
          <PortfolioSummary />
          
          {/* Portfolio Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">Portfolio Performance</h2>
                <div className="h-80 w-full">
                  {/* Performance Chart would go here */}
                  <div className="flex items-center justify-center h-full bg-slate-700/30 rounded-lg">
                    <p className="text-gray-400">Historical performance chart (2014-2025)</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                    <p className="text-sm text-gray-400">Total Return</p>
                    <p className="text-xl font-bold text-green-400">+24.8%</p>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                    <p className="text-sm text-gray-400">YTD Return</p>
                    <p className="text-xl font-bold text-green-400">+8.3%</p>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                    <p className="text-sm text-gray-400">Volatility</p>
                    <p className="text-xl font-bold text-white">Medium</p>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                    <p className="text-sm text-gray-400">Sharpe Ratio</p>
                    <p className="text-xl font-bold text-white">1.8</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">Portfolio Sentiment</h2>
                <div className="flex flex-col items-center">
                  <MarketSentimentGauge 
                    sentiment={portfolioSentiment} 
                    confidence={portfolioConfidence}
                    label="Portfolio Health"
                    size="medium"
                    animated={true}
                    showValue={true}
                    previousSentiment={portfolioSentiment - 0.03}
                  />
                </div>
              </div>
              
              <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">Portfolio News</h2>
                <NewsFeed maxItems={2} showFilters={false} showRefresh={false} compact={true} />
              </div>
            </div>
          </div>
          
          {/* Bond Ratings */}
          <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">Bond Ratings</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-700/50">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Bond</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rating</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Yield</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Maturity</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {[
                    { name: 'Marvel Entertainment', symbol: 'MRVLB', rating: 'AAA', yield: 4.8, maturity: '2026-06-15', price: 102.5, change: 0.3 },
                    { name: 'DC Comics', symbol: 'DCCB', rating: 'AAA', yield: 5.2, maturity: '2027-03-22', price: 101.8, change: -0.2 },
                    { name: 'Image Comics', symbol: 'IMGC', rating: 'AA', yield: 6.5, maturity: '2025-11-30', price: 99.5, change: 0.5 },
                    { name: 'Dark Horse', symbol: 'DKHB', rating: 'AA', yield: 5.8, maturity: '2026-09-15', price: 100.2, change: -0.1 }
                  ].map((bond, index) => (
                    <tr key={index} className="hover:bg-slate-700/30">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <p className="font-medium text-white">{bond.name}</p>
                          <p className="text-sm text-gray-400">{bond.symbol}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          bond.rating === 'AAA' ? 'bg-green-900/50 text-green-200 border border-green-700/50' :
                          'bg-blue-900/50 text-blue-200 border border-blue-700/50'
                        }`}>
                          {bond.rating}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-green-400">{bond.yield}%</td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-gray-300">{bond.maturity}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-white">{bond.price}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end">
                          {bond.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                          )}
                          <span className={bond.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                            {bond.change >= 0 ? '+' : ''}{bond.change}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Options Analysis */}
          <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">Options Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-semibold text-white mb-3">Options Greeks</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Delta (Δ)</span>
                    <span className="text-white">0.65</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Gamma (Γ)</span>
                    <span className="text-white">0.15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Theta (Θ)</span>
                    <span className="text-white">-0.25</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Vega (ν)</span>
                    <span className="text-white">0.30</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-semibold text-white mb-3">Options Strategies</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Covered Call Strategy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-300">Protective Put Strategy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-red-400" />
                    <span className="text-gray-300">Iron Condor Strategy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-indigo-400" />
                    <span className="text-gray-300">Bull Call Spread Strategy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          {/* Market Correlation */}
          <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">Market Correlation</h2>
            <div className="h-80 w-full">
              {/* Correlation Chart would go here */}
              <div className="flex items-center justify-center h-full bg-slate-700/30 rounded-lg">
                <p className="text-gray-400">Market correlation heatmap</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Highest Correlation</p>
                <p className="text-lg font-medium text-white">Marvel & DC (0.85)</p>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Lowest Correlation</p>
                <p className="text-lg font-medium text-white">Indie & Options (-0.12)</p>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Diversification Score</p>
                <p className="text-lg font-medium text-white">72/100</p>
              </div>
            </div>
          </div>
          
          {/* News Impact Analysis */}
          <NewsAnalysis 
            title="News Impact Analysis" 
            showSourceBreakdown={true} 
            showSentimentAnalysis={true} 
            showKeywordAnalysis={true}
          />
          
          {/* Historical Performance */}
          <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6">Historical Performance (2014-2025)</h2>
            <div className="h-80 w-full">
              {/* Historical Performance Chart would go here */}
              <div className="flex items-center justify-center h-full bg-slate-700/30 rounded-lg">
                <p className="text-gray-400">Historical performance chart with key milestone annotations</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Key Milestones</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-900/30 p-2 rounded-full border border-green-700/50">
                    <Calendar className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">2018 - Black Panther Release</p>
                    <p className="text-sm text-gray-300">Market surge following film's success</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-red-900/30 p-2 rounded-full border border-red-700/50">
                    <Calendar className="h-4 w-4 text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">2020 - COVID-19 Impact</p>
                    <p className="text-sm text-gray-300">Market downturn during global pandemic</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-900/30 p-2 rounded-full border border-green-700/50">
                    <Calendar className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">2021 - NFT & Speculation Boom</p>
                    <p className="text-sm text-gray-300">Rapid market growth during digital asset boom</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-900/30 p-2 rounded-full border border-yellow-700/50">
                    <Calendar className="h-4 w-4 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">2023 - Market Stabilization</p>
                    <p className="text-sm text-gray-300">Return to steady growth after correction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Accomplishments Tracker */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Accomplishments</h2>
          </div>
          <Link to="/learn" className="text-indigo-400 hover:text-indigo-300 text-sm">
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {accomplishments.map(achievement => (
            <div 
              key={achievement.id}
              className={`p-4 rounded-lg border transition-all ${
                achievement.completed 
                  ? 'bg-indigo-900/30 border-indigo-700/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                  : 'bg-slate-700/50 border-slate-600/50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Award className={`h-5 w-5 ${
                  achievement.completed ? 'text-yellow-400 pulse-glow' : 'text-gray-500'
                }`} />
                <h3 className={`font-semibold ${
                  achievement.completed ? 'text-white' : 'text-gray-400'
                }`}>
                  {achievement.title}
                </h3>
              </div>
              <p className={`text-sm ${
                achievement.completed ? 'text-indigo-200' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Coming Soon & Reference Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
          <div className="flex items-center space-x-2 mb-6">
            <Zap className="h-6 w-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Coming Soon</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">Advanced Portfolio Analytics</h3>
                <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-xs">Coming Soon</span>
              </div>
              <p className="text-sm text-gray-300 mt-2">
                Deep dive into your portfolio with advanced analytics, risk assessment, and optimization recommendations.
              </p>
            </div>
            
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">AI Market Predictions</h3>
                <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-xs">Coming Soon</span>
              </div>
              <p className="text-sm text-gray-300 mt-2">
                Get AI-powered market predictions and trading recommendations based on historical data and current trends.
              </p>
            </div>
            
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">Custom Trading Algorithms</h3>
                <span className="px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-xs">Coming Soon</span>
              </div>
              <p className="text-sm text-gray-300 mt-2">
                Create and backtest your own trading algorithms with our intuitive algorithm builder.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
          <div className="flex items-center space-x-2 mb-6">
            <BookOpen className="h-6 w-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Reference Center</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/learn" className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover:bg-slate-700 transition-colors">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="h-4 w-4 text-indigo-400" />
                <h3 className="font-medium text-white">Educational Resources</h3>
              </div>
              <p className="text-sm text-gray-300">
                Learn about comic investing, trading strategies, and market analysis.
              </p>
            </Link>
            
            <Link to="/market-index" className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover:bg-slate-700 transition-colors">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart2 className="h-4 w-4 text-indigo-400" />
                <h3 className="font-medium text-white">Market Analysis Tools</h3>
              </div>
              <p className="text-sm text-gray-300">
                Access advanced market analysis tools and historical data.
              </p>
            </Link>
            
            <Link to="/trading" className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover:bg-slate-700 transition-colors">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-indigo-400" />
                <h3 className="font-medium text-white">Trading Guides</h3>
              </div>
              <p className="text-sm text-gray-300">
                Step-by-step guides for different trading strategies.
              </p>
            </Link>
            
            <Link to="/learn" className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover:bg-slate-700 transition-colors">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-4 w-4 text-indigo-400" />
                <h3 className="font-medium text-white">Achievement Tracking</h3>
              </div>
              <p className="text-sm text-gray-300">
                Track your progress and earn achievements as you master trading.
              </p>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Notifications */}
      {showNotifications && <NewsNotification autoHide={true} hideDelay={8000} />}
    </div>
  );
}

export default FinancialDashboard;