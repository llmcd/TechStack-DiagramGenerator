import React from 'react';
import { cn } from '../../utils/cn';

interface FeedbackButtonsProps {
  onRating: (rating: 'yes' | 'no') => void;
  disabled?: boolean;
}

export const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ 
  onRating,
  disabled = false 
}) => {
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={() => onRating('yes')}
        disabled={disabled}
        className={cn(
          "px-6 py-2",
          "bg-[#90EE90] text-green-800",
          "rounded-lg",
          "transition-all duration-200",
          "hover:bg-[#7FDD7F]",
          "focus:outline-none focus:ring-2 focus:ring-green-500",
          "active:scale-95",
          disabled && "opacity-50 cursor-not-allowed hover:bg-[#90EE90]"
        )}
        aria-label="Yes, this generator was helpful"
      >
        Yes
      </button>
      <button
        onClick={() => onRating('no')}
        disabled={disabled}
        className={cn(
          "px-6 py-2",
          "bg-[#FFB6B6] text-red-800",
          "rounded-lg",
          "transition-all duration-200",
          "hover:bg-[#FFA5A5]",
          "focus:outline-none focus:ring-2 focus:ring-red-500",
          "active:scale-95",
          disabled && "opacity-50 cursor-not-allowed hover:bg-[#FFB6B6]"
        )}
        aria-label="No, this generator was not helpful"
      >
        No
      </button>
    </div>
  );
};