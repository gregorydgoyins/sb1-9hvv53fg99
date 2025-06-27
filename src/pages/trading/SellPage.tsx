import React from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { OrderEntry } from '../../components/OrderEntry';
import { DollarSign, Info, AlertTriangle } from 'lucide-react';

export function SellPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Trading', path: '/trading' },
        { name: 'Sell' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <DollarSign className="h-8 w-8 text-red-400" />
          <h1 className="text-3xl font-bold text-white">Sell Assets</h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-start space-x-4 mb-6">
          <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300">
            Use this interface to sell assets from your portfolio. Enter the symbol of the asset you wish to sell and specify the quantity. You can only sell assets that you currently own.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Place Sell Order</h2>
            <OrderEntry 
              symbol="" 
              onSymbolChange={() => {}} 
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Market Insights</h2>
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <h3 className="font-medium text-white mb-3">Selling Tips</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Consider using limit orders to ensure you get your desired price, especially in volatile markets.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Be aware of potential tax implications when realizing gains from selling assets.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Market orders will execute immediately but may result in a slightly different price than expected.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>All sell orders incur a 0.1% transaction fee on the total value.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <h3 className="font-medium text-white mb-3">Your Holdings</h3>
              <p className="text-gray-300 mb-2">You currently have 5 different assets in your portfolio.</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">ASM300</span>
                  <span className="text-white">2 shares</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">TMFS</span>
                  <span className="text-white">50 shares</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">BATM</span>
                  <span className="text-white">3 shares</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">MRVLB</span>
                  <span className="text-white">10 bonds</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">SHUF</span>
                  <span className="text-white">25 fund units</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellPage;