import React from 'react';
import { FileDown } from 'lucide-react';
import { Steps } from './Steps';
import { DownloadTemplateLink } from '../DownloadTemplateLink';
import { SafeLink } from '../SafeLink';
import { cn } from '../../utils/cn';

interface InstructionsContainerProps {
  show: boolean;
}

export const InstructionsContainer: React.FC<InstructionsContainerProps> = ({ show }) => {
  const buttonClasses = cn(
    "download-sample",
    "inline-flex items-center gap-2",
    "px-4 py-2",
    "bg-white",
    "border border-gray-300",
    "rounded-lg",
    "text-gray-700",
    "text-sm font-medium",
    "shadow-sm",
    "transition-all duration-200",
    "hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900",
    "active:bg-gray-100",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  );

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        "transform",
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none h-0 overflow-hidden"
      )}
    >
      <Steps />
      <div className="flex justify-center gap-4">
        <DownloadTemplateLink />
        <SafeLink
          href="https://llmdocs.s3.us-east-1.amazonaws.com/structured_spreadsheet_manual.xlsx"
          className={buttonClasses}
        >
          <FileDown className="w-4 h-4" />
          Download Demo Template
        </SafeLink>
      </div>
    </div>
  );
};