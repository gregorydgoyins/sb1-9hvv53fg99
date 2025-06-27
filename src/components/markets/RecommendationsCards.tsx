import React from 'react';
import { TrendingUp, Shield, BarChart2, Star, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PieChart as RechartsPieChart } from 'recharts'; // Renamed to avoid conflict

interface RecommendationsCardsProps {
  className?: string;
}

export function RecommendationsCards({ className = '' }: RecommendationsCardsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {/* Top Buy Recommendation */}
      <div className="bg-green-900/20 rounded-xl p-5 border border-green-700/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all hover:-translate-y-1">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="h-5 w-5 text-green-400" />
          <h3 className="font-semibold text-white">Top Buy Recommendation</h3>
        </div>
        
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-slate-800/70 rounded-full p-2">
            <Star className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h4 className="font-medium text-white">Amazing Spider-Man #300</h4>
            <p className="text-sm text-gray-300">ASM300 • Character</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-300 mb-3">
          Strong buy signal based on upcoming Venom movie announcements and increasing collector interest.
        </p>
        
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-gray-400">Current Price:</span>
          <span className="text-white">CC 2,500</span>
        </div>
        
        <div className="flex justify-between items-center text-sm mb-4">
          <span className="text-gray-400">Target Price:</span>
          <span className="text-green-400">CC 3,200</span>
        </div>
        
        <Link 
          to="/trading/ASM300"
          className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg transition-colors"
        >
          Trade Now
        </Link>
      </div>
      
      {/* Diversification Tip */}
      <div className="bg-indigo-900/20 rounded-xl p-5 border border-indigo-700/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all hover:-translate-y-1">
        <div className="flex items-center space-x-2 mb-3">
          <BarChart2 className="h-5 w-5 text-indigo-400" />
          <h3 className="font-semibold text-white">Diversification Tip</h3>
        </div>
        
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-slate-800/70 rounded-full p-2">
            <RechartsPieChart className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h4 className="font-medium text-white">Golden Age Comics</h4>
            <p className="text-sm text-gray-300">Portfolio Allocation</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-300 mb-3">
          Your portfolio is underweight in Golden Age comics. Consider adding exposure to this stable, historically significant segment.
        </p>
        
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-gray-400">Current Allocation:</span>
          <span className="text-white">5%</span>
        </div>
        
        <div className="flex justify-between items-center text-sm mb-4">
          <span className="text-gray-400">Recommended:</span>
          <span className="text-indigo-400">15-20%</span>
        </div>
        
        <Link 
          to="/funds/GAPF"
          className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 rounded-lg transition-colors"
        >
          Explore Golden Age Funds
        </Link>
      </div>
      
      {/* Risk Alert */}
      <div className="bg-yellow-900/20 rounded-xl p-5 border border-yellow-700/30 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all hover:-translate-y-1">
        <div className="flex items-center space-x-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <h3 className="font-semibold text-white">Risk Alert</h3>
        </div>
        
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-slate-800/70 rounded-full p-2">
            <Shield className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h4 className="font-medium text-white">Options Exposure</h4>
            <p className="text-sm text-gray-300">Portfolio Risk</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-300 mb-3">
          Your options positions represent 25% of your portfolio, exceeding the recommended maximum of 15% for your risk profile.
        </p>
        
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-gray-400">Current Exposure:</span>
          <span className="text-yellow-400">25%</span>
        </div>
        
        <div className="flex justify-between items-center text-sm mb-4">
          <span className="text-gray-400">Recommended Max:</span>
          <span className="text-white">15%</span>
        </div>
        
        <Link 
          to="/portfolio/analytics"
          className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white text-center py-2 rounded-lg transition-colors"
        >
          Review Risk Profile
        </Link>
      </div>
    </div>
  );
}

export default RecommendationsCards;