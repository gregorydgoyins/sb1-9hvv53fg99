import React, { useState } from 'react';
import { Users, TrendingUp, TrendingDown, Star, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CreatorStockWidgetProps {
  maxItems?: number;
  showHeader?: boolean;
  compact?: boolean;
  filter?: {
    role?: string;
    rating?: string;
  };
  className?: string;
}

export function CreatorStockWidget({
  maxItems = 3,
  showHeader = true,
  compact = false,
  filter,
  className = ''
}: CreatorStockWidgetProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const mockCreatorStocks = [
    {
      id: '1',
      name: 'Todd McFarlane',
      symbol: 'TMFS',
      role: 'Artist/Writer',
      price: 2500.00,
      change: 125.00,
      percentageChange: 5.2,
      nextProject: 'Spawn #350',
      rating: 'Strong Buy'
    },
    {
      id: '2',
      name: 'Donny Cates',
      symbol: 'DCTS',
      role: 'Writer',
      price: 1800.00,
      change: 85.00,
      percentageChange: 4.9,
      nextProject: 'Marvel Exclusive',
      rating: 'Buy'
    },
    {
      id: '3',
      name: 'Stanley Lau',
      symbol: 'ARTS',
      role: 'Cover Artist',
      price: 1500.00,
      change: -25.00,
      percentageChange: -1.6,
      nextProject: 'DC Variants',
      rating: 'Hold'
    },
    {
      id: '4',
      name: 'Jim Lee',
      symbol: 'JLES',
      role: 'Artist/Executive',
      price: 3200.00,
      change: 160.00,
      percentageChange: 5.3,
      nextProject: 'Justice League Redesign',
      rating: 'Strong Buy'
    }
  ];

  // Apply filters if provided
  const filteredStocks = mockCreatorStocks
    .filter(stock => {
      if (filter?.role && stock.role !== filter.role) return false;
      if (filter?.rating && stock.rating !== filter.rating) return false;
      return true;
    })
    .slice(0, maxItems);

  return (
    <div className={`bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl ${className}`}>
      {showHeader && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Creator Stocks</h2>
          </div>
          <Link to="/creators" className="text-indigo-400 hover:text-indigo-300 text-sm">
            View All →
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {filteredStocks.map((stock) => (
          <div 
            key={stock.id} 
            className={`bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all hover:-translate-y-1 cursor-pointer touch-target
              ${selectedCard === stock.id ? 'shadow-[0_0_15px_rgba(255,255,0,0.9)]' : ''}`}
            onClick={() => setSelectedCard(selectedCard === stock.id ? null : stock.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-white text-lg">{stock.name}</h3>
                <p className="text-sm text-gray-300">{stock.symbol} • {stock.role}</p>
              </div>
              <span className={`badge ${
                stock.rating === 'Strong Buy' ? 'badge-positive' :
                stock.rating === 'Buy' ? 'bg-emerald-900/50 text-emerald-200 border border-emerald-700/50' :
                stock.rating === 'Hold' ? 'bg-yellow-900/50 text-yellow-200 border border-yellow-700/50' :
                'bg-red-900/50 text-red-200 border border-red-700/50'
              }`}>
                {stock.rating}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-400">Price</p>
                <p className="font-semibold text-white">CC {stock.price.toLocaleString()}</p>
              </div>
              <div className="hide-on-mobile">
                <p className="text-sm text-gray-400">Change</p>
                <div className="flex items-center space-x-1">
                  {stock.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <p className={`font-semibold ${
                    stock.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stock.change > 0 ? '+' : ''}{stock.percentageChange}%
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">Value</p>
                <p className={`font-semibold ${
                  stock.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stock.change > 0 ? '+' : ''}CC {stock.change}
                </p>
              </div>
            </div>

            {stock.nextProject && !compact && (
              <div className="mt-4 bg-indigo-900/50 rounded-lg p-2 border border-indigo-700/50">
                <p className="text-sm text-indigo-200">Next Project: {stock.nextProject}</p>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <Link
                to={`/creator/${stock.symbol}`}
                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors touch-target"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredStocks.length === 0 && (
        <div className="text-center py-6">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-400">No creator stocks available</p>
        </div>
      )}
    </div>
  );
}

export default CreatorStockWidget;