import React from 'react';
import { DropdownProvider } from './dropdown/DropdownContext';
import { DropdownTrigger } from './dropdown/DropdownTrigger';
import { DropdownContent } from './dropdown/DropdownContent';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = 'left',
  className
}) => {
  return (
    <DropdownProvider>
      <div className="relative">
        <DropdownTrigger defaultTrigger={trigger} />
        <DropdownContent align={align} className={className}>
          {children}
        </DropdownContent>
      </div>
    </DropdownProvider>
  );
};