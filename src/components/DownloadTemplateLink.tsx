import React, { useState } from 'react';
import { FileDown } from 'lucide-react';
import { cn } from '../utils/cn';
import { SafeLink } from './SafeLink';

export function DownloadTemplateLink() {
  const [isDownloading, setIsDownloading] = useState(false);
  const templateUrl = 'https://llmdocs.s3.us-east-1.amazonaws.com/structured_spreadsheet_manual_blank.xlsx';

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <SafeLink
      href={templateUrl}
      className={cn(
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
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        isDownloading && "opacity-75 cursor-not-allowed"
      )}
    >
      <FileDown className="w-4 h-4" />
      {isDownloading ? 'Downloading...' : 'Download Custom Template'}
    </SafeLink>
  );
}