import React, { useState } from 'react';
import { 
  BarChart3, PieChart, TrendingUp, TrendingDown, Target, 
  AlertTriangle, CheckCircle, Info, Calendar 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell, Legend,
  LineChart, Line, Area, AreaChart
} from 'recharts';

interface AnalyticsData {
  riskMetrics: {
    portfolioRisk: number;
    diversificationScore: number;
    concentrationRisk: number;
    volatilityScore: number;
  };
  performanceMetrics: {
    sharpeRatio: number;
    maxDrawdown: number;
    winRate: number;
    averageReturn: number;
  };
  allocationAnalysis: {
    recommended: Array<{ name: string; current: number; recommended: number; }>;
    riskByType: Array<{ type: string; risk: number; allocation: number; }>;
  };
  trends: Array<{ date: string; risk: number; return: number; }>;
}

const mockAnalyticsData: AnalyticsData = {
  riskMetrics: {
    portfolioRisk: 65,
    diversificationScore: 85,
    concentrationRisk: 35,
    volatilityScore: 70
  },
  performanceMetrics: {
    sharpeRatio: 1.45,
    maxDrawdown: -12.5,
    winRate: 68,
    averageReturn: 8.2
  },
  allocationAnalysis: {
    recommended: [
      { name: 'Comics', current: 35, recommended: 30 },
      { name: 'Creators', current: 30, recommended: 35 },
      { name: 'Publishers', current: 25, recommended: 25 },
      { name: 'Options', current: 10, recommended: 10 }
    ],
    riskByType: [
      { type: 'Comics', risk: 45, allocation: 35 },
      { type: 'Creators', risk: 60, allocation: 30 },
      { type: 'Publishers', risk: 40, allocation: 25 },
      { type: 'Options', risk: 85, allocation: 10 }
    ]
  },
  trends: [
    { date: '2024-01', risk: 60, return: 5.2 },
    { date: '2024-02', risk: 65, return: 6.8 },
    { date: '2024-03', risk: 62, return: 7.5 },
    { date: '2024-04', risk: 68, return: 8.1 },
    { date: '2024-05', risk: 65, return: 8.2 }
  ]
};

const COLORS = ['#818cf8', '#22c55e', '#eab308', '#ec4899'];

