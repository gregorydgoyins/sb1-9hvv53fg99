import { newsStories } from '../data/newsStories';

// Transformed article for our application
export interface ComicNewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl: string | null;
  source: string;
  publishedAt: Date;
  impact: 'positive' | 'negative' | 'neutral';
  relatedSecurity?: {
    type: 'comic' | 'creator' | 'publisher' | 'option';
    symbol: string;
    name: string;
  };
  keywords: string[];
}

// New return type for fetchComicNews
export interface NewsDataResult {
  articles: ComicNewsArticle[];
  source: 'api' | 'cache' | 'mock';
  warning?: string;
}

class NewsApiService {
  private lastFetchTime: number = 0;
  private cachedNews: ComicNewsArticle[] = [];
  private refreshInterval: number = 30 * 60 * 1000; // 30 minutes

  constructor() {
    // Clear any existing cache on initialization
    this.clearCache();
  }

  /**
   * Clear the cache and reset fetch time
   */
  public clearCache(): void {
    this.cachedNews = [];
    this.lastFetchTime = 0;
    console.log('News cache cleared and reset');
  }

  /**
   * Fetches comic book related news
   */
  async fetchComicNews(): Promise<NewsDataResult> {
    try {
      const currentTime = Date.now();
      
      // Return cached news if it's been less than the refresh interval
      if (this.cachedNews.length > 0 && (currentTime - this.lastFetchTime) < this.refreshInterval) {
        console.log('Using cached news data');
        return {
          articles: this.cachedNews,
          source: 'cache'
        };
      }

      // Use pre-generated stories
      console.log('Using pre-generated news stories');
      this.cachedNews = newsStories;
      this.lastFetchTime = currentTime;
      
      return {
        articles: this.cachedNews,
        source: 'mock'
      };
    } catch (error) {
      console.error('Error fetching comic news:', error);
      
      // If we have cached news, return it even if it's stale
      if (this.cachedNews.length > 0) {
        console.log('Using stale cached news due to error');
        return {
          articles: this.cachedNews,
          source: 'cache'
        };
      }
      
      // If no cached news, return mock data
      console.log('Using mock data as fallback due to error');
      return {
        articles: newsStories,
        source: 'mock'
      };
    }
  }
}

// Create singleton instance
let instance: NewsApiService | null = null;

export const getNewsApiService = (): NewsApiService => {
  if (!instance) {
    instance = new NewsApiService();
  }
  return instance;
};