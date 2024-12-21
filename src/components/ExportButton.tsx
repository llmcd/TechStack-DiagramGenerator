import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { exportDiagram } from '../utils/diagramExporter';
import { ExportManager } from '../utils/export/exportManager';
import { TechStackData } from '../types';
import { cn } from '../utils/cn';

interface ExportButtonProps {
  data: TechStackData;
  className?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ 
  data, 
  className = '' 
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (isExporting) return;
    
    try {
      setIsExporting(true);
      setError(null);
      
      const svgContent = await exportDiagram(data);
      const exportManager = new ExportManager();
      
      const result = await exportManager.export(svgContent, { format: 'svg' });
      
      const url = URL.createObjectURL(result.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to export diagram';
      console.error('Error exporting diagram:', error);
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={cn(
          "inline-flex items-center gap-2",
          "px-4 py-2",
          "text-sm font-medium",
          "text-white bg-blue-600",
          "rounded-lg",
          "transition-colors",
          isExporting ? "opacity-75 cursor-not-allowed" : "hover:bg-blue-700",
          className
        )}
      >
        <Download className="w-4 h-4" />
        {isExporting ? 'Exporting...' : 'Export SVG'}
      </button>
      {error && (
        <div className="absolute top-full mt-2 w-full px-4 py-2 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};