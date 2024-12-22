import React from 'react';
import { cn } from '../../../utils/cn';

interface ModalOverlayProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  children,
  onClick,
  className
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0",
        "flex items-center justify-center",
        "min-h-full",
        "p-4",
        "text-center",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};