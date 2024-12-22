import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';

interface ThankYouToastProps {
  show: boolean;
  onHide: () => void;
}

export const ThankYouToast: React.FC<ThankYouToastProps> = ({ show, onHide }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div className={cn(
      "fixed top-6 left-1/2 -translate-x-1/2 z-50",
      "px-6 py-3",
      "bg-green-100 text-green-800",
      "rounded-lg shadow-lg",
      "animate-fade-in"
    )}>
      Thank you for your feedback
    </div>
  );
};