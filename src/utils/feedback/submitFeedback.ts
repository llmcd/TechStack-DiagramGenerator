import { FeedbackData } from './types';

const WEBHOOK_URL = import.meta.env.VITE_FEEDBACK_WEBHOOK_URL;

export const submitFeedback = async (data: FeedbackData): Promise<void> => {
  if (!WEBHOOK_URL) {
    console.warn('Feedback webhook URL not configured');
    return;
  }

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to submit feedback');
  }
};