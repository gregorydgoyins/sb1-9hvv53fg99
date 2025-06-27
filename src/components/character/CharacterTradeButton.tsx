import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { QuickTradeModal } from '../trading/QuickTradeModal';

interface CharacterTradeButtonProps {
  symbol: string;
  name: string;
  price: number;
  className?: string;
}

export function CharacterTradeButton({ symbol, name, price, className = '' }: CharacterTradeButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <>
      <button
        onClick={openModal}
        className={`flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors ${className}`}
      >
        <TrendingUp className="h-4 w-4" />
        <span>Trade</span>
      </button>
      
      <QuickTradeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        symbol={symbol}
        currentPrice={price}
        assetName={name}
        assetType="character"
      />
    </>
  );
}

export default CharacterTradeButton;