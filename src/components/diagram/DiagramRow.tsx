import React from 'react';
import { cn } from '../../utils/cn';

interface DiagramRowProps {
  children: React.ReactNode;
  className?: string;
}

export const DiagramRow: React.FC<DiagramRowProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "h-[68px]", // Fixed height for consistent alignment
      "flex items-center",
      "relative",
      className
    )}>
      {children}
    </div>
  );
};