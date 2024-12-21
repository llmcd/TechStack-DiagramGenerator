import React, { useState } from 'react';
import { Camera, ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';
import { CaptureManager } from '../utils/capture/CaptureManager';
import { CaptureFormat } from '../utils/capture/types';
import { Dropdown } from './ui/Dropdown';
import { DropdownItem } from './ui/DropdownItem';

interface CaptureButtonProps {
  className?: string;
}

export const CaptureButton: React.FC<CaptureButtonProps> = ({ className }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const captureManager = new CaptureManager();

  const handleCapture = async (format: CaptureFormat = 'png') => {
    if (isCapturing) return;

    try {
      setIsCapturing(true);
      const element = document.querySelector('[data-diagram-content]');
      
      if (!element) {
        throw new Error('Diagram content not found');
      }

      const result = await captureManager.capture(element as HTMLElement, format);
      
      // Download the file
      const url = URL.createObjectURL(result.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Capture error:', error);
      alert('Failed to capture diagram');
    } finally {
      setIsCapturing(false);
    }
  };

  const trigger = (
    <div className="flex">
      <button
        onClick={() => handleCapture('png')}
        disabled={isCapturing}
        className={cn(
          "inline-flex items-center gap-2",
          "px-4 py-2",
          "text-sm font-medium",
          "text-white bg-indigo-600",
          "rounded-l-lg",
          "transition-colors",
          isCapturing ? "opacity-75 cursor-not-allowed" : "hover:bg-indigo-700",
          className
        )}
      >
        <Camera className="w-4 h-4" />
        {isCapturing ? 'Capturing...' : 'Capture'}
      </button>
      <button
        disabled={isCapturing}
        className={cn(
          "inline-flex items-center",
          "px-2 py-2",
          "text-sm font-medium",
          "text-white bg-indigo-600",
          "rounded-r-lg border-l border-indigo-500",
          "transition-colors",
          isCapturing ? "opacity-75 cursor-not-allowed" : "hover:bg-indigo-700"
        )}
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <Dropdown trigger={trigger} align="right">
      {(['png', 'pdf'] as const).map((format) => (
        <DropdownItem
          key={format}
          onClick={() => handleCapture(format)}
          disabled={isCapturing}
        >
          Capture as {format.toUpperCase()}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};