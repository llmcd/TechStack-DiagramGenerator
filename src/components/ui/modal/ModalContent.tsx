import React from 'react';
import { cn } from '../../../utils/cn';

interface ModalContentProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  onClick,
  className
}) => {
  return (
    <div
      className={cn(
        "w-full max-w-md",
        "bg-white",
        "p-6",
        "rounded-lg",
        "shadow-xl",
        "relative",
        "animate-fade-in",
        className
      )}
      onClick={onClick}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
};