import React from 'react';
import { useNewsData } from '../hooks/useNewsData';
import { format } from 'date-fns';

interface NewsSummaryProps {
  maxItems?: number;
  showDate?: boolean;
  showSource?: boolean;
  className?: string;
}

export function NewsSummary({
  maxItems = 5,
  showDate = true,
  showSource = true,
  className = ''
}: NewsSummaryProps) {
  const { data: news, isLoading, error } = useNewsData();
  
  if (isLoading || error || !news || news.length === 0) {
    return null;
  }
  
  // Group news by impact
  const positiveNews = news.filter(item => item.impact === 'positive');
  const negativeNews = news.filter(item => item.impact === 'negative');
  
  // Get top news items
  const topPositive = positiveNews.slice(0, Math.ceil(maxItems / 2));
  const topNegative = negativeNews.slice(0, Math.floor(maxItems / 2));
  
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Latest Headlines</h3>
        <ul className="space-y-2">
          {[...topPositive, ...topNegative]
            .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
            .slice(0, maxItems)
            .map(item => (
              <li key={item.id} className="text-gray-300">
                <div className="flex items-start">
                  <span className={`inline-block w-2 h-2 rounded-full mt-1.5 mr-2 ${
                    item.impact === 'positive' ? 'bg-green-400' :
                    item.impact === 'negative' ? 'bg-red-400' :
                    'bg-yellow-400'
                  }`}></span>
                  <div>
                    <p className="text-sm">{item.title}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                      {showDate && (
                        <time dateTime={item.publishedAt.toISOString()}>
                          {format(item.publishedAt, 'MMM d, yyyy')}
                        </time>
                      )}
                      {showSource && showDate && <span>•</span>}
                      {showSource && (
                        <span>{item.source}</span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default NewsSummary;