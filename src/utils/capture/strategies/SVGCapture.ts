import { CaptureOptions, CaptureResult } from '../types';

export class SVGCapture {
  async capture(element: HTMLElement, options: CaptureOptions = {}): Promise<CaptureResult> {
    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Extract styles
    const styles = this.computeStyles(clone);
    
    // Create SVG content
    const svgContent = `
      <?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg xmlns="http://www.w3.org/2000/svg" width="${clone.offsetWidth}" height="${clone.offsetHeight}">
        <defs>
          <style type="text/css"><![CDATA[${styles}]]></style>
        </defs>
        <foreignObject width="100%" height="100%">
          ${clone.outerHTML}
        </foreignObject>
      </svg>
    `;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });

    return {
      data: blob,
      filename: `tech-stack-diagram-${new Date().toISOString().slice(0, 10)}.svg`,
      mimeType: 'image/svg+xml'
    };
  }

  private computeStyles(element: HTMLElement): string {
    const sheets = document.styleSheets;
    let styles = '';

    for (const sheet of Array.from(sheets)) {
      try {
        const rules = Array.from(sheet.cssRules);
        for (const rule of rules) {
          styles += rule.cssText;
        }
      } catch (e) {
        console.warn('Could not access stylesheet rules');
      }
    }

    return styles;
  }
}