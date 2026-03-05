import { useState, useEffect, useRef } from 'react';
import { useChannelUpdates } from './useChannelUpdates';
import { Channel } from '@pubnub/chat';

/**
 * Watches a single custom field in a PubNub channel,
 * returns current value and updates it on changes.
 *
 * Uses `useChannelUpdates` to subscribe to channel updates.
 *
 * @param channel - PubNub channel object
 * @param field - The key in channel.custom to observe
 * @returns Current value of the field (or undefined if not present)
 */
export function useWatchChannelField<T = any>(
  channel: Channel | null,
  field: string
): T | undefined {

  const getFieldValue = (chan: Channel | null): T | undefined => {
    const val = chan?.custom?.[field];
    if (val === null || val === undefined) return undefined;
    return val as T;
  };

  const [value, setValue] = useState<T | undefined>(getFieldValue(channel));

  const prevValueRef = useRef<T | undefined>(value);

  useChannelUpdates(channel, (updatedChannel) => {
    const nextValue = getFieldValue(updatedChannel);
    if (nextValue !== prevValueRef.current) {
      prevValueRef.current = nextValue;
      setValue(nextValue);
    }
  });

  useEffect(() => {
    if (!channel) return;
    const currentValue = getFieldValue(channel);
    if (currentValue !== prevValueRef.current) {
      prevValueRef.current = currentValue;
      setValue(currentValue);
    }
  }, [channel, field]);

  return value;
}
