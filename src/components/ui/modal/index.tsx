import React, { useEffect, ReactNode } from 'react';
import './modal.css'; // Assuming CSS file remains the same
import { UIEvents } from '@/enum/ui';

// Define the interface for the component's props
interface ModalProps {
  isOpen: boolean;
  onClose: () => void; // Function that takes no arguments and returns nothing
  children: ReactNode; // Type for anything React can render
  title?: string; // Optional title prop
  overlayClass?: string;
  contentClass?: string;
  modalBodyClass?: string;
  btnClass?: string;
}

// Use React.FC (Functional Component) with the props interface
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  overlayClass,
  contentClass,
  modalBodyClass,
  btnClass
}) => {
  // Effect to handle closing the modal with the Escape key
  useEffect(() => {
    // Type the event parameter as KeyboardEvent
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // Add listener when modal opens
      document.addEventListener('keydown', handleEsc);
      // Optional: Add class to body to prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    // Cleanup function to remove listener and restore body scroll
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]); // Dependencies for the effect

  useEffect(() => {
    const onMessage = (evt: MessageEvent) => {
      const {
        name 
      } = evt.data;
			if(name === UIEvents.CloseModal) {
				onClose();
			}
    };
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  // Prevent rendering if the modal is not open
  if (!isOpen) {
    return null;
  }

  // Prevent clicks inside the modal content from closing the modal
  // Type the event parameter as React.MouseEvent targeting an HTMLDivElement
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // Generate IDs for ARIA attributes
  const titleId = title ? 'modal-title' : undefined;
  const descriptionId = 'modal-description'; // Assuming main content describes the modal

  return (
    // The overlay uses role="presentation" as it's just a background dimmer
    <div
      className={`modal-overlay ${overlayClass}`}
      onClick={onClose} // Close modal when overlay is clicked
      role="presentation"
    >
      <div
        className={`modal-content ${contentClass}`}
        onClick={handleContentClick} // Prevent closing when clicking inside
        role="dialog" // Semantically a dialog
        aria-modal="true" // Indicates it's a modal dialog
        aria-labelledby={titleId} // Link title for screen readers
        aria-describedby={descriptionId} // Link description for screen readers
      >
        <button
          id="modal-close-button"
          className={`modal-close-button ${btnClass}`}
          onClick={onClose}
          aria-label="Close modal" // Accessible label for the close button
          type="button" // Explicitly set button type
        >
          &times; {/* Unicode multiplication sign often used for 'close' */}
        </button>

        {title && (
          <h2 id={titleId} className="modal-title">
            {title}
          </h2>
        )}

        {/* The main content, given an ID for aria-describedby */}
        <div id={descriptionId} className={`modal-body ${modalBodyClass}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
