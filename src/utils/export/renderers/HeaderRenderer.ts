import { TechStackData } from '../../../types';
import { getHeaderColor } from '../utils/styleHelpers';

export class HeaderRenderer {
  render(data: TechStackData): string {
    return Object.entries(data).map(([key], index) => {
      const y = 80 + (index * 80);
      const color = getHeaderColor(key);
      
      return `
        <g transform="translate(20,${y})">
          <rect 
            x="0" 
            y="0" 
            width="250" 
            height="60" 
            rx="8"
            fill="${color}"
            filter="url(#shadow)"
          />
          <text 
            x="20" 
            y="35"
            font-family="Arial" 
            font-size="16" 
            fill="#1f2937"
          >
            ${this.formatHeader(key)}
          </text>
        </g>
      `;
    }).join('\n');
  }

  private formatHeader(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  }
}