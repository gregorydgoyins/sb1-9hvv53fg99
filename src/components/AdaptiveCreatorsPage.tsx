import React, { useState } from 'react';
import { Breadcrumbs } from './common/Breadcrumbs';
import { CreatorCard } from './creator/CreatorCard';
import { Users, Filter, Search, Calendar } from 'lucide-react';

interface AdaptiveCreatorsPageProps {
  title?: string;
  description?: string;
  category?: string;
  initialFilters?: {
    role?: string;
    sortBy?: string;
  };
}

export function AdaptiveCreatorsPage({ 
  title = "Creator Stocks", 
  description = "Invest in the creative minds behind your favorite comics.",
  category,
  initialFilters
}: AdaptiveCreatorsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState(initialFilters?.role || 'All');
  const [sortBy, setSortBy] = useState(initialFilters?.sortBy || 'popularity');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Mock data for different categories
  const categoryData: Record<string, any> = {
    'heroes': {
      creators: [
        {
          id: '1',
          name: 'Todd McFarlane',
          symbol: 'TMFS',
          role: 'Artist/Writer',
          age: 62,
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
          id: '4',
          name: 'Jim Lee',
          symbol: 'JLES',
          role: 'Artist/Executive',
          age: 59,
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
          id: '7',
          name: 'Scott Snyder',
          symbol: 'SSNY',
          role: 'Writer',
          age: 47,
          price: 2250.00,
          change: 112.50,
          percentageChange: 5.3,
          marketCap: 112500000,
          volume: 1050,
          rating: 'Strong Buy',
          nextProject: 'Dark Spaces: Wildfire',
          recentWorks: ['Batman: Last Knight on Earth', 'Nocterra', 'Undiscovered Country'],
          yearsActive: 16,
          awards: 14,
          popularity: 93,
          avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face'
        }
      ]
    },
    'supervillains': {
      creators: [
        {
          id: '2',
          name: 'Donny Cates',
          symbol: 'DCTS',
          role: 'Writer',
          age: 38,
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
          id: '5',
          name: 'Brian Michael Bendis',
          symbol: 'BMBS',
          role: 'Writer',
          age: 56,
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
          id: '8',
          name: 'Greg Capullo',
          symbol: 'GCAP',
          role: 'Artist',
          age: 60,
          price: 1950.00,
          change: -39.00,
          percentageChange: -2.0,
          marketCap: 97500000,
          volume: 920,
          rating: 'Hold',
          nextProject: 'Batman: Fear State',
          recentWorks: ['Batman: Last Knight on Earth', 'Batman: Death Metal', 'Reborn'],
          yearsActive: 35,
          awards: 16,
          popularity: 91,
          avatar: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=150&h=150&fit=crop&crop=face'
        }
      ]
    },
    'sidekicks': {
      creators: [
        {
          id: '3',
          name: 'Stanley "Artgerm" Lau',
          symbol: 'ARTS',
          role: 'Cover Artist',
          age: 45,
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
          id: '6',
          name: 'Fiona Staples',
          symbol: 'FSTS',
          role: 'Artist',
          age: 39,
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
        },
        {
          id: '9',
          name: 'Kelly Sue DeConnick',
          symbol: 'KSDC',
          role: 'Writer',
          age: 52,
          price: 1750.00,
          change: 87.50,
          percentageChange: 5.3,
          marketCap: 87500000,
          volume: 820,
          rating: 'Buy',
          nextProject: 'Aquaman: Andromeda',
          recentWorks: ['Captain Marvel', 'Aquaman', 'Bitch Planet'],
          yearsActive: 18,
          awards: 9,
          popularity: 87,
          avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face'
        }
      ]
    },
    'henchmen': {
      creators: [
        {
          id: '10',
          name: 'Becky Cloonan',
          symbol: 'BCLN',
          role: 'Artist/Writer',
          age: 42,
          price: 1450.00,
          change: 72.50,
          percentageChange: 5.3,
          marketCap: 72500000,
          volume: 680,
          rating: 'Buy',
          nextProject: 'Dark Agnes',
          recentWorks: ['Batman', 'Punisher', 'By Chance or Providence'],
          yearsActive: 16,
          awards: 7,
          popularity: 84,
          avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: '11',
          name: 'Jeff Lemire',
          symbol: 'JLEM',
          role: 'Writer/Artist',
          age: 48,
          price: 1850.00,
          change: -37.00,
          percentageChange: -2.0,
          marketCap: 92500000,
          volume: 870,
          rating: 'Hold',
          nextProject: 'Gideon Falls TV Adaptation',
          recentWorks: ['Sweet Tooth', 'Black Hammer', 'Descender'],
          yearsActive: 20,
          awards: 13,
          popularity: 89,
          avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face'
        },
        {
          id: '12',
          name: 'Joëlle Jones',
          symbol: 'JJNS',
          role: 'Artist/Writer',
          age: 41,
          price: 1550.00,
          change: 77.50,
          percentageChange: 5.3,
          marketCap: 77500000,
          volume: 730,
          rating: 'Buy',
          nextProject: 'Catwoman: Lonely City',
          recentWorks: ['Catwoman', 'Lady Killer', 'Batman'],
          yearsActive: 14,
          awards: 8,
          popularity: 86,
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
        }
      ]
    },
    'characters': {
      creators: [
        {
          id: '1',
          name: 'Spider-Man',
          symbol: 'SPDR',
          role: 'Superhero',
          age: 60,
          price: 3500.00,
          change: 175.00,
          percentageChange: 5.3,
          marketCap: 175000000,
          volume: 2250,
          rating: 'Strong Buy',
          nextProject: 'Spider-Man: Beyond',
          recentWorks: ['Amazing Spider-Man #900', 'Spider-Man 2099', 'Spider-Verse'],
          yearsActive: 60,
          awards: 25,
          popularity: 98,
          avatar: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=150&fit=crop'
        },
        {
          id: '2',
          name: 'Batman',
          symbol: 'BATM',
          role: 'Superhero',
          age: 80,
          price: 4200.00,
          change: 210.00,
          percentageChange: 5.3,
          marketCap: 210000000,
          volume: 2800,
          rating: 'Strong Buy',
          nextProject: 'Batman: Gotham Knights',
          recentWorks: ['Batman #100', 'Detective Comics #1050', 'Nightwing #90'],
          yearsActive: 80,
          awards: 30,
          popularity: 99,
          avatar: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=150&h=150&fit=crop'
        }
      ]
    },
    'locations': {
      creators: [
        {
          id: '1',
          name: 'Batcave',
          symbol: 'BTCV',
          role: 'Location',
          age: 80,
          price: 3200.00,
          change: 160.00,
          percentageChange: 5.3,
          marketCap: 160000000,
          volume: 2100,
          rating: 'Strong Buy',
          nextProject: 'Batman: Gotham Knights',
          recentWorks: ['Batman #100', 'Detective Comics #1050', 'Nightwing #90'],
          yearsActive: 80,
          awards: 15,
          popularity: 95,
          avatar: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&h=150&fit=crop'
        },
        {
          id: '2',
          name: 'Avengers Tower',
          symbol: 'AVTR',
          role: 'Location',
          age: 60,
          price: 2800.00,
          change: 140.00,
          percentageChange: 5.3,
          marketCap: 140000000,
          volume: 1850,
          rating: 'Strong Buy',
          nextProject: 'Avengers: Secret Wars',
          recentWorks: ['Avengers #50', 'Iron Man #25', 'Captain America #30'],
          yearsActive: 60,
          awards: 10,
          popularity: 92,
          avatar: 'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=150&h=150&fit=crop'
        }
      ]
    },
    'gadgets': {
      creators: [
        {
          id: '1',
          name: 'Iron Man Suit',
          symbol: 'IMST',
          role: 'Gadget',
          age: 60,
          price: 3500.00,
          change: 175.00,
          percentageChange: 5.3,
          marketCap: 175000000,
          volume: 2300,
          rating: 'Strong Buy',
          nextProject: 'Armor Wars',
          recentWorks: ['Iron Man #25', 'Avengers #50', 'Invincible Iron Man'],
          yearsActive: 60,
          awards: 18,
          popularity: 96,
          avatar: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=150&h=150&fit=crop'
        },
        {
          id: '2',
          name: 'Mjolnir',
          symbol: 'MJLR',
          role: 'Gadget',
          age: 60,
          price: 3200.00,
          change: -64.00,
          percentageChange: -2.0,
          marketCap: 160000000,
          volume: 2100,
          rating: 'Buy',
          nextProject: 'Thor: Love and Thunder',
          recentWorks: ['Thor #25', 'Avengers #50', 'War of the Realms'],
          yearsActive: 60,
          awards: 12,
          popularity: 94,
          avatar: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=150&h=150&fit=crop'
        }
      ]
    },
    'publishers': {
      creators: [
        {
          id: '1',
          name: 'Marvel Entertainment',
          symbol: 'MRVL',
          role: 'Publisher',
          age: 85,
          price: 4200.00,
          change: 210.00,
          percentageChange: 5.3,
          marketCap: 210000000,
          volume: 2800,
          rating: 'Strong Buy',
          nextProject: 'Marvel Phase 5',
          recentWorks: ['Avengers #50', 'X-Men #1', 'Fantastic Four #35'],
          yearsActive: 85,
          awards: 45,
          popularity: 99,
          avatar: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=150&h=150&fit=crop'
        },
        {
          id: '2',
          name: 'DC Comics',
          symbol: 'DCCP',
          role: 'Publisher',
          age: 85,
          price: 3800.00,
          change: -76.00,
          percentageChange: -2.0,
          marketCap: 190000000,
          volume: 2500,
          rating: 'Buy',
          nextProject: 'DC Universe Relaunch',
          recentWorks: ['Batman #100', 'Action Comics #1050', 'Wonder Woman #800'],
          yearsActive: 85,
          awards: 40,
          popularity: 97,
          avatar: 'https://images.unsplash.com/photo-1588497859490-85d1c17db96d?w=150&h=150&fit=crop'
        }
      ]
    }
  };

  // Default to all creators if no category is specified
  const defaultCreators = [
    ...categoryData['heroes'].creators,
    ...categoryData['supervillains'].creators,
    ...categoryData['sidekicks'].creators
  ];

  // Get creators based on category
  const creators = category && categoryData[category] 
    ? categoryData[category].creators 
    : defaultCreators;
  
  const roles = ['All', 'Writer', 'Artist', 'Cover Artist', 'Artist/Writer', 'Artist/Executive', 'Superhero', 'Location', 'Gadget', 'Publisher'];

  const filteredCreators = creators
    .filter((creator: any) => {
      const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           creator.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = selectedRole === 'All' || creator.role === selectedRole;
      return matchesSearch && matchesRole;
    })
    .sort((a: any, b: any) => {
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

  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Creators', path: '/creators' },
        { name: title }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Calendar className="h-5 w-5" />
          <span className="text-sm">Real-time data</span>
        </div>
      </div>

      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl">
        <p className="text-gray-300 mb-4">{description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-700/50 text-white text-sm border-slate-600/50 rounded-lg px-3 py-2 touch-target"
          >
            <option value="popularity">Popularity</option>
            <option value="marketCap">Market Cap</option>
            <option value="price">Price</option>
            <option value="change">% Change</option>
          </select>
        </div>
      </div>

      {/* Creators Grid - 3x3 Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {filteredCreators.map((creator: any) => (
          <CreatorCard 
            key={creator.id}
            creator={creator}
            onSelect={(id) => setSelectedCard(selectedCard === id ? null : id)}
            isSelected={selectedCard === creator.id}
          />
        ))}
      </div>

      {filteredCreators.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No items found</h3>
          <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
}

export default AdaptiveCreatorsPage;