import { jsPDF } from 'jspdf';
import { CaptureOptions, CaptureResult } from '../types';
import { ImageCapture } from './ImageCapture';

export class PDFCapture {
  private imageCapture = new ImageCapture();

  async capture(element: HTMLElement, options: CaptureOptions = {}): Promise<CaptureResult> {
    // First capture as image
    const imageResult = await this.imageCapture.capture(element, {
      ...options,
      scale: 2 // Ensure high resolution for PDF
    });

    // Create image element from blob
    const url = URL.createObjectURL(imageResult.data);
    const img = await this.loadImage(url);

    try {
      // Create PDF with proper dimensions
      const pdf = new jsPDF({
        orientation: img.width > img.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [img.width, img.height]
      });

      // Add metadata
      pdf.setProperties({
        title: 'Technical Stack Diagram',
        creator: 'Tech Stack Diagram Generator',
        creationDate: new Date()
      });

      // Add the image
      pdf.addImage(img, 'PNG', 0, 0, img.width, img.height);

      return {
        data: pdf.output('blob'),
        filename: `tech-stack-diagram-${new Date().toISOString().slice(0, 10)}.pdf`,
        mimeType: 'application/pdf'
      };
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }
}