import { ChangeEventHandler, useRef, useState } from 'react';
import { ChatInputProps, ExtendedMessage } from '@/types/support';
import { v4 as uuidv4 } from "uuid";

import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { isRtl, isValidTextSize, sanitizeMessage } from '@/components/vip-chat/helper';
import { useDraftMessage } from '@/hooks/support/useDraftMessage';
import { CrossCloseButton } from '@/components/ui/button';
import { useViewportFromParent } from '@/hooks/viewport/useParentWindowViewport';

const INPUT_TEXT_SIZE_THRESHOLD = 30 * 1024; // 30 KiB (PubNub restriction)

/**
 * ChatInput component
 *
 * This component renders a text input and submit button to send messages through a channel.
 *
 * Convention note:
 * We follow a specific convention for syncing unread message counts between chat participants:
 *
 * - `userNewMessages`: This field is incremented **by us** each time we send a message.
 *   It is stored in the channel's `.custom` field. The other side (e.g., support or admin)
 *   uses this value to see how many new messages **we** have sent.
 *
 * - `supportNewMessages`: This field works in the opposite direction.
 *   The other side increments it when **they** send a message.
 *   We use this value in our `ChatMessageList` component to show how many new messages
 *   we have received from support.
 */
export default function ChatInput({
                                    pubnub,
                                    channel,
                                    user,
                                    messages,
                                    setMessages
                                  }: ChatInputProps) {
  const [text, setText] = useDraftMessage();
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isRtlInput, setIsRtlInput] = useState(false);
  const viewport = useViewportFromParent();
  const isDesktop = (viewport?.width ?? 0) > 768;

  const sendButtonDisabled = (text || '').trim().length <= 0 || isSending;
  const sendButtonImgSrc = `/images/common/btns/circle-send-button-${sendButtonDisabled ? 'disabled' : 'active'}.png`;

  const handleEmojiSelected = (emojiData: EmojiClickData) => {
    setText((prev) => prev + emojiData.emoji);
    inputRef.current?.focus();
  };

  // Handles message submission
  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!text.trim() || !channel) return;

    setIsSending(true);
    const cleanedText = sanitizeMessage(text);

    setText('');
    setShowEmojiPicker(false);

    // Send the message through the channel. if it fails push failed message to state with delivered = false
    try {
      // We use this method here instead of sendText in Channel type, because only this method from SDK supports
      // arbitrary fields, which are used in webhook events in (Events&Actions).
      await pubnub.publish({
        channel: channel.id,
        message: {
          id: uuidv4(), // required field. Without this field, our custom pubnub-webhook-receiver does not store messages
          text: cleanedText,
        },
      })

      // update userNewMessages field in channel if message was sent
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
      console.error('Sending message failed', e);

      // push failed message to have opportunity resend tis
      const failedMessage: ExtendedMessage = {
        local: true,
        timetoken: Date.now() * 10000 + Math.floor(Math.random() * 10000),
        text: cleanedText,
        userId: user.id,
        delivered: false
      } as any;
      setMessages([failedMessage, ...messages]);
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange: ChangeEventHandler<any> = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidTextSize(value, INPUT_TEXT_SIZE_THRESHOLD)) {
      setText(value);
      setIsRtlInput(isRtl(value));
    }
  };

  return (
    <footer>
      {isDesktop && showEmojiPicker && (
        <div className="w-full">
          <EmojiPicker
            theme={Theme.DARK}
            width="100%"
            onEmojiClick={handleEmojiSelected}
          />
        </div>
      )}

      <form
        onSubmit={handleSend}
        className="py-[12px] px-[16px] flex flex-col rounded-b-[var(--main-border-radius)] lz-primary-gradient"
        action="#">
        <div
          className="w-full flex items-center gap-[10px] rounded-3xl border-[white] border-[1.51px] bg-[var(--second-color)]"
        >
          {isDesktop && (
            showEmojiPicker ? (
              <CrossCloseButton
                className="ml-[10px]"
                onClick={() => setShowEmojiPicker(false)}
              />
            ) : (
              <button
                className="ml-[5px] cursor-pointer"
                onClick={() => setShowEmojiPicker(true)}
              >
                <img src="/icons/emoji-icon.png" alt="Emoji" />
              </button>
            )
          )}
          <textarea
            ref={inputRef}
            rows={1}
            value={text}
            dir={isRtlInput ? 'rtl' : 'ltr'}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            className={`
              w-full resize-none overflow-y-auto bg-transparent
              focus:outline-none placeholder-white max-h-[4.5em]
              text-${isRtlInput ? 'right' : 'left'}
              ${!isDesktop ? 'pl-[10px]' : ''}
            `}
          />
          <button type="submit" disabled={sendButtonDisabled}>
            <img src={sendButtonImgSrc} alt="Send" />
          </button>
        </div>
      </form>

    </footer>
  );
};