import React from 'react';
import { cn } from '../../utils/cn';

interface DiagramLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const DiagramLayout: React.FC<DiagramLayoutProps> = ({ children, className }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <div className={cn(
          "grid gap-6",
          "grid-cols-[300px_1fr]", // Adjusted width for better proportions
          "relative",
          className
        )}>
          {children}
        </div>
      </div>
    </div>
  );
};