export function PortfolioAnalytics() {
  const [selectedMetric, setSelectedMetric] = useState<'risk' | 'performance' | 'allocation' | 'trends'>('risk');

  const getRiskColor = (score: number) => {
    if (score <= 30) return 'text-green-400';
    if (score <= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRiskLevel = (score: number) => {
    if (score <= 30) return 'Low';
    if (score <= 60) return 'Moderate';
    return 'High';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <BarChart3 className="h-8 w-8 text-indigo-400" />
        <h2 className="heading-responsive text-white">Portfolio Analytics</h2>
      </div>

      {/* Metric Selector */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl shadow-xl">
        <div className="flex space-x-1 p-1">
          {[
            { id: 'risk', label: 'Risk Analysis', icon: AlertTriangle },
            { id: 'performance', label: 'Performance', icon: TrendingUp },
            { id: 'allocation', label: 'Allocation', icon: PieChart },
            { id: 'trends', label: 'Trends', icon: Calendar }
          ].map(metric => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors flex-1 justify-center touch-target ${
                selectedMetric === metric.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <metric.icon className="h-4 w-4" />
              <span className="text-responsive">{metric.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl">
        {selectedMetric === 'risk' && (
          <div className="space-y-6">
            {/* Risk Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-400">Portfolio Risk</p>
                  <AlertTriangle className={`h-4 w-4 ${getRiskColor(mockAnalyticsData.riskMetrics.portfolioRisk)}`} />
                </div>
                <p className={`text-xl font-bold ${getRiskColor(mockAnalyticsData.riskMetrics.portfolioRisk)}`}>
                  {mockAnalyticsData.riskMetrics.portfolioRisk}/100
                </p>
                <p className="text-sm text-gray-400">{getRiskLevel(mockAnalyticsData.riskMetrics.portfolioRisk)} Risk</p>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-400">Diversification</p>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
                <p className="text-xl font-bold text-green-400">
                  {mockAnalyticsData.riskMetrics.diversificationScore}/100
                </p>
                <p className="text-sm text-gray-400">Well Diversified</p>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-400">Concentration</p>
                  <Target className={`h-4 w-4 ${getRiskColor(mockAnalyticsData.riskMetrics.concentrationRisk)}`} />
                </div>
                <p className={`text-xl font-bold ${getRiskColor(mockAnalyticsData.riskMetrics.concentrationRisk)}`}>
                  {mockAnalyticsData.riskMetrics.concentrationRisk}/100
                </p>
                <p className="text-sm text-gray-400">{getRiskLevel(mockAnalyticsData.riskMetrics.concentrationRisk)} Concentration</p>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-400">Volatility</p>
                  <TrendingUp className={`h-4 w-4 ${getRiskColor(mockAnalyticsData.riskMetrics.volatilityScore)}`} />
                </div>
                <p className={`text-xl font-bold ${getRiskColor(mockAnalyticsData.riskMetrics.volatilityScore)}`}>
                  {mockAnalyticsData.riskMetrics.volatilityScore}/100
                </p>
                <p className="text-sm text-gray-400">{getRiskLevel(mockAnalyticsData.riskMetrics.volatilityScore)} Volatility</p>
              </div>
            </div>

            {/* Risk by Asset Type */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Risk by Asset Type</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAnalyticsData.allocationAnalysis.riskByType}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="type" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '0.5rem'
                      }}
                      itemStyle={{ color: '#e2e8f0' }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Bar dataKey="risk" fill="#818cf8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {selectedMetric === 'performance' && (
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Sharpe Ratio</p>
                <p className="text-xl font-bold text-green-400">
                  {mockAnalyticsData.performanceMetrics.sharpeRatio}
                </p>
                <p className="text-sm text-gray-400">Excellent</p>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Max Drawdown</p>
                <p className="text-xl font-bold text-red-400">
                  {mockAnalyticsData.performanceMetrics.maxDrawdown}%
                </p>
                <p className="text-sm text-gray-400">Acceptable</p>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Win Rate</p>
                <p className="text-xl font-bold text-green-400">
                  {mockAnalyticsData.performanceMetrics.winRate}%
                </p>
                <p className="text-sm text-gray-400">Strong</p>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Avg Return</p>
                <p className="text-xl font-bold text-green-400">
                  {mockAnalyticsData.performanceMetrics.averageReturn}%
                </p>
                <p className="text-sm text-gray-400">Above Market</p>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <h4 className="font-medium text-white mb-3">Performance Insights</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">Portfolio outperforming market by 2.1%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">Strong risk-adjusted returns (Sharpe {'>'} 1.0)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Consider taking profits on top performers</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedMetric === 'allocation' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current vs Recommended */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Current vs Recommended Allocation</h3>
                <div className="space-y-3">
                  {mockAnalyticsData.allocationAnalysis.recommended.map((item, index) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{item.name}</span>
                        <span className="text-gray-400">
                          {item.current}% → {item.recommended}%
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex-1 bg-slate-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getScoreColor(item.current)}`}
                            style={{ width: `${item.current}%` }}
                          />
                        </div>
                        <div className="flex-1 bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.recommended}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Allocation Pie Chart */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Current Allocation</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={mockAnalyticsData.allocationAnalysis.recommended}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="current"
                        label={({ name, current }) => `${name} ${current}%`}
                      >
                        {mockAnalyticsData.allocationAnalysis.recommended.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedMetric === 'trends' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Risk vs Return Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockAnalyticsData.trends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis yAxisId="left" stroke="#94a3b8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: 'none',
                        borderRadius: '0.5rem'
                      }}
                      itemStyle={{ color: '#e2e8f0' }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="risk" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Risk Score"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="return" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      name="Return %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Risk Trend</p>
                <p className="text-xl font-bold text-yellow-400">Stable</p>
                <p className="text-sm text-gray-300">Risk levels maintained within target range</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Return Trend</p>
                <p className="text-xl font-bold text-green-400">Improving</p>
                <p className="text-sm text-gray-300">Consistent upward trajectory</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Efficiency</p>
                <p className="text-xl font-bold text-green-400">Excellent</p>
                <p className="text-sm text-gray-300">Strong risk-adjusted performance</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}