import React from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AssetStockList } from '../components/asset/AssetStockList';
import { allCharacters } from '../data/characterData';
import { allLocations } from '../data/locationData';
import { gadgets } from '../data/gadgetData';

export function AssetPage() {
  const { assetType } = useParams<{ assetType: string }>();
  
  // Get assets based on type
  const getAssets = () => {
    switch(assetType) {
      case 'characters':
        return {
          assets: allCharacters,
          assetType: 'character',
          title: 'Comic Characters',
          description: 'Explore and trade stocks of iconic comic book characters, from legendary heroes to notorious villains.',
          filters: {
            typeOptions: ['hero', 'villain', 'sidekick', 'henchman'],
            typeLabel: 'Character Types'
          }
        };
      case 'locations':
        return {
          assets: allLocations,
          assetType: 'location',
          title: 'Comic Locations',
          description: 'Invest in iconic locations from the comic universe, from superhero headquarters to villain lairs. These assets often provide stable returns with lower volatility than character stocks.',
          filters: {
            typeOptions: ['hangout', 'hideout'],
            typeLabel: 'Location Types'
          }
        };
      case 'gadgets':
        return {
          assets: gadgets,
          assetType: 'gadget',
          title: 'Superhero Gadgets',
          description: 'Invest in the iconic tools, weapons, and technology used by heroes and villains. From Batman\'s utility belt to Iron Man\'s suit, these assets represent the cutting edge of comic book innovation.',
          filters: {}
        };
      default:
        return {
          assets: allCharacters,
          assetType: 'character',
          title: 'Comic Assets',
          description: 'Browse all comic-related assets across various categories and types.',
          filters: {
            typeOptions: ['hero', 'villain', 'sidekick', 'henchman'],
            typeLabel: 'Character Types'
          }
        };
    }
  };

  const { assets, assetType: type, title, description, filters } = getAssets();

  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[{ name: title }]} />
      <AssetStockList 
        assets={assets}
        assetType={type as any}
        title={title}
        description={description}
        filters={filters}
      />
    </div>
  );
}

export default AssetPage;