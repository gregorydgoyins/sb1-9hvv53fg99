import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

export function TrendingStocks() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const mockTrendingStocks = [
    {
      id: '1',
      name: 'Amazing Spider-Man #300',
      price: 2500,
      change: 5.2,
      trend: 'up'
    },
    {
      id: '2',
      name: 'Batman #457',
      price: 1800,
      change: -2.5,
      trend: 'down'
    },
    {
      id: '3',
      name: 'X-Men #141',
      price: 3200,
      change: 3.8,
      trend: 'up'
    },
    {
      id: '4',
      name: 'Spawn #1',
      price: 1200,
      change: 4.5,
      trend: 'up'
    },
    {
      id: '5',
      name: 'Fantastic Four #48',
      price: 2800,
      change: -1.8,
      trend: 'down'
    },
    {
      id: '6',
      name: 'Incredible Hulk #181',
      price: 3500,
      change: 2.9,
      trend: 'up'
    },
    {
      id: '7',
      name: 'Detective Comics #27',
      price: 5200,
      change: 1.5,
      trend: 'up'
    },
    {
      id: '8',
      name: 'Action Comics #1',
      price: 4800,
      change: -0.8,
      trend: 'down'
    }
  ];

  return (
    <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400" />
          <h2 className="subheading-responsive text-white">Trending Comics</h2>
        </div>
        <select className="bg-slate-700 text-white text-sm border-slate-600 rounded-lg px-3 py-2 touch-target">
          <option>All Types</option>
          <option>Golden Age</option>
          <option>Silver Age</option>
          <option>Bronze Age</option>
          <option>Modern Age</option>
        </select>
      </div>

      <div className="space-y-4">
        {mockTrendingStocks.map((stock) => (
          <div 
            key={stock.id} 
            onClick={() => setSelectedCard(selectedCard === stock.id ? null : stock.id)}
            className={`group relative bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 hover-lift cursor-pointer touch-target
              ${selectedCard === stock.id ? 'card-selected' : 'card-glow-yellow'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  stock.trend === 'up' ? 'bg-green-900/50 border border-green-700/50' : 'bg-red-900/50 border border-red-700/50'
                }`}>
                  {stock.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-responsive">{stock.name}</h3>
                  <p className="text-sm text-gray-400">CC {stock.price.toLocaleString()}</p>
                </div>
              </div>
              <div className={`flex items-center text-responsive ${
                stock.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stock.trend === 'up' ? '+' : ''}{stock.change}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}