import { ComicNewsArticle } from './newsApi';
import { newsStories } from '../data/newsStories';

// Queue system for story distribution with realistic time intervals
export class NewsQueue {
  private static instance: NewsQueue;
  private queue: ComicNewsArticle[] = [];
  private subscribers: ((article: ComicNewsArticle) => void)[] = [];
  private isProcessing: boolean = false;
  private nextReleaseTimeout: NodeJS.Timeout | null = null;
  
  private constructor() {
    // Initialize with all stories
    this.queue = [...newsStories];
    
    // Sort by publishedAt date (newest first)
    this.sortQueue();
  }
  
  public static getInstance(): NewsQueue {
    if (!NewsQueue.instance) {
      NewsQueue.instance = new NewsQueue();
    }
    return NewsQueue.instance;
  }
  
  // Get all news stories
  public getAllStories(): ComicNewsArticle[] {
    return [...this.queue];
  }
  
  // Get the latest n stories
  public getLatestStories(count: number = 10): ComicNewsArticle[] {
    return this.queue.slice(0, count);
  }
  
  // Subscribe to new stories
  public subscribe(callback: (article: ComicNewsArticle) => void): () => void {
    this.subscribers.push(callback);
    
    // Start processing if not already running
    if (!this.isProcessing) {
      this.startProcessing();
    }
    
    // Return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
      
      // If no more subscribers, stop processing
      if (this.subscribers.length === 0) {
        this.stopProcessing();
      }
    };
  }
  
  // Add a new story to the queue
  public addStory(article: ComicNewsArticle): void {
    this.queue.unshift(article);
    this.sortQueue();
    
    // Notify subscribers immediately of new story
    this.notifySubscribers(article);
  }
  
  // Start processing the queue
  private startProcessing(): void {
    this.isProcessing = true;
    this.scheduleNextRelease();
  }
  
  // Stop processing the queue
  private stopProcessing(): void {
    this.isProcessing = false;
    
    if (this.nextReleaseTimeout) {
      clearTimeout(this.nextReleaseTimeout);
      this.nextReleaseTimeout = null;
    }
  }
  
  // Schedule the next story release
  private scheduleNextRelease(): void {
    if (!this.isProcessing || this.subscribers.length === 0) {
      return;
    }
    
    // Generate a random time interval between 2-15 minutes (in milliseconds)
    // For development/testing purposes, we'll use shorter intervals
    const minInterval = process.env.NODE_ENV === 'development' ? 10000 : 2 * 60 * 1000; // 10 seconds or 2 minutes
    const maxInterval = process.env.NODE_ENV === 'development' ? 30000 : 15 * 60 * 1000; // 30 seconds or 15 minutes
    const interval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;
    
    // Schedule next release
    this.nextReleaseTimeout = setTimeout(() => {
      // Get a random story from the queue
      const randomIndex = Math.floor(Math.random() * Math.min(10, this.queue.length));
      const article = this.queue[randomIndex];
      
      // Update its timestamp to now
      const updatedArticle = {
        ...article,
        publishedAt: new Date()
      };
      
      // Replace the article in the queue
      this.queue[randomIndex] = updatedArticle;
      this.sortQueue();
      
      // Notify subscribers
      this.notifySubscribers(updatedArticle);
      
      // Schedule next release
      this.scheduleNextRelease();
    }, interval);
  }
  
  // Notify all subscribers of a new story
  private notifySubscribers(article: ComicNewsArticle): void {
    this.subscribers.forEach(callback => {
      try {
        callback(article);
      } catch (error) {
        console.error('Error in news subscriber callback:', error);
      }
    });
  }
  
  // Sort the queue by publishedAt date (newest first)
  private sortQueue(): void {
    this.queue.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }
  
  // Archive old stories (keep only the most recent 100)
  public archiveOldStories(): void {
    if (this.queue.length > 100) {
      this.queue = this.queue.slice(0, 100);
    }
  }
}

export default NewsQueue;