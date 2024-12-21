/**
 * Validates SVG content to ensure it's properly formatted
 */
export const validateSVG = (svgContent: string): boolean => {
  if (!svgContent || typeof svgContent !== 'string') {
    return false;
  }

  // Check for basic SVG structure
  if (!svgContent.includes('<svg') || !svgContent.includes('</svg>')) {
    return false;
  }

  try {
    // Try parsing the SVG content
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    
    // Check for parsing errors
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      return false;
    }

    // Verify root element is SVG
    const rootElement = doc.documentElement;
    if (rootElement.nodeName !== 'svg') {
      return false;
    }

    return true;
  } catch (error) {
    console.error('SVG validation error:', error);
    return false;
  }
}