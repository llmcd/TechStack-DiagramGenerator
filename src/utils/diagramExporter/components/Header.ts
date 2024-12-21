import { EXPORT_DEFAULTS, FONTS } from '../constants';
import { getHeaderColor, formatHeader } from '../styleHelpers';

export const createHeader = (
  key: string,
  x: number,
  y: number,
  width: number
): string => `
  <g transform="translate(${x},${y})">
    <rect 
      x="0" 
      y="0" 
      width="${width}" 
      height="${EXPORT_DEFAULTS.itemHeight}" 
      rx="${EXPORT_DEFAULTS.cornerRadius}"
      fill="${getHeaderColor(key)}" 
      stroke="#e5e7eb" 
      stroke-width="1"
    />
    <text 
      x="20" 
      y="${EXPORT_DEFAULTS.itemHeight/2 + 5}"
      font-family="${FONTS.primary}" 
      font-size="${EXPORT_DEFAULTS.fontSize.header}" 
      fill="#1f2937"
    >
      ${formatHeader(key)}
    </text>
  </g>`;