interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
}

export const retryFetch = async (
  url: string, 
  options: RequestInit,
  { maxAttempts = 3, delayMs = 1000 }: RetryOptions = {}
): Promise<Response> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (attempt === maxAttempts) break;
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
    }
  }
  
  throw lastError;
};