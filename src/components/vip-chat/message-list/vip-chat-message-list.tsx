import { ChatMessage } from './vip-chat-message-item';
import ChatStatusBadge from './vip-chat-status-badge';
import NewMessagesDivider from './vip-chat-message-divider';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '@/components/ui/spinner';
import { ChatMessageListProps } from '@/types/support';
import { formatTimetokenPretty, getMessageValue } from '@/components/vip-chat/helper';
import { useVipChatMessageManager } from '@/hooks/support/useVipChatMessageManager';

/**
 * ChatMessageList component
 *
 * This component renders the list of chat messages with support for:
 * - Infinite scroll upward to load older messages
 * - Live message updates and message edit/delete subscriptions
 * - Resending undelivered messages
 * - Visual divider for new messages
 */
export default function ChatMessageList({
                                          pubnub,
                                          vipChatInfo,
                                          channel,
                                          user,
                                          messages,
                                          setMessages
                                        }: ChatMessageListProps) {
  const {
    hasMore,
    loadMoreMessages,
    handleResend,
    getFirstUnreadMessageIndex,
    isGreetingMessageIndex
  } = useVipChatMessageManager({ pubnub, channel, user, messages, setMessages });

  return (
    <div
      className="flex-1 relative overflow-y-auto no-scrollbar border-l-[1.5px] border-r-[1.5px] border-[var(--main-color)]"
    >
      <ChatStatusBadge text={vipChatInfo.textStatus} />
      <div
        id="scrollableDiv"
        className="flex-1 overflow-auto flex flex-col-reverse h-full no-scrollbar" // IMPORTANT! Set up height for scrollable div
      >
        <InfiniteScroll
          dataLength={messages.length}
          next={loadMoreMessages}
          hasMore={hasMore}
          loader={<Spinner />}
          inverse={true}
          scrollableTarget="scrollableDiv"
          style={{
            padding: '10px',
            display: 'flex',
            flexDirection: 'column-reverse'
          }} //To put endMessage and loader to the top.
        >
          {messages.map((msg, i) => (
            <div
              key={msg.timetoken}
              className="mb-2"
            >
              {i === getFirstUnreadMessageIndex() && <NewMessagesDivider />}
              <ChatMessage
                text={getMessageValue(msg)}
                time={formatTimetokenPretty(msg.timetoken)}
                isMine={msg.userId === user.id}
                isGreeting={isGreetingMessageIndex(i)}
                delivered={msg.delivered !== false}
                onResend={() => handleResend(msg)}
              />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

