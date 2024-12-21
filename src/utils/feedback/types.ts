export interface FeedbackData {
  rating: 'yes' | 'no';
  comment: string;
  timestamp: string;
  sessionId: string;
}