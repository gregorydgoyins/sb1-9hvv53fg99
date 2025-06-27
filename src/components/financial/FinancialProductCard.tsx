import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Star, Award, Calendar, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Bond, Fund, Creator } from '../../types';

interface FinancialProductCardProps {
  product: Bond | Fund | Creator;
  type: 'bond' | 'fund' | 'creator';
  onSelect?: (id: string) => void;
  isSelected?: boolean;
}

export function FinancialProductCard({ product, type, onSelect, isSelected }: FinancialProductCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Common properties across all financial products
  const id = product.id;
  const name = product.name;
  const symbol = product.symbol;
  const price = 'price' in product ? product.price : ('nav' in product ? product.nav : 0);
  const change = product.change;
  const percentageChange = product.percentageChange;

  // Get rating color for bonds and creators
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Strong Buy':
      case 'AAA':
      case 'AA':
        return 'bg-green-900/50 text-green-200 border-green-700/50';
      case 'Buy':
      case 'A':
        return 'bg-emerald-900/50 text-emerald-200 border-emerald-700/50';
      case 'Hold':
      case 'BBB':
      case 'BB':
        return 'bg-yellow-900/50 text-yellow-200 border-yellow-700/50';
      case 'Sell':
      case 'B':
      case 'CCC':
      case 'CC':
      case 'C':
      case 'D':
        return 'bg-red-900/50 text-red-200 border-red-700/50';
      default:
        return 'bg-gray-900/50 text-gray-200 border-gray-700/50';
    }
  };

  // Get risk level color
  const getRiskLevelColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-900/50 text-green-200 border-green-700/50';
      case 'Medium':
        return 'bg-yellow-900/50 text-yellow-200 border-yellow-700/50';
      case 'High':
        return 'bg-red-900/50 text-red-200 border-red-700/50';
      default:
        return 'bg-gray-900/50 text-gray-200 border-gray-700/50';
    }
  };

  // Determine the detail page route based on product type
  const getDetailRoute = () => {
    switch (type) {
      case 'bond':
        return `/bond/${symbol}`;
      case 'fund':
        return `/fund/${symbol}`;
      case 'creator':
        return `/creator/${symbol}`;
      default:
        return '#';
    }
  };

  // Determine the trading route based on product type
  const getTradingRoute = () => {
    return `/trading/${symbol}`;
  };

  return (
    <div
      onClick={() => onSelect && onSelect(id)}
      className={`group relative bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all hover:-translate-y-1 cursor-pointer touch-target
        ${isSelected ? 'shadow-[0_0_15px_rgba(255,255,0,0.9)]' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-white text-lg">{name}</h3>
          <p className="text-sm text-gray-400">{symbol}</p>
          
          {/* Type-specific secondary info */}
          {type === 'bond' && (
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRatingColor((product as Bond).creditRating)}`}>
                {(product as Bond).creditRating}
              </span>
              <span className="text-xs text-gray-400">{(product as Bond).type} bond</span>
            </div>
          )}
          
          {type === 'fund' && (
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor((product as Fund).riskLevel)}`}>
                {(product as Fund).riskLevel} Risk
              </span>
              <span className="text-xs text-gray-400">{(product as Fund).type} fund</span>
            </div>
          )}
          
          {type === 'creator' && (
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRatingColor((product as Creator).rating)}`}>
                {(product as Creator).rating}
              </span>
              <div className="flex items-center space-x-1">
                <Award className="h-3 w-3 text-yellow-400" />
                <span className="text-xs text-gray-400">{(product as Creator).awards} awards</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Price/NAV and Change */}
        <div className="text-right">
          <p className="font-bold text-white">
            {type === 'fund' ? `NAV ${price.toLocaleString()}` : `CC ${price.toLocaleString()}`}
          </p>
          <div className="flex items-center justify-end space-x-1">
            {percentageChange > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span className={`text-sm ${percentageChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Type-specific content */}
      {type === 'bond' && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-400">Yield</p>
            <p className="font-semibold text-green-400">{(product as Bond).yield}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Maturity</p>
            <p className="font-semibold text-white">
              {new Date((product as Bond).maturity).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Coupon</p>
            <p className="font-semibold text-white">{(product as Bond).couponRate}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Issuer</p>
            <p className="font-semibold text-white">{(product as Bond).issuer}</p>
          </div>
        </div>
      )}

      {type === 'fund' && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-400">YTD Return</p>
            <p className={`font-semibold ${(product as Fund).ytdReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {(product as Fund).ytdReturn >= 0 ? '+' : ''}{(product as Fund).ytdReturn}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">1Y Return</p>
            <p className={`font-semibold ${(product as Fund).oneYearReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {(product as Fund).oneYearReturn >= 0 ? '+' : ''}{(product as Fund).oneYearReturn}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">AUM</p>
            <p className="font-semibold text-white">CC {((product as Fund).aum / 1000000).toFixed(1)}M</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Expense Ratio</p>
            <p className="font-semibold text-white">{(product as Fund).expenseRatio}%</p>
          </div>
        </div>
      )}

      {type === 'creator' && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-400">Market Cap</p>
            <p className="font-semibold text-white">CC {((product as Creator).marketCap / 1000000).toFixed(1)}M</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Volume</p>
            <p className="font-semibold text-white">{(product as Creator).volume.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Years Active</p>
            <p className="font-semibold text-white">{(product as Creator).yearsActive}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Age</p>
            <p className="font-semibold text-white">{(product as Creator).age || 'N/A'}</p>
          </div>
        </div>
      )}

      {/* Type-specific additional info */}
      {type === 'bond' && (
        <div 
          className="mb-4 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-300">Risk Level:</p>
            <p className={`text-sm font-medium ${
              (product as Bond).riskLevel === 'Low' ? 'text-green-400' :
              (product as Bond).riskLevel === 'Medium' ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {(product as Bond).riskLevel}
            </p>
          </div>
          
          {showTooltip && (
            <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-700">
              <p className="text-sm text-white font-medium mb-1">{(product as Bond).description}</p>
              <p className="text-xs text-gray-300">Interest paid {(product as Bond).interestFrequency.toLowerCase()}</p>
            </div>
          )}
        </div>
      )}

      {type === 'fund' && (
        <div 
          className="mb-4 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p className="text-sm text-gray-300">
            <span className="font-medium">Manager:</span> {(product as Fund).manager}
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-medium">Inception:</span> {new Date((product as Fund).inceptionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
          </p>
          
          {showTooltip && (
            <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-700">
              <p className="text-sm text-white font-medium mb-1">Top Holdings:</p>
              <ul className="text-xs text-gray-300 space-y-1">
                {(product as Fund).topHoldings.slice(0, 3).map((holding, index) => (
                  <li key={index}>• {holding.name} ({holding.weight}%)</li>
                ))}
                {(product as Fund).topHoldings.length > 3 && (
                  <li>• +{(product as Fund).topHoldings.length - 3} more holdings</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      {type === 'creator' && (
        <div 
          className="mb-4 relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <p className="text-sm text-gray-400 mb-2">Recent Works</p>
          <div className="flex flex-wrap gap-1">
            {(product as Creator).recentWorks.slice(0, 2).map((work, index) => (
              <span key={index} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-gray-300">
                {work}
              </span>
            ))}
            {(product as Creator).recentWorks.length > 2 && (
              <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-gray-400">
                +{(product as Creator).recentWorks.length - 2} more
              </span>
            )}
          </div>
          
          {showTooltip && (
            <div className="absolute z-10 bottom-0 left-1/2 transform translate-y-full -translate-x-1/2 w-64 bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-700 mt-2">
              <p className="text-sm text-white font-medium mb-2">Latest Projects</p>
              <ul className="space-y-1">
                {(product as Creator).recentWorks.map((work, index) => (
                  <li key={index} className="text-xs text-gray-300">• {work}</li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-2">Links will be active upon comic uploads.</p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Link
          to={getDetailRoute()}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center touch-target"
        >
          View Details
        </Link>
        <Link
          to={getTradingRoute()}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center touch-target"
        >
          Trade
        </Link>
      </div>
    </div>
  );
}

export default FinancialProductCard;