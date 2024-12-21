import { DownloadError } from './errors';
import { retryFetch } from './download/retryFetch';
import { isExcelContentType } from './download/contentTypes';

const TEMPLATE_URL = import.meta.env.VITE_SPREADSHEET_TEMPLATE_URL;

export const downloadTemplate = async (): Promise<void> => {
  if (!TEMPLATE_URL) {
    throw new DownloadError('Template URL is not configured');
  }

  let url: string | undefined;

  try {
    const response = await retryFetch(TEMPLATE_URL, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    });
    
    const contentType = response.headers.get('content-type');
    if (!isExcelContentType(contentType)) {
      throw new DownloadError(
        `Invalid file type. Expected Excel file, got: ${contentType}`
      );
    }

    const blob = await response.blob();
    url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tech-stack-template.xlsx';
    
    // Use click() on the document body for better browser compatibility
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    if (error instanceof DownloadError) {
      throw error;
    }
    throw new DownloadError(
      'Failed to download template. Please try again later.'
    );
  } finally {
    if (url) {
      URL.revokeObjectURL(url);
    }
  }
};