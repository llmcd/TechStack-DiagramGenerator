import React from 'react';
import { FeedbackButtons } from './FeedbackButtons';
import { FeedbackModal } from './FeedbackModal';
import { useFeedback } from '../../hooks/useFeedback';

export const FeedbackSection: React.FC = () => {
  const { 
    isModalOpen,
    selectedRating,
    hasSubmitted,
    handleRating,
    handleCloseModal,
    handleSubmitComplete
  } = useFeedback();

  return (
    <div className="mt-8 text-center">
      <p className="text-gray-700 mb-4">Was this generator helpful?</p>
      <FeedbackButtons 
        onRating={handleRating} 
        disabled={hasSubmitted}
      />
      <FeedbackModal
        isOpen={isModalOpen}
        rating={selectedRating}
        onClose={handleCloseModal}
        onSubmitComplete={handleSubmitComplete}
      />
    </div>
  );
};