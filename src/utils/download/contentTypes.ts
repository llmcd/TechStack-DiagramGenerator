export const EXCEL_CONTENT_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'application/octet-stream' // Some servers send this for Excel files
];

export const isExcelContentType = (contentType: string | null): boolean => {
  if (!contentType) return false;
  return EXCEL_CONTENT_TYPES.some(type => contentType.includes(type));
};