import { ChatHeaderProps } from '@/types/support';
import VipChatManagerAvatar from '@/components/vip-chat/header/vip-chat-manager-avatar';
import { CrossCloseButton } from '@/components/ui/button';

/**
 * ChatHeader
 *
 * Displays the top header of the VIP chat window, including:
 * - A centered title ("VIP Area")
 * - A support manager avatar with online/offline status indicator
 * - A close button
 *
 * @param onClose - Callback invoked when the close button is clicked
 * @param vipChatInfo - Object containing info about the support manager (e.g., `online` status)
 */
export default function ChatHeader({
                                     onClose,
                                     vipChatInfo,
                                   }: ChatHeaderProps) {
  return (
    <header
      className="relative py-[6px] px-[16px] flex justify-between items-center rounded-t-[var(--main-border-radius)] border border-[var(--second-color)] lz-primary-gradient"
    >
      <VipChatManagerAvatar online={vipChatInfo.online}/>
      <h2 className="absolute left-1/2 transform -translate-x-1/2 font-bold text-3xl">VIP Chat</h2>
      <CrossCloseButton onClick={onClose} />
    </header>
  );
}