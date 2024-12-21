import { useState, useCallback } from 'react';

export const useFeedback = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<'yes' | 'no' | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleRating = useCallback((rating: 'yes' | 'no') => {
    // Prevent opening modal if feedback was already submitted
    if (hasSubmitted) return;
    
    setSelectedRating(rating);
    setIsModalOpen(true);
  }, [hasSubmitted]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Reset after animation completes
    setTimeout(() => setSelectedRating(null), 300);
  }, []);

  const handleSubmitComplete = useCallback(() => {
    setHasSubmitted(true);
    handleCloseModal();
  }, [handleCloseModal]);

  return {
    isModalOpen,
    selectedRating,
    hasSubmitted,
    handleRating,
    handleCloseModal,
    handleSubmitComplete
  };
};