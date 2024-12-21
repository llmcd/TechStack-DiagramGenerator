import React from 'react';
import { useDropdown } from './DropdownContext';
import { cn } from '../../../utils/cn';

interface DropdownTriggerProps {
  defaultTrigger: React.ReactNode;
  className?: string;
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  defaultTrigger,
  className
}) => {
  const { isOpen, setIsOpen, selectedOption } = useDropdown();

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={cn("cursor-pointer", className)}
      role="button"
      aria-haspopup="true"
      aria-expanded={isOpen}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
      }}
    >
      {selectedOption || defaultTrigger}
    </div>
  );
};