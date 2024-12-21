import React, { useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { useFeedbackForm } from '../../hooks/useFeedbackForm';

interface FeedbackModalProps {
  isOpen: boolean;
  rating: 'yes' | 'no' | null;
  onClose: () => void;
  onSubmitComplete: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  rating,
  onClose,
  onSubmitComplete
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { 
    feedback, 
    isSubmitting,
    isSubmitted,
    handleSubmit,
    handleFeedbackChange 
  } = useFeedbackForm(rating, onClose, onSubmitComplete);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "backdrop:bg-black/50",
        "p-6 rounded-lg",
        "w-full max-w-md",
        "border border-gray-200",
        "shadow-xl",
        "animate-fade-in"
      )}
      onClose={onClose}
    >
      <h2 className="text-xl font-semibold mb-4">
        Tell us more about your experience
      </h2>
      
      {isSubmitted ? (
        <div className="text-center py-4">
          <p className="text-green-600 font-medium">
            Thank you for your feedback!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Please share your thoughts (optional)"
              maxLength={500}
              rows={4}
              className={cn(
                "w-full p-3",
                "border border-gray-300 rounded-lg",
                "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                "resize-none"
              )}
              aria-label="Feedback comments"
            />
            <div className="text-right text-sm text-gray-500">
              {feedback.length}/500
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "px-4 py-2",
                "text-gray-700",
                "border border-gray-300 rounded-lg",
                "hover:bg-gray-50",
                "focus:outline-none focus:ring-2 focus:ring-gray-500"
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "px-4 py-2",
                "bg-blue-600 text-white",
                "rounded-lg",
                "hover:bg-blue-700",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
};