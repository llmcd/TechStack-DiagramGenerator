import React from 'react';

interface TechItemProps {
  label: string;
}

export const TechItem: React.FC<TechItemProps> = ({ label }) => {
  return (
    <span className="
      px-3.5 py-1.5 
      bg-gray-50 
      text-gray-700 
      rounded-full 
      text-sm 
      border border-gray-100
      select-none
      whitespace-nowrap
    ">
      {label}
    </span>
  );
};