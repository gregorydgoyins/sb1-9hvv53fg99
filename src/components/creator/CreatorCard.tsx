import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Star, Award, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CreatorCardProps {
  creator: {
    id: string;
    name: string;
    symbol: string;
    role: string;
    age: number;
    price: number;
    change: number;
    percentageChange: number;
    marketCap: number;
    volume: number;
    rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
    nextProject?: string;
    recentWorks: string[];
    yearsActive: number;
    awards: number;
    popularity: number;
    avatar?: string;
  };
  onSelect?: (id: string) => void;
  isSelected?: boolean;
}

export function CreatorCard({ creator, onSelect, isSelected }: CreatorCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Strong Buy':
        return 'bg-green-900/50 text-green-200 border-green-700/50';
      case 'Buy':
        return 'bg-emerald-900/50 text-emerald-200 border-emerald-700/50';
      case 'Hold':
        return 'bg-yellow-900/50 text-yellow-200 border-yellow-700/50';
      case 'Sell':
        return 'bg-red-900/50 text-red-200 border-red-700/50';
      default:
        return 'bg-gray-900/50 text-gray-200 border-gray-700/50';
    }
  };

  return (
    <div
      onClick={() => onSelect && onSelect(creator.id)}
      className={`group relative bg-slate-800/90 backdrop-blur-md rounded-xl p-5 sm:p-6 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all hover:-translate-y-1 cursor-pointer touch-target
        ${isSelected ? 'shadow-[0_0_15px_rgba(255,255,0,0.9)]' : ''}`}
    >
      {/* Creator Header */}
      <div className="flex items-start space-x-4 mb-5">
        <div className="relative">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-slate-600"
          />
          <div className="absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-1">
            <Star className="h-4 w-4 text-yellow-400" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white text-lg">{creator.name}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-sm text-gray-400">{creator.symbol} • {creator.role}</p>
            <span className="text-sm text-indigo-400 font-medium">{creator.age} years old</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRatingColor(creator.rating)}`}>
              {creator.rating}
            </span>
            <div className="flex items-center space-x-1">
              <Award className="h-3 w-3 text-yellow-400" />
              <span className="text-xs text-gray-400">{creator.awards} awards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Price and Change */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm text-gray-400">Current Price</p>
          <p className="text-xl font-bold text-white">CC {creator.price.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1">
            {creator.change > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span className={`font-semibold ${
              creator.change > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {creator.change > 0 ? '+' : ''}{creator.percentageChange}%
            </span>
          </div>
          <p className="text-sm text-gray-400">
            {creator.change > 0 ? '+' : ''}CC {creator.change.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <p className="text-sm text-gray-400">Market Cap</p>
          <p className="font-semibold text-white">CC {(creator.marketCap / 1000000).toFixed(1)}M</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Volume</p>
          <p className="font-semibold text-white">{creator.volume.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Years Active</p>
          <p className="font-semibold text-white">{creator.yearsActive}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Age</p>
          <p className="font-semibold text-white">{creator.age}</p>
        </div>
      </div>

      {/* Recent Works with Tooltip */}
      <div 
        className="mb-5 relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <p className="text-sm text-gray-400 mb-2">Recent Works</p>
        <div className="flex flex-wrap gap-1">
          {creator.recentWorks.slice(0, 2).map((work, index) => (
            <span key={index} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-gray-300">
              {work}
            </span>
          ))}
          {creator.recentWorks.length > 2 && (
            <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-gray-400">
              +{creator.recentWorks.length - 2} more
            </span>
          )}
        </div>
        
        {showTooltip && (
          <div className="absolute z-10 bottom-0 left-1/2 transform translate-y-full -translate-x-1/2 w-64 bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-700 mt-2">
            <p className="text-sm text-white font-medium mb-2">Latest Projects</p>
            <ul className="space-y-1">
              {creator.recentWorks.map((work, index) => (
                <li key={index} className="text-xs text-gray-300">• {work}</li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 mt-2">Links will be active upon comic uploads.</p>
          </div>
        )}
      </div>

      {/* Next Project */}
      {creator.nextProject && (
        <div className="mb-5 bg-indigo-900/30 rounded-lg p-3 border border-indigo-700/30">
          <p className="text-sm text-indigo-200">
            <span className="font-medium">Next Project:</span> {creator.nextProject}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Link
          to={`/creator-stock/${creator.symbol}`}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center touch-target"
        >
          View Details
        </Link>
        <Link
          to={`/trading/${creator.symbol}`}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center touch-target"
        >
          Trade
        </Link>
      </div>
    </div>
  );
}

export default CreatorCard;