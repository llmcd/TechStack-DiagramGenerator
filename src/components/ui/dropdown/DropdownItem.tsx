import React from 'react';
import { useDropdown } from './DropdownContext';
import { cn } from '../../../utils/cn';

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  className,
  disabled = false
}) => {
  const { setIsOpen, setSelectedOption } = useDropdown();

  const handleClick = () => {
    if (disabled) return;
    
    if (onClick) {
      onClick();
    }
    
    setSelectedOption(children as string);
    setIsOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "w-full text-left",
        "px-4 py-2 text-sm",
        "text-gray-700",
        "transition-colors duration-150",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100",
        className
      )}
      role="menuitem"
    >
      {children}
    </button>
  );
};