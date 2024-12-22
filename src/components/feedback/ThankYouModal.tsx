import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { cn } from '../../utils/cn';

interface ThankYouModalProps {
  show: boolean;
  onClose: () => void;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <Modal isOpen={show} onClose={onClose}>
      <div className="text-center">
        <CheckCircle 
          className={cn(
            "mx-auto mb-4",
            "w-12 h-12",
            "text-green-500"
          )} 
        />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Thank you
        </h2>
        <p className="text-gray-600">
          Your feedback helps us improve the service for everyone
        </p>
      </div>
    </Modal>
  );
};