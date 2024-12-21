import { SvgIcon } from './types';
import { techLogoMap } from '../techLogos';

export const embedBase64Image = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn(`Failed to load image: ${url}`, error);
    return '';
  }
};

export const createSvgDefs = (): string => {
  return `<defs>
    <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
    </linearGradient>
  </defs>`;
};

export const createSvgSymbol = (id: string, icon: SvgIcon): string => {
  return `<symbol id="${id}" viewBox="${icon.viewBox}">
    ${icon.path}
  </symbol>`;
};