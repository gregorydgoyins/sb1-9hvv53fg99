import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNewsData } from '../hooks/useNewsData';
import { 
  TrendingUp, TrendingDown, AlertCircle, Calendar, User, 
  Tag, ExternalLink, ArrowLeft, Share2, Bookmark, Printer 
} from 'lucide-react';
import { Breadcrumbs } from './common/Breadcrumbs';
import { format } from 'date-fns';

export function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: news } = useNewsData();
  const article = news?.find(item => item.id === id);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-white mb-2">Article not found</p>
          <p className="text-gray-400 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/news" 
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to News</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs overrides={[
        { name: 'News', path: '/news' },
        { name: article.title }
      ]} />

      <article className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white">{article.title}</h1>
            <div className={`flex items-center space-x-2 ${
              article.impact === 'positive' ? 'text-green-400' :
              article.impact === 'negative' ? 'text-red-400' :
              'text-yellow-400'
            }`}>
              {article.impact === 'positive' ? (
                <TrendingUp className="h-6 w-6" />
              ) : article.impact === 'negative' ? (
                <TrendingDown className="h-6 w-6" />
              ) : (
                <AlertCircle className="h-6 w-6" />
              )}
              <span className="text-lg capitalize">{article.impact}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-gray-400">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.publishedAt.toISOString()}>
                {format(new Date(article.publishedAt), 'MMMM d, yyyy h:mm a')}
              </time>
            </div>
            
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{article.source}</span>
            </div>
            
            {article.relatedSecurity && (
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <span className="text-indigo-400">
                  {article.relatedSecurity.name} ({article.relatedSecurity.type})
                </span>
              </div>
            )}
            
            {article.url && article.url.startsWith('http') && (
              <a 
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Original Source</span>
              </a>
            )}
          </div>
        </header>

        {article.imageUrl && (
          <div className="mb-8">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          {article.content ? (
            <div>
              <p className="text-gray-300 mb-4 text-lg">{article.description}</p>
              <div className="text-gray-300 whitespace-pre-line">{article.content}</div>
            </div>
          ) : (
            <p className="text-gray-300">
              {article.description || "No content available for this article."}
            </p>
          )}
        </div>

        {article.keywords && article.keywords.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-2">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-gray-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {article.relatedSecurity && (
          <div className="mt-8 p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
            <h2 className="text-lg font-semibold text-white mb-2">Related Security</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300">{article.relatedSecurity.name}</p>
                <p className="text-sm text-gray-400">{article.relatedSecurity.symbol}</p>
              </div>
              <Link
                to={`/${article.relatedSecurity.type}/${article.relatedSecurity.symbol}`}
                className="text-indigo-400 hover:text-indigo-300"
              >
                View Details →
              </Link>
            </div>
          </div>
        )}

        {/* Article Actions */}
        <div className="mt-8 pt-6 border-t border-slate-700/50 flex flex-wrap gap-4">
          <Link
            to="/news"
            className="inline-flex items-center space-x-2 text-indigo-400 hover:text-indigo-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to News</span>
          </Link>
          
          <div className="ml-auto flex space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Bookmark className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Printer className="h-5 w-5" />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default { NewsDetail };