import html2canvas from 'html2canvas';
import { CaptureOptions, CaptureResult } from '../types';

export class ImageCapture {
  async capture(element: HTMLElement, options: CaptureOptions = {}): Promise<CaptureResult> {
    const {
      scale = 2,
      quality = 1,
      backgroundColor = '#ffffff'
    } = options;

    const canvas = await html2canvas(element, {
      scale,
      backgroundColor,
      logging: false,
      useCORS: true,
      allowTaint: true
    });

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob!),
        'image/png',
        quality
      );
    });

    return {
      data: blob,
      filename: `tech-stack-diagram-${new Date().toISOString().slice(0, 10)}.png`,
      mimeType: 'image/png'
    };
  }
}