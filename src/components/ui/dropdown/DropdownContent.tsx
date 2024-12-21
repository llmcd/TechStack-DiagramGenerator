import React, { useEffect, useRef } from 'react';
import { useDropdown } from './DropdownContext';
import { cn } from '../../../utils/cn';

interface DropdownContentProps {
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const DropdownContent: React.FC<DropdownContentProps> = ({
  children,
  align = 'left',
  className
}) => {
  const { isOpen, setIsOpen } = useDropdown();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute mt-2 w-48",
        "bg-white rounded-md shadow-lg",
        "ring-1 ring-black ring-opacity-5",
        "z-50",
        "transition-opacity duration-150",
        align === 'right' ? 'right-0' : 'left-0',
        className
      )}
      role="menu"
      aria-orientation="vertical"
    >
      {children}
    </div>
  );
};