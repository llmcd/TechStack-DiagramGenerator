export interface DownloadOptions {
  filename?: string;
  contentType?: string;
}

export interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
}

export type ValidatorFn = (response: Response) => Promise<void> | void;