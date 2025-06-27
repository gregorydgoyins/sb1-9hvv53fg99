import React from 'react';
import { Link } from 'react-router-dom';
import { MarketOverview } from './MarketOverview';
import { MarketMetrics } from './MarketMetrics';
import { TrendingStocks } from './TrendingStocks';
import { MarketActivity } from './MarketActivity';
import { MarketSentiment } from './MarketSentiment';
import { BarChart2, LineChart, Newspaper, TrendingUp, Calendar } from 'lucide-react';
import { ComicMarketIndexGlow } from './ComicMarketIndexGlow';
import { NewsAnalysis } from './NewsAnalysis';
import { NewsFeed } from './news/NewsFeed';
import { Breadcrumbs } from './common/Breadcrumbs';

export function Markets() {
  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <h1 className="heading-responsive text-white mb-6">Markets</h1>
      
      {/* Featured Market Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <Link 
          to="/market-index"
          className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all hover:-translate-y-1 touch-target"
        >
          <div className="flex items-center space-x-3 mb-4">
            <BarChart2 className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-400" />
            <h2 className="subheading-responsive text-white">Market Index</h2>
          </div>
          <p className="text-gray-300 mb-4 text-responsive">Track the overall comic market performance with our comprehensive index spanning all comic book eras.</p>
          <div className="text-indigo-400 font-medium">View Market Index →</div>
        </Link>
        
        <Link 
          to="/price-trends"
          className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all hover:-translate-y-1 touch-target"
        >
          <div className="flex items-center space-x-3 mb-4">
            <LineChart className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-400" />
            <h2 className="subheading-responsive text-white">Price Trends</h2>
          </div>
          <p className="text-gray-300 mb-4 text-responsive">Analyze price trends for key comic books across different eras, with historical data and event impact analysis.</p>
          <div className="text-indigo-400 font-medium">View Price Trends →</div>
        </Link>
      </div>
      
      {/* Market Index Chart */}
      <ComicMarketIndexGlow />
      
      {/* News Analysis */}
      <div className="mb-6">
        <NewsAnalysis 
          title="Market News Impact Analysis" 
          showSourceBreakdown={true} 
          showSentimentAnalysis={true} 
          showKeywordAnalysis={true}
        />
      </div>
      
      {/* Three-column layout for market data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MarketOverview />
          <MarketMetrics />
          <MarketSentiment />
          <TrendingStocks />
        </div>
        <div className="space-y-6">
          <MarketActivity />
          
          {/* Latest News Section */}
          <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Newspaper className="h-6 w-6 text-indigo-400" />
                <h2 className="text-xl font-bold text-white">Latest News</h2>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Market Impact</span>
              </div>
            </div>
            
            <NewsFeed maxItems={3} showFilters={false} compact={true} />
            
            <div className="mt-4 text-center">
              <Link 
                to="/news"
                className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Newspaper className="h-5 w-5" />
                <span>View All News</span>
              </Link>
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="h-6 w-6 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Market Calendar</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-white">Comic-Con International</h3>
                  <span className="text-xs text-indigo-400">High Impact</span>
                </div>
                <p className="text-sm text-gray-400 mb-1">July 21-24, 2025</p>
                <p className="text-sm text-gray-300">Major announcements expected from Marvel and DC</p>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-white">Marvel Q2 Earnings</h3>
                  <span className="text-xs text-yellow-400">Medium Impact</span>
                </div>
                <p className="text-sm text-gray-400 mb-1">August 5, 2025</p>
                <p className="text-sm text-gray-300">Financial results and future projections</p>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-white">Heritage Comics Auction</h3>
                  <span className="text-xs text-indigo-400">High Impact</span>
                </div>
                <p className="text-sm text-gray-400 mb-1">August 12-14, 2025</p>
                <p className="text-sm text-gray-300">Several key Golden Age comics up for auction</p>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link 
                to="/market-calendar"
                className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Calendar className="h-5 w-5" />
                <span>View Full Calendar</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default { Markets };