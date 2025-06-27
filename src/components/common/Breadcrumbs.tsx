import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  overrides?: Array<{
    name: string;
    path?: string;
  }>;
}

export function Breadcrumbs({ overrides }: BreadcrumbsProps) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbLabels: Record<string, string> = {
    markets: 'Markets',
    portfolio: 'Portfolio',
    trading: 'Trading',
    news: 'News',
    learn: 'Learn',
    research: 'Research',
    'market-index': 'Market Index',
    'price-trends': 'Price Trends',
    'navigation-test': 'Navigation Test',
    creator: 'Creator',
    'creator-stocks': 'Creator Stocks',
    'creator-stock': 'Creator Stock',
    'creator-matrix': 'Creator Matrix',
    'creator-profile': 'Creator Profile',
    publisher: 'Publisher',
    options: 'Options',
    heroes: 'Superheroes',
    supervillains: 'Supervillains',
    sidekicks: 'Sidekicks',
    henchmen: 'Henchmen',
    bonds: 'Bonds',
    bond: 'Bond',
    'creator-bonds': 'Creator Bonds',
    'publisher-bonds': 'Publisher Bonds',
    'specialty-bonds': 'Specialty Bonds',
    funds: 'Funds',
    fund: 'Fund',
    'themed-funds': 'Themed Funds',
    'custom-funds': 'Custom Funds',
    buy: 'Buy',
    sell: 'Sell',
    puts: 'Puts',
    calls: 'Calls',
    leaps: 'LEAPs',
    straddles: 'Straddles',
    butterflys: 'Butterflys',
    'bull-bear': 'Bull & Bear Straddles',
    'derivatives-futures': 'Derivatives & Futures',
    etfs: 'ETFs',
    formulas: 'Applicable Formulas',
    tools: 'Trading Tools',
    specialty: 'Specialty Trades',
    characters: 'Characters',
    locations: 'Locations',
    gadgets: 'Gadgets',
    'hero-stocks': 'Hero Stocks',
    'villain-stocks': 'Villain Stocks',
    'sidekick-stocks': 'Sidekick Stocks',
    'henchmen-stocks': 'Henchmen Stocks',
    'hangout-stocks': 'Hangout Stocks',
    'hideout-stocks': 'Hideout Stocks'
  };

  const crumbs = overrides || pathnames.map((name, index) => ({
    name: breadcrumbLabels[name] || name.charAt(0).toUpperCase() + name.slice(1),
    path: '/' + pathnames.slice(0, index + 1).join('/')
  }));

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-indigo-400 transition-colors">
        Home
      </Link>
      {crumbs.map((crumb, index) => (
        <React.Fragment key={crumb.name}>
          <ChevronRight className="h-4 w-4" />
          {index === crumbs.length - 1 ? (
            <span className="text-indigo-400" aria-current="page">{crumb.name}</span>
          ) : (
            <Link
              to={crumb.path || '#'}
              className="hover:text-indigo-400 transition-colors"
            >
              {crumb.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}