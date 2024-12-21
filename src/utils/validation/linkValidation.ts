export class LinkValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LinkValidationError';
  }
}

export const validateUrl = (url: string): boolean => {
  if (!url) {
    throw new LinkValidationError('URL cannot be empty');
  }

  try {
    const urlObject = new URL(url);
    return urlObject.protocol === 'http:' || urlObject.protocol === 'https:';
  } catch {
    throw new LinkValidationError('Invalid URL format. URL must start with http:// or https://');
  }
};