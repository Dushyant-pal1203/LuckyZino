import { useCallback, useEffect, useRef, useState } from 'react';
import { Channel, Message, User } from '@pubnub/chat';
import { ExtendedMessage } from '@/types/support';
import PubNub from 'pubnub';
import { v4 as uuidv4 } from 'uuid';

/**
 * Hook to encapsulate message logic:
 * - Initial + paginated load
 * - Real-time subscriptions
 * - Edit/delete stream
 * - Resend
 * - Unread divider index
 */
export function useVipChatMessageManager({
                                           pubnub,
                                           channel,
                                           user,
                                           messages,
                                           setMessages
                                         }: {
  pubnub: PubNub,
  channel: Channel;
  user: User;
  messages: ExtendedMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ExtendedMessage[]>>;
}) {
  const [hasMore, setHasMore] = useState(true);
  const startTimetokenRef = useRef<string | null>(null);

  const markMessageRead = useCallback((msg: Message) => {
    // if it is your own message or already read - skip
    if (msg.userId === user.id || msg.actions?.readAt) return;

    const now = new Date();
    const iso = now.toISOString();

    pubnub.addMessageAction(
      {
        channel: channel.id,
        messageTimetoken: msg.timetoken,
        action: {
          type: "readAt",
          value: iso,
        }
      },
      (status) => {
        if (status.error) {
          console.error("[PubNub] markMessageRead error:", status.errorData);
        }
      }
    );
  }, [pubnub, channel.id, user.id]);

  const markMessagesAsRead = useCallback((msgs: Message[]) => {
    msgs.forEach(msg => markMessageRead(msg));
  }, [markMessageRead]);

  /**
   * Loads the initial batch of messages from the channel history
   */
  const loadInitialMessages = useCallback(async () => {
    try {
      const { messages: initialMessages, isMore } = await channel.getHistory({ count: 25 });

      const reversed = initialMessages
        .toReversed()
        .filter((message) => !message.actions?.deleted);
      setMessages(reversed);
      markMessagesAsRead(reversed);

      if (isMore) {
        startTimetokenRef.current = initialMessages[0].timetoken;
      } else {
        startTimetokenRef.current = null;
      }

      setHasMore(isMore);
    } catch (err) {
      console.error('Failed to load initial messages', err);
    }
  }, [channel, markMessagesAsRead, setMessages]);

  /**
   * Loads more (older) messages when user scrolls to top
   */
  const loadMoreMessages = useCallback(async () => {
    if (!hasMore || !startTimetokenRef.current) return;

    try {
      const { messages: olderMessages, isMore } = await channel.getHistory({
        startTimetoken: startTimetokenRef.current,
        count: 25
      });

      const reversed = olderMessages
        .toReversed()
        .filter((message) => !message.actions?.deleted);

      setMessages((prev) => {
        const existingTokens = new Set(prev.map((m) => m.timetoken));
        const uniqueMessages = reversed.filter((m) => !existingTokens.has(m.timetoken));
        markMessagesAsRead(uniqueMessages);
        return [...prev, ...uniqueMessages];
      });

      if (isMore) {
        startTimetokenRef.current = olderMessages[0].timetoken;
      } else {
        startTimetokenRef.current = null;
      }

      setHasMore(isMore);
    } catch (err) {
      console.error('Failed to load more messages', err);
    }
  }, [channel, hasMore, markMessagesAsRead, setMessages]);

  /**
   * Returns the index of the first unread message from support (for the divider)
   */
  const getFirstUnreadMessageIndex = useCallback(() => {
    const supportNewMessages = channel.custom?.supportNewMessages as number ?? 0;
    if (!supportNewMessages || supportNewMessages <= 0) return -1;
    if (!messages.length) return -1;

    const index = supportNewMessages > messages.length - 1
      ? -1
      : supportNewMessages - 1;

    const lastMessage = messages[0]; // since  flex-col-reverse - the first message in the list is the latest one
    const isLastMessageMine = lastMessage?.userId === user.id;

    if (isLastMessageMine) {
      return -1; // we don't show the banner at all, even if supportNewMessagesCount is still old
    }

    const message = messages[index];
    if (message?.userId === user.id) return -1;

    return index;
  }, [channel.custom, messages, user.id]);

  /**
   * Handles retrying failed message sending
   */
  const handleResend = async (msg: ExtendedMessage) => {
    try {
      // We use this method here instead of sendText in Channel type, because only this method from SDK supports
      // arbitrary fields, which are used in webhook events in (Events&Actions).
      await pubnub.publish({
        channel: channel.id,
        message: {
          id: uuidv4(), // required field. Without this field? our custom pubnub-webhook-receiver does not store messages
          text: msg.text,
        },
      })

      // remove not delivered message from state, because after successful
      // delivery, subscriber will catch new sent message and put to state on the right place
      setMessages((prev) =>
        prev.filter((m) => m.timetoken !== msg.timetoken)
      );

      if (channel.custom) {
        const userNewMessages = channel.custom.userNewMessages as number;
        const newCount = (userNewMessages ?? 0) + 1;

        // We update the channel's custom field here.
        // The useWatchChannelField above listens for this channel update and will automatically
        // receive the updated value via streamUpdates and store it to userNewMessages.
        // So we DON'T call set state directly here.
        await channel.update({
          custom: {
            ...channel.custom,
            supportNewMessages: 0,
            userNewMessages: newCount
          }
        });
      }
    } catch (e) {
      console.error('Resend failed', e);
    }
  };

  /**
   * Returns true if this is the first (greeting) message
   */
  const isGreetingMessageIndex = (index: number) => {
    return !hasMore && index === messages.length - 1; // first message in history. (messages.length - 1) - because messages reversed
  };
  
  // Load initial messages on mount
  useEffect(() => {
    if (!channel) return;

    loadInitialMessages();
  }, [channel, loadInitialMessages]);

  // Subscribe to new incoming messages
  useEffect(() => {
    if (!channel) return;

    return channel.connect((message) => {
      markMessageRead(message);
      setMessages((prev) => {
        const alreadyExists = prev.some((m) => m.timetoken === message.timetoken);
        return alreadyExists ? prev : [message, ...prev];
      });
    });
  }, [channel, markMessageRead, setMessages]);

  // Subscribe to messages  updates (edits, deletions)
  useEffect(() => {
    if (!messages.length) return;

    // Since there is a functionality of failed messages, we have them in the state as an extended object.
    // The extended object does not have all the pub nab fields, it is like a fake message.
    // And we can only pass native pub nab message objects to Message.streamUpdatesOn()
    // NOTE: Field local will be only in local(failed) messages!
    const nativeMessages = messages.filter(msg => !('local' in msg));

    const unsubscribe = Message.streamUpdatesOn(nativeMessages, (updatedMessages) => {
      const updatedMap = new Map(updatedMessages.map((m) => [m.timetoken, m]));

      setMessages((prev) => {
        const updatedNative = prev
          .filter((m) => !('local' in m)) // update only native pubnub messages
          .map((m) => {
            const updated = updatedMap.get(m.timetoken);
            if (!updated) return m;
            if (updated.actions?.deleted) return null;
            return updated;
          })
          .filter((m): m is Message => m !== null);

        const localOnly = prev.filter((m) => 'local' in m);

        return [...updatedNative, ...localOnly].sort( // merge local failed messages and native pub nub.
          (a, b) => Number(a.timetoken) - Number(b.timetoken)
        ).toReversed();
      });
    });

    return () => {
      unsubscribe?.();
    };
  }, [messages, setMessages]);

  return {
    hasMore,
    loadMoreMessages,
    handleResend,
    getFirstUnreadMessageIndex,
    isGreetingMessageIndex
  };
}
