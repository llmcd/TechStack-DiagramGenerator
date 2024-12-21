import React from 'react';
import { Wrench } from 'lucide-react';

interface TechLogoProps {
  src?: string;
  alt: string;
  backgroundColor?: string;
}

export const TechLogo: React.FC<TechLogoProps> = ({ src, alt, backgroundColor }) => {
  if (!src) {
    return <Wrench className="w-4 h-4 mr-1.5 text-gray-500" />;
  }

  return (
    <div 
      className="w-4 h-4 mr-1.5 rounded-sm overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: backgroundColor || 'transparent' }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.style.display = 'none';
          const fallback = e.currentTarget.parentElement;
          if (fallback) {
            fallback.innerHTML = '<svg class="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
          }
        }}
      />
    </div>
  );
};