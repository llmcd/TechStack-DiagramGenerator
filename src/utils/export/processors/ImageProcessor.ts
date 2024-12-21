export class ImageProcessor {
  private imageCache: Map<string, string> = new Map();

  async processImage(url: string): Promise<string> {
    if (this.imageCache.has(url)) {
      return this.imageCache.get(url)!;
    }

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const base64 = await this.blobToBase64(blob);
      this.imageCache.set(url, base64);
      return base64;
    } catch (error) {
      console.warn(`Failed to process image: ${url}`, error);
      return '';
    }
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  clearCache(): void {
    this.imageCache.clear();
  }
}