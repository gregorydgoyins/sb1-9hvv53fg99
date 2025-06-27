import React, { useState } from 'react';
import { useNewsData } from '../../hooks/useNewsData';
import { Calendar, Search, Filter, ArrowDownUp, TrendingUp, TrendingDown, AlertCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, subMonths, isAfter } from 'date-fns';

interface NewsArchiveProps {
  defaultTimeRange?: 'all' | '1m' | '3m' | '6m' | '1y';
  defaultSortOrder?: 'newest' | 'oldest' | 'relevance';
  showFilters?: boolean;
}

export function NewsArchive({ 
  defaultTimeRange = 'all', 
  defaultSortOrder = 'newest',
  showFilters = true
}: NewsArchiveProps) {
  const { data: news, isLoading, error } = useNewsData();
  const [timeRange, setTimeRange] = useState(defaultTimeRange);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading && !news) {
    return (
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-gray-400">Loading news archive...</span>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="bg-red-900/30 rounded-lg p-4 text-center">
          <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
          <p className="text-red-300">Failed to load news archive</p>
        </div>
      </div>
    );
  }

  // Get unique sources for filter
  const sources = ['all', ...Array.from(new Set(news.map(item => item.source)))];

  // Filter news based on selected filters
  const filteredNews = news.filter(item => {
    // Filter by time range
    if (timeRange !== 'all') {
      const now = new Date();
      let cutoffDate;
      
      switch (timeRange) {
        case '1m':
          cutoffDate = subMonths(now, 1);
          break;
        case '3m':
          cutoffDate = subMonths(now, 3);
          break;
        case '6m':
          cutoffDate = subMonths(now, 6);
          break;
        case '1y':
          cutoffDate = subMonths(now, 12);
          break;
        default:
          cutoffDate = new Date(0); // Beginning of time
      }
      
      if (!isAfter(new Date(item.publishedAt), cutoffDate)) {
        return false;
      }
    }
    
    // Filter by category
    if (selectedCategory !== 'all' && item.relatedSecurity?.type !== selectedCategory) {
      return false;
    }
    
    // Filter by impact
    if (selectedImpact !== 'all' && item.impact !== selectedImpact) {
      return false;
    }
    
    // Filter by source
    if (selectedSource !== 'all' && item.source !== selectedSource) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Sort filtered news
  const sortedNews = [...filteredNews].sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return b.publishedAt.getTime() - a.publishedAt.getTime();
      case 'oldest':
        return a.publishedAt.getTime() - b.publishedAt.getTime();
      case 'relevance':
        // For relevance, we'll use a simple algorithm that prioritizes:
        // 1. Matches in title (highest)
        // 2. Matches in description
        // 3. Recency as a tiebreaker
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const aTitle = a.title.toLowerCase().includes(query) ? 1 : 0;
          const bTitle = b.title.toLowerCase().includes(query) ? 1 : 0;
          
          if (aTitle !== bTitle) return bTitle - aTitle;
          
          const aDesc = a.description.toLowerCase().includes(query) ? 1 : 0;
          const bDesc = b.description.toLowerCase().includes(query) ? 1 : 0;
          
          if (aDesc !== bDesc) return bDesc - aDesc;
        }
        
        // Default to newest if no search query or as tiebreaker
        return b.publishedAt.getTime() - a.publishedAt.getTime();
      default:
        return 0;
    }
  });

  // Paginate results
  const totalPages = Math.ceil(sortedNews.length / itemsPerPage);
  const paginatedNews = sortedNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">News Archive</h2>
      
      {showFilters && (
        <div className="space-y-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on new search
              }}
              placeholder="Search news archive..."
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <select
                value={timeRange}
                onChange={(e) => {
                  setTimeRange(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="bg-slate-700 text-white text-sm border-slate-600 rounded-lg px-3 py-2 w-full"
              >
                <option value="all">All Time</option>
                <option value="1m">Last Month</option>
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <ArrowDownUp className="h-4 w-4 text-gray-400" />
              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="bg-slate-700 text-white text-sm border-slate-600 rounded-lg px-3 py-2 w-full"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="relevance">Relevance</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-700 text-white text-sm border-slate-600 rounded-lg px-3 py-2 w-full"
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
              onChange={(e) => {
                setSelectedImpact(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-700 text-white text-sm border-slate-600 rounded-lg px-3 py-2"
            >
              <option value="all">All Impact</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>
            
            <select
              value={selectedSource}
              onChange={(e) => {
                setSelectedSource(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-700 text-white text-sm border-slate-600 rounded-lg px-3 py-2"
            >
              <option value="all">All Sources</option>
              {sources.filter(s => s !== 'all').map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>
          
          {/* Results summary */}
          <div className="flex justify-between items-center text-sm text-gray-400 border-t border-slate-700/50 pt-4">
            <span>
              {sortedNews.length} {sortedNews.length === 1 ? 'result' : 'results'} found
            </span>
            
            {totalPages > 0 && (
              <span>
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* News list */}
      {paginatedNews.length > 0 ? (
        <div className="space-y-6">
          {paginatedNews.map((item) => {
            // Determine if this is an external link
            const isExternalLink = item.url.startsWith('http');
            
            return (
              <article key={item.id} className="border-b border-slate-700/50 pb-6 last:border-0">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.impact === 'positive' ? 'bg-green-900/50 text-green-200 border border-green-700/50' :
                    item.impact === 'negative' ? 'bg-red-900/50 text-red-200 border border-red-700/50' :
                    'bg-yellow-900/50 text-yellow-200 border border-yellow-700/50'
                  }`}>
                    <div className="flex items-center space-x-1">
                      {item.impact === 'positive' ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : item.impact === 'negative' ? (
                        <TrendingDown className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      <span className="capitalize">{item.impact}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    <time dateTime={item.publishedAt.toISOString()}>
                      {format(new Date(item.publishedAt), 'MMM d, yyyy')}
                    </time>
                  </div>
                  
                  <span className="text-sm text-gray-400">{item.source}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-300 mb-4">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {item.keywords.slice(0, 3).map((keyword, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-slate-700/50 rounded-full text-xs text-gray-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  
                  {isExternalLink ? (
                    <a 
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 text-sm"
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
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-700/30 rounded-lg">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-white mb-2">No results found</p>
          <p className="text-gray-400 mb-6">Try adjusting your search criteria or filters</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedImpact('all');
              setSelectedSource('all');
              setTimeRange('all');
              setCurrentPage(1);
            }}
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? 'bg-slate-700/30 text-gray-500 cursor-not-allowed'
                  : 'bg-slate-700 text-white hover:bg-indigo-600'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === pageNum
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-700 text-white hover:bg-indigo-600'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'bg-slate-700/30 text-gray-500 cursor-not-allowed'
                  : 'bg-slate-700 text-white hover:bg-indigo-600'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default NewsArchive;