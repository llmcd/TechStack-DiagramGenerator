import React from 'react';
import { cn } from '../../utils/cn';

export const Footer: React.FC = () => {
  return (
    <footer className={cn(
      "mt-12 py-8 px-4",
      "border-t border-gray-200",
      "text-center text-gray-600"
    )}>
      <p className="mb-4 max-w-2xl mx-auto">
        &copy; 2025 LLMCD. I created this project to help companies, IT departments, startups and tech founders. The app uses AI to process spreadsheets. The feedback collected will be used to improve the service for everyone.
      </p>
      
      <p>
        For additional questions:{' '}
        <a 
          href="mailto:lmac@zoho.com"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          lmac@zoho.com
        </a>
      </p>
    </footer>
  );
};