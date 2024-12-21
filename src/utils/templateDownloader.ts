import { Downloader } from './download/downloader';
import { validateExcelFile } from './download/validators';
import { DownloadError } from './errors';

const TEMPLATE_URL = import.meta.env.VITE_SPREADSHEET_TEMPLATE_URL;

export const downloadTemplate = async (): Promise<void> => {
  if (!TEMPLATE_URL) {
    throw new DownloadError('Template URL is not configured');
  }

  const downloader = new Downloader();
  
  await downloader.download(
    TEMPLATE_URL,
    { 
      filename: 'tech-stack-template.xlsx',
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    },
    validateExcelFile
  );
};