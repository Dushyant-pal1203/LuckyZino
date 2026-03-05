import { VipChatManagerAvatarProps } from '@/types/support';
import styles from '../vip-chat.module.scss';

/**
 * Displays the avatar of the chat manager with an online/offline status indicator.
 *
 * The status dot is green if the manager is online and red if offline.
 * Avatar is wrapped in a decorative gradient border.
 *
 * @component
 * @param {VipChatManagerAvatarProps} props - Component props.
 * @returns {JSX.Element} Rendered manager avatar with status.
 */
export default function VipChatManagerAvatar({ online }: VipChatManagerAvatarProps) {
  const statusColor = online
    ? 'var(--online-manager-status)'
    : 'var(--offline-manager-status)';

  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`absolute right-[1px] top-[1px] w-[11px] h-[11px] rounded-full ${styles.gradient2} p-[1px]`}>
        <div
          className="w-[9px] h-[9px] rounded-full"
          style={{ backgroundColor: statusColor }}
        >
        </div>
      </div>
      <div className={`p-[2px] rounded-full ${styles.gradient2} inline-block`}>
        <img
          src="/images/chat/chat-manager-avatar.png"
          alt="Manager"
          className="w-10 h-10 object-cover rounded-full"
        />
      </div>
    </div>
  );
}