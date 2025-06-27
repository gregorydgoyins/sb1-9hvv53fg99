import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { PortfolioSummary } from './PortfolioSummary';
import { PortfolioPositions } from './PortfolioPositions';
import { PortfolioTransactions } from './PortfolioTransactions';
import { PortfolioShowcase } from './PortfolioShowcase';
import { PortfolioAnalytics } from './PortfolioAnalytics';
import { Breadcrumbs } from './common/Breadcrumbs';
import { Link } from 'react-router-dom';
import { Eye, BarChart3 } from 'lucide-react';

export function PortfolioOverview() {
  const [activeTab, setActiveTab] = useState('summary');
  
  return (
    <div className="space-y-6">
      <Breadcrumbs />
      
      <div className="flex items-center justify-between">
        <h1 className="heading-responsive text-white">Portfolio Management</h1>
        <div className="flex items-center space-x-4">
          <Link
            to="/portfolio/showcase"
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors touch-target"
          >
            <Eye className="h-4 w-4" />
            <span>Showcase</span>
          </Link>
          <Link
            to="/portfolio/analytics"
            className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors touch-target"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </Link>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-800/50 p-1 rounded-lg">
          <TabsTrigger 
            value="summary" 
            className={`px-4 py-2 rounded-md touch-target ${
              activeTab === 'summary' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Summary
          </TabsTrigger>
          <TabsTrigger 
            value="positions" 
            className={`px-4 py-2 rounded-md touch-target ${
              activeTab === 'positions' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Positions
          </TabsTrigger>
          <TabsTrigger 
            value="transactions" 
            className={`px-4 py-2 rounded-md touch-target ${
              activeTab === 'transactions' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Transactions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <PortfolioSummary />
        </TabsContent>
        
        <TabsContent value="positions">
          <PortfolioPositions />
        </TabsContent>
        
        <TabsContent value="transactions">
          <PortfolioTransactions />
        </TabsContent>
      </Tabs>
    </div>
  );
}