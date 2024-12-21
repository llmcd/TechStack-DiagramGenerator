import React from 'react';
import { Steps } from './Steps';
import { DownloadTemplateLink } from '../DownloadTemplateLink';
import { cn } from '../../utils/cn';

interface InstructionsContainerProps {
  show: boolean;
}

export const InstructionsContainer: React.FC<InstructionsContainerProps> = ({ show }) => {
  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        "transform",
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none h-0 overflow-hidden"
      )}
    >
      <Steps />
      <DownloadTemplateLink />
    </div>
  );
};