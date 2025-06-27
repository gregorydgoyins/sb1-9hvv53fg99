import React, { useState } from 'react';
import { useNewsData } from '../hooks/useNewsData';
import { Newspaper, TrendingUp, TrendingDown, Filter, Calendar, AlertCircle, RefreshCw, ExternalLink, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from './common/Breadcrumbs';
import { format } from 'date-fns';

export function News() {
  const { data: news, isLoading, error, refetch, lastUpdated, dataSource, warning } = useNewsData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImpact, setSelectedImpact] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');

  if (isLoading && !news) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="ml-4 text-white">Loading comic news...</span>
      </div>
    );
  }

  if (error && !news) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12 bg-red-900/30 rounded-xl border border-red-700/30">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-white mb-2">Failed to load news</p>
          <p className="text-red-300 mb-6">{error.message}</p>
          <button 
            onClick={() => refetch()}
            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  // If no news data available
  if (!news || news.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        <div className="text-center py-12">
          <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-white mb-2">No comic news available</p>
          <p className="text-gray-400 mb-6">Check back later for the latest updates</p>
          <button 
            onClick={() => refetch()}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Refresh News</span>
          </button>
        </div>
      </div>
    );
  }

  // Get unique sources for filter
  const sources = ['all', ...Array.from(new Set(news.map(item => item.source)))];

  // Filter news based on selected filters
  const filteredNews = news.filter(item => {
    if (selectedCategory !== 'all' && item.relatedSecurity?.type !== selectedCategory) return false;
    if (selectedImpact !== 'all' && item.impact !== selectedImpact) return false;
    if (selectedSource !== 'all' && item.source !== selectedSource) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Newspaper className="h-8 w-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">Comic Book News</h1>
        </div>

        <div className="flex items-center space-x-2">
          {lastUpdated && (
            <span className="text-sm text-gray-400 mr-2">
              Updated: {format(lastUpdated, 'MMM d, h:mm a')}
            </span>
          )}
          <button 
            onClick={() => refetch()}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg transition-colors text-sm"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Warning message for mock/cached data */}
      {warning && (
        <div className="mb-6 bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-yellow-200 font-medium">Demo Mode</p>
              <p className="text-yellow-300 text-sm">{warning}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-700 text-white text-sm border-slate-600 rounded-lg px-3 py-2"
          >
            <option value="all">All Categories</option>
            <option value="comic">Comics</option>
            <option value="creator">Creators</option>
            <option value="publisher">Publishers</option>
            <option value="option">Options</option>
          </select>
        </div>

        <select 
          value={selectedImpact}
          onChange={(e) => setSelectedImpact(e.target.value)}
          className="bg-slate-700 text-white text-sm border-slate-600 rounded-lg px-3 py-2"
        >
          <option value="all">All Impact</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
          <option value="neutral">Neutral</option>
        </select>

        <select 
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className="bg-slate-700 text-white text-sm border-slate-600 rounded-lg px-3 py-2"
        >
          <option value="all">All Sources</option>
          {sources.filter(s => s !== 'all').map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>

        <div className="ml-auto text-sm text-gray-400">
          {filteredNews.length} articles found
          {dataSource && (
            <span className="ml-2 px-2 py-1 bg-slate-700/50 rounded text-xs">
              {dataSource === 'api' ? 'Live' : dataSource === 'cache' ? 'Cached' : 'Demo'}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      {format(new Date(item.publishedAt), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Source:</span>
                    <span className="text-sm text-indigo-400">
                      {item.source}
                    </span>
                  </div>
                  {item.relatedSecurity && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">Related:</span>
                      <span className="text-sm text-indigo-400">
                        {item.relatedSecurity.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.impact === 'positive' ? 'bg-green-900/50 text-green-200 border border-green-700/50' :
                  item.impact === 'negative' ? 'bg-red-900/50 text-red-200 border border-red-700/50' :
                  'bg-yellow-900/50 text-yellow-200 border border-yellow-700/50'
                }`}>
                  <div className="flex items-center space-x-1">
                    {item.impact === 'positive' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : item.impact === 'negative' ? (
                      <TrendingDown className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <span className="capitalize">{item.impact}</span>
                  </div>
                </div>

                {item.relatedSecurity && (
                  <div className={`px-3 py-1 rounded-full text-sm font-medium bg-slate-700/50 text-gray-200 border border-slate-600/50`}>
                    {item.relatedSecurity.type}
                  </div>
                )}
              </div>
            </div>

            {item.imageUrl && (
              <div className="mt-4">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="mt-4">
              <p className="text-gray-300">
                {item.description || item.content.substring(0, 200) + '...'}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.keywords.slice(0, 5).map((keyword, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-slate-700/50 rounded-full text-xs text-gray-300"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              {item.url.startsWith('http') ? (
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  <span>Read Full Article</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <Link 
                  to={`/news/${item.id}`}
                  className="text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  Read More →
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-white mb-2">No matching news found</p>
          <p className="text-gray-400 mb-6">Try adjusting your filters to see more results</p>
          <button 
            onClick={() => {
              setSelectedCategory('all');
              setSelectedImpact('all');
              setSelectedSource('all');
            }}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default { News };