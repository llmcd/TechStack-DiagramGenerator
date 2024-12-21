export interface CaptureOptions {
  scale?: number;
  quality?: number;
  backgroundColor?: string;
}

export interface CaptureResult {
  data: Blob;
  filename: string;
  mimeType: string;
}

export type CaptureFormat = 'png' | 'pdf';