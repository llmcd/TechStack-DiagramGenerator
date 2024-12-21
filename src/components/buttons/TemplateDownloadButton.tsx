import React, { useState } from 'react';
import { FileDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import { downloadTemplate } from '../../utils/templateDownloader';
import { DownloadError } from '../../utils/errors';

interface TemplateDownloadButtonProps {
  show?: boolean;
}

export const TemplateDownloadButton: React.FC<TemplateDownloadButtonProps> = ({ 
  show = true 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!show) return null;

  const handleDownload = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);
      setError(null);
      await downloadTemplate();
    } catch (err) {
      const message = err instanceof DownloadError 
        ? err.message 
        : 'Failed to download template. Please try again later.';
      
      console.error('Template download error:', err);
      setError(message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={cn(
          "inline-flex items-center gap-2",
          "px-4 py-2",
          "text-sm font-medium",
          "text-gray-700 bg-white",
          "rounded-lg border border-gray-300",
          "transition-colors",
          isDownloading ? "opacity-75 cursor-not-allowed" : "hover:bg-gray-50"
        )}
      >
        <FileDown className="w-4 h-4" />
        {isDownloading ? 'Downloading...' : 'Download Template'}
      </button>
      {error && (
        <div className="absolute top-full mt-2 w-full px-4 py-2 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};