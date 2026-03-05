import { useEffect } from 'react';
import { Channel } from '@pubnub/chat';

/**
 * Subscribes to updates on a PubNub Chat channel and calls the provided callback
 * whenever the channel gets updated.
 *
 * @param channel - The PubNub channel to listen for updates on.
 * @param onUpdate - Callback invoked with the updated channel object.
 */
export function useChannelUpdates(
  channel: Channel | null,
  onUpdate: (updatedChannel: Channel) => void
) {
  useEffect(() => {
    if (!channel) return;

    return channel.streamUpdates((updatedChannel: Channel) => {
      if (updatedChannel) {
        onUpdate(updatedChannel);
      }
    });
  }, [channel, onUpdate]);
}
