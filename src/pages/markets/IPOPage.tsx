import React from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { IPOAnnouncements } from '../../components/markets/IPOAnnouncements';
import { TrendingUp } from 'lucide-react';

export function IPOPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Markets', path: '/markets' },
        { name: 'IPO Announcements' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-8 w-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">IPO Announcements</h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl mb-6">
        <p className="text-gray-300">
          Initial Public Offerings (IPOs) represent the first time a comic asset becomes available for public trading. 
          These offerings provide early access to potentially valuable assets but come with varying levels of risk. 
          Monitor upcoming IPOs, add them to your watchlist, and prepare your trading strategy accordingly.
        </p>
      </div>
      
      <IPOAnnouncements showFilters={true} />
    </div>
  );
}

export default IPOPage;