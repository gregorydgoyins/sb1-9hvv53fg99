import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdaptiveCreatorsPage } from '../components/AdaptiveCreatorsPage';

export function CreatorStockPage() {
  return (
    <div className="space-y-6">
      <AdaptiveCreatorsPage 
        title="Creator Stocks" 
        description="Invest in the creative minds behind your favorite comics. These stocks represent the market value of writers, artists, and other creative professionals in the comic book industry."
      />
    </div>
  );
}

export default CreatorStockPage;