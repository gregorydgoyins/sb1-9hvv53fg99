import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { MarketOverview } from '../components/MarketOverview';
import { MarketMetrics } from '../components/MarketMetrics';
import { MarketSentiment } from '../components/MarketSentiment';
import { MarketActivity } from '../components/MarketActivity';
import { ComicMarketIndexGlow } from '../components/ComicMarketIndexGlow';
import { TrendingStocks } from '../components/TrendingStocks';
import { MarketCalendar } from '../components/markets/MarketCalendar';
import { IPOAnnouncements } from '../components/markets/IPOAnnouncements';
import { RecommendationsCards } from '../components/markets/RecommendationsCards';
import { NewsFeed } from '../components/news/NewsFeed';
import { Link } from 'react-router-dom';
import { BarChart2, Calendar, LineChart, TrendingUp, Newspaper } from 'lucide-react';

export function MarketsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[{ name: 'Markets' }]} />
      
      <div className="flex items-center justify-between">
        <h1 className="heading-responsive text-white">Market Hub</h1>
        <div className="flex items-center space-x-2 text-gray-400">
          <Calendar className="h-5 w-5" />
          <span className="text-sm">Real-time data</span>
        </div>
      </div>
      
      {/* Recommendations Cards */}
      <RecommendationsCards />
      
      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
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
          <p className="text-gray-300 mb-4 text-responsive">Analyze price trends for key comics across different eras, with historical data and event impact analysis.</p>
          <div className="text-indigo-400 font-medium">View Price Trends →</div>
        </Link>
        
        <Link 
          to="/market-calendar"
          className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all hover:-translate-y-1 touch-target"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-400" />
            <h2 className="subheading-responsive text-white">Market Calendar</h2>
          </div>
          <p className="text-gray-300 mb-4 text-responsive">Track upcoming events that may impact asset prices, from comic releases to movie premieres.</p>
          <div className="text-indigo-400 font-medium">View Calendar →</div>
        </Link>
      </div>
      
      {/* Market Overview */}
      <MarketOverview />
      
      {/* Comic Market Index */}
      <ComicMarketIndexGlow />
      
      {/* IPO Announcements */}
      <IPOAnnouncements maxItems={5} showFilters={true} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MarketMetrics />
          <MarketSentiment />
          <TrendingStocks />
        </div>
        <div className="space-y-6">
          <MarketActivity />
          <MarketCalendar maxEvents={3} showFilters={false} compact={true} />
          
          {/* Latest News */}
          <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Newspaper className="h-6 w-6 text-indigo-400" />
                <h2 className="text-xl font-bold text-white">Latest News</h2>
              </div>
              <Link to="/news" className="text-indigo-400 hover:text-indigo-300 text-sm">
                View All →
              </Link>
            </div>
            
            <NewsFeed maxItems={3} showFilters={false} compact={true} />
          </div>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Ready to start trading?</h2>
            <p className="text-white/90">Explore our comprehensive trading platform with advanced tools and analytics.</p>
          </div>
          <Link 
            to="/trading"
            className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Start Trading</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MarketsPage;