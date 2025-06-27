import React, { useState } from 'react';
import { 
  User, TrendingUp, TrendingDown, Star, Calendar, 
  BookOpen, Award, ArrowLeft, ExternalLink, 
  Zap, Shield, Crosshair, Heart, Users, Film
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { allCharacters } from '../../data/characterData';

interface CharacterBioProps {
  characterId?: string;
}

export function CharacterBio({ characterId }: CharacterBioProps) {
  const { symbol: urlSymbol } = useParams<{ symbol: string }>();
  const symbol = characterId || urlSymbol || '';
  const [activeTab, setActiveTab] = useState<'overview' | 'background' | 'abilities' | 'media'>('overview');
  
  // Find the character by symbol
  const character = allCharacters.find(c => c.symbol === symbol);

  if (!character) {
    return (
      <div className="space-y-6">
        <Breadcrumbs />
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Character not found</h3>
          <p className="text-gray-400 mb-4">The character you're looking for doesn't exist.</p>
          <Link to="/characters" className="text-indigo-400 hover:text-indigo-300">
            ← Back to Characters
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'background', label: 'Background', icon: BookOpen },
    { id: 'abilities', label: 'Abilities', icon: Zap },
    { id: 'media', label: 'Media', icon: Film }
  ];

  const getCharacterTypeIcon = (type: string) => {
    switch (type) {
      case 'hero': return '🦸‍♂️';
      case 'villain': return '🦹‍♂️';
      case 'sidekick': return '🤝';
      case 'henchman': return '🧟‍♂️';
      default: return '👤';
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Characters', path: '/characters' },
        { name: character.name }
      ]} />

      {/* Character Header */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
          {/* Character Portrait */}
          <div className="flex-shrink-0 mb-6 md:mb-0">
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-xl overflow-hidden border-4 border-slate-700">
              <img 
                src={character.avatar || "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=300&fit=crop"} 
                alt={character.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-2">
                <div className="flex items-center justify-center">
                  <span className="text-xl">{getCharacterTypeIcon(character.characterType)}</span>
                  <span className="ml-2 text-xs font-medium text-white capitalize">{character.characterType}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Popularity: {character.popularity}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Film className="h-4 w-4 text-indigo-400" />
                <span className="text-sm text-gray-300">Media: {character.mediaAppearances}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">First: {character.firstAppearance}</span>
              </div>
            </div>
          </div>
          
          {/* Character Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">{character.name}</h1>
                <p className="text-gray-400 mb-2">{character.symbol} • {character.publisher}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-900/50 text-indigo-200 border border-indigo-700/50">
                    SB1-GQDVG7SE
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-2">Introduction</h2>
              <p className="text-gray-300">{character.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-2">Key Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Publisher:</span>
                    <span className="text-white">{character.publisher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">First Appearance:</span>
                    <span className="text-white">{character.firstAppearance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Character Type:</span>
                    <span className="text-white capitalize">{character.characterType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nemesis:</span>
                    <span className="text-white">{character.nemesis || 'None'}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-2">Market Data</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Price:</span>
                    <span className="text-white">CC {character.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Cap:</span>
                    <span className="text-white">CC {(character.marketCap / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Change:</span>
                    <div className="flex items-center">
                      {character.change > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                      )}
                      <span className={character.change > 0 ? 'text-green-400' : 'text-red-400'}>
                        {character.change > 0 ? '+' : ''}{character.percentageChange}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volume:</span>
                    <span className="text-white">{character.volume.toLocaleString()}</span>
                  </div>
                </div>
              </div>
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
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Physical Description */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Physical Description</h2>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-gray-300">
                  {character.description || `${character.name} is a ${character.characterType} in the ${character.publisher} universe. Known for their distinctive appearance and presence, they have become an iconic figure in comic book history.`}
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Distinguishing Features</p>
                    <p className="text-white">Iconic costume, distinctive silhouette</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Physical Abilities</p>
                    <p className="text-white">{character.powers.slice(0, 2).join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Appearance</p>
                    <p className="text-white">Instantly recognizable, visually striking</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personality */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Personality & Motivations</h2>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-gray-300 mb-4">
                  {character.characterType === 'hero' 
                    ? `Driven by a strong sense of justice and responsibility, ${character.name} consistently puts the needs of others before their own. Their unwavering moral compass guides their actions, even in the face of overwhelming adversity.`
                    : character.characterType === 'villain'
                    ? `With a complex and often twisted worldview, ${character.name} pursues their goals with ruthless determination. Their actions are guided by a personal philosophy that puts them at odds with society's heroes.`
                    : `As a ${character.characterType}, ${character.name} has developed a unique personality that complements their role in the comic universe. Their motivations are shaped by their relationships and experiences.`}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-white mb-2">Key Traits</h3>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400">•</span>
                        <span>{character.characterType === 'hero' ? 'Courageous and selfless' : character.characterType === 'villain' ? 'Calculating and ambitious' : 'Loyal and resourceful'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400">•</span>
                        <span>{character.characterType === 'hero' ? 'Determined and resilient' : character.characterType === 'villain' ? 'Intelligent and cunning' : 'Adaptable and quick-thinking'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400">•</span>
                        <span>{character.characterType === 'hero' ? 'Compassionate and empathetic' : character.characterType === 'villain' ? 'Charismatic and manipulative' : 'Supportive and practical'}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-2">Core Motivations</h3>
                    <ul className="space-y-1 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400">•</span>
                        <span>{character.characterType === 'hero' ? 'Protect the innocent' : character.characterType === 'villain' ? 'Achieve power and control' : 'Support their allies'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400">•</span>
                        <span>{character.characterType === 'hero' ? 'Uphold justice' : character.characterType === 'villain' ? 'Revenge against enemies' : 'Prove their worth'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400">•</span>
                        <span>{character.characterType === 'hero' ? 'Inspire others' : character.characterType === 'villain' ? 'Reshape society in their image' : 'Find their place in the world'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Relationships */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Key Relationships</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {character.nemesis && (
                  <div className="bg-red-900/30 p-4 rounded-lg border border-red-700/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Crosshair className="h-5 w-5 text-red-400" />
                      <h4 className="font-medium text-white">Nemesis</h4>
                    </div>
                    <p className="text-red-200">{character.nemesis}</p>
                    <p className="text-sm text-red-300 mt-2">
                      {character.characterType === 'hero' 
                        ? `The arch-enemy of ${character.name}, representing their greatest challenge and darkest reflection.`
                        : `The primary obstacle in ${character.name}'s path, constantly working to thwart their plans.`}
                    </p>
                  </div>
                )}
                
                {character.allies && character.allies.length > 0 && (
                  <div className="bg-green-900/30 p-4 rounded-lg border border-green-700/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-green-400" />
                      <h4 className="font-medium text-white">Allies</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {character.allies.map((ally, index) => (
                        <span key={index} className="px-2 py-1 bg-green-900/50 rounded text-sm text-green-200">
                          {ally}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-green-300 mt-2">
                      {character.characterType === 'hero' 
                        ? `Trusted companions who fight alongside ${character.name} in the battle against evil.`
                        : character.characterType === 'villain'
                        ? `Fellow conspirators who assist ${character.name} in their nefarious schemes.`
                        : `Important connections who support ${character.name} in their endeavors.`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'background' && (
          <div className="space-y-6">
            {/* Origin Story */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Origin Story</h2>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-gray-300 mb-4">
                  {character.characterType === 'hero' 
                    ? `${character.name}'s journey began with a life-altering event that forever changed their path. First appearing in ${character.firstAppearance}, they quickly became one of ${character.publisher}'s most iconic characters.`
                    : character.characterType === 'villain'
                    ? `The origins of ${character.name} are shrouded in mystery and tragedy. Making their debut in ${character.firstAppearance}, they established themselves as a formidable presence in the ${character.publisher} universe.`
                    : `${character.name} was introduced in ${character.firstAppearance} as a ${character.characterType} in the ${character.publisher} universe. Their background story provides crucial context for their role in the larger narrative.`}
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-white mb-2">Early Life</h3>
                    <p className="text-gray-300">
                      Before becoming known as {character.name}, they lived a life that would eventually set them on the path to becoming a {character.characterType}. These formative experiences shaped their worldview and abilities.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-2">Transformation</h3>
                    <p className="text-gray-300">
                      The pivotal moment that transformed them into {character.name} occurred when they {character.characterType === 'hero' ? 'discovered their extraordinary abilities and chose to use them for good' : character.characterType === 'villain' ? 'embraced their darker impulses after a series of tragic events' : 'found themselves in a position to support the main characters in their adventures'}.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-2">Evolution</h3>
                    <p className="text-gray-300">
                      Over the years, {character.name} has evolved significantly from their first appearance in {character.firstAppearance}. Their character has been shaped by countless battles, personal losses, and triumphs that have added depth to their story.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Storylines */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Key Storylines</h2>
              <div className="space-y-4">
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <h3 className="font-medium text-white mb-2">Defining Arcs</h3>
                  <div className="space-y-3">
                    <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                      <h4 className="text-indigo-400 font-medium">Origin Saga</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        The initial storyline that introduced {character.name} to readers, establishing their core motivations and abilities.
                      </p>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                      <h4 className="text-indigo-400 font-medium">Greatest Challenge</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        A pivotal storyline where {character.name} faced their greatest test, pushing their abilities and resolve to the limit.
                      </p>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                      <h4 className="text-indigo-400 font-medium">Modern Era</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        Recent developments that have shaped the current status and direction of {character.name} in the {character.publisher} universe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notable Achievements */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Notable Achievements</h2>
              <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/30">
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <Award className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>First appeared in {character.firstAppearance}, quickly becoming a fan favorite</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Award className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>Featured in {character.mediaAppearances} media adaptations across film, television, and video games</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Award className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>Maintains a {character.popularity}% popularity rating among comic readers and general audiences</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Award className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>{character.characterType === 'hero' ? 'Saved the world on numerous occasions' : character.characterType === 'villain' ? 'Orchestrated some of the most memorable schemes in comic history' : 'Played a crucial supporting role in major storylines'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'abilities' && (
          <div className="space-y-6">
            {/* Powers & Abilities */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Powers & Abilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {character.powers.map((power, index) => (
                  <div key={index} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      <h3 className="font-medium text-white">{power}</h3>
                    </div>
                    <p className="text-gray-300 mt-2">
                      {character.name} utilizes this ability with exceptional skill, making it a crucial part of their arsenal.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Skills & Expertise */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Skills & Expertise</h2>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-white mb-3">Combat Abilities</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Strength</span>
                        <div className="w-32 bg-slate-600 rounded-full h-2">
                          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${character.popularity * 0.9}%` }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Speed</span>
                        <div className="w-32 bg-slate-600 rounded-full h-2">
                          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${character.popularity * 0.85}%` }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Durability</span>
                        <div className="w-32 bg-slate-600 rounded-full h-2">
                          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${character.popularity * 0.95}%` }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Intelligence</span>
                        <div className="w-32 bg-slate-600 rounded-full h-2">
                          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${character.popularity * 0.8}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-white mb-3">Special Skills</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400">•</span>
                        <span>Master strategist and tactician</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400">•</span>
                        <span>Expert in multiple combat disciplines</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400">•</span>
                        <span>Exceptional problem-solving abilities</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-indigo-400">•</span>
                        <span>Unmatched determination and willpower</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Equipment & Resources */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Equipment & Resources</h2>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-gray-300 mb-4">
                  {character.name} utilizes a variety of specialized equipment and resources in their adventures.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                    <h3 className="text-indigo-400 font-medium">Signature Equipment</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      The iconic tools and weapons that have become synonymous with {character.name}.
                    </p>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                    <h3 className="text-indigo-400 font-medium">Headquarters</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      The base of operations from which {character.name} plans and executes their activities.
                    </p>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                    <h3 className="text-indigo-400 font-medium">Transportation</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      Specialized vehicles and methods of travel used by {character.name}.
                    </p>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                    <h3 className="text-indigo-400 font-medium">Support Network</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      The extended network of allies and resources that {character.name} can call upon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="space-y-6">
            {/* Media Appearances */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Media Appearances</h2>
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <p className="text-gray-300 mb-4">
                  {character.name} has appeared in {character.mediaAppearances} media adaptations across various platforms.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                    <h3 className="text-indigo-400 font-medium">Film</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      Major motion picture appearances, bringing {character.name} to the big screen.
                    </p>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                    <h3 className="text-indigo-400 font-medium">Television</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      TV series and animated shows featuring {character.name}.
                    </p>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                    <h3 className="text-indigo-400 font-medium">Video Games</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      Interactive adventures where players can experience {character.name}'s world.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notable Scenes */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Notable Scenes</h2>
              <div className="space-y-4">
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <h3 className="font-medium text-white mb-2">Iconic Moments</h3>
                  <div className="space-y-3">
                    <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                      <h4 className="text-indigo-400 font-medium">First Appearance</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        The debut of {character.name} in {character.firstAppearance}, introducing them to the world.
                      </p>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                      <h4 className="text-indigo-400 font-medium">Defining Confrontation</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        The legendary battle between {character.name} and {character.nemesis || 'their greatest adversary'}, which has become a cornerstone of comic book history.
                      </p>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                      <h4 className="text-indigo-400 font-medium">Character-Defining Moment</h4>
                      <p className="text-sm text-gray-300 mt-1">
                        A pivotal scene that perfectly encapsulates the essence of {character.name} and their place in the {character.publisher} universe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cultural Impact */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Cultural Impact</h2>
              <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/30">
                <p className="text-gray-300 mb-4">
                  With a popularity rating of {character.popularity}%, {character.name} has made a significant impact on popular culture beyond the pages of comic books.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>Recognized by fans worldwide as one of {character.publisher}'s most iconic characters</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>Merchandise featuring {character.name} continues to be highly sought after by collectors</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>Has influenced numerous other characters and stories across various media</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="flex justify-start">
        <Link
          to="/characters"
          className="inline-flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors touch-target"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Characters</span>
        </Link>
      </div>
    </div>
  );
}

export default CharacterBio;