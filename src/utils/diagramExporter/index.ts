import { TechStackData } from '../../types';
import { ExportOptions } from './types';
import { ImageProcessor } from './modules/imageProcessor';
import { LayoutManager } from './modules/layoutManager';
import { SvgBuilder } from './modules/svgBuilder';
import { getLogoForTech } from '../techLogos';
import { createHeader, createTechItem, createTitle } from './components';

export class DiagramExporter {
  private imageProcessor: ImageProcessor;
  private layoutManager: LayoutManager;

  constructor() {
    this.imageProcessor = new ImageProcessor();
  }

  async export(data: TechStackData, options: ExportOptions = {}): Promise<string> {
    this.layoutManager = new LayoutManager(options);
    
    const width = options.width ?? 800;
    const height = this.layoutManager.calculateTotalHeight(Object.keys(data).length);

    const builder = new SvgBuilder({
      width,
      height,
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink'
    });

    // Add title
    builder.addContent(createTitle(width));

    // Process each section
    await Promise.all(
      Object.entries(data).map(async ([key, values], index) => {
        const headerPos = this.layoutManager.getHeaderPosition(index);
        const contentPos = this.layoutManager.getContentPosition(index);
        
        // Add header
        builder.addContent(createHeader(
          key, 
          headerPos.x, 
          headerPos.y, 
          this.layoutManager.calculateContentWidth()
        ));

        // Process tech items
        const techItems = await this.processTechItems(values, contentPos);
        builder.addContent(techItems);
      })
    );

    return builder.build();
  }

  private async processTechItems(
    items: string[], 
    position: { x: number; y: number }
  ): Promise<string> {
    let techX = position.x;
    const fragments: string[] = [];

    for (const tech of items) {
      const logo = getLogoForTech(tech);
      let base64Logo: string | undefined;

      if (logo?.url) {
        base64Logo = await this.imageProcessor.processImage(logo.url);
      }

      const { svg, width } = createTechItem({
        tech,
        x: techX,
        y: position.y,
        logo: base64Logo ? {
          base64: base64Logo,
          backgroundColor: logo?.backgroundColor
        } : undefined
      });

      fragments.push(svg);
      techX += width;
    }

    return fragments.join('\n');
  }

  cleanup(): void {
    this.imageProcessor.clearCache();
  }
}

export const exportDiagram = async (
  data: TechStackData, 
  options: ExportOptions = {}
): Promise<string> => {
  const exporter = new DiagramExporter();
  try {
    return await exporter.export(data, options);
  } finally {
    exporter.cleanup();
  }
};