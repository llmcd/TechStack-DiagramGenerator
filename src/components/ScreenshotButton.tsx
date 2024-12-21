import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { cn } from '../utils/cn';
import { captureScreenshot } from '../utils/screenshot';

interface ScreenshotButtonProps {
  className?: string;
}

export const ScreenshotButton: React.FC<ScreenshotButtonProps> = ({ className }) => {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleScreenshot = async () => {
    if (isCapturing) return;

    try {
      setIsCapturing(true);
      const diagramElement = document.querySelector('[data-diagram-content]');
      
      if (!diagramElement) {
        throw new Error('Diagram content not found');
      }

      await captureScreenshot(diagramElement as HTMLElement);
    } catch (error) {
      console.error('Screenshot error:', error);
      alert('Failed to capture screenshot');
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <button
      onClick={handleScreenshot}
      disabled={isCapturing}
      className={cn(
        "inline-flex items-center gap-2",
        "px-4 py-2",
        "text-sm font-medium",
        "text-white bg-indigo-600",
        "rounded-lg",
        "transition-colors",
        isCapturing ? "opacity-75 cursor-not-allowed" : "hover:bg-indigo-700",
        className
      )}
    >
      <Camera className="w-4 h-4" />
      {isCapturing ? 'Capturing...' : 'Screenshot'}
    </button>
  );
};