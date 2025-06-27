import React from 'react';
import { Link } from 'react-router-dom';
import { MarketOverview } from './MarketOverview';
import { Portfolio } from './Portfolio';
import { TrendingStocks } from './TrendingStocks';
import { MarketChart } from './MarketChart';
import { TrendingUp, BookOpen, Wallet, BarChart2, Newspaper, Calendar, Building2, Briefcase, Users } from 'lucide-react';
import { NewsFeed } from './news/NewsFeed';
import { NewsAnalysis } from './NewsAnalysis';
import { ComicMarketIndexGlow } from './ComicMarketIndexGlow';
import { RecommendationsCards } from './markets/RecommendationsCards';
import { IPOAnnouncements } from './markets/IPOAnnouncements';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="hero-card p-6 sm:p-8 text-white rounded-xl mb-8">
        {/* Centered heading and tagline */}
        <div className="text-center mb-8">
          <h1 className="heading-responsive mb-4">Welcome to Panel Profits</h1>
          <p className="text-responsive text-white/80 mb-8 max-w-4xl mx-auto">
            YOUR GATEWAY TO THE HOME OF THE COMIC BOOK STOCK EXCHANGE
          </p>
        </div>
        
        {/* Contrasting Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Start Trading - Bright Green for High Contrast */}
          <Link 
            to="/trading"
            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-responsive
                     bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400
                     text-white shadow-lg hover:shadow-xl
                     transition-all duration-300 ease-out transform hover:-translate-y-1 active:translate-y-0
                     focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900
                     w-full sm:w-auto min-w-[200px] overflow-hidden touch-target"
            aria-label="Navigate to trading interface to start buying and selling comic assets"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
              <span>Start Trading</span>
            </span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          </Link>

          {/* Learn More - Bright Orange for High Contrast */}
          <Link 
            to="/learn"
            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-responsive
                     bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400
                     text-white shadow-lg hover:shadow-xl
                     transition-all duration-300 ease-out transform hover:-translate-y-1 active:translate-y-0
                     focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-900
                     w-full sm:w-auto min-w-[200px] overflow-hidden touch-target"
            aria-label="Navigate to learning center for tutorials and educational content"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
              <span>Learn More</span>
            </span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          </Link>

          {/* Financial Dashboard - Purple for High Contrast */}
          <Link 
            to="/financial-dashboard"
            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-responsive
                     bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400
                     text-white shadow-lg hover:shadow-xl
                     transition-all duration-300 ease-out transform hover:-translate-y-1 active:translate-y-0
                     focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900
                     w-full sm:w-auto min-w-[200px] overflow-hidden touch-target"
            aria-label="Navigate to financial dashboard to view comprehensive market data"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <BarChart2 className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
              <span>Financial Dashboard</span>
            </span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          </Link>
        </div>
      </div>

      {/* Recommendations Cards */}
      <RecommendationsCards />

      {/* Asset Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link 
          to="/assets/characters"
          className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all hover:-translate-y-1"
        >
          <div className="flex items-center space-x-2 mb-3">
            <Users className="h-5 w-5 text-indigo-400" />
            <h3 className="font-semibold text-white">Characters</h3>
          </div>
          <p className="text-sm text-gray-300 mb-2">Invest in iconic heroes, villains, and supporting characters.</p>
          <span className="text-xs text-indigo-400">Browse Characters →</span>
        </Link>
        
        <Link 
          to="/assets/locations"
          className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all hover:-translate-y-1"
        >
          <div className="flex items-center space-x-2 mb-3">
            <Building2 className="h-5 w-5 text-indigo-400" />
            <h3 className="font-semibold text-white">Locations</h3>
          </div>
          <p className="text-sm text-gray-300 mb-2">Explore headquarters, hideouts, and iconic comic locations.</p>
          <span className="text-xs text-indigo-400">Browse Locations →</span>
        </Link>
        
        <Link 
          to="/assets/gadgets"
          className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all hover:-translate-y-1"
        >
          <div className="flex items-center space-x-2 mb-3">
            <Briefcase className="h-5 w-5 text-indigo-400" />
            <h3 className="font-semibold text-white">Gadgets</h3>
          </div>
          <p className="text-sm text-gray-300 mb-2">Invest in iconic tools, weapons, and superhero technology.</p>
          <span className="text-xs text-indigo-400">Browse Gadgets →</span>
        </Link>
        
        <Link 
          to="/assets/publishers"
          className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all hover:-translate-y-1"
        >
          <div className="flex items-center space-x-2 mb-3">
            <Building2 className="h-5 w-5 text-indigo-400" />
            <h3 className="font-semibold text-white">Publishers</h3>
          </div>
          <p className="text-sm text-gray-300 mb-2">Invest in the companies behind your favorite comics.</p>
          <span className="text-xs text-indigo-400">Browse Publishers →</span>
        </Link>
      </div>

      {/* Market Overview and News Analysis in a 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <MarketOverview />
        <NewsAnalysis 
          title="News Impact Analysis" 
          showSourceBreakdown={false} 
          showSentimentAnalysis={true} 
          showKeywordAnalysis={false}
          maxKeywords={5}
        />
      </div>
      
      {/* Market Chart spanning full width */}
      <ComicMarketIndexGlow />

      {/* IPO Announcements */}
      <IPOAnnouncements maxItems={3} showFilters={false} compact={true} />

      {/* 3-column layout for main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* First column: Portfolio and Trending Stocks */}
        <div className="space-y-6">
          <Portfolio />
          <TrendingStocks />
        </div>
        
        {/* Second column: News Feed */}
        <div className="space-y-6">
          <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Newspaper className="h-6 w-6 text-indigo-400" />
                <h2 className="text-2xl font-bold text-white">Latest News</h2>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Real-time updates</span>
              </div>
            </div>
            <NewsFeed maxItems={7} showFilters={false} compact={true} />
          </div>
        </div>
        
        {/* Third column: Market Insights */}
        <div className="space-y-6">
          <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <div className="flex items-center space-x-2 mb-6">
              <BarChart2 className="h-6 w-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">Market Insights</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-2">Today's Highlights</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Marvel sector up 3.2% on new movie announcements</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Golden Age comics showing strong momentum</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Wallet className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>Creator bonds offering attractive yields</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-2">Upcoming Events</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start space-x-2">
                    <Calendar className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white">Comic-Con International</p>
                      <p className="text-xs text-gray-400">July 21-24, 2025</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Calendar className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white">Marvel Q2 Earnings</p>
                      <p className="text-xs text-gray-400">August 5, 2025</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Calendar className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white">Heritage Comics Auction</p>
                      <p className="text-xs text-gray-400">August 12-14, 2025</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/30">
                <h3 className="font-medium text-white mb-2">Trading Recommendations</h3>
                <ul className="space-y-2 text-sm text-indigo-200">
                  <li className="flex items-start space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Consider increasing exposure to creator bonds</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Look for opportunities in undervalued Silver Age comics</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Hedge portfolio with protective puts on volatile assets</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link 
                to="/financial-dashboard"
                className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <BarChart2 className="h-5 w-5" />
                <span>View Full Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}