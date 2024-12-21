export const formatSVG = (svgContent: string): Blob => {
  return new Blob([svgContent], { type: 'image/svg+xml' });
};