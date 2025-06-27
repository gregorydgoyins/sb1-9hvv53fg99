import React from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { AssetStockList } from '../../components/asset/AssetStockList';
import { sidekicks } from '../../data/characterData';

export function SidekickStockPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Characters', path: '/characters' },
        { name: 'Sidekicks' }
      ]} />
      <AssetStockList 
        assets={sidekicks}
        assetType="character"
        title="Sidekick Stocks"
        description="Invest in the trusted allies and partners of major superheroes. Sidekick stocks often represent growth opportunities, as these characters frequently evolve into independent heroes with their own storylines and media appearances."
      />
    </div>
  );
}

export default SidekickStockPage;