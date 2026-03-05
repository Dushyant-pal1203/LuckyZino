'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useInitVipChat } from '@/hooks/support/useInitVipChat';
import { useWatchChannelField } from '@/hooks/support/useWatchChannelField';
import { VipChatDto, VipChatEventState } from '@/types/support';
import { request } from '@/services/request-handler';
import { useIframeViewportSync } from '@/hooks/viewport/useIframeViewportSync';
import './vip-chat.module.scss';


/**
 * VIP Chat component that renders an iframe with the chat UI.
 *
 * It listens for external messages via `window.postMessage` to open/close the chat
 * and reports the unread message count back to the unity.
 *
 * The component subscribes to PubNub channel updates to track unread messages
 * and communicates state changes via postMessage.
 *
 * NOTE:
 * Due to iframe isolation, we cannot pass the PubNub channel or user objects directly
 * from this component to the iframe content.
 * Therefore, the chat must be initialized **in two separate places**:
 *  - Here, in the `VipChat` component (to get unread message counts and show/hide chat)
 *  - Inside the iframe content (`VipChatPage`) itself (to manage chat UI and messaging)
 *
 * This duplication is necessary because we need to know the number of unread messages
 * **before** the chat iframe is opened, but the iframe has its own separate React context.
 */
export const VipChat: React.FC = () => {
  const { data: session } = useSession();

  // init PubNub chat
  const { channel, chatReady } = useInitVipChat(session?.user?.id);

  // Subscribe to 'supportNewMessages' count from the channel's custom fields
  const supportNewMessages = useWatchChannelField<number>(channel, 'supportNewMessages');
  const [opened, setOpened] = useState<boolean>(false);
  const [vipChatInfo, setVipChatInfo] = useState<VipChatDto | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useIframeViewportSync(iframeRef);

  /**
   * Sends chat state (unread and visibility) to parent window via postMessage.
   */
  const postVipChatState = useCallback(
    (override?: Partial<VipChatEventState>) => {
      window.postMessage(
        {
          name: 'common.vip_chat_state_changed',
          data: {
            unreadMessageCount: supportNewMessages ?? 0,
            isActive: (vipChatInfo?.available ?? false) && chatReady, // if occurred error during chat init - hide button
            ...override,
          } satisfies VipChatEventState,
        },
        window.origin
      );
    },
    [chatReady, supportNewMessages, vipChatInfo?.available]
  );

  // Fetch chat info on mount
  useEffect(() => {
    const fetchVipChatInfo = async () => {
      try {
        const info = await request<VipChatDto>('api/support/vip-chat', null, 'GET', false);
        setVipChatInfo(info);
      } catch (error) {
        console.error('Error fetching vip chat info:', error);
      }
    };

    fetchVipChatInfo();
  }, []);

  useEffect(() => {
    // Handler for messages coming from the unity
    const handleMessage = (event: MessageEvent) => {
      let data = event.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      if (typeof data !== 'object' || data == null) return;

      switch (data.name) {
        case 'common.show_vip_chat':
          setOpened(true);
          break;
        case 'vip.close':
          setOpened(false);
          postVipChatState({ unreadMessageCount: 0 });
          break;
        case 'common.vip_chat_get_state':
          postVipChatState();
          break;
      }
    };

    // Initial state post
    postVipChatState();

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [postVipChatState]);

  if (!opened) return null;

  return (
    <div className="fixed z-[1000] top-0 left-0 right-0 bottom-0
                    sm:top-1/2 sm:right-1 sm:bottom-[-35vh] sm:left-auto
                    sm:transform sm:-translate-y-1/2">
      <iframe
        ref={iframeRef}
        src={`/vip-chat`}
        className="w-full h-full rounded-none shadow-none
                  sm:w-[65vw] sm:h-[90vh] sm:rounded-[12px] sm:shadow-lg
                  lg:w-[50vw]
                  xl:w-[30vw]
                  2xl:w-[23vw]"
                  style={{ backgroundColor: 'transparent' }}/>
    </div>
  );
};