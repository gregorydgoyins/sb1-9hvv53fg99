import React from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { OrderEntry } from '../../components/OrderEntry';
import { ShoppingCart, Info, AlertTriangle } from 'lucide-react';

export function BuyPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Trading', path: '/trading' },
        { name: 'Buy' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ShoppingCart className="h-8 w-8 text-green-400" />
          <h1 className="text-3xl font-bold text-white">Buy Assets</h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-start space-x-4 mb-6">
          <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300">
            Use this interface to purchase assets in the Panel Profits universe. Enter the symbol of the asset you wish to buy and specify the quantity. You can buy characters, locations, gadgets, creator stocks, bonds, and more.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Place Buy Order</h2>
            <OrderEntry 
              symbol="" 
              onSymbolChange={() => {}} 
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Market Insights</h2>
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <h3 className="font-medium text-white mb-3">Buying Tips</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Always check the current market price before placing a limit order.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Consider using limit orders during periods of high volatility to avoid price slippage.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Market orders execute immediately at the best available price but may not get the exact price you see.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Remember that all trades incur a 0.1% transaction fee.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-900/30 p-4 rounded-lg border border-green-700/30">
              <h3 className="font-medium text-white mb-3">Current Market Conditions</h3>
              <p className="text-green-200 mb-2">Market conditions are favorable for buying.</p>
              <p className="text-sm text-gray-300">The Comic Market Index is up 2.3% today, with strong trading volumes across all asset classes. Volatility is moderate, making it a good time for strategic acquisitions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyPage;