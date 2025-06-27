import React, { useState, useEffect } from 'react';
import { useNewsData } from '../hooks/useNewsData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Newspaper, TrendingUp, TrendingDown, AlertCircle, BarChart2, PieChart as PieChartIcon, Info } from 'lucide-react';
import { format, subDays } from 'date-fns';

interface NewsAnalysisProps {
  title?: string;
  showSourceBreakdown?: boolean;
  showSentimentAnalysis?: boolean;
  showKeywordAnalysis?: boolean;
  maxKeywords?: number;
}

export function NewsAnalysis({
  title = "News Analysis",
  showSourceBreakdown = true,
  showSentimentAnalysis = true,
  showKeywordAnalysis = true,
  maxKeywords = 10
}: NewsAnalysisProps) {
  const { data: news, isLoading, error, dataSource, warning } = useNewsData();
  const [activeTab, setActiveTab] = useState<'sentiment' | 'sources' | 'keywords'>('sentiment');
  
  // Prepare data for charts
  const [sentimentData, setSentimentData] = useState<any[]>([]);
  const [sourceData, setSourceData] = useState<any[]>([]);
  const [keywordData, setKeywordData] = useState<any[]>([]);
  
  useEffect(() => {
    if (!news) return;
    
    // Prepare sentiment data
    const sentimentCounts = {
      positive: 0,
      neutral: 0,
      negative: 0
    };
    
    news.forEach(item => {
      sentimentCounts[item.impact]++;
    });
    
    const sentimentChartData = [
      { name: 'Positive', value: sentimentCounts.positive, color: '#22c55e' },
      { name: 'Neutral', value: sentimentCounts.neutral, color: '#eab308' },
      { name: 'Negative', value: sentimentCounts.negative, color: '#ef4444' }
    ];
    
    setSentimentData(sentimentChartData);
    
    // Prepare source data
    const sourceCounts: Record<string, number> = {};
    news.forEach(item => {
      sourceCounts[item.source] = (sourceCounts[item.source] || 0) + 1;
    });
    
    const sourceChartData = Object.entries(sourceCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
    
    setSourceData(sourceChartData);
    
    // Prepare keyword data
    const keywordCounts: Record<string, number> = {};
    news.forEach(item => {
      item.keywords.forEach(keyword => {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      });
    });
    
    const keywordChartData = Object.entries(keywordCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, maxKeywords);
    
    setKeywordData(keywordChartData);
  }, [news, maxKeywords]);
  
  if (isLoading) {
    return (
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-gray-400">Analyzing news data...</span>
        </div>
      </div>
    );
  }
  
  if (error || !news) {
    return (
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="bg-red-900/30 rounded-lg p-4 text-center">
          <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
          <p className="text-red-300">Failed to analyze news data</p>
        </div>
      </div>
    );
  }
  
  // Calculate date range for the analysis
  const oldestArticleDate = news.length > 0 
    ? new Date(Math.min(...news.map(item => item.publishedAt.getTime())))
    : subDays(new Date(), 7);
  
  const dateRange = `${format(oldestArticleDate, 'MMM d, yyyy')} - ${format(new Date(), 'MMM d, yyyy')}`;
  
  return (
    <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Newspaper className="h-6 w-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {dataSource && (
            <span className="text-xs text-gray-400 px-2 py-1 bg-slate-700/50 rounded">
              {dataSource === 'api' ? 'Live Data' : dataSource === 'cache' ? 'Cached Data' : 'Demo Data'}
            </span>
          )}
        </div>
        <div className="text-sm text-gray-400">
          {dateRange} • {news.length} articles
        </div>
      </div>

      {/* Warning message for mock/cached data */}
      {warning && (
        <div className="mb-6 bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Info className="h-4 w-4 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="text-yellow-200 text-sm font-medium">Demo Mode</p>
              <p className="text-yellow-300 text-xs">{warning}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {showSentimentAnalysis && (
          <button
            onClick={() => setActiveTab('sentiment')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'sentiment'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700/50 text-gray-300 hover:bg-indigo-600/20'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Sentiment</span>
          </button>
        )}
        
        {showSourceBreakdown && (
          <button
            onClick={() => setActiveTab('sources')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'sources'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700/50 text-gray-300 hover:bg-indigo-600/20'
            }`}
          >
            <PieChartIcon className="h-4 w-4" />
            <span>Sources</span>
          </button>
        )}
        
        {showKeywordAnalysis && (
          <button
            onClick={() => setActiveTab('keywords')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'keywords'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700/50 text-gray-300 hover:bg-indigo-600/20'
            }`}
          >
            <BarChart2 className="h-4 w-4" />
            <span>Keywords</span>
          </button>
        )}
      </div>
      
      {/* Chart area */}
      <div className="h-80">
        {activeTab === 'sentiment' && (
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value} articles`, 'Count']}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '0.5rem'
                  }}
                  itemStyle={{ color: '#e2e8f0' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {activeTab === 'sources' && (
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  formatter={(value: number) => [`${value} articles`, 'Count']}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '0.5rem'
                  }}
                  itemStyle={{ color: '#e2e8f0' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Bar dataKey="value" fill="#818cf8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {activeTab === 'keywords' && (
          <div className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={keywordData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={120} />
                <Tooltip
                  formatter={(value: number) => [`${value} mentions`, 'Count']}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '0.5rem'
                  }}
                  itemStyle={{ color: '#e2e8f0' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Bar dataKey="value" fill="#818cf8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      
      {/* Summary section */}
      <div className="mt-6 pt-6 border-t border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Key Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <div className="flex items-center space-x-2 mb-2">
              {sentimentData[0]?.value > sentimentData[2]?.value ? (
                <TrendingUp className="h-5 w-5 text-green-400" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-400" />
              )}
              <h4 className="font-medium text-white">Sentiment Analysis</h4>
            </div>
            <p className="text-sm text-gray-300">
              {sentimentData[0]?.value > sentimentData[2]?.value
                ? `Positive sentiment dominates with ${sentimentData[0]?.value} articles (${((sentimentData[0]?.value / news.length) * 100).toFixed(0)}% of coverage).`
                : `Negative sentiment dominates with ${sentimentData[2]?.value} articles (${((sentimentData[2]?.value / news.length) * 100).toFixed(0)}% of coverage).`
              }
            </p>
          </div>
          
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <div className="flex items-center space-x-2 mb-2">
              <Newspaper className="h-5 w-5 text-indigo-400" />
              <h4 className="font-medium text-white">Top Sources</h4>
            </div>
            <p className="text-sm text-gray-300">
              {sourceData.length > 0
                ? `${sourceData[0]?.name} leads with ${sourceData[0]?.value} articles, followed by ${sourceData[1]?.name} (${sourceData[1]?.value}).`
                : 'No source data available.'
              }
            </p>
          </div>
          
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart2 className="h-5 w-5 text-yellow-400" />
              <h4 className="font-medium text-white">Trending Topics</h4>
            </div>
            <p className="text-sm text-gray-300">
              {keywordData.length > 0
                ? `Top keywords: ${keywordData.slice(0, 3).map(k => k.name).join(', ')}.`
                : 'No keyword data available.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsAnalysis;