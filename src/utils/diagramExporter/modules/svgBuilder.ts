import { FONTS } from '../constants';
import { SvgAttributes } from '../types';

export class SvgBuilder {
  private content: string[] = [];
  private defs: string[] = [];
  private attributes: SvgAttributes;

  constructor(attributes: SvgAttributes) {
    this.attributes = attributes;
  }

  addDef(def: string): void {
    this.defs.push(def);
  }

  addContent(content: string): void {
    this.content.push(content);
  }

  private buildDefs(): string {
    if (this.defs.length === 0) return '';
    return `<defs>${this.defs.join('\n')}</defs>`;
  }

  private buildAttributes(): string {
    return Object.entries(this.attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
  }

  build(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg ${this.buildAttributes()}>
  ${this.buildDefs()}
  ${this.content.join('\n')}
</svg>`;
  }

  static escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case "'": return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }
}