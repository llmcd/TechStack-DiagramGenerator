import React, { ReactNode } from 'react';
import { validateUrl } from '../utils/validation/linkValidation';

interface SafeLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export const SafeLink: React.FC<SafeLinkProps> = ({ href, children, className }) => {
  try {
    // Validate URL
    if (!validateUrl(href)) {
      console.error('Invalid URL format');
      return null;
    }

    // Validate children
    if (!children) {
      console.error('Link content cannot be empty');
      return null;
    }

    return (
      <a
        href={href}
        className={className}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  } catch (error) {
    console.error('Error creating link:', error);
    return null;
  }
};