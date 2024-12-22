import React, { useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';
import { ModalOverlay } from './modal/ModalOverlay';
import { ModalContent } from './modal/ModalContent';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
        "modal",
        "backdrop:bg-black/50",
        "backdrop:backdrop-blur-sm",
        "p-0",
        "bg-transparent",
        "outline-none",
        className
      )}
      onClose={onClose}
    >
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={e => e.stopPropagation()}>
          {children}
        </ModalContent>
      </ModalOverlay>
    </dialog>
  );
};