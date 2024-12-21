export type ExportFormat = 'svg' | 'pdf';

export interface ExportOptions {
  format: ExportFormat;
  width?: number;
  height?: number;
  scale?: number; // For controlling export quality
}

export interface ExportResult {
  data: Blob;
  filename: string;
  mimeType: string;
}

export interface ImageDimensions {
  width: number;
  height: number;
}