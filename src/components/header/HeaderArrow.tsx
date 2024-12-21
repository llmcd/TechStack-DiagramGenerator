import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HeaderArrow: React.FC = () => {
  return (
    <div className="absolute right-4">
      <ArrowRight className="w-5 h-5 opacity-50" />
    </div>
  );
};