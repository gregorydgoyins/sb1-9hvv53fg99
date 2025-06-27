import React from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Watchlist } from '../../components/portfolio/Watchlist';
import { Star } from 'lucide-react';

export function WatchlistPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Watchlist' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Star className="h-8 w-8 text-yellow-400" />
          <h1 className="text-3xl font-bold text-white">Watchlist</h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl mb-6">
        <p className="text-gray-300">
          Your watchlist helps you track assets you're interested in without adding them to your portfolio. 
          Set price alerts, add notes, and quickly access trading when you're ready to make a move.
        </p>
      </div>
      
      <Watchlist showFilters={true} />
    </div>
  );
}

export default WatchlistPage;