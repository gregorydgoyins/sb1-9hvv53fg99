import React from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { TradingJournal } from '../../components/portfolio/TradingJournal';
import { BookOpen } from 'lucide-react';

export function TradingJournalPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Trading Journal' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-8 w-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">Trading Journal</h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl mb-6">
        <p className="text-gray-300">
          Your trading journal helps you track and analyze your trading decisions, strategies, and performance over time.
          Record your thoughts, emotions, and rationale for each trade to identify patterns and improve your trading strategy.
        </p>
      </div>
      
      <TradingJournal showFilters={true} showAnalytics={true} />
    </div>
  );
}

export default TradingJournalPage;