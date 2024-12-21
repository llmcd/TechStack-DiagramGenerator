import React from 'react';
import { TechLogo } from './TechLogo';
import { getLogoForTech } from '../../utils/techLogos';

interface TechItemProps {
  label: string;
}

export const TechItem: React.FC<TechItemProps> = ({ label }) => {
  const logo = getLogoForTech(label);
  
  return (
    <span className="
      inline-flex items-center
      px-3.5 py-1.5 
      bg-gray-50 
      text-gray-700 
      rounded-full 
      text-sm 
      border border-gray-100
      select-none
      whitespace-nowrap
      transition-all
      hover:bg-gray-100
      hover:border-gray-200
    ">
      <TechLogo 
        src={logo?.url} 
        alt={logo?.name || label}
        backgroundColor={logo?.backgroundColor}
      />
      {label}
    </span>
  );
};