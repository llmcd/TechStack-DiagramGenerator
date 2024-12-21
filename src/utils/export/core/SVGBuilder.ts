import { SVGMetadata, SVGAttributes } from '../types';

export class SVGBuilder {
  private content: string[] = [];
  private defs: string[] = [];
  private width: number = 800;
  private height: number = 600;

  initDocument(options: { width?: number; height?: number } = {}): void {
    this.width = options.width ?? 800;
    this.height = options.height ?? 600;
    this.content = [];
    this.defs = [];
    
    // Add default definitions
    this.addGradients();
    this.addFilters();
  }

  addMetadata(metadata: SVGMetadata): void {
    const metadataElement = `
      <metadata>
        <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                 xmlns:dc="http://purl.org/dc/elements/1.1/">
          <rdf:Description>
            <dc:title>${metadata.title}</dc:title>
            <dc:description>${metadata.description}</dc:description>
            <dc:generator>${metadata.generator}</dc:generator>
          </rdf:Description>
        </rdf:RDF>
      </metadata>
    `;
    this.defs.push(metadataElement);
  }

  addLayer(id: string, content: string): void {
    this.content.push(`<g id="${id}" class="layer">${content}</g>`);
  }

  private addGradients(): void {
    // Add common gradients used in the diagram
    this.defs.push(`
      <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
      </linearGradient>
    `);
  }

  private addFilters(): void {
    // Add shadow and other effects
    this.defs.push(`
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
        <feOffset dx="0" dy="1" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.2" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    `);
  }

  getSVGContent(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="${this.width}" height="${this.height}" 
     xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink"
     version="1.1">
  <defs>
    ${this.defs.join('\n')}
  </defs>
  ${this.content.join('\n')}
</svg>`;
  }
}