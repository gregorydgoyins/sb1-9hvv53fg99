import React from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { AssetStockList } from '../../components/asset/AssetStockList';
import { henchmen } from '../../data/characterData';

export function HenchmanStockPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Characters', path: '/characters' },
        { name: 'Henchmen' }
      ]} />
      <AssetStockList 
        assets={henchmen}
        assetType="character"
        title="Henchmen Stocks"
        description="Invest in the foot soldiers and minions of major supervillains. While individually less significant than their masters, henchmen stocks can offer surprising value due to their frequent appearances and collective importance to villain organizations."
      />
    </div>
  );
}

export default HenchmanStockPage;