import { EXPORT_DEFAULTS, FONTS } from '../constants';

export const createTitle = (width: number): string => `
  <text 
    x="${width/2}" 
    y="${EXPORT_DEFAULTS.titleHeight}"
    text-anchor="middle" 
    font-family="${FONTS.primary}" 
    font-size="${EXPORT_DEFAULTS.fontSize.title}" 
    font-weight="bold"
  >
    Technical Stack Diagram
  </text>`;