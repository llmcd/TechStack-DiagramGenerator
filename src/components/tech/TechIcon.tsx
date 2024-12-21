import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TechIconProps {
  icon: LucideIcon;
}

export const TechIcon: React.FC<TechIconProps> = ({ icon: Icon }) => {
  return (
    <Icon className="w-4 h-4 mr-1.5 text-gray-500" />
  );
};