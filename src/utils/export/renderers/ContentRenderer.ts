import { TechStackData } from '../../../types';
import { ImageProcessor } from '../processors/ImageProcessor';
import { getLogoForTech } from '../../techLogos';

export class ContentRenderer {
  async render(data: TechStackData, imageProcessor: ImageProcessor): Promise<string> {
    const contentPromises = Object.entries(data).map(async ([_, values], index) => {
      const y = 80 + (index * 80);
      const items = await this.renderTechItems(values, imageProcessor);
      
      return `
        <g transform="translate(290,${y})">
          <rect 
            x="0" 
            y="0" 
            width="480" 
            height="60" 
            rx="8"
            fill="white"
            filter="url(#shadow)"
          />
          <g transform="translate(20,30)">
            ${items}
          </g>
        </g>
      `;
    });

    return (await Promise.all(contentPromises)).join('\n');
  }

  private async renderTechItems(
    items: string[], 
    imageProcessor: ImageProcessor
  ): Promise<string> {
    const techItems = await Promise.all(items.map(async (tech, index) => {
      const x = index * 120;
      const logo = getLogoForTech(tech);
      let logoSvg = '';

      if (logo?.url) {
        const base64Logo = await imageProcessor.processImage(logo.url);
        if (base64Logo) {
          logoSvg = `
            <image 
              x="${x}" 
              y="-12"
              width="24" 
              height="24" 
              href="${base64Logo}"
            />
          `;
        }
      }

      return `
        <g transform="translate(${x},0)">
          ${logoSvg}
          <text 
            x="${logoSvg ? '30' : '0'}" 
            y="0"
            font-family="Arial" 
            font-size="14" 
            fill="#374151"
          >
            ${tech}
          </text>
        </g>
      `;
    }));

    return techItems.join('\n');
  }
}