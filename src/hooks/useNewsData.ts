import { useState, useEffect } from 'react';
import { getNewsApiService, ComicNewsArticle } from '../services/newsApi';
import { NewsQueue } from '../services/newsQueue';

interface UseNewsDataResult {
  data: ComicNewsArticle[] | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
  dataSource: 'api' | 'cache' | 'mock' | null;
  warning: string | null;
  latestStory: ComicNewsArticle | null;
}

export function useNewsData(): UseNewsDataResult {
  const [data, setData] = useState<ComicNewsArticle[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [dataSource, setDataSource] = useState<'api' | 'cache' | 'mock' | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [latestStory, setLatestStory] = useState<ComicNewsArticle | null>(null);

  const newsService = getNewsApiService();
  const newsQueue = NewsQueue.getInstance();

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setWarning(null);
      
      // Get stories from the queue
      const queueStories = newsQueue.getAllStories();
      if (queueStories.length > 0) {
        setData(queueStories);
        setDataSource('mock');
        setWarning(null); // No warning needed for pre-generated stories
      } else {
        // Fallback to service if queue is empty (shouldn't happen)
        const result = await newsService.fetchComicNews();
        setData(result.articles);
        setDataSource(result.source);
        setWarning(null);
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Critical error in news hook:', err);
      setError(err instanceof Error ? err : new Error('Critical system error'));
      
      // Try to use queue stories as fallback
      const queueStories = newsQueue.getAllStories();
      if (queueStories.length > 0) {
        setData(queueStories);
        setDataSource('mock');
        setWarning(null);
      } else {
        setData(null);
        setDataSource(null);
        setWarning(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Subscribe to news queue for real-time updates
  useEffect(() => {
    // Initial fetch
    fetchNews();
    
    // Subscribe to news queue
    const unsubscribe = newsQueue.subscribe((article) => {
      // Update latest story
      setLatestStory(article);
      
      // Update data with latest queue content
      setData(newsQueue.getAllStories());
      setLastUpdated(new Date());
    });
    
    // Set up auto-refresh every 30 minutes
    const refreshInterval = setInterval(() => {
      console.log('Auto-refreshing news data...');
      fetchNews();
    }, 30 * 60 * 1000); // 30 minutes
    
    return () => {
      unsubscribe();
      clearInterval(refreshInterval);
    };
  }, []);

  return { 
    data, 
    isLoading, 
    error, 
    refetch: fetchNews,
    lastUpdated,
    dataSource,
    warning,
    latestStory
  };
}