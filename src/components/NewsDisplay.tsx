import React from 'react';
import { useNewsData } from '../hooks/useNewsData';
import { format } from 'date-fns';
import { TrendingUp, TrendingDown, AlertCircle, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsDisplayProps {
  excludeSources?: string[];
  maxItems?: number;
  showImpact?: boolean;
  showImages?: boolean;
  showDate?: boolean;
  showSource?: boolean;
  showKeywords?: boolean;
  compact?: boolean;
  className?: string;
}

export function NewsDisplay({
  excludeSources = [],
  maxItems = 5,
  showImpact = true,
  showImages = true,
  showDate = true,
  showSource = true,
  showKeywords = true,
  compact = false,
  className = ''
}: NewsDisplayProps) {
  const { data: news, isLoading, error } = useNewsData();
  
  if (isLoading) {
    return (
      <div className={`p-4 text-center ${className}`}>
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="mt-2 text-gray-400">Loading news...</p>
      </div>
    );
  }
  
  if (error || !news) {
    return (
      <div className={`p-4 text-center ${className}`}>
        <AlertCircle className="h-6 w-6 text-red-400 mx-auto mb-2" />
        <p className="text-red-300">Failed to load news</p>
      </div>
    );
  }
  
  // Filter out excluded sources
  const filteredNews = news
    .filter(item => !excludeSources.includes(item.source))
    .slice(0, maxItems);
  
  if (filteredNews.length === 0) {
    return (
      <div className={`p-4 text-center ${className}`}>
        <p className="text-gray-400">No news articles available</p>
      </div>
    );
  }
  
  return (
    <div className={`space-y-4 ${className}`}>
      {filteredNews.map((article) => {
        // Determine if this is an external link
        const isExternalLink = article.url.startsWith('http');
        
        return (
          <article key={article.id} className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 hover:bg-slate-700 transition-colors">
            <div className="flex gap-4">
              {showImages && article.imageUrl && !compact && (
                <div className="flex-shrink-0">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`font-medium text-white ${compact ? 'text-sm' : 'text-base'} line-clamp-2`}>
                    {article.title}
                  </h3>
                  
                  {showImpact && (
                    <div className="flex-shrink-0">
                      <div className={`p-1 rounded-full ${
                        article.impact === 'positive' ? 'bg-green-900/30 text-green-400' :
                        article.impact === 'negative' ? 'bg-red-900/30 text-red-400' :
                        'bg-yellow-900/30 text-yellow-400'
                      }`}>
                        {article.impact === 'positive' ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : article.impact === 'negative' ? (
                          <TrendingDown className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {!compact && (
                  <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                    {article.description}
                  </p>
                )}
                
                <div className="flex flex-wrap items-center justify-between mt-2">
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    {showDate && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={article.publishedAt.toISOString()}>
                          {format(article.publishedAt, 'MMM d, yyyy')}
                        </time>
                      </div>
                    )}
                    
                    {showSource && (
                      <span>{article.source}</span>
                    )}
                  </div>
                  
                  {isExternalLink ? (
                    <a 
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 text-xs"
                    >
                      <span>Read</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <Link 
                      to={`/news/${article.id}`}
                      className="text-indigo-400 hover:text-indigo-300 text-xs"
                    >
                      Read More →
                    </Link>
                  )}
                </div>
                
                {showKeywords && !compact && article.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {article.keywords.slice(0, 3).map((keyword, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 bg-slate-700/50 rounded-full text-xs text-gray-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default NewsDisplay;