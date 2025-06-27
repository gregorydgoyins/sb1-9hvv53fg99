import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Pause, Play, Volume2, VolumeX, RefreshCw, AlertCircle, ExternalLink } from 'lucide-react';
import { useNewsData } from '../hooks/useNewsData';
import { format } from 'date-fns';

export function NewsTicker() {
  const { data: news, isLoading, error, refetch, lastUpdated } = useNewsData();
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  // Update animation speed when speed state changes
  useEffect(() => {
    if (tickerRef.current) {
      tickerRef.current.style.animationDuration = `${40 / speed}s`;
    }
  }, [speed]);

  // Handle loading state
  if (isLoading && !news) {
    return (
      <div className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-gray-400">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500 mr-2"></div>
            Loading comic news...
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error && !news) {
    return (
      <div className="bg-red-900/50 border-b border-red-700/50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-red-200">
            <AlertCircle className="h-4 w-4 mr-2" />
            Failed to load news feed. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  // If no news data available
  if (!news || news.length === 0) {
    return (
      <div className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-gray-400">
            No comic news available at this time.
          </div>
        </div>
      </div>
    );
  }

  // Get impact styles for each news item
  const getImpactStyles = (impact: string) => {
    const styles = {
      positive: {
        dot: 'bg-[#00C853]',
        text: 'text-[#00C853]',
        bg: 'bg-green-900/20'
      },
      negative: {
        dot: 'bg-[#D50000]',
        text: 'text-[#D50000]',
        bg: 'bg-red-900/20'
      },
      neutral: {
        dot: 'bg-[#FFD600]',
        text: 'text-[#FFD600]',
        bg: 'bg-yellow-900/20'
      }
    };
    return styles[impact as keyof typeof styles] || styles.neutral;
  };

  // Duplicate news items for seamless scrolling
  const duplicatedNews = [...news, ...news];

  return (
    <div 
      className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50"
      role="complementary"
      aria-label="Comic News Ticker"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 flex items-center justify-between">
          <div className="flex-1 overflow-hidden relative">
            <div 
              ref={tickerRef}
              className={`flex whitespace-nowrap ${!isPaused ? 'animate-marquee' : ''}`}
              style={{ 
                animationDuration: `${40 / speed}s`,
                animationPlayState: isPaused ? 'paused' : 'running'
              }}
            >
              {duplicatedNews.map((item, index) => (
                <Link 
                  key={`${item.id}-${index}`}
                  to={item.url.startsWith('http') ? item.url : `/news/${item.id}`}
                  target={item.url.startsWith('http') ? "_blank" : undefined}
                  rel={item.url.startsWith('http') ? "noopener noreferrer" : undefined}
                  className={`inline-flex items-center space-x-4 px-4 py-1 mx-2 rounded-lg ${
                    getImpactStyles(item.impact).bg
                  } hover:bg-opacity-75 transition-colors`}
                  onClick={(e) => {
                    if (isPaused) {
                      e.preventDefault();
                      return;
                    }
                  }}
                  role="article"
                >
                  <span 
                    className={`h-2 w-2 rounded-full ${getImpactStyles(item.impact).dot}`}
                    aria-hidden="true"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-[16px] font-medium text-white">
                      {item.title}
                    </span>
                    {item.impact === 'positive' ? (
                      <TrendingUp className={`h-4 w-4 ${getImpactStyles(item.impact).text}`} />
                    ) : item.impact === 'negative' ? (
                      <TrendingDown className={`h-4 w-4 ${getImpactStyles(item.impact).text}`} />
                    ) : null}
                    <span className="text-sm text-gray-400">
                      {format(new Date(item.publishedAt), 'MMM d, h:mm a')}
                    </span>
                    {item.url.startsWith('http') && (
                      <ExternalLink className="h-3 w-3 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-300 border-l border-gray-600 pl-2">
                      {item.source}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 ml-4 border-l border-slate-700/50 pl-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSpeed(speed === 1 ? 0.5 : speed === 0.5 ? 2 : 1)}
                className="text-gray-400 hover:text-white transition-colors px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={`Current speed: ${speed}x. Click to change.`}
              >
                {speed}x
              </button>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={isPaused ? 'Resume news ticker' : 'Pause news ticker'}
              >
                {isPaused ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <Pause className="h-4 wLooking at the code, I can see the issue is with the glow effects implementation. The problem appears to be with CSS class conflicts and improper glow effect definitions. Let me fix this:

<boltArtifact id="fix-glow-effects" title="Fix Glow Effects and CSS Issues">