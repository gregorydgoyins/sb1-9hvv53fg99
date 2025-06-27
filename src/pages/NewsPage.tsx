import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { NewsFeed } from '../components/news/NewsFeed';
import { BlogFeed } from '../components/news/BlogFeed';
import { NewsAnalysis } from '../components/NewsAnalysis';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { Newspaper, BarChart2, BookOpen } from 'lucide-react';

export function NewsPage() {
  const [activeTab, setActiveTab] = useState('feed');
  
  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[{ name: 'News' }]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Newspaper className="h-8 w-8 text-indigo-400" />
          <h1 className="heading-responsive text-white">Comic Industry News</h1>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-800/50 p-1 rounded-lg">
          <TabsTrigger 
            value="feed" 
            className={`px-4 py-2 rounded-md flex items-center space-x-2 touch-target ${
              activeTab === 'feed' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Newspaper className="h-4 w-4" />
            <span>News Feed</span>
          </TabsTrigger>
          <TabsTrigger 
            value="analysis" 
            className={`px-4 py-2 rounded-md flex items-center space-x-2 touch-target ${
              activeTab === 'analysis' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BarChart2 className="h-4 w-4" />
            <span>Analysis</span>
          </TabsTrigger>
          <TabsTrigger 
            value="articles" 
            className={`px-4 py-2 rounded-md flex items-center space-x-2 touch-target ${
              activeTab === 'articles' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Featured Articles</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed">
          <NewsFeed maxItems={20} showFilters={true} showRefresh={true} />
        </TabsContent>
        
        <TabsContent value="analysis">
          <NewsAnalysis />
        </TabsContent>
        
        <TabsContent value="articles">
          <BlogFeed maxItems={5} showImages={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default NewsPage;