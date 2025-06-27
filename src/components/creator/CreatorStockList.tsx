import React, { useState } from 'react';
import { Users, TrendingUp, TrendingDown, Star, Award, Calendar, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface Creator {
  id: string;
  name: string;
  symbol: string;
  role: string;
  price: number;
  change: number;
  percentageChange: number;
  marketCap: number;
  volume: number;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
  nextProject?: string;
  recentWorks: string[];
  yearsActive: number;
  awards: number;
  popularity: number;
  avatar?: string;
}

export function CreatorStockList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [sortBy, setSortBy] = useState('marketCap');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const mockCreators: Creator[] = [
    {
      id: '1',
      name: 'Todd McFarlane',
      symbol: 'TMFS',
      role: 'Artist/Writer',
      price: 2500.00,
      change: 125.00,
      percentageChange: 5.2,
      marketCap: 125000000,
      volume: 1250,
      rating: 'Strong Buy',
      nextProject: 'Spawn #350',
      recentWorks: ['Spawn #349', 'Spider-Man #1', 'Venom #1'],
      yearsActive: 35,
      awards: 12,
      popularity: 95,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Donny Cates',
      symbol: 'DCTS',
      role: 'Writer',
      price: 1800.00,
      change: 85.00,
      percentageChange: 4.9,
      marketCap: 90000000,
      volume: 980,
      rating: 'Buy',
      nextProject: 'Marvel Exclusive',
      recentWorks: ['Venom #35', 'Thor #25', 'Hulk #8'],
      yearsActive: 12,
      awards: 8,
      popularity: 88,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Stanley "Artgerm" Lau',
      symbol: 'ARTS',
      role: 'Cover Artist',
      price: 1500.00,
      change: -25.00,
      percentageChange: -1.6,
      marketCap: 75000000,
      volume: 750,
      rating: 'Hold',
      nextProject: 'DC Variants',
      recentWorks: ['Wonder Woman #800', 'Supergirl #50', 'Batgirl #25'],
      yearsActive: 18,
      awards: 15,
      popularity: 92,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Jim Lee',
      symbol: 'JLES',
      role: 'Artist/Executive',
      price: 3200.00,
      change: 160.00,
      percentageChange: 5.3,
      marketCap: 160000000,
      volume: 1800,
      rating: 'Strong Buy',
      nextProject: 'Justice League Redesign',
      recentWorks: ['Batman #100', 'Superman #1000', 'Justice League #75'],
      yearsActive: 32,
      awards: 20,
      popularity: 98,
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '5',
      name: 'Brian Michael Bendis',
      symbol: 'BMBS',
      role: 'Writer',
      price: 2100.00,
      change: -42.00,
      percentageChange: -2.0,
      marketCap: 105000000,
      volume: 1100,
      rating: 'Hold',
      nextProject: 'DC Black Label',
      recentWorks: ['Action Comics #1050', 'Legion of Super-Heroes #12', 'Checkmate #6'],
      yearsActive: 25,
      awards: 18,
      popularity: 85,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '6',
      name: 'Fiona Staples',
      symbol: 'FSTS',
      role: 'Artist',
      price: 1650.00,
      change: 75.00,
      percentageChange: 4.8,
      marketCap: 82500000,
      volume: 650,
      rating: 'Buy',
      nextProject: 'Saga Volume 11',
      recentWorks: ['Saga #60', 'Saga #59', 'Saga #58'],
      yearsActive: 15,
      awards: 10,
      popularity: 90,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const roles = ['All', 'Writer', 'Artist', 'Cover Artist', 'Artist/Writer', 'Artist/Executive'];
  const ratings = ['All', 'Strong Buy', 'Buy', 'Hold', 'Sell'];

  const filteredCreators = mockCreators
    .filter(creator => {
      const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           creator.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = selectedRole === 'All' || creator.role === selectedRole;
      const matchesRating = selectedRating === 'All' || creator.rating === selectedRating;
      return matchesSearch && matchesRole && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'marketCap':
          return b.marketCap - a.marketCap;
        case 'price':
          return b.price - a.price;
        case 'change':
          return b.percentageChange - a.percentageChange;
        case 'popularity':
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });

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
      <Breadcrumbs />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">Comic Creators</h1>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Calendar className="h-5 w-5" />
          <span className="text-sm">Real-time data</span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search creators..."
              className="pl-10 pr-4 py-2 w-full bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 touch-target"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-slate-700/50 text-white text-sm border-slate-600/50 rounded-lg px-3 py-2 w-full touch-target"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="bg-slate-700/50 text-white text-sm border-slate-600/50 rounded-lg px-3 py-2 touch-target"
          >
            {ratings.map(rating => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-700/50 text-white text-sm border-slate-600/50 rounded-lg px-3 py-2 touch-target"
          >
            <option value="marketCap">Market Cap</option>
            <option value="price">Price</option>
            <option value="change">% Change</option>
            <option value="popularity">Popularity</option>
          </select>

          <div className="text-sm text-gray-400 flex items-center">
            {filteredCreators.length} creators found
          </div>
        </div>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredCreators.map((creator) => (
          <div
            key={creator.id}
            onClick={() => setSelectedCard(selectedCard === creator.id ? null : creator.id)}
            className={`group relative bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all hover:-translate-y-1 cursor-pointer touch-target
              ${selectedCard === creator.id ? 'shadow-[0_0_15px_rgba(255,255,0,0.9)]' : ''}`}
          >
            {/* Creator Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-600"
                />
                <div className="absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg">{creator.name}</h3>
                <p className="text-sm text-gray-400">{creator.symbol} • {creator.role}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRatingColor(creator.rating)}`}>
                    {creator.rating}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Award className="h-3 w-3 text-yellow-400" />
                    <span className="text-xs text-gray-400">{creator.awards} awards</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price and Change */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Current Price</p>
                <p className="text-xl font-bold text-white">CC {creator.price.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
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
                <p className="text-sm text-gray-400">
                  {creator.change > 0 ? '+' : ''}CC {creator.change.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-400">Market Cap</p>
                <p className="font-semibold text-white">CC {(creator.marketCap / 1000000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Volume</p>
                <p className="font-semibold text-white">{creator.volume.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Years Active</p>
                <p className="font-semibold text-white">{creator.yearsActive}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Popularity</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${creator.popularity}%` }}
                    />
                  </div>
                  <span className="text-xs text-white">{creator.popularity}%</span>
                </div>
              </div>
            </div>

            {/* Recent Works */}
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Recent Works</p>
              <div className="flex flex-wrap gap-1">
                {creator.recentWorks.slice(0, 2).map((work, index) => (
                  <span key={index} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-gray-300">
                    {work}
                  </span>
                ))}
                {creator.recentWorks.length > 2 && (
                  <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-gray-400">
                    +{creator.recentWorks.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* Next Project */}
            {creator.nextProject && (
              <div className="mb-4 bg-indigo-900/30 rounded-lg p-3 border border-indigo-700/30">
                <p className="text-sm text-indigo-200">
                  <span className="font-medium">Next Project:</span> {creator.nextProject}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Link
                to={`/creator/${creator.symbol}`}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center touch-target"
              >
                View Details
              </Link>
              <Link
                to={`/trading/${creator.symbol}`}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center touch-target"
              >
                Trade
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredCreators.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No creators found</h3>
          <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
}

export default CreatorStockList;