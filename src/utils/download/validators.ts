import { DownloadError } from '../errors';

export const validateExcelFile = async (response: Response): Promise<void> => {
  const contentType = response.headers.get('content-type');
  const validTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/octet-stream'
  ];

  if (!contentType || !validTypes.some(type => contentType.includes(type))) {
    throw new DownloadError(
      `Invalid file type. Expected Excel file, got: ${contentType}`
    );
  }
};