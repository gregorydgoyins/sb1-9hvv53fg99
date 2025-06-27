import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, TrendingDown, Pause, Play, Volume2, VolumeX, RefreshCw, ExternalLink, Info } from 'lucide-react';
import { format } from 'date-fns';
import { useNewsData } from '../../hooks/useNewsData';

export function NewsTicker() {
  const { data: news, isLoading, error, refetch, lastUpdated } = useNewsData();
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Update animation speed when speed state changes
  useEffect(() => {
    if (tickerRef.current) {
      tickerRef.current.style.animationDuration = `${40 / speed}s`;
    }
  }, [speed]);

  // Handle loading state
  if (isLoading && !news) {
    return null;
  }

  // Handle error state
  if (error && !news) {
    return null;
  }

  // If no news data available
  if (!news || news.length === 0) {
    return null;
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

  // Create news item component to avoid duplication
  const renderNewsItems = () => {
    return news.map((item) => (
      <Link 
        key={item.id}
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
    ));
  };

  return (
    <>
      {/* Banner - only show on non-home pages */}
      {!isHomePage && (
        <div className="bg-indigo-900/2 h-[72px] w-full flex items-center justify-center">
          <h1 className="text-white text-2xl font-bold">Welcome to the Comic Book Stock Exchange</h1>
        </div>
      )}
      
      {/* News Ticker */}
      <div 
        className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50"
        role="complementary"
        aria-label="Comic News Ticker"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="container-responsive">
          <div className="h-10 flex items-center justify-between">
            <div className="flex-1 overflow-hidden relative">
              <div 
                ref={tickerRef}
                className={`flex whitespace-nowrap ${!isPaused ? 'ticker-slide' : ''}`}
                style={{ 
                  animationDuration: `${40 / speed}s`,
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
              >
                {/* Render news items */}
                {renderNewsItems()}
                {/* Duplicate news items to ensure continuous scrolling */}
                {renderNewsItems()}
              </div>
            </div>

            <div className="flex items-center space-x-4 ml-4 border-l border-slate-700/50 pl-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSpeed(speed === 1 ? 0.5 : speed === 0.5 ? 2 : 1)}
                  className="text-gray-400 hover:text-white transition-colors px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 touch-target"
                  aria-label={`Current speed: ${speed}x. Click to change.`}
                >
                  {speed}x
                </button>
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 touch-target"
                  aria-label={isPaused ? 'Resume news ticker' : 'Pause news ticker'}
                >
                  {isPaused ? (
                    <Play className="h-4 w-4" />
                  ) : (
                    <Pause className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 touch-target"
                  aria-label={isMuted ? 'Enable sound' : 'Disable sound'}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={refetch}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 touch-target"
                  aria-label="Refresh news"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              
              {lastUpdated && (
                <div className={`text-xs text-gray-500 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                  Updated: {format(lastUpdated, 'h:mm a')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}