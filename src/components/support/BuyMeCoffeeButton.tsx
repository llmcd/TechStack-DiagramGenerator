import React from 'react';
import { Coffee } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BuyMeCoffeeButtonProps {
  username: string;
  className?: string;
}

export const BuyMeCoffeeButton: React.FC<BuyMeCoffeeButtonProps> = ({
  username,
  className
}) => {
  const handleClick = () => {
    // Open Buy Me a Coffee in a new tab
    window.open(`https://www.buymeacoffee.com/${username}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed bottom-4 right-4 z-50",
        "inline-flex items-center gap-2",
        "px-4 py-2",
        "bg-[#FFDD00] hover:bg-[#FFDD00]/90",
        "text-gray-900",
        "rounded-full",
        "shadow-lg",
        "transition-all duration-200",
        "font-medium",
        "focus:outline-none focus:ring-2 focus:ring-[#FFDD00]/50",
        "sm:hover:scale-105",
        "active:scale-95",
        className
      )}
      aria-label="Support me on Buy Me a Coffee"
    >
      <Coffee className="w-5 h-5" />
      <span className="hidden sm:inline">Buy me a coffee</span>
    </button>
  );
};