import { Button } from '@/components/ui/button';
import { VipChatInitFallbackProps } from '@/types/support';

/**
 * A fallback UI component that is displayed when the VIP chat fails to initialize or load.
 *
 * This component shows an error message and provides a button for the user to close the chat.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {() => void} props.onCloseChat - Callback function to close the chat interface.
 */
export default function VipChatInitFallback({onCloseChat} : VipChatInitFallbackProps) {
  return (
    <div className="p-2 flex flex-col gap-1 items-center flex-1 justify-center text-white text-center mt-4">
              <span>
                An occurred problem loading the chat, please try again later
              </span>
      <Button onClick={onCloseChat}>
        Close
      </Button>
    </div>
  )
}