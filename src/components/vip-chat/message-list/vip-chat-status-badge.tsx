import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CrossCloseButton } from '@/components/ui/button';
import { VipChatStatusBadgeProps } from '@/types/support';

/**
 * ChatStatusBadge
 *
 * Displays a dismissible badge at the top of the chat window.
 * Used to show real-time status messages from support - "Support manager is online".
 *
 * The badge is only visible when `text` is provided. Users can manually close it.
 *
 * @param text - Optional string message to display in the badge.
 */
export default function ChatStatusBadge({text} : VipChatStatusBadgeProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!!text); // Show if there’s any text
  }, [text]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute top-0 left-0 p-[20px] w-full z-[100] flex justify-between bg-[var(--main-color-90)]"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span>{text}</span>
          <CrossCloseButton onClick={handleClose} size="sm" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};