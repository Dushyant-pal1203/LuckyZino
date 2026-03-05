
import { useEffect, useState } from 'react';
import { Chat, Channel, User } from '@pubnub/chat';
import { useChannelUpdates } from '@/hooks/support/useChannelUpdates';
import PubNub from 'pubnub';

const publishKey: string | undefined = process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY;
if (!publishKey) {
  throw new Error('Missing NEXT_PUBLIC_PUBNUB_PUBLISH_KEY');
}
const subscribeKey: string | undefined = process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE_KEY;
if (!subscribeKey) {
  throw new Error('Missing NEXT_PUBLIC_PUBNUB_SUBSCRIBE_KEY');
}

/**
 * Get channel id from user id in the convention `support_<userId>` format.
 *
 * @param userId - The original user ID (e.g., a UUID)
 * @returns Channel id (e.g., `support_abc123`)
 */
function getChannelId(userId: string): string {
  return `support_${userId}`;
}

/**
 * Initializes the PubNub Chat for a given user ID and returns the associated channel and user.
 *
 * Automatically formats the user ID using `support_<userId>` convention,
 * initializes PubNub Chat, fetches the user and their private support channel.
 *
 * @param userId - The raw user ID (usually from your auth/session)
 * @returns An object containing:
 *  - `channel`: The user's PubNub support channel (or null if not yet initialized)
 *  - `user`: The PubNub user object (or null if not yet initialized)
 *  - `chatReady`: A boolean indicating if the chat has been fully initialized.
 *  (Field `chatReady` created to avoid a lot of checks - channel || user etc)
 */
export function useInitVipChat(userId?: string) {
  const [chatReady, setChatReady] = useState<boolean>(false);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [pubNubSdk, setPubNubSdk] = useState<PubNub | null>(null);
  const [error, setError] = useState<unknown>(null);

  useChannelUpdates(channel, (updatedChannel) => {
    setChannel(updatedChannel);
  });

  useEffect(() => {
    if (!userId) return;

    async function init(userId: string) {
      try {
        const chat = await Chat.init({
          publishKey: publishKey!,
          subscribeKey: subscribeKey!,
          userId: userId,
        });

        const user = await chat.getUser(userId);
        const channel = await chat.getChannel(getChannelId(userId));
        const sdk = chat.sdk;

        setUser(user);
        setChannel(channel);
        setPubNubSdk(sdk);

        if(channel && user && sdk) {
          setChatReady(true);
        }
      } catch (err) {
        console.error('[VIP Chat Init Error]', err);
        setError(err);
      }
    }

    init(userId);
  }, [userId]);

  return { pubNubSdk, channel, user, chatReady, error };
}