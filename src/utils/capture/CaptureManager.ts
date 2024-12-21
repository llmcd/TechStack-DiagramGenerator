import { CaptureOptions, CaptureResult, CaptureFormat } from './types';
import { ImageCapture } from './strategies/ImageCapture';
import { PDFCapture } from './strategies/PDFCapture';

export class CaptureManager {
  private strategies = {
    png: new ImageCapture(),
    pdf: new PDFCapture()
  };

  async capture(
    element: HTMLElement,
    format: CaptureFormat,
    options: CaptureOptions = {}
  ): Promise<CaptureResult> {
    const strategy = this.strategies[format];
    if (!strategy) {
      throw new Error(`Unsupported format: ${format}`);
    }

    return strategy.capture(element, options);
  }
}