import React, { useState } from 'react';
import { 
  Users, TrendingUp, TrendingDown, Star, Award, Calendar, 
  BookOpen, BarChart2, Activity, ArrowLeft, ExternalLink, 
  Info, Briefcase, Zap
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { CreatorStockChart } from './CreatorStockChart';

interface CreatorProfileProps {
  creatorId?: string;
}

export function CreatorProfile({ creatorId }: CreatorProfileProps) {
  const { symbol: urlSymbol } = useParams<{ symbol: string }>();
  const symbol = creatorId || urlSymbol || '';
  const [activeTab, setActiveTab] = useState<'overview' | 'works' | 'performance' | 'trading'>('overview');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  // Mock data for creator details
  const mockCreatorData: Record<string, any> = {
    'TMFS': {
      id: 'TMFS',
      name: 'Todd McFarlane',
      role: 'Artist/Writer',
      age: 62,
      price: 2500.00,
      change: 125.00,
      percentageChange: 5.2,
      marketCap: 125000000,
      volume: 1250,
      rating: 'Strong Buy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Todd McFarlane is a Canadian comic book creator, artist, writer, filmmaker and entrepreneur, best known for his work as the artist on The Amazing Spider-Man and as the creator, writer, and artist on the superhero horror-fantasy series Spawn.',
      yearsActive: 35,
      awards: 12,
      popularity: 95,
      nextProject: 'Spawn #350',
      majorWorks: [
        { title: 'The Amazing Spider-Man #298-329', year: '1988-1990', significance: 'Introduced Venom' },
        { title: 'Spawn #1-present', year: '1992-present', significance: 'Creator-owned series' },
        { title: 'Spider-Man #1', year: '1990', significance: 'Best-selling comic of all time' }
      ],
      recentWorks: ['Spawn #349', 'King Spawn #25', 'Gunslinger Spawn #15'],
      upcomingProjects: ['Spawn #350 Milestone', 'Spawn Movie Reboot', 'McFarlane Toys Expansion'],
      stats: {
        totalIssues: 350,
        companiesWorked: 8,
        charactersCreated: 25,
        moviesProduced: 2,
        toysDesigned: 500
      },
      financials: {
        peRatio: 18.5,
        dividendYield: 1.2,
        beta: 1.15,
        fiftyTwoWeekHigh: 2650,
        fiftyTwoWeekLow: 1950
      }
    },
    'JLES': {
      id: 'JLES',
      name: 'Jim Lee',
      role: 'Artist/Executive',
      age: 59,
      price: 3200.00,
      change: 160.00,
      percentageChange: 5.3,
      marketCap: 160000000,
      volume: 1800,
      rating: 'Strong Buy',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=300&h=300&fit=crop&crop=face',
      bio: 'Jim Lee is a Korean American comic book artist, writer, editor, and publisher. He is currently the Publisher and Chief Creative Officer of DC Comics. Known for his detailed and dynamic art style, Lee has worked on titles including X-Men, Batman, and Justice League.',
      yearsActive: 32,
      awards: 20,
      popularity: 98,
      nextProject: 'Justice League Redesign',
      majorWorks: [
        { title: 'X-Men #1', year: '1991', significance: 'Best-selling comic book of all time' },
        { title: 'Batman: Hush', year: '2002-2003', significance: 'Defining Batman storyline' },
        { title: 'Justice League', year: '2011', significance: 'New 52 relaunch' }
      ],
      recentWorks: ['Batman #100', 'Superman #1000', 'Justice League #75'],
      upcomingProjects: ['DC Universe Relaunch', 'Batman/Superman Crossover', 'Digital Comics Initiative'],
      stats: {
        totalIssues: 420,
        companiesWorked: 5,
        charactersCreated: 35,
        moviesConsulted: 8,
        executiveYears: 12
      },
      financials: {
        peRatio: 22.3,
        dividendYield: 0.8,
        beta: 0.95,
        fiftyTwoWeekHigh: 3400,
        fiftyTwoWeekLow: 2800
      }
    },
    'DCTS': {
      id: 'DCTS',
      name: 'Donny Cates',
      role: 'Writer',
      age: 38,
      price: 1800.00,
      change: 85.00,
      percentageChange: 4.9,
      marketCap: 90000000,
      volume: 980,
      rating: 'Buy',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Donny Cates is an American comic book writer known for his work on titles such as Venom, Thor, and Cosmic Ghost Rider for Marvel Comics, as well as God Country and Redneck for Image Comics.',
      yearsActive: 12,
      awards: 8,
      popularity: 88,
      nextProject: 'Marvel Exclusive',
      majorWorks: [
        { title: 'Venom (2018)', year: '2018-2021', significance: 'Redefined the character' },
        { title: 'Thor (2020)', year: '2020-present', significance: 'God of Hammers saga' },
        { title: 'God Country', year: '2017', significance: 'Acclaimed creator-owned series' }
      ],
      recentWorks: ['Venom #35', 'Thor #25', 'Hulk #8'],
      upcomingProjects: ['New Marvel Event', 'Creator-Owned Series', 'Crossover Special'],
      stats: {
        totalIssues: 185,
        companiesWorked: 4,
        charactersCreated: 15,
        moviesInDevelopment: 1
      },
      financials: {
        peRatio: 24.5,
        dividendYield: 0.5,
        beta: 1.35,
        fiftyTwoWeekHigh: 1950,
        fiftyTwoWeekLow: 1450
      }
    },
    'ARTS': {
      id: 'ARTS',
      name: 'Stanley "Artgerm" Lau',
      role: 'Cover Artist',
      age: 45,
      price: 1500.00,
      change: -25.00,
      percentageChange: -1.6,
      marketCap: 75000000,
      volume: 750,
      rating: 'Hold',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      bio: 'Stanley "Artgerm" Lau is a Hong Kong-based illustrator, concept artist, and comic book artist. He is the co-founder of Imaginary Friends Studios and is known for his distinctive cover art for DC Comics and Marvel.',
      yearsActive: 18,
      awards: 15,
      popularity: 92,
      nextProject: 'DC Variants',
      majorWorks: [
        { title: 'DC Variant Covers', year: '2015-present', significance: 'Highly collectible variants' },
        { title: 'Marvel Variant Covers', year: '2017-present', significance: 'Fan-favorite interpretations' },
        { title: 'Imaginary Friends Studios', year: '2005-present', significance: 'Co-founder and art director' }
      ],
      recentWorks: ['Wonder Woman #800', 'Supergirl #50', 'Batgirl #25'],
      upcomingProjects: ['DC Variant Collection', 'Art Book Publication', 'Gallery Exhibition'],
      stats: {
        totalCovers: 250,
        companiesWorked: 6,
        variantsPublished: 180,
        artBooksPublished: 3
      },
      financials: {
        peRatio: 19.8,
        dividendYield: 1.0,
        beta: 0.85,
        fiftyTwoWeekHigh: 1750,
        fiftyTwoWeekLow: 1350
      }
    },
    'BMBS': {
      id: 'BMBS',
      name: 'Brian Michael Bendis',
      role: 'Writer',
      age: 56,
      price: 2100.00,
      change: -42.00,
      percentageChange: -2.0,
      marketCap: 105000000,
      volume: 1100,
      rating: 'Hold',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
      bio: 'Brian Michael Bendis is an American comic book writer and artist. He has worked on numerous major Marvel and DC titles, including Ultimate Spider-Man, New Avengers, Daredevil, and Superman.',
      yearsActive: 25,
      awards: 18,
      popularity: 85,
      nextProject: 'DC Black Label',
      majorWorks: [
        { title: 'Ultimate Spider-Man', year: '2000-2015', significance: 'Reinvention of Spider-Man' },
        { title: 'Daredevil', year: '2001-2006', significance: 'Critically acclaimed run' },
        { title: 'New Avengers', year: '2004-2012', significance: 'Defined modern Avengers' }
      ],
      recentWorks: ['Action Comics #1050', 'Legion of Super-Heroes #12', 'Checkmate #6'],
      upcomingProjects: ['DC Black Label Series', 'Creator-Owned Project', 'TV Adaptation'],
      stats: {
        totalIssues: 1200,
        companiesWorked: 7,
        charactersCreated: 45,
        tvShowsProduced: 3
      },
      financials: {
        peRatio: 20.5,
        dividendYield: 1.5,
        beta: 0.92,
        fiftyTwoWeekHigh: 2350,
        fiftyTwoWeekLow: 1950
      }
    },
    'FSTS': {
      id: 'FSTS',
      name: 'Fiona Staples',
      role: 'Artist',
      age: 39,
      price: 1650.00,
      change: 75.00,
      percentageChange: 4.8,
      marketCap: 82500000,
      volume: 650,
      rating: 'Buy',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      bio: 'Fiona Staples is a Canadian comic book artist known for her work on Saga, North 40, and various cover illustrations for DC Comics, Archie, and others.',
      yearsActive: 15,
      awards: 10,
      popularity: 90,
      nextProject: 'Saga Volume 11',
      majorWorks: [
        { title: 'Saga', year: '2012-present', significance: 'Multiple award-winning series' },
        { title: 'North 40', year: '2009-2010', significance: 'Early breakthrough work' },
        { title: 'Archie Reboot', year: '2015', significance: 'Modernized iconic character' }
      ],
      recentWorks: ['Saga #60', 'Saga #59', 'Saga #58'],
      upcomingProjects: ['Saga Continuation', 'New Creator-Owned Series', 'Cover Art Collection'],
      stats: {
        totalIssues: 120,
        companiesWorked: 5,
        eisnerAwards: 6,
        hugoAwards: 3
      },
      financials: {
        peRatio: 22.8,
        dividendYield: 0.7,
        beta: 1.05,
        fiftyTwoWeekHigh: 1800,
        fiftyTwoWeekLow: 1400
      }
    }
  };

  const creator = symbol ? mockCreatorData[symbol as keyof typeof mockCreatorData] : null;

  if (!creator) {
    return (
      <div className="space-y-6">
        <Breadcrumbs />
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Creator not found</h3>
          <p className="text-gray-400 mb-4">The creator you're looking for doesn't exist.</p>
          <Link to="/creators" className="text-indigo-400 hover:text-indigo-300">
            ← Back to Creators
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'works', label: 'Works', icon: BookOpen },
    { id: 'performance', label: 'Performance', icon: BarChart2 },
    { id: 'trading', label: 'Trading', icon: Activity }
  ];

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Strong Buy':
        return 'bg-green-900/50 text-green-200 border-green-700/50';
      case 'Buy':
        return 'bg-emerald-900/50 text-emerald-200 border-emerald-700/50';
      case 'Hold':
        return 'bg-yellow-900/50 text-yellow-200 border-yellow-700/50';
      case 'Sell':
        return 'bg-red-900/50 text-red-200 border-red-700/50';
      default:
        return 'bg-gray-900/50 text-gray-200 border-gray-700/50';
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Creator Stocks', path: '/creator-stocks' },
        { name: `${creator.name} (${creator.age})` }
      ]} />

      {/* Header */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl">
        <div className="flex items-start space-x-6">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-slate-600"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-3xl font-bold text-white">{creator.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRatingColor(creator.rating)}`}>
                {creator.rating}
              </span>
            </div>
            <p className="text-gray-400 mb-2">{creator.id} • {creator.role} • {creator.age} years old</p>
            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-400" />
                <span className="text-sm text-gray-300">{creator.awards} Awards</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-indigo-400" />
                <span className="text-sm text-gray-300">{creator.yearsActive} Years Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm text-gray-300">{creator.popularity}% Popularity</span>
              </div>
            </div>
            <p className="text-gray-300">{creator.bio}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Current Price</p>
            <p className="text-2xl font-bold text-white">CC {creator.price.toLocaleString()}</p>
            <div className="flex items-center justify-end space-x-1 mt-1">
              {creator.change > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-400" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400" />
              )}
              <span className={`font-semibold ${
                creator.change > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {creator.change > 0 ? '+' : ''}{creator.percentageChange}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl shadow-xl">
        <div className="flex space-x-1 p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors flex-1 justify-center touch-target ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Total Issues</p>
                <p className="text-xl font-bold text-white">{creator.stats.totalIssues || creator.stats.totalCovers}</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Companies</p>
                <p className="text-xl font-bold text-white">{creator.stats.companiesWorked}</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Characters</p>
                <p className="text-xl font-bold text-white">{creator.stats.charactersCreated || creator.stats.variantsPublished || 'N/A'}</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Age</p>
                <p className="text-xl font-bold text-white">{creator.age}</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">{creator.stats.toysDesigned ? 'Toys Designed' : 
                                                     creator.stats.executiveYears ? 'Executive Years' : 
                                                     creator.stats.eisnerAwards ? 'Eisner Awards' :
                                                     creator.stats.moviesProduced ? 'Movies Produced' : 
                                                     creator.stats.moviesConsulted ? 'Movies Consulted' : 
                                                     creator.stats.tvShowsProduced ? 'TV Shows' : 
                                                     creator.stats.artBooksPublished ? 'Art Books' : 
                                                     'Special Projects'}</p>
                <p className="text-xl font-bold text-white">{creator.stats.toysDesigned || 
                                                           creator.stats.executiveYears || 
                                                           creator.stats.eisnerAwards || 
                                                           creator.stats.moviesProduced || 
                                                           creator.stats.moviesConsulted || 
                                                           creator.stats.tvShowsProduced || 
                                                           creator.stats.artBooksPublished || 
                                                           creator.stats.moviesInDevelopment || 0}</p>
              </div>
            </div>

            {/* Financial Metrics */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Financial Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <p className="text-sm text-gray-400">P/E Ratio</p>
                  <p className="text-xl font-bold text-white">{creator.financials.peRatio}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <p className="text-sm text-gray-400">Dividend Yield</p>
                  <p className="text-xl font-bold text-white">{creator.financials.dividendYield}%</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <p className="text-sm text-gray-400">Beta</p>
                  <p className="text-xl font-bold text-white">{creator.financials.beta}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <p className="text-sm text-gray-400">52-Week High</p>
                  <p className="text-xl font-bold text-white">CC {creator.financials.fiftyTwoWeekHigh.toLocaleString()}</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <p className="text-sm text-gray-400">52-Week Low</p>
                  <p className="text-xl font-bold text-white">CC {creator.financials.fiftyTwoWeekLow.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Upcoming Projects */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {creator.upcomingProjects.map((project: string, index: number) => (
                  <div 
                    key={index} 
                    className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/30 relative"
                    onMouseEnter={() => setShowTooltip(`project-${index}`)}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    <p className="text-indigo-200">{project}</p>
                    
                    {showTooltip === `project-${index}` && (
                      <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-700">
                        <p className="text-sm text-white font-medium mb-1">{project}</p>
                        <p className="text-xs text-gray-300">Coming soon. Links will be active upon comic uploads.</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'works' && (
          <div className="space-y-6">
            {/* Major Works */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Major Works</h3>
              <div className="space-y-4">
                {creator.majorWorks.map((work: any, index: number) => (
                  <div 
                    key={index} 
                    className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 relative"
                    onMouseEnter={() => setShowTooltip(`work-${index}`)}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-white">{work.title}</h4>
                        <p className="text-sm text-gray-400">{work.year}</p>
                        <p className="text-sm text-gray-300 mt-1">{work.significance}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    
                    {showTooltip === `work-${index}` && (
                      <div className="absolute z-10 top-0 right-0 transform translate-x-2 -translate-y-2 w-64 bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-700">
                        <p className="text-sm text-white font-medium mb-1">{work.title}</p>
                        <p className="text-xs text-gray-300">Links will be active upon comic uploads.</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Works */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Recent Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {creator.recentWorks.map((work: string, index: number) => (
                  <div 
                    key={index} 
                    className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 relative"
                    onMouseEnter={() => setShowTooltip(`recent-${index}`)}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    <p className="text-white">{work}</p>
                    
                    {showTooltip === `recent-${index}` && (
                      <div className="absolute z-10 top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-700">
                        <p className="text-sm text-white font-medium mb-1">{work}</p>
                        <p className="text-xs text-gray-300">Latest project by {creator.name}. Links will be active upon comic uploads.</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            {/* Price Chart */}
            <CreatorStockChart 
              symbol={symbol} 
              name={creator.name} 
              timeRange="1y"
              height={350}
              className="p-0 shadow-none"
            />
            
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Market Cap</p>
                <p className="text-xl font-bold text-white">CC {(creator.marketCap / 1000000).toFixed(1)}M</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">24h Volume</p>
                <p className="text-xl font-bold text-white">{creator.volume.toLocaleString()}</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Popularity Score</p>
                <p className="text-xl font-bold text-white">{creator.popularity}%</p>
              </div>
            </div>
            
            {/* Market Analysis */}
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <h3 className="font-semibold text-white mb-3">Market Analysis</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">Strong correlation with {symbol === 'TMFS' ? 'Image Comics' : 'DC Comics'} performance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">Positive momentum indicators on all timeframes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-gray-300">Moderate volatility compared to sector average</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">Institutional ownership increasing by 5.2% this quarter</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trading' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Quick Trade</h3>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Symbol
                      </label>
                      <input
                        type="text"
                        value={symbol}
                        readOnly
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
                        placeholder="Enter quantity"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors touch-target">
                        Buy
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors touch-target">
                        Sell
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Market Data</h3>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Price</span>
                    <span className="text-white">CC {creator.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Change</span>
                    <span className={creator.change > 0 ? 'text-green-400' : 'text-red-400'}>
                      {creator.change > 0 ? '+' : ''}{creator.percentageChange}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Cap</span>
                    <span className="text-white">CC {(creator.marketCap / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volume</span>
                    <span className="text-white">{creator.volume.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">P/E Ratio</span>
                    <span className="text-white">{creator.financials.peRatio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dividend Yield</span>
                    <span className="text-white">{creator.financials.dividendYield}%</span>
                  </div>
                </div>
                
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <h4 className="font-medium text-white mb-3">Analyst Recommendations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Strong Buy</span>
                      <div className="w-32 bg-slate-600 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-sm text-white">65%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Buy</span>
                      <div className="w-32 bg-slate-600 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-sm text-white">25%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Hold</span>
                      <div className="w-32 bg-slate-600 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm text-white">10%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Sell</span>
                      <div className="w-32 bg-slate-600 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <span className="text-sm text-white">0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <h3 className="font-semibold text-white mb-3">Trading Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-indigo-400 mb-2">Strengths</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Strong track record of successful projects</li>
                    <li>• High industry recognition and award count</li>
                    <li>• Consistent output and delivery schedule</li>
                    <li>• Diversified revenue streams beyond comics</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-indigo-400 mb-2">Opportunities</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Upcoming major project announcements</li>
                    <li>• Potential media adaptations in development</li>
                    <li>• Expansion into new markets and formats</li>
                    <li>• Increasing demand for creator-owned content</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="flex justify-start">
        <Link
          to="/creator-stocks"
          className="inline-flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors touch-target"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Creator Stocks</span>
        </Link>
      </div>
    </div>
  );
}

export default CreatorProfile;