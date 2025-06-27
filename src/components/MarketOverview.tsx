import React, { useState } from 'react';
import { Activity, TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import { useMarketStore } from '../store/marketStore';
import { Link } from 'react-router-dom';

export function MarketOverview() {
  const { marketIndex, volatility, distribution } = useMarketStore();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const marketSentiment = marketIndex > 3000000 
    ? { status: 'bullish', color: 'text-green-400' }
    : { status: 'bearish', color: 'text-red-400' };

  return (
    <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl">
      {/* Header remains the same */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400" />
          <h2 className="subheading-responsive text-white">Market Conditions</h2>
        </div>
        <div className={`flex items-center space-x-2 ${marketSentiment.color}`}>
          {marketSentiment.status === 'bullish' ? (
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
          <span className="font-medium capitalize text-responsive">{marketSentiment.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Market Index Card */}
        <div 
          onClick={() => setSelectedCard(selectedCard === 'index' ? null : 'index')}
          className={`group relative bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover-lift cursor-pointer touch-target
            ${selectedCard === 'index' ? 'card-selected' : 'card-glow-yellow'}`}
        >
          <div className="relative">
            <p className="text-sm text-gray-400">Index Value</p>
            <p className="text-lg sm:text-xl font-bold text-white">CC {marketIndex.toLocaleString()}</p>
            <Link 
              to="/market-index" 
              className="absolute inset-0 z-10"
              aria-label="View market index details"
            ></Link>
          </div>
        </div>

        {/* 24h Volume Card */}
        <div 
          onClick={() => setSelectedCard(selectedCard === 'volume' ? null : 'volume')}
          className={`group relative bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover-lift cursor-pointer touch-target
            ${selectedCard === 'volume' ? 'card-selected' : 'card-glow-yellow'}`}
        >
          <div className="relative">
            <p className="text-sm text-gray-400">24h Volume</p>
            <p className="text-lg sm:text-xl font-bold text-white">CC 12.5M</p>
          </div>
        </div>

        {/* Volatility Card */}
        <div 
          onClick={() => setSelectedCard(selectedCard === 'volatility' ? null : 'volatility')}
          className={`group relative bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover-lift cursor-pointer touch-target
            ${selectedCard === 'volatility' ? 'card-selected' : 'card-glow-yellow'}`}
        >
          <div className="relative">
            <p className="text-sm text-gray-400">Volatility</p>
            <p className="text-lg sm:text-xl font-bold text-white">
              {volatility < 0.4 ? 'Low' : volatility < 0.7 ? 'Medium' : 'High'}
            </p>
          </div>
        </div>
      </div>

      {/* Market Movers Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
        {/* Top Gainers */}
        <div 
          onClick={() => setSelectedCard(selectedCard === 'gainers' ? null : 'gainers')}
          className={`group relative bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover-lift cursor-pointer touch-target
            ${selectedCard === 'gainers' ? 'card-selected' : 'card-glow-yellow'}`}
        >
          <div className="relative">
            <h3 className="text-responsive font-semibold text-white mb-4">Top Gainers</h3>
            <div className="space-y-2">
              {[
                { name: 'Amazing Spider-Man #300', change: '+5.2%' },
                { name: 'Batman #457', change: '+3.8%' },
                { name: 'X-Men #141', change: '+2.9%' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm sm:text-base">{item.name}</span>
                  <span className="text-green-400 text-sm sm:text-base">{item.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Losers */}
        <div 
          onClick={() => setSelectedCard(selectedCard === 'losers' ? null : 'losers')}
          className={`group relative bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover-lift cursor-pointer touch-target
            ${selectedCard === 'losers' ? 'card-selected' : 'card-glow-yellow'}`}
        >
          <div className="relative">
            <h3 className="text-responsive font-semibold text-white mb-4">Market Laggards</h3>
            <div className="space-y-2">
              {[
                { name: 'Spawn #1', change: '-2.1%' },
                { name: 'Detective Comics #27', change: '-1.8%' },
                { name: 'Fantastic Four #48', change: '-1.5%' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm sm:text-base">{item.name}</span>
                  <span className="text-red-400 text-sm sm:text-base">{item.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* View Full Market Index button */}
      <div className="mt-6 text-center">
        <Link 
          to="/market-index"
          className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors touch-target"
        >
          <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-responsive">View Full Market Index</span>
        </Link>
      </div>
    </div>
  );
}