import { useSession } from 'next-auth/react';
import { useInitVipChat } from '@/hooks/support/useInitVipChat';
import { useCallback, useEffect, useState } from 'react';
import { ExtendedMessage, VipChatDto } from '@/types/support';
import { TimeoutInitWrapper } from '@/components/ui/wrapper/timeout-init-wrapper';
import Spinner from '@/components/ui/spinner';
import VipChatInitFallback from '@/components/vip-chat/common/vip-chat-failed-init';
import ChatHeader from '@/components/vip-chat/header/vip-chat-header';
import ChatMessageList from '@/components/vip-chat/message-list/vip-chat-message-list';
import ChatInput from '@/components/vip-chat/input/vip-chat-input';
import HelpshiftStyles from '@/components/ui/helpshift-styles';

import  './variables.scss';
import { request } from '@/services/request-handler';

const VIP_CHAT_INFO_GETTER_INTERVAL = 1000 * 60; // 1 min
const VIP_CHAT_INIT_TIMEOUT = 1000 * 30; // 30 sec

/**
 * VipChatPage is the main chat interface rendered inside the iframe.
 *
 * Responsibilities:
 * - Initialize PubNub chat using user session ID
 * - Fetch VIP chat metadata (manager online status) periodically
 * - Manage messages state and pass down to child components
 * - Render header, message list and input components once chat is ready
 * - Provide close chat functionality which resets unread messages count
 *
 * Notes:
 * - Fetches VIP chat info from the backend every 60 seconds to keep data fresh
 * - Shows spinner while initializing or loading data
 * - Uses HelpshiftStyles component to hide Helpshift badge overlay
 */
export default function VipChatContent() {
  const { data: session } = useSession();
  const { pubNubSdk, channel, user, chatReady, error } = useInitVipChat(session?.user?.id);
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);
  const [vipChatInfo, setVipChatInfo] = useState<VipChatDto | undefined>({
    available: true,
    online: true,
    textStatus: 'Test'
  });

  const isReady = useCallback(() => chatReady && Boolean(vipChatInfo), [chatReady, vipChatInfo]);

  useEffect(() => {
    const fetchVipChatInfo = async () => {
      try {
        const info = await request<VipChatDto>('api/support/vip-chat', null, 'GET', false);
        setVipChatInfo(info);
      } catch (error) {
        console.error('Error fetching vip chat info:', error);
      }
    };
    fetchVipChatInfo()
    const intervalId = setInterval(fetchVipChatInfo, VIP_CHAT_INFO_GETTER_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  /**
   * Handler to close the VIP chat:
   * - Resets unread message count in the channel's custom data
   * - Sends a message to the parent window to notify chat closure
   */
  const onCloseChat = async () => {
    if (channel) {
      await channel.update({
        custom: {
          ...channel.custom,
          supportNewMessages: 0
        }
      });
    }
    window.parent.postMessage({ name: 'vip.close' }, '*');
  };

  return (
    <div className={`vip-chat-theme w-full h-full bg-[var(--second-color)] font-['Exo_2'] text-[var(--main-text-color)] `}
    >
      <div className="w-full h-full rounded-[var(--main-border-radius)] shadow-lg flex flex-col justify-center overflow-hidden">
        <TimeoutInitWrapper
          predicate={isReady}
          timeoutMs={VIP_CHAT_INIT_TIMEOUT}
          spinner={<Spinner />}
          error={error}
          fallback={<VipChatInitFallback onCloseChat={onCloseChat}/>}
        >
          <ChatHeader vipChatInfo={vipChatInfo!} onClose={onCloseChat} />
          <ChatMessageList
            pubnub={pubNubSdk!}
            vipChatInfo={vipChatInfo!}
            channel={channel!}
            user={user!}
            messages={messages}
            setMessages={setMessages}
          />
          <ChatInput
            pubnub={pubNubSdk!}
            channel={channel!}
            user={user!}
            messages={messages}
            setMessages={setMessages}
          />
        </TimeoutInitWrapper>
      </div>
      <HelpshiftStyles /> {/* remove helpshift badge */}
    </div>
  );
}