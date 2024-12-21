import React from 'react';
import { cn } from '../../utils/cn';

interface DiagramCellProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'header' | 'content';
}

export const DiagramCell: React.FC<DiagramCellProps> = ({ 
  children, 
  className,
  variant = 'content' 
}) => {
  return (
    <div className={cn(
      "w-full h-full px-5 rounded-lg shadow-sm",
      variant === 'header' ? [
        "flex items-center",
        "select-none",
        "relative"
      ] : [
        "bg-white",
        "border border-gray-100",
        "flex items-center" // Added to ensure content vertical alignment
      ],
      className
    )}>
      {children}
    </div>
  );
};