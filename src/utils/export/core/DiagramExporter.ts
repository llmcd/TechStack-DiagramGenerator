import { TechStackData } from '../../../types';
import { SVGBuilder } from './SVGBuilder';
import { DiagramRenderer } from './DiagramRenderer';
import { ImageProcessor } from '../processors/ImageProcessor';
import { ExportOptions } from '../types';

export class DiagramExporter {
  private imageProcessor: ImageProcessor;
  private renderer: DiagramRenderer;
  private builder: SVGBuilder;

  constructor() {
    this.imageProcessor = new ImageProcessor();
    this.renderer = new DiagramRenderer();
    this.builder = new SVGBuilder();
  }

  async generateSVG(data: TechStackData, options: ExportOptions = {}): Promise<string> {
    try {
      // Initialize SVG document
      this.builder.initDocument(options);

      // Add metadata
      this.builder.addMetadata({
        title: 'Technical Stack Diagram',
        description: 'Generated technical stack visualization',
        generator: 'Tech Stack Diagram Generator'
      });

      // Render diagram components
      await this.renderer.renderDiagram(data, this.builder, this.imageProcessor);

      return this.builder.getSVGContent();
    } finally {
      this.cleanup();
    }
  }

  private cleanup(): void {
    this.imageProcessor.clearCache();
  }
}