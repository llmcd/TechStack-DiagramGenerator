import { TechStackData } from '../../../types';
import { SVGBuilder } from './SVGBuilder';
import { ImageProcessor } from '../processors/ImageProcessor';
import { HeaderRenderer } from '../renderers/HeaderRenderer';
import { ContentRenderer } from '../renderers/ContentRenderer';
import { TitleRenderer } from '../renderers/TitleRenderer';

export class DiagramRenderer {
  private headerRenderer: HeaderRenderer;
  private contentRenderer: ContentRenderer;
  private titleRenderer: TitleRenderer;

  constructor() {
    this.headerRenderer = new HeaderRenderer();
    this.contentRenderer = new ContentRenderer();
    this.titleRenderer = new TitleRenderer();
  }

  async renderDiagram(
    data: TechStackData,
    builder: SVGBuilder,
    imageProcessor: ImageProcessor
  ): Promise<void> {
    // Add title layer
    const titleContent = this.titleRenderer.render();
    builder.addLayer('title', titleContent);

    // Add headers layer
    const headersContent = this.headerRenderer.render(data);
    builder.addLayer('headers', headersContent);

    // Add content layer
    const contentElements = await this.contentRenderer.render(data, imageProcessor);
    builder.addLayer('content', contentElements);
  }
}