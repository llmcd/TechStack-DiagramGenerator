import { ExportOptions, ExportResult } from './types';
import { formatPDF } from './formatters/pdfFormatter';
import { formatSVG } from './formatters/svgFormatter';
import { validateSVG } from './validators/svgValidator';

export class ExportManager {
  async export(svgContent: string, options: ExportOptions): Promise<ExportResult> {
    try {
      // Validate SVG content before processing
      if (!validateSVG(svgContent)) {
        throw new Error('Invalid SVG content');
      }

      let data: Blob;
      let filename: string;
      let mimeType: string;

      switch (options.format) {
        case 'pdf':
          data = await formatPDF(svgContent);
          filename = 'tech-stack-diagram.pdf';
          mimeType = 'application/pdf';
          break;
        
        case 'svg':
        default:
          data = formatSVG(svgContent);
          filename = 'tech-stack-diagram.svg';
          mimeType = 'image/svg+xml';
          break;
      }

      return { data, filename, mimeType };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Export error:', error);
      throw new Error('Failed to export diagram: ' + errorMessage);
    }
  }
}