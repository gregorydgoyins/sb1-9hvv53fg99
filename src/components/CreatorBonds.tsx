import React, { useState } from 'react';
import { Users, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CreatorBonds() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const mockCreatorStocks = [
    {
      id: '1',
      name: 'Todd McFarlane',
      symbol: 'TMFS',
      role: 'Artist/Writer',
      price: 2500.00,
      change: 125.00,
      nextProject: 'Spawn #350',
      rating: 'Strong Buy',
      marketCap: 125000000
    },
    {
      id: '2',
      name: 'Donny Cates',
      symbol: 'DCTS',
      role: 'Writer',
      price: 1800.00,
      change: 85.00,
      nextProject: 'Marvel Exclusive',
      rating: 'Buy',
      marketCap: 90000000
    },
    {
      id: '3',
      name: 'Stanley Lau',
      symbol: 'ARTS',
      role: 'Cover Artist',
      price: 1500.00,
      change: -25.00,
      nextProject: 'DC Variants',
      rating: 'Hold',
      marketCap: 75000000
    }
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400" />
          <h2 className="subheading-responsive text-white">Creator Stocks</h2>
        </div>
        <select className="bg-slate-700 text-white text-sm border-slate-600 rounded-lg px-3 py-2 touch-target">
          <option>All Roles</option>
          <option>Writers</option>
          <option>Artists</option>
          <option>Cover Artists</option>
        </select>
      </div>

      <div className="space-y-4">
        {mockCreatorStocks.map((stock) => (
          <div 
            key={stock.id} 
            className={`bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 hover-lift cursor-pointer touch-target
              ${selectedCard === stock.id ? 'card-selected' : 'card-glow-yellow'}`}
            onClick={() => setSelectedCard(selectedCard === stock.id ? null : stock.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-responsive text-white">{stock.name}</h3>
                <p className="text-sm text-gray-300">{stock.symbol} • {stock.role}</p>
              </div>
              <span className={`badge ${
                stock.rating === 'Strong Buy' ? 'badge-positive' :
                stock.rating === 'Buy' ? 'bg-emerald-900 text-emerald-200 border border-emerald-700/50' :
                'badge-neutral'
              }`}>
                {stock.rating}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-400">Price</p>
                <p className="font-semibold text-white text-responsive">CC {stock.price.toLocaleString()}</p>
              </div>
              <div className="hide-on-mobile">
                <p className="text-sm text-gray-400">Market Cap</p>
                <p className="font-semibold text-white text-responsive">CC {(stock.marketCap / 1000000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Change</p>
                <div className="flex items-center space-x-1">
                  {stock.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <p className={`font-semibold text-responsive ${
                    stock.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stock.change > 0 ? '+' : ''}{stock.change}
                  </p>
                </div>
              </div>
            </div>

            {stock.nextProject && (
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
    </div>
  );
}