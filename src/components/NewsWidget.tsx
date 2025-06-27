import React, { useState } from 'react';
import { useNewsData } from '../hooks/useNewsData';
import { Newspaper, TrendingUp, TrendingDown, AlertCircle, ExternalLink, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface NewsWidgetProps {
  maxItems?: number;
  showImages?: boolean;
  compact?: boolean;
  filter?: {
    impact?: 'positive' | 'negative' | 'neutral';
    type?: 'comic' | 'creator' | 'publisher' | 'option';
  };
}

export function NewsWidget({ 
  maxItems = 5, 
  showImages = true, 
  compact = false,
  filter
}: NewsWidgetProps) {
  const { data: news, isLoading, error, refetch, dataSource, warning } = useNewsData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (isLoading && !news) {
    return (
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl">
        <div className="flex items-center space-x-2 mb-4">
          <Newspaper className="h-5 w-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Comic News</h2>
        </div>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  if (error && !news) {
    return (
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl">
        <div className="flex items-center space-x-2 mb-4">
          <Newspaper className="h-5 w-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Comic News</h2>
        </div>
        <div className="bg-red-900/30 rounded-lg p-4 text-center">
          <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
          <p className="text-red-300">Failed to load news</p>
        </div>
      </div>
    );
  }

  // Filter news based on props and selected category
  const filteredNews = news
    ?.filter(item => {
      if (filter?.impact && item.impact !== filter.impact) return false;
      if (filter?.type && item.relatedSecurity?.type !== filter.type) return false;
      if (selectedCategory !== 'all' && item.relatedSecurity?.type !== selectedCategory) return false;
      return true;
    })
    .slice(0, maxItems);

  if (!filteredNews || filteredNews.length === 0) {
    return (
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl">
        <div className="flex items-center space-x-2 mb-4">
          <Newspaper className="h-5 w-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Comic News</h2>
        </div>
        <div className="text-center py-6">
          <p className="text-gray-400">No news articles available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Newspaper className="h-5 w-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Comic News</h2>
          {dataSource && (
            <span className="text-xs text-gray-400 px-2 py-1 bg-slate-700/50 rounded">
              {dataSource === 'api' ? 'Live' : dataSource === 'cache' ? 'Cached' : 'Demo'}
            </span>
          )}
        </div>
        
        {!compact && (
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-700 text-white text-xs border-slate-600 rounded-lg px-2 py-1"
          >
            <option value="all">All</option>
            <option value="comic">Comics</option>
            <option value="creator">Creators</option>
            <option value="publisher">Publishers</option>
          </select>
        )}
      </div>

      {/* Warning message for mock/cached data */}
      {warning && (
        <div className="mb-4 bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-2">
          <div className="flex items-center space-x-2">
            <Info className="h-3 w-3 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-yellow-200 text-xs font-medium">Demo Mode</p>
              <p className="text-yellow-300 text-xs">{warning}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredNews.map((item) => (
          <div 
            key={item.id}
            className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-start space-x-3">
              {showImages && item.imageUrl && !compact && (
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                />
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-white text-sm line-clamp-2">{item.title}</h3>
                  <div className={`flex-shrink-0 ml-2 ${
                    item.impact === 'positive' ? 'text-green-400' :
                    item.impact === 'negative' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {item.impact === 'positive' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : item.impact === 'negative' ? (
                      <TrendingDown className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                  </div>
                </div>
                
                {!compact && (
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {item.description || item.content.substring(0, 100) + '...'}
                  </p>
                )}
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{format(new Date(item.publishedAt), 'MMM d')}</span>
                    <span className="mx-1">•</span>
                    <span>{item.source}</span>
                  </div>
                  
                  {item.url && item.url.startsWith('http') ? (
                    <a 
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                    >
                      <span>Read</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  ) : (
                    <Link 
                      to={`/news/${item.id}`}
                      className="text-xs text-indigo-400 hover:text-indigo-300"
                    >
                      Read More →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Link 
          to="/news"
          className="text-indigo-400 hover:text-indigo-300 text-sm"
        >
          View All News →
        </Link>
      </div>
    </div>
  );
}