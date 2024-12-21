import { DownloadError } from '../errors';
import { DownloadOptions, ValidatorFn } from './types';
import { retryFetch } from './retryFetch';

export class Downloader {
  private cleanup: (() => void)[] = [];

  async download(
    url: string, 
    options: DownloadOptions = {},
    validator?: ValidatorFn
  ): Promise<void> {
    let objectUrl: string | undefined;

    try {
      const response = await retryFetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Accept': options.contentType || '*/*'
        }
      });

      if (validator) {
        await validator(response);
      }

      const blob = await response.blob();
      objectUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = options.filename || this.getFilenameFromUrl(url);
      
      // Ensure link is removed after click
      const cleanup = () => {
        document.body.removeChild(link);
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
      
      document.body.appendChild(link);
      link.click();
      
      // Delay cleanup to ensure download starts
      setTimeout(cleanup, 100);
    } catch (error) {
      if (error instanceof DownloadError) throw error;
      
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new DownloadError(`Failed to download file: ${message}`);
    } finally {
      this.cleanup.forEach(fn => fn());
      this.cleanup = [];
    }
  }

  private getFilenameFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const filename = pathname.split('/').pop();
      return filename || 'download';
    } catch {
      return 'download';
    }
  }

  addCleanup(fn: () => void): void {
    this.cleanup.push(fn);
  }
}