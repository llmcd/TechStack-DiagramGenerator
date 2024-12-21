import { EXPORT_DEFAULTS, FONTS } from '../constants';
import { getTextWidth } from '../utils';

interface TechItemProps {
  tech: string;
  x: number;
  y: number;
  logo?: {
    base64: string;
    backgroundColor?: string;
  };
}

export const createTechItem = ({
  tech,
  x,
  y,
  logo
}: TechItemProps): { svg: string; width: number } => {
  if (!logo) {
    return {
      svg: `
        <text 
          x="${x}" 
          y="${y + EXPORT_DEFAULTS.itemHeight/2 + 5}"
          font-family="${FONTS.primary}" 
          font-size="${EXPORT_DEFAULTS.fontSize.content}" 
          fill="#374151"
        >
          ${tech}
        </text>`,
      width: getTextWidth(tech) + 20
    };
  }

  const logoSize = EXPORT_DEFAULTS.logoSize;
  return {
    svg: `
      <g transform="translate(${x}, ${y + EXPORT_DEFAULTS.itemHeight/2})">
        <rect 
          x="0" 
          y="-${logoSize/2}" 
          width="${logoSize}" 
          height="${logoSize}" 
          rx="4"
          fill="${logo.backgroundColor || 'transparent'}"
        />
        <image 
          x="2" 
          y="-${(logoSize-4)/2}" 
          width="${logoSize-4}" 
          height="${logoSize-4}"
          href="${logo.base64}"
        />
        <text 
          x="${logoSize + 10}" 
          y="5"
          font-family="${FONTS.primary}" 
          font-size="${EXPORT_DEFAULTS.fontSize.content}" 
          fill="#374151"
        >
          ${tech}
        </text>
      </g>`,
    width: getTextWidth(tech) + logoSize + 40
  };
};