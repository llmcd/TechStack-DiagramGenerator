import { TechStackData } from '../types';

interface ExportOptions {
  width?: number;
  height?: number;
  padding?: number;
}

export const exportDiagram = (data: TechStackData, options: ExportOptions = {}): string => {
  const {
    width = 800,
    height = data ? Object.keys(data).length * 80 + 100 : 400,
    padding = 20
  } = options;

  // Create SVG container
  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <!-- Gradient definitions -->
    <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Title -->
  <text x="${width/2}" y="40" text-anchor="middle" font-family="Arial" font-size="24" font-weight="bold">
    Technical Stack Diagram
  </text>`;

  // Add sections
  let yOffset = 80;
  const headerWidth = 250;
  const contentX = headerWidth + 30;
  const contentWidth = width - contentX - padding;

  Object.entries(data).forEach(([key, values], index) => {
    // Header box
    const headerColor = getHeaderColor(key);
    svg += `
    <g transform="translate(${padding},${yOffset})">
      <!-- Header -->
      <rect x="0" y="0" width="${headerWidth}" height="60" rx="8" 
        fill="${headerColor}" stroke="#e5e7eb" stroke-width="1"/>
      <text x="20" y="35" font-family="Arial" font-size="16" fill="#1f2937">
        ${formatHeader(key)}
      </text>
      
      <!-- Content -->
      <rect x="${contentX}" y="0" width="${contentWidth}" height="60" rx="8" 
        fill="white" stroke="#e5e7eb" stroke-width="1"/>
      <text x="${contentX + 20}" y="35" font-family="Arial" font-size="14" fill="#374151">
        ${values.join(', ')}
      </text>
    </g>`;
    
    yOffset += 80;
  });

  // Close SVG
  svg += '\n</svg>';

  return svg;
};

const getHeaderColor = (key: string): string => {
  const colors: Record<string, string> = {
    presentation: '#dbeafe',
    programmingLanguages: '#dcfce7',
    frameworks: '#fef3c7',
    databases: '#f3e8ff',
    cloudPlatforms: '#ffe4e6',
    compute: '#e0e7ff',
    network: '#fae8ff',
    services: '#ffedd5'
  };
  return colors[key] || '#f3f4f6';
};

const formatHeader = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
};