import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, Star, BookOpen, Calendar, Users, Building2, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  type: 'character' | 'creator' | 'publisher' | 'bond' | 'fund' | 'location' | 'gadget' | 'news' | 'learn';
  symbol?: string;
  price?: number;
  change?: number;
  percentageChange?: number;
  description?: string;
  url: string;
  imageUrl?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setResults([]);
      setIsLoading(false);
      setSelectedIndex(0);
    }
  }, [isOpen]);
  
  // Search function
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    const timeoutId = setTimeout(() => {
      // Mock search results
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: 'Amazing Spider-Man #300',
          type: 'character',
          symbol: 'ASM300',
          price: 2500,
          change: 125,
          percentageChange: 5.2,
          description: 'First full appearance of Venom',
          url: '/character/ASM300',
          imageUrl: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=150&h=150&fit=crop'
        },
        {
          id: '2',
          title: 'Todd McFarlane',
          type: 'creator',
          symbol: 'TMFS',
          price: 1850,
          change: -37,
          percentageChange: -2.0,
          description: 'Artist and writer, creator of Spawn',
          url: '/creator/TMFS',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
        },
        {
          id: '3',
          title: 'Marvel Entertainment Bond',
          type: 'bond',
          symbol: 'MRVLB',
          price: 1035.50,
          change: 8.25,
          percentageChange: 0.80,
          description: 'AAA-rated corporate bond',
          url: '/bond/MRVLB'
        },
        {
          id: '4',
          title: 'Superhero Universe Fund',
          type: 'fund',
          symbol: 'SHUF',
          price: 25.75,
          change: 0.45,
          percentageChange: 1.78,
          description: 'Diversified fund of superhero assets',
          url: '/fund/SHUF'
        },
        {
          id: '5',
          title: 'Marvel Announces New Spider-Man Series',
          type: 'news',
          description: 'Major creative team reveals plans for groundbreaking storyline',
          url: '/news/marvel-spider-man-beyond'
        },
        {
          id: '6',
          title: 'Understanding Comic Ages',
          type: 'learn',
          description: 'Master the classification system from Golden Age to Modern Age comics',
          url: '/learn'
        },
        {
          id: '7',
          title: 'Avengers Tower',
          type: 'location',
          symbol: 'AVTR',
          price: 2800,
          change: 140,
          percentageChange: 5.3,
          description: 'Headquarters of the Avengers',
          url: '/location/AVTR',
          imageUrl: 'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=150&h=150&fit=crop'
        },
        {
          id: '8',
          title: 'Iron Man Suit',
          type: 'gadget',
          symbol: 'IMST',
          price: 3500,
          change: 175,
          percentageChange: 5.3,
          description: 'Powered exoskeleton designed by Tony Stark',
          url: '/gadget/IMST',
          imageUrl: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=150&h=150&fit=crop'
        }
      ];
      
      // Filter by category if needed
      const filteredResults = selectedCategory === 'all' 
        ? mockResults 
        : mockResults.filter(result => result.type === selectedCategory);
      
      // Filter by search query
      const searchResults = filteredResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (result.symbol && result.symbol.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (result.description && result.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      setResults(searchResults);
      setIsLoading(false);
      setSelectedIndex(0);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory]);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        if (results[selectedIndex]) {
          navigate(results[selectedIndex].url);
          onClose();
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };
  
  // Get icon for result type
  const getResultTypeIcon = (type: string) => {
    switch (type) {
      case 'character': return <Users className="h-5 w-5 text-indigo-400" />;
      case 'creator': return <Users className="h-5 w-5 text-green-400" />;
      case 'publisher': return <Building2 className="h-5 w-5 text-yellow-400" />;
      case 'bond': return <Briefcase className="h-5 w-5 text-purple-400" />;
      case 'fund': return <Briefcase className="h-5 w-5 text-blue-400" />;
      case 'location': return <Building2 className="h-5 w-5 text-orange-400" />;
      case 'gadget': return <Briefcase className="h-5 w-5 text-red-400" />;
      case 'news': return <Calendar className="h-5 w-5 text-indigo-400" />;
      case 'learn': return <BookOpen className="h-5 w-5 text-green-400" />;
      default: return <Star className="h-5 w-5 text-yellow-400" />;
    }
  };
  
  // Get label for result type
  const getResultTypeLabel = (type: string) => {
    switch (type) {
      case 'character': return 'Character';
      case 'creator': return 'Creator';
      case 'publisher': return 'Publisher';
      case 'bond': return 'Bond';
      case 'fund': return 'Fund';
      case 'location': return 'Location';
      case 'gadget': return 'Gadget';
      case 'news': return 'News';
      case 'learn': return 'Learning';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-20"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800/95 rounded-xl shadow-2xl border border-slate-700/50 w-full max-w-3xl max-h-[80vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for assets, news, learning resources..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        
        {/* Category filters */}
        <div className="flex overflow-x-auto p-2 border-b border-slate-700/50">
          {['all', 'character', 'creator', 'publisher', 'bond', 'fund', 'location', 'gadget', 'news', 'learn'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap mr-2 ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700/50 text-gray-300 hover:bg-indigo-600/20 hover:text-white'
              }`}
            >
              {category === 'all' ? 'All Categories' : getResultTypeLabel(category)}
            </button>
          ))}
        </div>
        
        {/* Results */}
        <div className="overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  to={result.url}
                  className={`flex items-start p-3 rounded-lg ${
                    index === selectedIndex
                      ? 'bg-indigo-600/20 hover:bg-indigo-600/30'
                      : 'hover:bg-slate-700/50'
                  } transition-colors`}
                  onClick={onClose}
                >
                  {result.imageUrl ? (
                    <img 
                      src={result.imageUrl} 
                      alt={result.title}
                      className="w-12 h-12 rounded object-cover mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded bg-slate-700/50 flex items-center justify-center mr-4">
                      {getResultTypeIcon(result.type)}
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white truncate">{result.title}</h3>
                      <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-700/50 text-gray-300">
                        {getResultTypeLabel(result.type)}
                      </span>
                    </div>
                    
                    {result.symbol && (
                      <p className="text-sm text-gray-400 mt-0.5">{result.symbol}</p>
                    )}
                    
                    {result.description && (
                      <p className="text-sm text-gray-300 mt-1 line-clamp-1">{result.description}</p>
                    )}
                    
                    {result.price && (
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-white mr-2">CC {result.price.toLocaleString()}</span>
                        {result.percentageChange && (
                          <span className={`text-xs flex items-center ${
                            result.percentageChange >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {result.percentageChange >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-0.5" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-0.5" />
                            )}
                            {result.percentageChange >= 0 ? '+' : ''}{result.percentageChange}%
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400 mb-2">No results found for "{searchQuery}"</p>
              <p className="text-sm text-gray-500">Try a different search term or category</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400 mb-2">Start typing to search</p>
              <p className="text-sm text-gray-500">Search for assets, news, learning resources, and more</p>
            </div>
          )}
        </div>
        
        {/* Footer with keyboard shortcuts */}
        <div className="p-4 border-t border-slate-700/50 text-xs text-gray-400 flex justify-between">
          <div>
            <span className="mr-4">↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <div>
            <span>ESC to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalSearch;