import { useState, useCallback, FormEvent } from 'react';
import { submitFeedback } from '../utils/feedback/submitFeedback';

export const useFeedbackForm = (
  rating: 'yes' | 'no' | null,
  onClose: () => void,
  onSubmitComplete: () => void
) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFeedbackChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!rating) return;

    try {
      setIsSubmitting(true);
      await submitFeedback({
        rating,
        comment: feedback,
        timestamp: new Date().toISOString(),
        sessionId: crypto.randomUUID()
      });
      
      setIsSubmitted(true);
      onSubmitComplete();
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    feedback,
    isSubmitting,
    isSubmitted,
    handleSubmit,
    handleFeedbackChange
  };
};