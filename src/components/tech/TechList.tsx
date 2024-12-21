import React from 'react';
import { TechItem } from './TechItem';

interface TechListProps {
  items: string[];
}

export const TechList: React.FC<TechListProps> = ({ items }) => {
  return (
    <div className="flex flex-wrap gap-2 py-3">
      {items.map((item, index) => (
        <TechItem key={`${item}-${index}`} label={item} />
      ))}
    </div>
  );
};